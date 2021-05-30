// window.addEventListener('load', loader);

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
    window.location.href = window.location.protocol + '//' + window.location.hostname + ':5500' + window.location.pathname + "?t=" + dt_setter + "&n=" + selector_val;
}


function norm(number, n) {
    var max = Math.max(...number);
    var min = Math.min(...number);
    var min = min * n;
    // console.log(max);
    var result = [];
    for (var i = 0; i < number.length; i++) {
        result.push(((number[i] - min) / (max - min)).toFixed(2));
    }

    return result;
}

async function pinMarker() {
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
    const response = await fetch('aqi_data_cnn.csv');
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
    var repeater = 50;
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
            // console.log(filename);
            // console.log(dt);
            // date.push(cols[0]);
            var temp = cols.slice(1);
            for (var i = 0; i < Data_arr.length; i++) {
                var tyx = parseFloat(temp[Data_arr[i]]);
                loc_val.push((tyx).toFixed(0));
            }
        }
    });

    return { loc_val, coords_rev, locationNames, Data_arr };


}

async function getDataPoints() {
    // document.getElementById('map').innerHTML = "";
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

    // var Data_arr = [10, 11, 12, 13, 18, 19, 20, 21, 27, 28, 29, 30, 35, 36, 37, 38, 44, 45, 46, 52, 53, 54, 60, 61, 62, 63];
    var Data_arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]

    // var coords = [
    //     [31.383926, 74.140768],
    //     [31.383926, 74.209608],
    //     [31.383926, 74.278449],
    //     [31.383926, 74.347289],

    //     [31.423989, 74.170768],
    //     [31.423989, 74.249608],
    //     [31.423989, 74.318449],
    //     [31.423989, 74.387289],

    //     [31.464052, 74.219608],
    //     [31.464052, 74.288449],
    //     [31.464052, 74.347289],
    //     [31.464052, 74.436129],

    //     [31.504114, 74.239608],
    //     [31.504114, 74.308449],
    //     [31.504114, 74.377289],
    //     [31.504114, 74.469129],

    //     [31.544177, 74.258449],
    //     [31.544177, 74.347289],
    //     [31.544177, 74.426129],

    //     [31.584239, 74.288449],
    //     [31.584239, 74.347289],
    //     [31.584239, 74.436129],

    //     [31.624302, 74.288449],
    //     [31.624302, 74.347289],
    //     [31.624302, 74.386129],
    //     [31.624302, 74.46497]
    // ];

    var coords = [
        [31.343864, 74.053087],
        [31.343864, 74.111927],
        [31.343864, 74.170768],
        [31.343864, 74.229608],
        [31.343864, 74.288449],
        [31.343864, 74.347289],
        [31.343864, 74.406129],
        [31.343864, 74.46497],

        [31.383926, 74.053087],
        [31.383926, 74.111927],
        [31.383926, 74.170768],
        [31.383926, 74.229608],
        [31.383926, 74.288449],
        [31.383926, 74.347289],
        [31.383926, 74.406129],
        [31.383926, 74.46497],

        [31.423989, 74.053087],
        [31.423989, 74.111927],
        [31.423989, 74.170768],
        [31.423989, 74.229608],
        [31.423989, 74.288449],
        [31.423989, 74.347289],
        [31.423989, 74.406129],
        [31.423989, 74.46497],

        [31.464052, 74.053087],
        [31.464052, 74.111927],
        [31.464052, 74.170768],
        [31.464052, 74.229608],
        [31.464052, 74.288449],
        [31.464052, 74.347289],
        [31.464052, 74.406129],
        [31.464052, 74.46497],

        [31.504114, 74.053087],
        [31.504114, 74.111927],
        [31.504114, 74.170768],
        [31.504114, 74.229608],
        [31.504114, 74.288449],
        [31.504114, 74.347289],
        [31.504114, 74.406129],
        [31.504114, 74.46497],

        [31.544177, 74.053087],
        [31.544177, 74.111927],
        [31.544177, 74.170768],
        [31.544177, 74.229608],
        [31.544177, 74.288449],
        [31.544177, 74.347289],
        [31.544177, 74.406129],
        [31.544177, 74.46497],

        [31.584239, 74.053087],
        [31.584239, 74.111927],
        [31.584239, 74.170768],
        [31.584239, 74.229608],
        [31.584239, 74.288449],
        [31.584239, 74.347289],
        [31.584239, 74.406129],
        [31.584239, 74.46497],

        [31.624302, 74.053087],
        [31.624302, 74.111927],
        [31.624302, 74.170768],
        [31.624302, 74.229608],
        [31.624302, 74.288449],
        [31.624302, 74.347289],
        [31.624302, 74.406129],
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
    var reducer = [7, 7, 7, 7, 7, 7, 7, 6];
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
            document.getElementById('side_info').innerHTML = "Nitrogen Dioxide (ppb)";
            title = 'Nitrogen Dioxide';
        } else if (n.substring(0, 1) == 's') {
            filename = 'so2_data_cnn.csv';
            optn.selectedIndex = 1;
            document.getElementById('labeler').innerHTML = "Sulphur Dioxide" + sentence;
            document.getElementById('side_info').innerHTML = "Sulphur Dioxide (ppb)";
            title = 'Sulphur Dioxide';
        } else if (n.substring(0, 1) == 'c') {
            filename = 'co2_data_cnn.csv';
            optn.selectedIndex = 2;
            document.getElementById('labeler').innerHTML = "Carbon Monoxide" + sentence;
            document.getElementById('side_info').innerHTML = "Carbon Monoxide (ppm)";
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
            document.getElementById('side_info').innerHTML = "Nitrogen Dioxide (ppb)";
            title = 'Nitrogen Dioxide';
        }
    } else {
        filename = 'no2_data_cnn.csv'
        document.getElementById('labeler').innerHTML = "Nitrogen Dioxide" + sentence;
        document.getElementById('side_info').innerHTML = "Nitrogen Dioxide (ppb)";
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
    var repeater = 50;
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
            // console.log(filename);
            // console.log(dt);
            // date.push(cols[0]);
            var temp2 = cols.slice(1);
            max_val = Math.max(...temp2);
            min_val = Math.min(...temp2);
            if (filename != 'so2_data_cnn.csv') {

                var temp = norm(temp2, 1);
            } else {
                var temp = norm(temp2, 0.8);

            }
            // console.log(Data_arr.length)
            for (var i = 0; i < Data_arr.length - 1; i++) {
                loc_val.push(temp2[Data_arr[i + 1]]);
                var x_lan = interpolateArray([coords[i][0], coords[i + 1][0]], repeater);
                var y_lan = interpolateArray([coords[i][1], coords[i + 1][1]], repeater);
                var val = interpolateArray([parseFloat(temp[Data_arr[i]]), parseFloat(temp[Data_arr[i + 1]])], repeater);
                for (var j = 1; j < repeater; j++) {
                    if (x_lan[0] == x_lan[1]) {

                        var obj = [x_lan[j], y_lan[j], val[j]];

                        plotdata.push(obj);
                        // if (val[j] >= max_val && filename != 'co2_data_cnn.csv') {
                        //     max_val = val[j] * 2;
                        // }
                        // if (val[j] >= max_val && filename == 'co2_data_cnn.csv') {
                        //     max_val = val[j];
                        // }
                        // if (val[j] <= min_val) {
                        //     min_val = val[j];
                        // }
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


            var rep = ((plotdata.length) / 8);
            console.log(plotdata.length)
            console.log(Data_arr.length)
            for (var i = 0; i < 7; i++) {
                for (var j = 0; j < rep; j++) {

                    var x_lan = interpolateArray([plotdata[(i * rep) + j][0], plotdata[((i + 1) * rep) + j][0]], repeater);
                    var y_lan = interpolateArray([plotdata[(i * rep) + j][1], plotdata[((i + 1) * rep) + j][1]], repeater);
                    var val = interpolateArray([plotdata[(i * rep) + j][2], plotdata[((i + 1) * rep) + j][2]], repeater);

                    // console.log(y_lan[1]);
                    // console.log(y_lan[0]);
                    for (var k = 1; k < repeater - 1; k++) {
                        if (y_lan[0] == y_lan[1]) {

                            var obj = [x_lan[k], y_lan[k], val[k]];

                            plotdata.push(obj);

                        }
                    }
                }
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
                        obj = [x_lan[k], y_lan[k], val[k]];
                        // plotdata.push(obj);
                        // if (val[j] >= max_val && filename != 'co2_data_cnn.csv') {
                        //     max_val = val[j] * 2;
                        // }
                        // if (val[j] >= max_val && filename == 'co2_data_cnn.csv') {
                        //     max_val = val[j];
                        // }

                        // if (val[j] <= min_val) {
                        //     min_val = val[j];
                        // }
                    }
                }
                // console.log(y_lan);
            }
            // return plotdata;
        }

    });

    console.log(plotdata)
    if (plotdata.length == 0) {
        alert("No Data is available on this date. Kindly select another date if you want.")
    }
    // if (filename == 'no2_data_cnn.csv') {
    //     if (max_val > 3 && max_val < 5.5) {

    //         max_val = max_val / 1.5;

    //     } else if (max_val >= 5.5) {
    //         max_val = max_val / 2;
    //     } else {
    //         max_val = max_val * 1.5;
    //     }
    //     min_val = min_val / 2;
    // }
    // if (filename == 'aqi_data_cnn.csv') {
    //     max_val = 500;
    //     min_val = 0;

    // }

    // if (min_val < 0) {
    //     min_val = min_val * -1;
    // }
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
        document.getElementById('upper').innerHTML = max_val.toFixed(2) + ' -';
        document.getElementById('lower').innerHTML = min_val.toFixed(2) + ' -';
        document.getElementById('mid').innerHTML = avg_val.toFixed(2) + ' -';
        document.getElementById('upper_mid').innerHTML = ((avg_val + max_val) / 2).toFixed(2) + ' -';
        document.getElementById('lower_mid').innerHTML = ((avg_val + min_val) / 2).toFixed(2) + ' -';

    } else if (filename == 'aqi_data_cnn.csv') {
        document.getElementById('upper').innerHTML = max_val.toFixed(0) + '  	—';
        document.getElementById('lower').innerHTML = min_val.toFixed(0) + '  —';
        document.getElementById('mid').innerHTML = avg_val.toFixed(0) + '  —';
        document.getElementById('upper_mid').innerHTML = ((avg_val + max_val) / 2).toFixed(0) + '  ―';
        document.getElementById('lower_mid').innerHTML = ((avg_val + min_val) / 2).toFixed(0) + '  ―';
        document.getElementById('lower').style.paddingLeft = '20px';
        document.getElementById('lower_mid').style.paddingLeft = '56px';
        document.getElementById('mid').style.paddingLeft = '9px';
        document.getElementById('upper_mid').style.paddingLeft = '14px';

    }
    if (filename == 'aqi_data_cnn.csv') {
        document.getElementById('grad1').style.display = "none";
        plotdata = []
    }
    return plotdata;

};