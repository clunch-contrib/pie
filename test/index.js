import Clunch from 'clunch';
import pie from '../index';
import image from './test.clunch';
import demoData from './data.json';

window.clunch = new (Clunch.series('ui-pie', pie))({
    el: document.getElementById('root'),
    data: function () {
        return {
            data: demoData
        };
    },
    render: image,
    methods: {
        doit(target) {
            console.log(target);
        }
    }
});
