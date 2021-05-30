window.addEventListener('load', setup);

async function setup() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const ctx1 = document.getElementById('myChart1').getContext('2d');
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    var optn = document.getElementById('pollutants');
    var selected_option = optn.options[optn.selectedIndex].value;

    var filename = selected_option + '_data.csv';
    var title = '';
    if (selected_option == 'no2') {
        title = 'Nitrogen Dioxide';
    } else if (selected_option == 'so2') {
        title = 'Sulphur Dioxide';
    } else {
        title = 'Carbon Monoxide';
    }
    var opt = document.getElementById('locations');
    var selected_option2 = opt.options[opt.selectedIndex].value;
    // console.log(selected_option);
    // console.log(optn.selectedIndex);
    // title = selected_option + '\'s ' + title;
    const no2values = await getAllno2Date(filename, opt.selectedIndex);
    const no2values_pred = await getAllno2DatePred(selected_option, opt.selectedIndex);
    const no2weeklyvalues = await getAllno2WeeklyDate(filename);
    const no2monthsvalues = await getAllno2MonthlyDate(filename);
    // valueUpdate(globalValue);
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: no2values_pred.date,
            datasets: [{
                    label: title,
                    lineTension: 0,
                    data: no2values.no2,
                    fill: false,
                    pointRadius: 1.5,
                    borderColor: 'rgba(17, 16, 29, 1)',
                    backgroundColor: 'rgba(17, 16, 29, 0.5)',
                    borderWidth: 1
                },
                {
                    label: title + ' (Predicted)',
                    lineTension: 0,
                    data: no2values_pred.no2_pred,
                    fill: false,
                    pointRadius: 1.5,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            maintainAspectRatio: true,
            responsive: true,
            title: {
                display: true,
                text: selected_option2 + '\'s ' + title + ' Daily Data Comparison',
                position: 'top',
                fontSize: 30,
                fontColor: 'black'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Dates",
                        fontSize: 20,
                        fontColor: 'black'

                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: title + " (milli-g/m²)",
                        fontSize: 20,
                        fontColor: 'black'
                    }
                }]
            },
            events: ['click']

        }
    });


    const myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            // labels: so2values.date,
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [{
                    label: '2018',
                    data: no2monthsvalues.months_avg18,
                    fill: false,
                    pointRadius: 1.5,
                    borderColor: 'rgba(96, 25, 232, 1)',
                    backgroundColor: 'rgba(96, 25, 232, 0.5)',
                    borderWidth: 1
                },
                {
                    label: '2019',
                    data: no2monthsvalues.months_avg19,
                    fill: false,
                    pointRadius: 1.5,
                    borderColor: 'rgba(22, 172, 112, 1)',
                    backgroundColor: 'rgba(22, 172, 112, 0.5)',
                    borderWidth: 1
                },
                {
                    label: '2020',
                    data: no2monthsvalues.months_avg20,
                    fill: false,
                    pointRadius: 1.5,
                    borderColor: 'rgba(245, 170, 66, 1)',
                    backgroundColor: 'rgba(245, 170, 66, 0.5)',
                    borderWidth: 1
                },
                {
                    label: '2021',
                    data: no2monthsvalues.months_avg21,
                    fill: false,
                    pointRadius: 1.5,
                    borderColor: 'rgba(255, 99, 247, 1)',
                    backgroundColor: 'rgba(255, 99, 247, 0.5)',
                    borderWidth: 1
                }

            ]
        },
        options: {
            maintainAspectRatio: true,
            responsive: true,
            title: {
                display: true,
                text: title + ' Year Based Monthly Data Comparison',
                position: 'top',
                fontSize: 30,
                fontColor: 'black'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Months",
                        fontSize: 20,
                        fontColor: 'black'

                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: title + " (milli-g/m²)",
                        fontSize: 20,
                        fontColor: 'black'
                    }
                }]
            },
            events: ['click']

        }
    });


    const myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: no2weeklyvalues.week,
            datasets: [{
                    label: '2018',
                    data: no2weeklyvalues.no218,
                    fill: false,
                    pointRadius: 1,
                    borderColor: 'rgba(47, 79, 79, 1)',
                    backgroundColor: 'rgba(7, 19, 79, 0.8)',
                    borderWidth: 0
                },
                {
                    label: '2019',
                    data: no2weeklyvalues.no219,
                    fill: false,
                    pointRadius: 1,
                    borderColor: 'rgba(2, 142, 255, 1)',
                    backgroundColor: 'rgba(2, 142, 255, 0.5)',
                    borderWidth: 0
                },
                {
                    label: '2020',
                    data: no2weeklyvalues.no220,
                    fill: false,
                    pointRadius: 1,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    backgroundColor: 'rgba(255, 0, 0, 0.6)',
                    borderWidth: 0
                },
                {
                    label: '2021',
                    data: no2weeklyvalues.no221,
                    fill: false,
                    pointRadius: 1,
                    borderColor: 'rgba(255, 0, 255, 1)',
                    backgroundColor: 'rgba(255, 0, 255, 0.5)',
                    borderWidth: 0
                }
            ]
        },
        options: {
            maintainAspectRatio: true,
            responsive: true,
            title: {
                display: true,
                text: title + ' Weekly Data Comparison',
                position: 'top',
                fontSize: 30,
                fontColor: 'black'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Weeks",
                        fontSize: 20,
                        fontColor: 'black'

                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: title + " (milli-g/m²)",
                        fontSize: 20,
                        fontColor: 'black'
                    }
                }]
            },
            events: ['click']

        }
    });


    // const myChart3 = new Chart(ctx3, {
    //     type: 'line',
    //     data: {
    //         labels: globalValue.years,
    //         datasets: [{
    //                 label: 'CO2',
    //                 data: globalValue.co2,
    //                 fill: false,
    //                 pointRadius: 2.5,
    //                 borderColor: 'rgba(255, 0, 255, 1)',
    //                 backgroundColor: 'rgba(255, 0, 255, 0.5)',
    //                 borderWidth: 1
    //             },
    //             {
    //                 label: 'CO2 (Predicted)',
    //                 data: globalValue.co2_pre1,
    //                 fill: false,
    //                 pointRadius: 2.5,
    //                 borderColor: 'rgba(255, 0, 0, 1)',
    //                 backgroundColor: 'rgba(255, 0, 0, 0.5)',
    //                 borderWidth: 1
    //             }
    //         ]
    //     },
    //     options: {
    //         spanGaps: true,
    //     }
    // });
}

function avergae(values) {
    var total = 0;
    var numArray = values.map(i => Number(i));
    // values = parseFloat(values)
    for (var i = 0; i < numArray.length; i++) {
        total += numArray[i];
    }
    var avg = total / numArray.length;
    return avg;
}

async function getAllno2Date(filename, ind) {
    const response = await fetch(filename);
    const data = await response.text();
    const no2 = [];
    var count = 0
    var sdate = document.getElementById("start-date-input").valueAsDate;
    // console.log(sdate);
    var edate = document.getElementById("end-date-input").valueAsDate;
    // console.log(edate);
    const lhr_arr = [10, 11, 12, 13, 18, 19, 20, 21, 27, 28, 29, 30, 35, 36, 37, 38, 44, 45, 46, 52, 53, 54, 60];
    const rows = data.split('\n').slice(1);
    rows.forEach(row => {
        count = count + 1;
        const cols = row.split(',');
        // years.push(cols[0]);
        var dt = Date.parse(cols[0]);
        // console.log(dt);
        if (dt >= (Date.parse(sdate)) && dt <= (Date.parse(edate))) {
            // date.push(cols[0]);
            var tmep = cols.slice(1);
            if (ind == 0) {
                no2.push(avergae(tmep));
            } else {
                no2.push(tmep[lhr_arr[ind - 1]]);
            }
        }

    });
    no2.reverse();

    return { no2 };
}

async function getAllno2DatePred(filename, ind) {
    filename = filename + '_data_cnn.csv';
    const response = await fetch(filename);
    const data = await response.text();
    const date = [];
    const no2_pred = [];
    var count = 0;
    var sdate = document.getElementById("start-date-input").valueAsDate;
    // console.log(sdate);
    var edate = document.getElementById("end-date-input").valueAsDate;
    // console.log(edate);
    const lhr_arr = [10, 11, 12, 13, 18, 19, 20, 21, 27, 28, 29, 30, 35, 36, 37, 38, 44, 45, 46, 52, 53, 54, 60];
    const rows = data.split('\n').slice(1);
    // console.log(ind - 1);
    rows.forEach(row => {
        // count = count + 1;
        const cols = row.split(',');
        // years.push(cols[0]);
        var dt = Date.parse(cols[0]);
        // console.log(dt);
        if (dt >= (Date.parse(sdate)) && dt <= ((Date.parse(edate)) + (1000 * 60 * 60 * 24 * 30))) {
            // if (count < 2) {
            date.push(cols[0]);
            // } else {
            // date.push(' ');
            // }
            var tmep = cols.slice(1);
            if (ind == 0) {
                no2_pred.push(avergae(tmep));
            } else {
                no2_pred.push(tmep[lhr_arr[ind - 1]]);
            }
        }
        // if (count >= 2) {
        //     count = 0;
        // }

    });

    no2_pred.reverse();
    date.reverse();

    return { date, no2_pred };
}

async function getAllno2MonthlyDate(filename) {
    const response = await fetch(filename);
    const data = await response.text();
    const months_count18 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const months_values18 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const months_avg18 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const months_count19 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const months_values19 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const months_avg19 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const months_count20 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const months_values20 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const months_avg20 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const months_count21 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const months_values21 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const months_avg21 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const rows = data.split('\n').slice(1);
    rows.forEach(row => {
        const cols = row.split(',');
        // years.push(cols[0]);
        var dat = new Date(cols[0]);

        // date.push(cols[0]);
        var tmep = cols.slice(1);
        // no2.push(avergae(tmep));
        if (dat.getFullYear() == 2018) {

            months_values18[dat.getMonth()] = months_values18[dat.getMonth()] + avergae(tmep);
            months_count18[dat.getMonth()] = months_count18[dat.getMonth()] + 1;
        } else if (dat.getFullYear() == 2019) {

            months_values19[dat.getMonth()] = months_values19[dat.getMonth()] + avergae(tmep);
            months_count19[dat.getMonth()] = months_count19[dat.getMonth()] + 1;
        } else if (dat.getFullYear() == 2020) {

            months_values20[dat.getMonth()] = months_values20[dat.getMonth()] + avergae(tmep);
            months_count20[dat.getMonth()] = months_count20[dat.getMonth()] + 1;
        } else {

            months_values21[dat.getMonth()] = months_values21[dat.getMonth()] + avergae(tmep);
            months_count21[dat.getMonth()] = months_count21[dat.getMonth()] + 1;
        }


    });

    for (var i = 0; i < 12; i++) {
        months_avg18[i] = months_values18[i] / months_count18[i];
        months_avg19[i] = months_values19[i] / months_count19[i];
        months_avg20[i] = months_values20[i] / months_count20[i];
        months_avg21[i] = months_values21[i] / months_count21[i];
    }

    return { months_avg18, months_avg19, months_avg20, months_avg21 };
}

async function getAllno2WeeklyDate(filename) {
    const response = await fetch(filename);
    const data = await response.text();
    const week18 = [];
    const week19 = [];
    const week20 = [];
    const week21 = [];
    const week = [];
    const no218 = [];
    const no219 = [];
    const no220 = [];
    const no221 = [];
    var m;
    var index = 0;
    // var count = 0;
    // var sdate = document.getElementById("start-date-input").valueAsDate;
    // // console.log(sdate);
    // var edate = document.getElementById("end-date-input").valueAsDate;
    // // console.log(edate);
    for (var i = 0; i < 52; i++) {
        no218[i] = 0;
        no219[i] = 0;
        no220[i] = 0;
        no221[i] = 0;
        week18[i] = 0;
        week19[i] = 0;
        week20[i] = 0;
        week21[i] = 0;

    }
    const rows = data.split('\n').slice(1);
    rows.forEach(row => {
        // count = count + 1;
        const cols = row.split(',');
        // years.push(cols[0]);
        // var dt = Date.parse(cols[0]);
        var dat = new Date(cols[0]);
        // console.log(dt);
        // if (dt >= (Date.parse(sdate)) && dt <= (Date.parse(edate))) {
        // date.push(cols[0]);
        m = moment(cols[0], 'MM-DD-YYYY');
        index = m.format('W');
        var tmep = cols.slice(1);
        if (dat.getFullYear() == 2018) {

            no218[index] = no218[index] + avergae(tmep);
            week18[index] = week18[index] + 1;
        } else if (dat.getFullYear() == 2019) {

            no219[index] = no219[index] + avergae(tmep);
            week19[index] = week19[index] + 1;
        } else if (dat.getFullYear() == 2020) {

            no220[index] = no220[index] + avergae(tmep);
            week20[index] = week20[index] + 1;
        } else {

            no221[index] = no221[index] + avergae(tmep);
            week21[index] = week21[index] + 1;

        }
        // }
    });
    for (var i = 0; i < 52; i++) {
        no218[i] = no218[i] / week18[i];
        no219[i] = no219[i] / week19[i];
        no220[i] = no220[i] / week20[i];
        no221[i] = no221[i] / week21[i];
        week[i] = i + 1;

    }
    // console.log(no218);
    return { week, no218, no219, no220, no221 };
}

// async function getAllco2Date() {
//     const response = await fetch('co2_data.csv');
//     const data = await response.text();
//     const date = []
//     const no2 = []
//     const rows = data.split('\n').slice(1);
//     var val = rows[0].split(',');
//     rows.forEach(row => {
//         const cols = row.split(',');
//         // years.push(cols[0]);
//         date.push(cols[0]);
//         var tmep = cols.slice(1);
//         no2.push(avergae(tmep));
//     });

//     return { date, co2 };
// }
// async function getAllcoDate() {
//     const response = await fetch('co_data.csv');
//     const data = await response.text();
//     const date = []
//     const no2 = []
//     const rows = data.split('\n').slice(1);
//     var val = rows[0].split(',');
//     rows.forEach(row => {
//         const cols = row.split(',');
//         // years.push(cols[0]);
//         date.push(cols[0]);
//         var tmep = cols.slice(1);
//         no2.push(avergae(tmep));
//     });

//     return { date, co };
// }


// async function getData() {
//     // const response = await fetch('testdata.csv');
//     // getAllDate();
//     const response = await fetch('Air_Pollutant_Data.csv');
//     const data = await response.text();

//     const response_pre = await fetch('Air_Pollutant_Data_predicted.csv');
//     const data_pre = await response_pre.text();
//     var sdate = document.getElementById("start-date-input").valueAsDate;
//     // console.log(sdate);
//     var edate = document.getElementById("end-date-input").valueAsDate;
//     // console.log(edate);
//     const years = [];

//     const no = [];
//     const so = [];
//     const co = [];
//     const co2 = [];
//     const no_pre1 = [];
//     const so_pre1 = [];
//     const co_pre1 = [];
//     const co2_pre1 = [];
//     const rows = data.split('\n').slice(1);
//     const rows_pre = data_pre.split('\n').slice(1);

//     var val = rows[0].split(',');
//     const no2_val = parseInt(val[1]);
//     const so2_val = parseInt(val[2]);
//     const co2_val = parseInt(val[3]);
//     const no2_val_pre = parseInt(parseFloat(val[1]) * 1.12);
//     const so2_val_pre = parseInt(parseFloat(val[2]) * 0.96);
//     const co2_val_pre = parseInt(parseFloat(val[3]) * 1.06);
//     const no2_val_wek = parseInt(parseFloat(val[1]) * 1.07);
//     const so2_val_wek = parseInt(parseFloat(val[2]) * 1.13);
//     const co2_val_wek = parseInt(parseFloat(val[3]) * 0.97);

//     rows.forEach(row => {
//         const cols = row.split(',');
//         // console.log(Date.parse(cols[0]));
//         var dt = Date.parse(cols[0]);
//         // console.log(dt);
//         if (dt >= (Date.parse(sdate)) && dt <= (Date.parse(edate))) {

//             no.push(parseFloat(cols[1]));
//             so.push(parseFloat(cols[2]));
//             co.push(parseFloat(cols[3]));
//             co2.push(parseFloat(cols[4]));
//         }
//     });

//     rows_pre.forEach(row => {
//         const cols = row.split(',');
//         var dt = Date.parse(cols[0]);
//         // console.log(dt);
//         if (dt >= (Date.parse(sdate)) && dt <= (Date.parse(edate))) {
//             years.push(cols[0]);
//             no_pre1.push(parseFloat(cols[1]));
//             so_pre1.push(parseFloat(cols[2]));
//             co_pre1.push(parseFloat(cols[3]));
//             co2_pre1.push(parseFloat(cols[4]));
//         }
//     });
//     return { years, no, so, co, co2, no_pre1, so_pre1, co_pre1, co2_pre1, no2_val, so2_val, co2_val, no2_val_pre, so2_val_pre, co2_val_pre, no2_val_wek, so2_val_wek, co2_val_wek };
// }