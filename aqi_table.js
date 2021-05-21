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
    const response = await fetch('no2_data.csv');
    const data = await response.text();
    var no2 = [];
    var date = [];
    var aqi_no2 = [];
    const rows = data.split('\n').slice(1);
    var i;
    for (i = 0; i < 15; i++) {

        const row = rows[i];
        const cols = row.split(',');
        date.push(cols[0]);
        var value = cols.slice(1);
        no2.push((avergae(value)) * 150);
        if (no2[i] < 40) {
            aqi_no2.push(scale(no2[i], 0, 40, 0, 50));
        } else if (no2[i] > 40 && no2[i] <= 80) {
            aqi_no2.push(scale(no2[i], 40, 80, 51, 100));
        } else if (no2[i] > 80 && no2[i] <= 180) {
            aqi_no2.push(scale(no2[i], 80, 180, 101, 200));
        } else if (no2[i] > 180 && no2[i] <= 280) {
            aqi_no2.push(scale(no2[i], 180, 280, 201, 300));
        } else if (no2[i] > 280 && no2[i] <= 400) {
            aqi_no2.push(scale(no2[i], 280, 400, 301, 400));
        } else {
            aqi_no2.push(scale(no2[i], 400, 600, 401, 500));
        }
        no2.reverse();
        aqi_no2.reverse();
        date.reverse();
    }
    return { no2, aqi_no2, date };
}

async function getSo2preAQI() {
    const response = await fetch('so2_data.csv');
    const data = await response.text();
    var so2 = [];
    var aqi_so2 = [];
    const rows = data.split('\n').slice(1);
    var i;
    for (i = 0; i < 15; i++) {
        const row = rows[i];
        const cols = row.split(',');
        var value = cols.slice(1);
        so2.push((avergae(value)) * 640.66 * 0.5);
        if (so2[i] < 40) {
            aqi_so2.push(scale(so2[i], 0, 40, 0, 50));
        } else if (so2[i] > 40 && so2[i] <= 80) {
            aqi_so2.push(scale(so2[i], 40, 80, 51, 100));
        } else if (so2[i] > 80 && so2[i] <= 380) {
            aqi_so2.push(scale(so2[i], 80, 380, 101, 200));
        } else if (so2[i] > 380 && so2[i] <= 800) {
            aqi_so2.push(scale(so2[i], 380, 800, 201, 300));
        } else if (so2[i] > 800 && so2[i] <= 1600) {
            aqi_so2.push(scale(so2[i], 800, 1600, 301, 400));
        } else {
            aqi_so2.push(scale(so2[i], 1600, 7000, 401, 500));
        }
    }
    so2.reverse();
    aqi_so2.reverse();
    return { so2, aqi_so2 };
}
async function getCo2preAQI() {
    const response = await fetch('no2_data.csv');
    const data = await response.text();
    var co2 = [];
    var aqi_co2 = [];
    const rows = data.split('\n').slice(1);
    var i;
    for (i = 0; i < 15; i++) {

        const row = rows[i + 18];
        const cols = row.split(',');
        var value = cols.slice(1);
        co2.push((avergae(value)) * 460);
        if (co2[i] < 40) {
            aqi_co2.push(scale(co2[i], 0, 40, 0, 50));
        } else if (co2[i] > 40 && co2[i] <= 80) {
            aqi_co2.push(scale(co2[i], 40, 80, 51, 100));
        } else if (co2[i] > 80 && co2[i] <= 180) {
            aqi_co2.push(scale(co2[i], 80, 180, 101, 200));
        } else if (co2[i] > 180 && co2[i] <= 280) {
            aqi_co2.push(scale(co2[i], 180, 280, 201, 300));
        } else if (co2[i] > 280 && co2[i] <= 400) {
            aqi_co2.push(scale(co2[i], 280, 400, 301, 400));
        } else {
            aqi_co2.push(scale(co2[i], 400, 600, 401, 500));
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
    for (i = 0; i < 15; i++) {

        // Insert a row at the end of table
        var newRow = tbodyRef.insertRow();

        // Insert a cell at the end of the row
        var newCell1 = newRow.insertCell();
        var newCell2 = newRow.insertCell();
        var newCell3 = newRow.insertCell();
        var newCell4 = newRow.insertCell();
        var newCell5 = newRow.insertCell();

        newCell1.innerHTML = v.no2.date[i];
        newCell2.innerHTML = v.no2.no2[i].toFixed(2);
        newCell3.innerHTML = v.so2.so2[i].toFixed(2);
        newCell4.innerHTML = v.co2.co2[i].toFixed(2);
        aqi = Math.max(v.no2.aqi_no2[i].toFixed(0), v.so2.aqi_so2[i].toFixed(0), v.co2.aqi_co2[i].toFixed(0));
        newCell5.innerHTML = aqi;

    }
    // push a text node to the cell
    // var newText = document.createTextNode('new row');
    // newCell.pushChild(newText);

});

// gauge.set(gauge_val);