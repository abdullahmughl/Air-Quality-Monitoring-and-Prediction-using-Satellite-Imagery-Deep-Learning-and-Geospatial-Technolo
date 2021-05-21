function interpolateArray(data, fitCount) {

    var linearInterpolate = function(before, after, atPoint) {
        return before + (after - before) * atPoint;
    };

    var newData = new Array();
    var springFactor = new Number((data.length - 1) / (fitCount - 1));
    newData[0] = data[0];
    for (var i = 1; i < fitCount - 1; i++) {
        var tmp = i * springFactor;
        var before = new Number(Math.floor(tmp)).toFixed();
        var after = new Number(Math.ceil(tmp)).toFixed();
        var atPoint = tmp - before;
        newData[i] = linearInterpolate(data[before], data[after], atPoint);
    }
    newData[fitCount - 1] = data[data.length - 1];
    return newData;
};

async function getDataPoints() {
    var Data_arr = [10, 11, 12, 13, 18, 19, 20, 21, 27, 28, 29, 30, 35, 36, 37, 38, 44, 45, 46, 52, 53, 54, 60]
    var coords = [
        [31.383926, 74.170768],
        [31.383926, 74.229608],
        [31.383926, 74.288449],
        [31.383926, 74.347289],
        [31.423989, 74.170768],
        [31.423989, 74.229608],
        [31.423989, 74.288449],
        [31.423989, 74.347289],
        [31.464052, 74.229608],
        [31.464052, 74.288449],
        [31.464052, 74.347289],
        [31.464052, 74.406129],
        [31.504114, 74.229608],
        [31.504114, 74.288449],
        [31.504114, 74.347289],
        [31.504114, 74.406129],
        [31.544177, 74.288449],
        [31.544177, 74.347289],
        [31.544177, 74.406129],
        [31.584239, 74.288449],
        [31.584239, 74.347289],
        [31.584239, 74.406129],
        [31.624302, 74.288449],
    ];
    const response = await fetch('no2_data.csv');
    const data = await response.text();

    // var sdate = document.getElementById("start-date-input").valueAsDate;
    // // console.log(sdate);
    // var edate = document.getElementById("end-date-input").valueAsDate;
    // // console.log(edate);
    var plotdata = [];
    var repeater = 20;
    const rows = data.split('\n').slice(1);
    // rows.forEach(row => {
    // const cols = row.split(',');
    const cols = rows[10].split(',');
    // years.push(cols[0]);
    var dt = Date.parse(cols[0]);
    // console.log(dt);
    // if (dt == (Date.parse(sdate))) {
    // date.push(cols[0]);
    var temp = cols.slice(1);
    for (var i = 0; i < Data_arr.length - 1; i++) {
        x_lan = interpolateArray([coords[i][0], coords[i + 1][0]], repeater);
        y_lan = interpolateArray([coords[i][1], coords[i + 1][1]], repeater);
        val = interpolateArray([parseFloat(cols[Data_arr[i]]), parseFloat(cols[Data_arr[i + 1]])], repeater);
        for (var j = 1; j < repeater; j++) {
            obj = { lat: x_lan[j], lng: y_lan[j], count: val[j] };
            plotdata.push(obj);
        }
        // console.log(y_lan);
    }
    // for (var i = 0; i < Data_arr.length - 1; i++) {
    //     x_lan = interpolateArray([coords[i][0], coords[i + 1][0]], repeater);
    //     y_lan = interpolateArray([coords[i][1], coords[i + 1][1]], repeater);
    //     val = interpolateArray([parseFloat(cols[Data_arr[i]]), parseFloat(cols[Data_arr[i + 1]])], repeater);
    //     for (var j = 1; j < repeater; j++) {
    //         obj = { lat: x_lan[j], lng: y_lan[j], count: val[j] };
    //         plotdata.push(obj);
    //     }
    //     // console.log(y_lan);
    // }
    // console.log(plotdata);
    // }
    return plotdata;


    // });
}