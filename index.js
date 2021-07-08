
/**
 * 饼图
 */

var initConfig = function (attr, that) {

    var i;

    if (attr.cx == null) attr.cx = that._width * 0.5;
    if (attr.cy == null) attr.cy = that._height * 0.5;
    if (attr.radius == null) attr.radius = that._min * 0.3;

    attr._allValue = 0;
    for (i = 0; i < attr.data.length; i++) {
        attr._allValue += attr.data[i].value;
    }

};

export default ['number', 'json', '$getLoopColors', '$rotate', function ($number, $json, $getLoopColors, $rotate) {
    return {
        attrs: {

            // 圆心和半径
            cx: $number(null)(true),
            cy: $number(null)(true),
            radius: $number(null)(true),

            // 数据
            // [{name:"",value:""},...]
            data: $json()
        },
        region: {
            default: function (render, attr) {
                initConfig(attr, this);

                var i, colors = $getLoopColors(attr.data.length), beginDeg = 0, deg;

                for (i = 0; i < attr.data.length; i++) {
                    deg = attr.data[i].value / attr._allValue * Math.PI * 2;
                    render(i, {
                        data: attr.data[i],
                        color: colors[i]
                    }).fullArc(attr.cx, attr.cy, 0, attr.radius, beginDeg, deg);
                    beginDeg += deg;
                }

            }
        },
        link: function (painter, attr) {
            initConfig(attr, this);

            painter.config({
                'font-size': 10
            });

            var i, colors = $getLoopColors(attr.data.length), beginDeg = 0, deg, dot1, dot2;

            for (i = 0; i < attr.data.length; i++) {
                deg = attr.data[i].value / attr._allValue * Math.PI * 2;
                painter.config({
                    'strokeStyle': "white",
                    'fillStyle': colors[i]
                }).fullArc(attr.cx, attr.cy, 0, attr.radius, beginDeg, deg);

                // 绘制提示文字和连线

                var _deg = beginDeg + deg * 0.5;
                var _isLeft = _deg > Math.PI * 0.5 && _deg < Math.PI * 1.5;

                dot1 = $rotate(attr.cx, attr.cy, _deg, attr.cx + attr.radius, attr.cy);
                dot2 = $rotate(attr.cx, attr.cy, _deg, attr.cx + attr.radius + 10, attr.cy);

                painter
                    .config({
                        'strokeStyle': "#000000"
                    })
                    .beginPath()
                    .moveTo(dot1[0], dot1[1])
                    .lineTo(dot2[0], dot2[1])
                    .stroke();

                painter.config({
                    "textAlign": _isLeft ? "right" : "left"
                }).fillText(attr.data[i].name, dot2[0], dot2[1], _isLeft ? _deg - Math.PI : _deg);

                beginDeg += deg;
            }

        }
    };
}];
