window.addEventListener('load', update);

async function update() {
    var optn = document.getElementById('pollutants');
    var selected_option = optn.options[optn.selectedIndex].value;

    var filename = selected_option + '_data.csv';
    var title = '';
    var unit = '';
    if (selected_option == 'no2') {
        title = 'Nitrogen Dioxide';
        unit = 'ppb'
    } else if (selected_option == 'so2') {
        title = 'Sulphur Dioxide';
        unit = 'ppb'
    } else {
        title = 'Carbon Monoxide';
        unit = 'ppm'
    }
    var loc = document.getElementById('locations');
    var selected_loc = loc.options[loc.selectedIndex].value;

    if (selected_loc == 'lahore') {
        dataloader(filename, 1);
    } else {
        dataloader(filename, 2);
    }

    document.getElementById('tabel_lable').innerHTML = title + ' values in ' + unit;

}

async function dataloader(filename, ind) {
    const response = await fetch(filename);
    const data = await response.text();
    var fulltabel = '';
    var tableheader = '<tr><th style="right: 0px;bottom: 100px;top: 0px;">Date</th>';
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
    const lhr_arr = [10, 11, 12, 13, 18, 19, 20, 21, 27, 28, 29, 30, 35, 36, 37, 38, 44, 45, 46, 52, 53, 54, 60];
    var tablebody = '';
    var sdate = document.getElementById("start-date-input").valueAsDate;
    // console.log(sdate);
    var edate = document.getElementById("end-date-input").valueAsDate;
    // console.log(edate);

    if (ind == 1) {

        for (var i = 0; i < lhr_arr.length; i++) {
            tableheader = tableheader + '<th>' + locationNames[lhr_arr[i]] + '</th>';
        }
        tableheader = tableheader + '</tr>';
        const rows = data.split('\n').slice(1);
        rows.forEach(row => {
            const cols = row.split(',');
            // years.push(cols[0]);
            var dt = Date.parse(cols[0]);
            // console.log(dt);
            if (dt >= (Date.parse(sdate)) && dt <= (Date.parse(edate))) {
                // date.push(cols[0]);
                len = lhr_arr.length;
                tablebody = tablebody + '<tr>';
                tablebody = tablebody + '<th>' + cols[0] + '</th>';
                for (var i = 0; i < len; i++) {
                    tablebody = tablebody + '<td>' + cols[lhr_arr[i]] + '</td>';
                }
                tablebody = tablebody + '</tr>';
            }

        });
    } else {

        for (var i = 0; i < 64; i++) {
            tableheader = tableheader + '<th>' + locationNames[i] + '</th>';
        }
        tableheader = tableheader + '</tr>';
        const rows = data.split('\n').slice(1);
        rows.forEach(row => {
            const cols = row.split(',');
            // years.push(cols[0]);
            var dt = Date.parse(cols[0]);
            // console.log(dt);
            if (dt >= (Date.parse(sdate)) && dt <= (Date.parse(edate))) {
                // date.push(cols[0]);
                len = cols.length;
                tablebody = tablebody + '<tr>';
                tablebody = tablebody + '<th>' + cols[0] + '</th>';
                for (var i = 1; i < 65; i++) {
                    tablebody = tablebody + '<td>' + cols[i] + '</td>';
                }
                tablebody = tablebody + '</tr>';
            }

        });
    }

    fulltabel = '<table class="table-fixed-column table-fixed-column table table-bordered table-striped">' + tableheader + tablebody + '</table>';
    document.getElementsByClassName('table-fixed-column-inner')[0].innerHTML = fulltabel;

    return { fulltabel };
}