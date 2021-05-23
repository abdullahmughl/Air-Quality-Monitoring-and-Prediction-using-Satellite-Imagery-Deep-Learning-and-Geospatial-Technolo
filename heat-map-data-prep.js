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
    var Data_arr = [10, 11, 12, 13, 18, 19, 20, 21, 27, 28, 29, 30, 35, 36, 37, 38, 44, 45, 46, 52, 53, 54, 60, 61, 62, 63];
    var coords = [
        [31.383926, 74.140768],
        [31.383926, 74.229608],
        [31.383926, 74.288449],
        [31.383926, 74.347289],

        [31.423989, 74.170768],
        [31.423989, 74.249608],
        [31.423989, 74.318449],
        [31.423989, 74.387289],

        [31.464052, 74.219608],
        [31.464052, 74.288449],
        [31.464052, 74.347289],
        [31.464052, 74.436129],

        [31.504114, 74.239608],
        [31.504114, 74.308449],
        [31.504114, 74.377289],
        [31.504114, 74.469129],

        [31.544177, 74.258449],
        [31.544177, 74.347289],
        [31.544177, 74.426129],

        [31.584239, 74.288449],
        [31.584239, 74.347289],
        [31.584239, 74.436129],

        [31.624302, 74.288449],
        [31.624302, 74.347289],
        [31.624302, 74.386129],
        [31.624302, 74.46497]
    ];
    // var counter = [3, 3, 3, 3, 2, 2, 1];
    var reducer = [3, 3, 3, 3, 2, 2, 2];
    var indexer = 0;
    const response = await fetch('no2_data.csv');
    const data = await response.text();

    // var sdate = document.getElementById("start-date-input").valueAsDate;
    // // console.log(sdate);
    // var edate = document.getElementById("end-date-input").valueAsDate;
    // // console.log(edate);
    var plotdata = [];
    var prev = [];
    var nxt = [];
    var incrementer = [];
    var length_res = [];
    var repeater = 130;
    const rows = data.split('\n').slice(1);
    // rows.forEach(row => {
    // const cols = row.split(',');
    const cols = rows[100].split(',');
    // years.push(cols[0]);
    var dt = Date.parse(cols[0]);
    // console.log(dt);
    // if (dt == (Date.parse(sdate))) {
    // date.push(cols[0]);
    var temp = cols.slice(1);
    // console.log(Data_arr.length)
    for (var i = 0; i < Data_arr.length - 1; i++) {
        var x_lan = interpolateArray([coords[i][0], coords[i + 1][0]], repeater);
        var y_lan = interpolateArray([coords[i][1], coords[i + 1][1]], repeater);
        var val = interpolateArray([parseFloat(temp[Data_arr[i]]), parseFloat(temp[Data_arr[i + 1]])], repeater);
        for (var j = 1; j < repeater; j++) {
            if (x_lan[0] == x_lan[1] && i != (Data_arr.length - 2)) {

                var obj = { lat: x_lan[j], lng: y_lan[j], count: val[j] * 20 };
                plotdata.push(obj);
            }
        }
        // if (x_lan[0] == x_lan[1]) {
        //     prev = nxt;

        reducer[indexer] = reducer[indexer] - 1;
        if (reducer[indexer] != -1) {
            // nxt = [];
            for (var j = 1; j < repeater; j++) {
                nxt.push([x_lan[j], y_lan[j], val[j]]);
                // console.log(1);

            }
            // if (prev.length != 0) {
            //     for (var j = 0; j < repeater - 1; j++) {
            //         var x_tmp = interpolateArray([prev[j][0], nxt[j][0]], repeater);
            //         var y_tmp = interpolateArray([prev[j][1], nxt[j][1]], repeater);
            //         var v_tmp = interpolateArray([prev[j][2], nxt[j][2]], repeater);
            //         for (var k = 1; k < repeater; k++) {
            //             var objx = { lat: x_tmp[k], lng: y_tmp[k], count: v_tmp[k] * 20 };
            //             plotdata.push(objx);

            //         }

            //     }

            // }
        } else {
            prev = nxt;
            indexer += 1;
            incrementer.push(prev);
            length_res.push(prev.length);
            nxt = [];
        }
        // }

        // console.log(nxt);
        // nxt = [];
        // console.log(y_lan);
    }
    console.log(incrementer);
    var ln = Math.max(...length_res);
    var temp_x = [];
    var temp_y = [];
    var temp_v = [];
    var finalarr = [];
    var temparr = [];
    for (var i = 0; i < incrementer.length; i++) {
        for (var j = 0; j < incrementer[i].length; j++) {
            temp_x.push(incrementer[i][j][0]);
            temp_y.push(incrementer[i][j][1]);
            temp_v.push(incrementer[i][j][2]);
        }
        var intemp_x = interpolateArray(temp_x, ln);
        var intemp_y = interpolateArray(temp_y, ln);
        var intemp_v = interpolateArray(temp_v, ln);
        for (var j = 0; j < ln; j++) {

            temparr.push([intemp_x[j], intemp_y[j], intemp_v[j]]);
        }
        finalarr.push(temparr);
        temparr = [];

        temp_x = [];
        temp_y = [];
        temp_v = [];
    }
    // console.log(finalarr);
    for (var i = 0; i < finalarr.length - 1; i++) {
        for (var j = 0; j < finalarr[i].length; j++) {
            x_lan = interpolateArray([finalarr[i][j][0], finalarr[i + 1][j][0]], repeater);
            y_lan = interpolateArray([finalarr[i][j][1], finalarr[i + 1][j][1]], repeater);
            val = interpolateArray([finalarr[i][j][2], finalarr[i + 1][j][2]], repeater);
            for (var k = 1; k < repeater - 1; k++) {
                obj = { lat: x_lan[k], lng: y_lan[k], count: val[k] * 20 };
                plotdata.push(obj);
            }
        }
        // console.log(y_lan);
    }
    // console.log(plotdata);
    // }
    return plotdata;


    // });
}