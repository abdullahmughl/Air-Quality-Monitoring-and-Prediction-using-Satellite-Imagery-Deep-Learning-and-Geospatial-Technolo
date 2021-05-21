window.addEventListener('load', loader);

function generateRandomData(len) {
    // generate some random data
    var points = [];
    var max = 0;
    var min = 1234;
    var width = 840;
    var height = 400;

    while (len--) {
        var val = Math.floor(Math.random() * 1234);
        max = Math.max(max, val);
        min = Math.min(min, val);
        var point = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
            value: val
        };
        points.push(point);
    }

    var data = { max: max, min: min, data: points };
    return data;
};

function loader() {

    /*  legend code */
    // we want to display the gradient, so we have to draw it
    var legendCanvas = document.createElement('canvas');
    legendCanvas.width = 100;
    legendCanvas.height = 100;
    var min = document.querySelector('#min');
    var max = document.querySelector('#max');
    var gradientImg = document.querySelector('#gradient');

    var legendCtx = legendCanvas.getContext('2d');
    var gradientCfg = {};

    function updateLegend(data) {
        // the onExtremaChange callback gives us min, max, and the gradientConfig
        // so we can update the legend
        min.innerHTML = data.min;
        max.innerHTML = data.max;
        // regenerate gradient image
        if (data.gradient != gradientCfg) {
            gradientCfg = data.gradient;
            var gradient = legendCtx.createLinearGradient(0, 0, 100, 1);
            for (var key in gradientCfg) {
                gradient.addColorStop(key, gradientCfg[key]);
            }

            legendCtx.fillStyle = gradient;
            legendCtx.fillRect(0, 0, 100, 10);
            gradientImg.src = legendCanvas.toDataURL();
        }
    };
    /* legend code end */
    var data = generateRandomData(200);

    var heatmapInstance = h337.create({
        container: document.querySelector('.heatmap'),
        onExtremaChange: function(data) {
            updateLegend(data);
        }
    });

    // generate 200 random datapoints
    console.log(data);
    heatmapInstance.setData(data);

    var demoWrapper = document.querySelector('.demo-wrapper');
    var tooltip = document.querySelector('.tooltip');

    function updateTooltip(x, y, value) {
        // + 15 for distance to cursor
        var transform = 'translate(' + (x + 15) + 'px, ' + (y + 15) + 'px)';
        tooltip.style.MozTransform = transform; /* Firefox */
        tooltip.style.msTransform = transform; /* IE (9+) - note ms is lowercase */
        tooltip.style.OTransform = transform; /* Opera */
        tooltip.style.WebkitTransform = transform; /* Safari and Chrome */
        tooltip.style.transform = transform; /* One day, my pretty */
        tooltip.innerHTML = value;
    }

    demoWrapper.onmousemove = function(ev) {
        var x = ev.layerX;
        var y = ev.layerY;
        var value = heatmapInstance.getValueAt({
            x: x,
            y: y
        });

        tooltip.style.display = 'block';

        updateTooltip(x, y, value);
    };
    demoWrapper.onmouseout = function() {
        tooltip.style.display = 'none';
    };


    document.querySelector('.trigger-refresh').onclick = function() {
        heatmapInstance.setData(generateRandomData(200));
    };


    var btns = document.querySelectorAll('.symbol');
    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function() {
            ga('send', 'event', 'social', 'share');
        };
    }

};