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

function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
var no2_val = 0;
var so2_val = 0;
var co2_val = 0;
var gauge_val = 0;

async function getNo2AQI() {
    const response = await fetch('no2_data_cnn.csv');
    const data = await response.text();
    var no2 = 0;
    var aqi_no2 = 0;
    const rows = data.split('\n').slice(1);
    rows.forEach(row => {
        // const row = rows[1];
        const cols = row.split(',');
        var dat = new Date();
        var dt = Date.parse(cols[0]);
        // console.log(Date.parse(dt));
        // console.log(Date.parse(cols[0]));
        if (dt >= (Date.parse(dat)) && dt <= ((Date.parse(dat)) + 86800000)) {
            var value = cols.slice(1);
            no2 = (avergae(value)) * 10;
            if (no2 < 40) {
                aqi_no2 = scale(no2, 0, 40, 0, 50);
            } else if (no2 > 40 && no2 <= 80) {
                aqi_no2 = scale(no2, 40, 80, 51, 100);
            } else if (no2 > 80 && no2 <= 180) {
                aqi_no2 = scale(no2, 80, 180, 101, 200);
            } else if (no2 > 180 && no2 <= 280) {
                aqi_no2 = scale(no2, 180, 280, 201, 300);
            } else if (no2 > 280 && no2 <= 400) {
                aqi_no2 = scale(no2, 280, 400, 301, 400);
            } else {
                aqi_no2 = scale(no2, 400, 600, 401, 500);
            }
        }
    });

    return { no2, aqi_no2 };
}

async function getSo2AQI() {
    const response = await fetch('so2_data_cnn.csv');
    const data = await response.text();
    var so2 = 0;
    var aqi_so2 = 0;
    const rows = data.split('\n').slice(1);
    rows.forEach(row => {
        const cols = row.split(',');
        var dat = new Date();
        var dt = Date.parse(cols[0]);
        // console.log(Date.parse(dt));
        // console.log(Date.parse(cols[0]));
        if (dt >= (Date.parse(dat)) && dt <= ((Date.parse(dat)) + 86800000)) {
            var value = cols.slice(1);
            so2 = (avergae(value)) * 64.066 * 0.5;
            if (so2 < 40) {
                aqi_so2 = scale(so2, 0, 40, 0, 50);
            } else if (so2 > 40 && so2 <= 80) {
                aqi_so2 = scale(so2, 40, 80, 51, 100);
            } else if (so2 > 80 && so2 <= 380) {
                aqi_so2 = scale(so2, 80, 380, 101, 200);
            } else if (so2 > 380 && so2 <= 800) {
                aqi_so2 = scale(so2, 380, 800, 201, 300);
            } else if (so2 > 800 && so2 <= 1600) {
                aqi_so2 = scale(so2, 800, 1600, 301, 400);
            } else {
                aqi_so2 = scale(so2, 1600, 7000, 401, 500);
            }
        }
    });
    return { so2, aqi_so2 };
}
async function getCo2AQI() {
    const response = await fetch('no2_data.csv');
    const data = await response.text();
    var co2 = 0;
    var aqi_co2 = 0;
    const rows = data.split('\n').slice(1);
    const row = rows[3];
    const cols = row.split(',');
    var value = cols.slice(1);
    co2 = (avergae(value)) * 10;
    if (co2 < 40) {
        aqi_co2 = scale(co2, 0, 40, 0, 50);
    } else if (co2 > 40 && co2 <= 80) {
        aqi_co2 = scale(co2, 40, 80, 51, 100);
    } else if (co2 > 80 && co2 <= 180) {
        aqi_co2 = scale(co2, 80, 180, 101, 200);
    } else if (co2 > 180 && co2 <= 280) {
        aqi_co2 = scale(co2, 180, 280, 201, 300);
    } else if (co2 > 280 && co2 <= 400) {
        aqi_co2 = scale(co2, 280, 400, 301, 400);
    } else {
        aqi_co2 = scale(co2, 400, 600, 401, 500);
    }
    return { co2, aqi_co2 };
}
var opts = {
    angle: 0, // The span of the gauge arc
    lineWidth: 0.3, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
        length: 0.49, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
    },
    limitMax: false, // If false, max value increases automatically if value > maxValue
    limitMin: false, // If true, the min value of the gauge will be fixed
    colorStart: '#6FADCF', // Colors
    colorStop: '#8FC0DA', // just experiment with them
    staticZones: [
        { strokeStyle: "#00e400", min: 0, max: 50 }, // Green
        { strokeStyle: "#ffff00", min: 50, max: 100 }, // Light Green
        { strokeStyle: "#ff7e00", min: 100, max: 150 }, // Yellow
        { strokeStyle: "#ff0000", min: 150, max: 200 }, // Orange
        { strokeStyle: "#99004c", min: 200, max: 300 }, // Red
        { strokeStyle: "#7e0023", min: 300, max: 500 }
    ],
    staticLabels: {
        font: "12px sans-serif", // Specifies font
        labels: [0, 50, 100, 150, 200, 300, 500], // Print labels at these values
        color: "#000000", // Optional: Label text color
        fractionDigits: 0 // Optional: Numerical precision. 0=round off.
    },
    strokeColor: '#E0E0E0', // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true, // High resolution support

};
var target = document.getElementById('foo'); // your canvas element
// document.getElementById('so2aqi').innerHTML = await getSo2AQI();
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 500; // set max gauge value
gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 32; // set animation speed (32 is default value)


async function valueUpdate() {

    const no2 = await getNo2AQI();
    const so2 = await getSo2AQI();
    const co2 = await getCo2AQI();

    return { no2, so2, co2 };
}
valueUpdate().then(v => {
    document.getElementById('no2aqi').innerHTML = v.no2.no2.toFixed(2);
    document.getElementById('so2aqi').innerHTML = v.so2.so2.toFixed(2);
    document.getElementById('co2aqi').innerHTML = v.co2.co2.toFixed(2);
    const aqi = Math.max(v.no2.aqi_no2.toFixed(0), v.so2.aqi_so2.toFixed(0), v.co2.aqi_co2.toFixed(0));
    document.getElementById('AQI_num').innerHTML = aqi;
    gauge.set(aqi);
    if (aqi <= 50) {
        document.getElementById('aqi_note').innerHTML = "It's a good day to be active outside.";
        document.getElementById('aqi_note').style.backgroundColor = '#00e400';
    } else if (aqi > 50 && aqi <= 100) {
        document.getElementById('aqi_note').innerHTML = "<b>Usually sensitive People:</b> Consider reducing prolonged or heavy exertion. Watch for symptoms such as coughing or shortness of breath. These signs to take it easier. </br></br><b>Everyone Else:</b> It's a good day to be active outside.";
        document.getElementById('aqi_note').style.backgroundColor = '#ffff00';
    } else if (aqi > 100 && aqi <= 150) {
        document.getElementById('aqi_note').innerHTML = "<b>Sensitive Groups:</b> Reduce prolonged or heavy exertion. It's okay to be active outside, but take more break and do less intensive activities. Watch for symptoms such as coughing or shortness of breath. </br></br><b>People with Asthama</b> should follow their asthama action plans and keep quick relief medicine handy.</br></br><b> If you have heart disease:</b> Symptoms such as palpitations, shortness of breath, or unusual fatigue may indicate a serious problem. If you have any idae of these, contact your health care provider.";
        document.getElementById('aqi_note').style.backgroundColor = '#ff7e00';
        document.getElementById('aqi_note').style.color = 'white';
    } else if (aqi > 150 && aqi <= 200) {
        document.getElementById('aqi_note').innerHTML = "<b>Sensitive Groups:</b> Avoid prolonged or heavy exertion. Move activities indoor or resechedule to a time when air quality is better. </br></br><b>Everyone Else:</b> Reduce prolonged or heavy exertion. Take more breaks during all outdoor activities.";
        document.getElementById('aqi_note').style.backgroundColor = '#ff0000';
        document.getElementById('aqi_note').style.color = 'white';
    } else if (aqi > 200 && aqi <= 300) {
        document.getElementById('aqi_note').innerHTML = "<b>Sensitive Groups:</b> Avoid all physical activities outdoors. Move activities indoor or resechedule to a time when air quality is better. </br></br><b>Everyone Else:</b> Avoid prolonged or heavy exertion. Consider moving activities indoors or rescheduling to a time when air quality is better.";
        document.getElementById('aqi_note').style.backgroundColor = '#99004c';
        document.getElementById('aqi_note').style.color = 'white';

    } else {
        document.getElementById('aqi_note').innerHTML = "<b>Sensitive Groups:</b> Remain indoors and keep activity levels low. Follow tips for keeping particle levels low indoors. </br></br><b>Everyone Else:</b> Avoid all physical activities outdoors.";
        document.getElementById('aqi_note').style.backgroundColor = '#7e0023';
        document.getElementById('aqi_note').style.color = 'white';
    }


});

// gauge.set(gauge_val);