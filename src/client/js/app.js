/* Global Variables */
const geoBase  = 'http://api.geonames.org/searchJSON?q=';
const geoKey = '&maxRows=5&username=jdawg2021';

const weathbBase = 'https://api.weatherbit.io/v2.0/current?';
const weathbKey = '30a9f6f3f3ea4f5aae669490a3553361';

/* Function exported and called by event listener */
function performAction () {
    let city = document.getElementById('city').value;
    let days = vacDays();
    console.log(`start: ${days.start}, stop: ${days.stop}, begin: ${days.beginDay}, end: ${days.endDay}, daysTo: ${days.daysTo}`);

    //get api data startging with geonames data
    let geoURL = geoBase + city + geoKey;
    getAPIData(geoURL)
    .then(function(data) {
        console.log(data);
        let geoData = {startDate: days.start, endDate: days.stop, city: data.geonames[0].name, country: data.geonames[0].countryName,}
        console.log(geoData);
        //get weatherbit data
        let weathbURL = weathbBase + `lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}&key=${weathbKey}&units=I&include=minutely`;
        console.log(`weathbURL: ${weathbURL}`);
        getAPIData(weathbURL)
        .then(function(data) {
            console.log(data)
            let weathBData = {relTemp: data.data[0].app_temp, aqi: data.data[0].aqi, clouds: data.data[0].clouds};
            console.log(weathBData);
        });
        // postData('/addData', {date: days.start, city: data.geonames[0].name, country: data.geonames[0].countryName, lat: data.geonames[0].lat, lng: data.geonames[0].lng});
        // updateUI();
    });
}

/* Function to GET Web API Data*/
const getAPIData = async (url = '') =>{
    const response = await fetch(url);
    try {
        const data = await response.json();
        // console.log('data');
        return data;
    }   catch (error) {
        console.log('error', error);
    }
}

/* Function to POST data to server*/
const postData = async (url = '', data = {})=>{
    console.log(data)
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        // console.log(newData);
        return newData
    }   catch(error) {
      console.log('error', error);
      }
  }

/* Function to GET Project Data and update the UI.  Also clears the input fields*/

const updateUI = async () =>{
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('destCity').innerHTML = `City:  ${allData.city}`;
        document.getElementById('country').innerHTML = `Country:  ${allData.country}`;
        document.getElementById('latitude').innerHTML = `Latitude:  ${allData.lat}`;
        document.getElementById('longitude').innerHTML = `Longitude:  ${allData.lng}`;
        document.getElementById('vacdate').innerHTML = `Vacation Start Date:  ${allData.date}`;
        document.getElementById('city').value = '';
    }   catch (error) {
        console.log('error', error)
    }
}

// create days object
function vacDays () {
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;

    //calculate days until vacation
    let d = new Date();
    let inputDate = new Date(startDate);
    let diffInTime = inputDate.getTime() - d.getTime();
    let daysToVac = (Math.round(diffInTime / (1000 * 3600 * 24)) + 1);

    //begin, end and full dates
    let begin = startDate.slice(5);
    let end = endDate.slice(5);
    let vacStart = begin + '-' + startDate.slice(0,4);
    let vacEnd = end + '-' + endDate.slice(0,4);
    
    return {beginDay: begin, endDay: end, daysTo: daysToVac, start: vacStart, stop: vacEnd};
}

export {performAction}