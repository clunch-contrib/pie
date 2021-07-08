
/**
 * 饼图
 */

var initConfig = function (attr, that) {

    var i;

    if (attr.cx == null) attr.cx = that._width * 0.5;
    if (attr.cy == null) attr.cy = that._height * 0.5;
    if (attr.radius == null) attr.radius = that._min * 0.4;

    attr._allValue = 0;
    for (i = 0; i < attr.data.length; i++) {
        attr._allValue += attr.data[i].value;
    }

};

export default ['number', 'json', '$getLoopColors', function ($number, $json, $getLoopColors) {
    return {
        attrs: {

            // 圆心和半径
            cx: $number(null)(true),
            cy: $number(null)(true),
            radius: $number(null)(true),

            // 数据
            // [{name:"",value:""},...]
            data: $json(),

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

            var i, colors = $getLoopColors(attr.data.length), beginDeg = 0, deg;

            for (i = 0; i < attr.data.length; i++) {
                deg = attr.data[i].value / attr._allValue * Math.PI * 2;
                painter.config({
                    'strokeStyle': "#555555",
                    'fillStyle': colors[i]
                }).fullArc(attr.cx, attr.cy, 0, attr.radius, beginDeg, deg);
                beginDeg += deg;
            }

        }
    };
}];
