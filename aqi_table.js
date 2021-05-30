// function avergae(values) {
//     var total = 0;
//     var numArray = values.map(i => Number(i));
//     // values = parseFloat(values)
//     for (var i = 0; i < numArray.length; i++) {
//         total += numArray[i];
//     }
//     var avg = total / numArray.length;
//     return avg;
// }

// function scale(number, inMin, inMax, outMin, outMax) {
//     return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
// }


async function getNo2preAQI() {
    const response = await fetch('no2_data_cnn.csv');
    const data = await response.text();
    var no2 = [];
    var date = [];
    var aqi_no2 = [];
    const rows = data.split('\n').slice(1);
    var i;
    for (i = 0; i < 14; i++) {

        const row = rows[i + 18];
        const cols = row.split(',');
        date.unshift(cols[0]);
        var value = cols.slice(1);
        no2.push(avergae(value));
        if (no2[i] < 0.4) {
            aqi_no2.push(scale(no2[i], 0, 0.40, 0, 50));
        } else if (no2[i] >= 0.40 && no2[i] <= 0.80) {
            aqi_no2.push(scale(no2[i], 0.40, 0.80, 51, 100));
        } else if (no2[i] > 0.80 && no2[i] <= 2.0) {
            aqi_no2.push(scale(no2[i], 0.80, 2.0, 101, 200));
        } else if (no2[i] > 2.0 && no2[i] <= 3.50) {
            aqi_no2.push(scale(no2[i], 2.0, 3.50, 201, 300));
        } else if (no2[i] > 3.50 && no2[i] <= 4.00) {
            aqi_no2.push(scale(no2[i], 3.50, 4.00, 301, 400));
        } else {
            aqi_no2.push(scale(no2[i], 4.0, 8.00, 401, 500));
        }
        no2.reverse();
        aqi_no2.reverse();
        // date.reverse();
    }
    return { no2, aqi_no2, date };
}

async function getSo2preAQI() {
    const response = await fetch('so2_data_cnn.csv');
    const data = await response.text();
    var so2 = [];
    var aqi_so2 = [];
    const rows = data.split('\n').slice(1);
    var i;
    for (i = 0; i < 14; i++) {
        const row = rows[i + 18];
        const cols = row.split(',');
        var value = cols.slice(1);
        so2.push(avergae(value));
        if (so2[i] < 15) {
            aqi_so2.push(scale(so2[i], -10, 15, 0, 50));
        } else if (so2[i] > 15 && so2[i] <= 20) {
            aqi_so2.push(scale(so2[i], 15, 20, 51, 100));
        } else if (so2[i] > 20 && so2[i] <= 35) {
            aqi_so2.push(scale(so2[i], 20, 35, 101, 200));
        } else if (so2[i] > 35 && so2[i] <= 50) {
            aqi_so2.push(scale(so2[i], 35, 50, 201, 300));
        } else if (so2[i] > 50 && so2[i] <= 60) {
            aqi_so2.push(scale(so2[i], 50, 60, 301, 400));
        } else {
            aqi_so2.push(scale(so2[i], 60, 75, 401, 500));
        }
    }
    so2.reverse();
    aqi_so2.reverse();
    return { so2, aqi_so2 };
}
async function getCo2preAQI() {
    const response = await fetch('co2_data_cnn.csv');
    const data = await response.text();
    var co2 = [];
    var aqi_co2 = [];
    const rows = data.split('\n').slice(1);
    var i;
    for (i = 0; i < 14; i++) {

        const row = rows[i + 18];
        const cols = row.split(',');
        var value = cols.slice(1);
        co2.push(avergae(value));
        if (co2[i] < 100) {
            aqi_co2.push(scale(co2[i], 0, 100, 0, 50));
        } else if (co2[i] > 100 && co2[i] <= 300) {
            aqi_co2.push(scale(co2[i], 100, 300, 51, 100));
        } else if (co2[i] > 300 && co2[i] <= 500) {
            aqi_co2.push(scale(co2[i], 300, 500, 101, 200));
        } else if (co2[i] > 500 && co2[i] <= 800) {
            aqi_co2.push(scale(co2[i], 500, 800, 201, 300));
        } else if (co2[i] > 800 && co2[i] <= 1300) {
            aqi_co2.push(scale(co2[i], 800, 1300, 301, 400));
        } else {
            aqi_co2.push(scale(co2[i], 1300, 1700, 401, 500));
        }
    }
    co2.reverse();
    aqi_co2.reverse();
    return { co2, aqi_co2 };
}


async function valueUpdatepre() {

    const no2 = await getNo2preAQI();
    const so2 = await getSo2preAQI();
    const co2 = await getCo2preAQI();

    return { no2, so2, co2 };
}
valueUpdatepre().then(v => {
    var tbodyRef = document.getElementById('aqi_table').getElementsByTagName('tbody')[0];
    var i;
    var aqi = 0;
    for (i = 0; i < 14; i++) {

        // Insert a row at the end of table
        var newRow = tbodyRef.insertRow();

        // Insert a cell at the end of the row
        var newCell1 = newRow.insertCell();
        var newCell2 = newRow.insertCell();
        var newCell3 = newRow.insertCell();
        var newCell4 = newRow.insertCell();
        var newCell5 = newRow.insertCell();
        var newCell6 = newRow.insertCell();

        newCell1.innerHTML = v.no2.date[i];
        newCell2.innerHTML = v.no2.no2[i].toFixed(2);
        newCell3.innerHTML = v.so2.so2[i].toFixed(2);
        newCell4.innerHTML = v.co2.co2[i].toFixed(2);
        aqi = Math.max((v.no2.aqi_no2[i] * 0.5).toFixed(0), (v.so2.aqi_so2[i] * 0.5).toFixed(0), (v.co2.aqi_co2[i] * 0.5).toFixed(0));
        newCell5.innerHTML = aqi;
        if (aqi < 50) {
            newCell6.innerHTML = 'Good';
        } else if (aqi < 100) {
            newCell6.innerHTML = 'Moderate';

        } else if (aqi < 150) {
            newCell6.innerHTML = 'Unhealty for Sensitive Groups';

        } else if (aqi < 200) {
            newCell6.innerHTML = 'Unhealthy';

        } else if (aqi < 300) {
            newCell6.innerHTML = 'Very Unhealty';

        } else if (aqi < 500) {
            newCell6.innerHTML = 'Hazardous';

        }

    }
    // push a text node to the cell
    // var newText = document.createTextNode('new row');
    // newCell.pushChild(newText);

});

// gauge.set(gauge_val);