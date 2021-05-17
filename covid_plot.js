window.addEventListener('load', setup);

async function setup() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const ctx1 = document.getElementById('myChart1').getContext('2d');
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const ctx3 = document.getElementById('myChart3').getContext('2d');

    const globalValue = await getData();
    // valueUpdate(globalValue);
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: globalValue.years,
            datasets: [{
                label: 'NO2',
                data: globalValue.no_pre1,
                fill: false,
                // pointRadius: 1.5,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 0.1
            }]
        },
        options: {
            maintainAspectRatio: true,
            responsive: true,

        }
    });


    const myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: globalValue.years,
            datasets: [{
                    label: 'SO2',
                    data: globalValue.so_pre1,
                    fill: false,
                    // pointRadius: 1.5,
                    borderColor: 'rgba(96, 25, 232, 1)',
                    backgroundColor: 'rgba(96, 25, 232, 0.5)',
                    borderWidth: 0.1
                }

            ]
        },
        options: {
            maintainAspectRatio: true,
            responsive: true,

        }
    });


    const myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: globalValue.years,
            datasets: [{
                label: 'CO',
                data: globalValue.co_pre1,
                fill: false,
                // pointRadius: 1.5,
                borderColor: 'rgba(47, 79, 79, 1)',
                backgroundColor: 'rgba(0, 255, 127, 0.5)',
                borderWidth: 0.1
            }]
        },
        options: {
            spanGaps: true,

        }
    });


    const myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: globalValue.years,
            datasets: [{
                label: 'CO2',
                data: globalValue.co2_pre1,
                fill: false,
                // pointRadius: 2.5,
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                borderWidth: 0.1
            }]
        },
        options: {
            spanGaps: true,
        }
    });
}



async function getData() {
    // const response = await fetch('testdata.csv');
    const response = await fetch('covid_data.csv');
    const data = await response.text();

    const response_pre = await fetch('covid_data.csv');
    const data_pre = await response_pre.text();

    const years = [];

    const no = [];
    const so = [];
    const co = [];
    const co2 = [];
    const no_pre1 = [];
    const so_pre1 = [];
    const co_pre1 = [];
    const co2_pre1 = [];
    const rows = data.split('\n').slice(1);
    const rows_pre = data_pre.split('\n').slice(1);

    var val = rows[0].split(',');
    const no2_val = parseInt(val[1]);
    const so2_val = parseInt(val[2]);
    const co2_val = parseInt(val[3]);
    const no2_val_pre = parseInt(parseFloat(val[1]) * 1.12);
    const so2_val_pre = parseInt(parseFloat(val[2]) * 0.96);
    const co2_val_pre = parseInt(parseFloat(val[3]) * 1.06);
    const no2_val_wek = parseInt(parseFloat(val[1]) * 1.07);
    const so2_val_wek = parseInt(parseFloat(val[2]) * 1.13);
    const co2_val_wek = parseInt(parseFloat(val[3]) * 0.97);

    rows.forEach(row => {
        const cols = row.split(',');
        // years.push(cols[0]);
        no.push(parseFloat(cols[1]));
        so.push(parseFloat(cols[2]))
        co.push(parseFloat(cols[3]))
        co2.push(parseFloat(cols[4]))
    });

    rows_pre.forEach(row => {
        const cols = row.split(',');
        years.push(cols[0]);
        no_pre1.push(parseFloat(cols[1]));
        so_pre1.push(parseFloat(cols[2]))
        co_pre1.push(parseFloat(cols[3]))
        co2_pre1.push(parseFloat(cols[4]))
    });
    return { years, no, so, co, co2, no_pre1, so_pre1, co_pre1, co2_pre1, no2_val, so2_val, co2_val, no2_val_pre, so2_val_pre, co2_val_pre, no2_val_wek, so2_val_wek, co2_val_wek };
}