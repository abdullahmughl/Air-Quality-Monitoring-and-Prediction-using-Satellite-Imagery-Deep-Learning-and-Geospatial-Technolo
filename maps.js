window.addEventListener('load', loader);

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

function reloader() {
    var date_val = document.getElementById('start-date-input');
    var dt_setter = date_val.valueAsDate.toISOString().substring(0, 10);
    var selector_val = "";
    var opt = document.getElementById('pollutants');
    var selected_option = opt.options[opt.selectedIndex].value;
    if (selected_option == 'no2') {
        selector_val = 'no2';
    } else if (selected_option == 'so2') {
        selector_val = 'so2';

    } else if (selected_option == 'co2') {
        selector_val = 'co2';

    } else if (selected_option == 'aqi') {
        selector_val = 'aqi';

    } else {
        selector_val = 'no2';

    }
    window.location.href = window.location.protocol + '//' + window.location.hostname + window.location.pathname + "?t=" + dt_setter + "&n=" + selector_val;
}

async function loader() {
    document.getElementById('map').innerHTML = "";
    var url_string = window.location.href;
    var url = new URL(url_string);
    var t = url.searchParams.get("t");
    var n = url.searchParams.get("n");
    var filename = "";
    if (t) {
        document.getElementById('start-date-input').value = t;
    } else {
        var date = new Date();
        var currentDate = date.toISOString().substring(0, 10);
        document.getElementById('start-date-input').value = currentDate;

    }

    const locationNames = ['Ravi River',
        'Shamkay Bhattian', //1
        'Bahria Town School and College', //2
        'Kot Arain', //3
        'Jhedu Minor', //4
        'Jinnah Sector LDA City', //5
        'Institute of Southern Lahore', //6
        'Badhwar', //7
        'Ravi River', //8
        'Khudpur', //9
        'Bahria Town Marquee', //10
        'Barkat Ali Market, Riwind Rd', //11
        'Bakra Mandi, Defence Road', //12
        'Lahore Ring Road, Kahna Interchange', //13
        'Ahlu Rd', //14
        'Mallian Road', //15
        'Sultan Pur', //16
        'Thathan Naulan', //17
        'Model Baraz, Chung', //18
        'Bilal Town, LDA Avenue', //19
        'Wapda Town, Phase 1', //20
        'Pak-Arab Housing Scheme', //21
        'Deo Kalan', //22
        'Thethar Rd', //23
        'Nizampura', //24
        'Sharaqpur', //25
        'Ravi River, Katar Band South', //26
        'General Bus Stand, Thoker Niaz Baig', //27
        'Johar Town Park', //28
        'Pak Electron Limited (PEL), Walton Road', //29
        'Khyaban-e-Jinnah Rd, Sector-G', //30
        'Jamia Masjid, Defence Raya Golf Resort', //31
        'Qillah Sharief', //32
        'Canal Upper Chenab', //33
        'Forest Reserve 2, Shadhanwali', //34
        'Shahdiwal', //35
        'Qasim Ali Shah Foundation, Wahdat Road', //36
        'Gulberg III, Block C3', //37
        'Allama Iqbal International Airport', //38
        'Lahore School of Economics, Shabbir Sharif Rd', //39
        'Chak 22', //40
        'West Minister Farmhouse', //41
        'Katal, Lahore-Jaranwala Rd', //42
        'Burj, Near Ravi River', //43
        'Samanabad Town', //44
        'Punjab Board of Investment & Trade PBIT', //45
        'Al-Faisal Town', //46
        'Paragon City', //47
        'Chak 10', //48
        'Budho Sharif', //49
        'Burj Attari Stadium', //50
        'Lahore Multan Motorway Interchange', //51
        'Bund Road, Khokhar Town', //52
        'Shaheen Park, Shad Bagh', //53
        'Shalimar Housing Scheme, Sue Wala Road', //54
        'Lahore Medical and Dental College', //55
        'Dhamoke, Sheikhupura Rd', //56
        'Pind Road, Sheikhpura', //57
        'Kala Shah Kaku', //58
        'Kot Abdul Malik', //59
        'Shahdara', //60
        'Jhuggian Jodha', //61
        'Sialkot Lahore Motorway', //62
        'Natt Kalan' //63
    ];

    var Data_arr = [10, 11, 12, 13, 18, 19, 20, 21, 27, 28, 29, 30, 35, 36, 37, 38, 44, 45, 46, 52, 53, 54, 60, 61, 62, 63];
    var coords = [
        [31.383926, 74.140768],
        [31.383926, 74.209608],
        [31.383926, 74.278449],
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

    var coords_rev = [
        [31.383926, 74.180768],
        [31.3837432, 74.2279442],
        [31.3883118, 74.2854916],
        [31.3841862, 74.3488868],

        [31.4246071, 74.1754847],
        [31.4181143, 74.2152072],
        [31.4306365, 74.2574001],
        [31.4321997, 74.3541074],

        [31.464128, 74.2242393],
        [31.4627761, 74.2809841],
        [31.4676726, 74.3460817],
        [31.4474994, 74.2688555],

        [31.5112977, 74.2464315],
        [31.5042162, 74.2856727],
        [31.5063815, 74.3429861],
        [31.5205458, 74.4083237],

        [31.5358909, 74.2893083],
        [31.5433319, 74.3433717],
        [31.5474766, 74.4017579],

        [31.5474536, 74.2656093],
        [31.5909408, 74.3376165],
        [31.5830369, 74.4066614],

        [31.6036362, 74.3102966],
        [31.624302, 74.347289],
        [31.624302, 74.386129],
        [31.624302, 74.46497]
    ];
    // var counter = [3, 3, 3, 3, 2, 2, 1];
    var reducer = [3, 3, 3, 3, 2, 2, 2];
    var indexer = 0;
    var min_val = 20;
    var max_val = 0;
    var title = '';
    var optn = document.getElementById('pollutants');
    // var selected_option = optn.options[optn.selectedIndex].value;
    var sentence = ' Classification Heat map over Lahore';
    if (n) {
        if (n.substring(0, 1) == 'n') {
            filename = 'no2_data_cnn.csv';
            optn.selectedIndex = 0;
            document.getElementById('labeler').innerHTML = "Nitrogen Dioxide" + sentence;
            document.getElementById('side_info').innerHTML = "Nitrogen Dioxide (milli-g/m²)";
            title = 'Nitrogen Dioxide';
        } else if (n.substring(0, 1) == 's') {
            filename = 'so2_data_cnn.csv';
            optn.selectedIndex = 1;
            document.getElementById('labeler').innerHTML = "Sulphur Dioxide" + sentence;
            document.getElementById('side_info').innerHTML = "Sulphur Dioxide (milli-g/m²)";
            title = 'Sulphur Dioxide';
        } else if (n.substring(0, 1) == 'c') {
            filename = 'co2_data_cnn.csv';
            optn.selectedIndex = 2;
            document.getElementById('labeler').innerHTML = "Carbon Monoxide" + sentence;
            document.getElementById('side_info').innerHTML = "Carbon Monoxide (milli-g/m²)";
            title = 'Carbon Monoxide';
        } else if (n.substring(0, 1) == 'a') {
            filename = 'aqi_data_cnn.csv';
            optn.selectedIndex = 3;
            document.getElementById('labeler').innerHTML = "Air Quality Index" + sentence;
            document.getElementById('side_info').innerHTML = "Air Quality Index";
            title = 'Air Quality Index';
        } else {
            filename = 'no2_data_cnn.csv';
            optn.selectedIndex = 0;
            document.getElementById('labeler').innerHTML = "Nitrogen Dioxide" + sentence;
            document.getElementById('side_info').innerHTML = "Nitrogen Dioxide (milli-g/m²)";
            title = 'Nitrogen Dioxide';
        }
    } else {
        filename = 'no2_data_cnn.csv'
        document.getElementById('labeler').innerHTML = "Nitrogen Dioxide" + sentence;
        document.getElementById('side_info').innerHTML = "Nitrogen Dioxide (milli-g/m²)";
        title = 'Nitrogen Dioxide';
    }

    // var title = '';
    // if (selected_option == 'no2') {
    //     title = 'Nitrogen Dioxide';
    // } else if (selected_option == 'so2') {
    //     title = 'Sulphur Dioxide';
    // } else {
    //     title = 'Carbon DIoxide';
    // }
    const response = await fetch(filename);
    const data = await response.text();

    // var sdate = document.getElementById("start-date-input").valueAsDate;
    // // console.log(sdate);
    // var edate = document.getElementById("end-date-input").valueAsDate;
    // // console.log(edate);
    // var plotdata = [];
    var prev = [];
    var nxt = [];
    var incrementer = [];
    var length_res = [];
    var repeater = 130;
    var plotdata = [];
    var loc_val = [];
    var sdate = document.getElementById("start-date-input").valueAsDate;
    // console.log(Date.parse(sdate));
    const rows = data.split('\n').slice(1);
    rows.forEach(row => {
        // const cols = row.split(',');
        const cols = row.split(',');
        // years.push(cols[0]);
        var dt = Date.parse(cols[0]);
        if (dt <= (Date.parse(sdate)) && dt >= ((Date.parse(sdate)) - 86800000)) {
            // console.log(dt);
            // date.push(cols[0]);
            var temp = cols.slice(1);
            // console.log(Data_arr.length)
            for (var i = 0; i < Data_arr.length - 1; i++) {
                loc_val.push(temp[Data_arr[i + 1]]);
                var x_lan = interpolateArray([coords[i][0], coords[i + 1][0]], repeater);
                var y_lan = interpolateArray([coords[i][1], coords[i + 1][1]], repeater);
                var val = interpolateArray([parseFloat(temp[Data_arr[i]]), parseFloat(temp[Data_arr[i + 1]])], repeater);
                for (var j = 1; j < repeater; j++) {
                    if (x_lan[0] == x_lan[1] && i != (Data_arr.length - 2)) {

                        var obj = { lat: x_lan[j], lng: y_lan[j], count: val[j] * 20 };

                        plotdata.push(obj);
                        if (val[j] >= max_val && filename != 'co2_data_cnn.csv') {
                            max_val = val[j] * 2;
                        }
                        if (val[j] >= max_val && filename == 'co2_data_cnn.csv') {
                            max_val = val[j];
                        }
                        if (val[j] <= min_val) {
                            min_val = val[j];
                        }
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
            // console.log(incrementer[0][1].length);
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
                        if (val[j] >= max_val && filename != 'co2_data_cnn.csv') {
                            max_val = val[j] * 2;
                        }
                        if (val[j] >= max_val && filename == 'co2_data_cnn.csv') {
                            max_val = val[j];
                        }

                        if (val[j] <= min_val) {
                            min_val = val[j];
                        }
                    }
                }
                // console.log(y_lan);
            }
            // return plotdata;
        }

    });

    if (plotdata.length == 0) {
        alert("No Data is available on this date. Kindly select another date if you want.")
    }
    if (filename == 'no2_data_cnn.csv') {
        if (max_val > 3 && max_val < 5.5) {

            max_val = max_val / 1.5;

        } else if (max_val >= 5.5) {
            max_val = max_val / 2;
        } else {
            max_val = max_val * 1.5;
        }
        min_val = min_val / 2;
    }
    if (filename == 'aqi_data_cnn.csv') {
        max_val = max_val / 1.85;
        min_val = 0;

    }

    if (min_val < 0) {
        min_val = min_val * -1;
    }
    var avg_val = (min_val + max_val) / 2;
    if (filename == 'no2_data_cnn.csv') {

        document.getElementById('upper').innerHTML = max_val.toFixed(3) + '  -';
        document.getElementById('lower').innerHTML = min_val.toFixed(3) + '  -';
        document.getElementById('mid').innerHTML = avg_val.toFixed(3) + '  -';
        document.getElementById('upper_mid').innerHTML = ((avg_val + max_val) / 2).toFixed(3) + '  -';
        document.getElementById('lower_mid').innerHTML = ((avg_val + min_val) / 2).toFixed(3) + '  -';
    } else if (filename == 'so2_data_cnn.csv') {
        document.getElementById('upper').innerHTML = max_val.toFixed(2) + ' -';
        document.getElementById('lower').innerHTML = min_val.toFixed(3) + ' -';
        document.getElementById('mid').innerHTML = avg_val.toFixed(2) + ' -';
        document.getElementById('upper_mid').innerHTML = ((avg_val + max_val) / 2).toFixed(2) + ' -';
        document.getElementById('lower_mid').innerHTML = ((avg_val + min_val) / 2).toFixed(2) + ' -';

    } else if (filename == 'co2_data_cnn.csv') {
        document.getElementById('upper').innerHTML = max_val.toFixed(0) + ' -';
        document.getElementById('lower').innerHTML = min_val.toFixed(2) + ' -';
        document.getElementById('mid').innerHTML = avg_val.toFixed(1) + ' -';
        document.getElementById('upper_mid').innerHTML = ((avg_val + max_val) / 2).toFixed(1) + ' -';
        document.getElementById('lower_mid').innerHTML = ((avg_val + min_val) / 2).toFixed(1) + ' -';

    } else if (filename == 'aqi_data_cnn.csv') {
        document.getElementById('upper').innerHTML = max_val.toFixed(0) + '  	—';
        document.getElementById('lower').innerHTML = min_val + '  —';
        document.getElementById('mid').innerHTML = avg_val.toFixed(0) + '  —';
        document.getElementById('upper_mid').innerHTML = ((avg_val + max_val) / 2).toFixed(0) + '  ―';
        document.getElementById('lower_mid').innerHTML = ((avg_val + min_val) / 2).toFixed(0) + '  ―';
        document.getElementById('lower').style.paddingLeft = '20px';
        document.getElementById('lower_mid').style.paddingLeft = '56px';
        document.getElementById('mid').style.paddingLeft = '9px';
        document.getElementById('upper_mid').style.paddingLeft = '14px';

    }

    var testData = {
        // max: 10,
        // min: 0,
        // data: [{ lat: 24.6408, lng: 46.7728, count: 3 },
        //     { lat: 50.75, lng: -1.55, count: 1 },
        //     { lat: 52.6333, lng: 1.75, count: 1 },
        //     { lat: 48.15, lng: 9.4667, count: 1 },
        //     { lat: 52.35, lng: 4.9167, count: 2 },
        //     { lat: 60.8, lng: 11.1, count: 1 },
        //     { lat: 43.561, lng: -116.214, count: 1 },
        //     { lat: 47.5036, lng: -94.685, count: 1 },
        //     { lat: 42.1818, lng: -71.1962, count: 1 },
        //     { lat: 42.0477, lng: 74.1227, count: 1 },
        //     { lat: 40.0326, lng: -75.719, count: 1 },
        //     { lat: 40.7128, lng: -73.2962, count: 2 },
        //     { lat: 27.9003, lng: -82.3024, count: 1 },
        //     { lat: 38.2085, lng: -85.6918, count: 1 },
        //     { lat: 46.8159, lng: -100.706, count: 1 },
        //     { lat: 30.5449, lng: -90.8083, count: 1 },
        //     { lat: 44.735, lng: -89.61, count: 1 },
        //     { lat: 41.4201, lng: -75.6485, count: 2 },
        //     { lat: 39.4209, lng: 74.4977, count: 1 },
        //     { lat: 39.7437, lng: -104.979, count: 1 },
        //     { lat: 39.5593, lng: -105.006, count: 1 },
        //     { lat: 45.2673, lng: -93.0196, count: 1 },
        //     { lat: 41.1215, lng: -89.4635, count: 1 },
        //     { lat: 43.4314, lng: -83.9784, count: 1 },
        //     { lat: 43.7279, lng: -86.284, count: 1 },
        //     { lat: 40.7168, lng: -73.9861, count: 1 },
        //     { lat: 47.7294, lng: -116.757, count: 1 },
        //     { lat: 47.7294, lng: -116.757, count: 2 },
        //     { lat: 35.5498, lng: -118.917, count: 1 },
        //     { lat: 34.1568, lng: -118.523, count: 1 },
        //     { lat: 39.501, lng: -87.3919, count: 3 },
        //     { lat: 33.5586, lng: -112.095, count: 1 },
        //     { lat: 38.757, lng: -77.1487, count: 1 },
        //     { lat: 33.223, lng: -117.107, count: 1 },
        //     { lat: 30.2316, lng: -85.502, count: 1 },
        //     { lat: 39.1703, lng: -75.5456, count: 8 },
        //     { lat: 30.0041, lng: -95.2984, count: 2 },
        //     { lat: 29.7755, lng: -95.4152, count: 1 },
        //     { lat: 41.8014, lng: -87.6005, count: 1 },
        //     { lat: 37.8754, lng: -121.687, count: 7 },
        //     { lat: 38.4493, lng: -122.709, count: 1 },
        //     { lat: 40.5494, lng: -89.6252, count: 1 },
        //     { lat: 42.6105, lng: -71.2306, count: 1 },
        //     { lat: 40.0973, lng: -85.671, count: 1 },
        //     { lat: 40.3987, lng: -86.8642, count: 1 },
        //     { lat: 40.4224, lng: -86.8031, count: 4 },
        //     { lat: 47.2166, lng: -122.451, count: 1 },
        //     { lat: 32.2369, lng: -110.956, count: 1 },
        //     { lat: 41.3969, lng: -87.3274, count: 2 },
        //     { lat: 41.7364, lng: -89.7043, count: 2 },
        //     { lat: 42.3425, lng: -71.0677, count: 1 },
        //     { lat: 33.8042, lng: -83.8893, count: 1 },
        //     { lat: 36.6859, lng: -121.629, count: 2 },
        //     { lat: 41.0957, lng: -80.5052, count: 1 },
        //     { lat: 46.8841, lng: -123.995, count: 1 },
        //     { lat: 40.2851, lng: -75.9523, count: 2 },
        //     { lat: 42.4235, lng: -85.3992, count: 1 },
        //     { lat: 39.7437, lng: -104.979, count: 2 },
        //     { lat: 25.6586, lng: -80.3568, count: 7 },
        //     { lat: 33.0975, lng: -80.1753, count: 1 },
        //     { lat: 25.7615, lng: -80.2939, count: 1 },
        //     { lat: 26.3739, lng: -80.1468, count: 1 },
        //     { lat: 37.6454, lng: -84.8171, count: 1 },
        //     { lat: 34.2321, lng: -77.8835, count: 1 },
        //     { lat: 34.6774, lng: -82.928, count: 1 },
        //     { lat: 39.9744, lng: -86.0779, count: 1 },
        //     { lat: 35.6784, lng: -97.4944, count: 2 },
        //     { lat: 33.5547, lng: -84.1872, count: 1 },
        //     { lat: 27.2498, lng: -80.3797, count: 1 },
        //     { lat: 41.4789, lng: -81.6473, count: 1 },
        //     { lat: 41.813, lng: -87.7134, count: 1 },
        //     { lat: 41.8917, lng: -87.9359, count: 1 },
        //     { lat: 35.0911, lng: -89.651, count: 1 },
        //     { lat: 32.6102, lng: -117.03, count: 1 },
        //     { lat: 41.758, lng: -72.7444, count: 1 },
        //     { lat: 39.8062, lng: -86.1407, count: 1 },
        //     { lat: 41.872, lng: -88.1662, count: 1 },
        //     { lat: 34.1404, lng: -81.3369, count: 1 },
        //     { lat: 46.15, lng: -60.1667, count: 1 },
        //     { lat: 36.0679, lng: -86.7194, count: 1 },
        //     { lat: 43.45, lng: -80.5, count: 1 },
        //     { lat: 44.3833, lng: -79.7, count: 1 },
        //     { lat: 45.4167, lng: -75.7, count: 2 },
        //     { lat: 43.75, lng: -79.2, count: 2 },
        //     { lat: 45.2667, lng: -66.0667, count: 3 },
        //     { lat: 42.9833, lng: -81.25, count: 2 },
        //     { lat: 44.25, lng: -79.4667, count: 3 },
        //     { lat: 45.2667, lng: -66.0667, count: 2 },
        //     { lat: 34.3667, lng: -118.478, count: 3 },
        //     { lat: 42.734, lng: -87.8211, count: 1 },
        //     { lat: 39.9738, lng: -86.1765, count: 1 },
        //     { lat: 33.7438, lng: -117.866, count: 1 },
        //     { lat: 37.5741, lng: -122.321, count: 1 },
        //     { lat: 42.2843, lng: -85.2293, count: 1 },
        //     { lat: 34.6574, lng: -92.5295, count: 1 },
        //     { lat: 41.4881, lng: -87.4424, count: 1 },
        //     { lat: 25.72, lng: -80.2707, count: 1 },
        //     { lat: 34.5873, lng: -118.245, count: 1 },
        //     { lat: 35.8278, lng: -78.6421, count: 1 }
        // ],
        data: plotdata,

        // data: [{
        //         lat: 31.383926,
        //         lng: 74.170768,
        //         count: 0.2
        //     },
        //     {
        //         lat: 31.383926,
        //         lng: 74.229608,
        //         count: 0.1
        //     },
        //     {
        //         lat: 31.383926,
        //         lng: 74.288449,
        //         count: 0.6
        //     },
        //     {
        //         lat: 31.383926,
        //         lng: 74.347289,
        //         count: 0.8
        //     },
        //     {
        //         lat: 31.423989,
        //         lng: 74.170768,
        //         count: 0.2
        //     },
        //     {
        //         lat: 31.423989,
        //         lng: 74.229608,
        //         count: 1
        //     },
        //     {
        //         lat: 31.423989,
        //         lng: 74.288449,
        //         count: 1
        //     },
        //     {
        //         lat: 31.423989,
        //         lng: 74.347289,
        //         count: 0.8
        //     },
        //     {
        //         lat: 31.464052,
        //         lng: 74.229608,
        //         count: 1
        //     },
        //     {
        //         lat: 31.464052,
        //         lng: 74.288449,
        //         count: 0.3
        //     },
        //     {
        //         lat: 31.464052,
        //         lng: 74.347289,
        //         count: 0.6
        //     },
        //     {
        //         lat: 31.464052,
        //         lng: 74.406129,
        //         count: 0.1
        //     },
        //     {
        //         lat: 31.504114,
        //         lng: 74.229608,
        //         count: 1
        //     },
        //     {
        //         lat: 31.504114,
        //         lng: 74.288449,
        //         count: 0.3
        //     },
        //     {
        //         lat: 31.504114,
        //         lng: 74.347289,
        //         count: 0.5
        //     },
        //     {
        //         lat: 31.504114,
        //         lng: 74.406129,
        //         count: 0.60
        //     },
        //     {
        //         lat: 31.544177,
        //         lng: 74.288449,
        //         count: 0.5
        //     },
        //     {
        //         lat: 31.544177,
        //         lng: 74.347289,
        //         count: 0.9
        //     },
        //     {
        //         lat: 31.544177,
        //         lng: 74.406129,
        //         count: 0.1
        //     },
        //     {
        //         lat: 31.584239,
        //         lng: 74.288449,
        //         count: 0.1
        //     },
        //     {
        //         lat: 31.584239,
        //         lng: 74.347289,
        //         count: 0.7
        //     },
        //     {
        //         lat: 31.584239,
        //         lng: 74.406129,
        //         count: 0.5
        //     },
        //     {
        //         lat: 31.624302,
        //         lng: 74.288449,
        //         count: 0.7
        //     },

        // ]
    };



    var cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        "radius": 0.5,
        "maxOpacity": 10,
        // scales the radius based on map zoom
        "scaleRadius": false,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'count'
    };
    var zmm = 12;
    var map = new L.Map('map', {
        center: new L.LatLng(31.5004, 74.3087),
        zoom: zmm,
        minZoom: zmm,
        maxZoom: zmm
    });

    for (var x = 0; x < loc_val.length; x++) {
        var marker = L.marker(coords[x]).addTo(map);
        marker.bindPopup("<b>" + locationNames[Data_arr[x]] + "</b><br>" + title + ": " + loc_val[x]);
    }

    var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    var heatmapLayer = new HeatmapOverlay(cfg).addTo(map);


    heatmapLayer.setData(testData);



};