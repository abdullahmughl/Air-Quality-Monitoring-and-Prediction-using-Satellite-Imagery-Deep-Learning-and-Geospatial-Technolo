window.addEventListener('load', update);

async function update() {
    var optn = document.getElementById('pollutants');
    var selected_option = optn.options[optn.selectedIndex].value;

    var filename = selected_option + '_data.csv';
    var title = '';
    if (selected_option == 'no2') {
        title = 'Nitrogen Dioxide';
    } else if (selected_option == 'so2') {
        title = 'Sulphur Dioxide';
    } else {
        title = 'Carbon DIoxide';
    }
    var loc = document.getElementById('locations');
    var selected_loc = loc.options[loc.selectedIndex].value;

    if (selected_loc == 'lahore') {
        dataloader(filename, 1);
    } else {
        dataloader(filename, 2);
    }

    console.log(title);

}

async function dataloader(filename, ind) {
    const response = await fetch(filename);
    const data = await response.text();
    var fulltabel = '';
    var tableheader = '<tr><th>Date</th>';
    const locationNames = ['Ravi River', 'Shamkay Bhattian', 'Bahria Town School and College', 'Kot Arain', 'Jhedu Minor', 'Jinnah Sector LDA City', 'Institute of Southern Lahore', 'Badhwar', 'Ravi River', 'Khudpur', 'Bahria Town Marquee', 'Barkat Ali Market, Riwind Rd', 'Bakra Mandi, Defence Road', 'Lahore Ring Road, Kahna Interchange', 'Ahlu Rd', 'Mallian Road', 'Sultan Pur', 'Thathan Naulan', 'Model Baraz, Chung', 'Bilal Town, LDA Avenue', 'Wapda Town, Phase 1', 'Pak-Arab Housing Scheme', 'Deo Kalan', 'Thethar Rd', 'Nizampura', 'Sharaqpur', 'Ravi River, Katar Band South', 'General Bus Stand, Thoker Niaz Baig', 'Johar Town Park', 'Pak Electron Limited (PEL), Walton Road', 'Khyaban-e-Jinnah Rd, Sector-G', 'Jamia Masjid, Defence Raya Golf Resort', 'Qillah Sharief', 'Canal Upper Chenab', 'Forest Reserve 2, Shadhanwali', 'Shahdiwal', 'Qasim Ali Shah Foundation, Wahdat Road', 'Gulberg III, Block C3', 'Allama Iqbal International Airport', 'Lahore School of Economics, Shabbir Sharif Rd', 'Chak 22', 'West Minister Farmhouse', 'Katal, Lahore-Jaranwala Rd', 'Burj, Near Ravi River', 'Samanabad Town', 'Punjab Board of Investment & Trade PBIT', 'Al-Faisal Town', 'Paragon City', 'Chak 10', 'Budho Sharif', 'Burj Attari Stadium', 'Lahore Multan Motorway Interchange', 'Bund Road, Khokhar Town', 'Shaheen Park, Shad Bagh', 'Shalimar Housing Scheme, Sue Wala Road', 'Lahore Medical and Dental College', 'Dhamoke, Sheikhupura Rd', 'Pind Road, Sheikhpura', 'Kala Shah Kaku', 'Kot Abdul Malik', 'Shahdara', 'Jhuggian Jodha', 'Sialkot Lahore Motorway', 'Natt Kalan'];
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
                tablebody = tablebody + '<td>' + cols[0] + '</td>';
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
                for (var i = 0; i < 65; i++) {
                    tablebody = tablebody + '<td>' + cols[i] + '</td>';
                }
                tablebody = tablebody + '</tr>';
            }

        });
    }

    fulltabel = '<table class="table table-bordered table-striped">' + tableheader + tablebody + '</table>';
    document.getElementById('no2_table').innerHTML = fulltabel;

    return { fulltabel };
}