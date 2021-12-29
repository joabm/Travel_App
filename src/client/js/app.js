/* Global Variables */
const geoBase  = 'http://api.geonames.org/searchJSON?q=';
const geoKey = '&maxRows=5&username=jdawg2021';

const weathbBase = 'https://api.weatherbit.io/v2.0/current?';
const weathbKey = '30a9f6f3f3ea4f5aae669490a3553361';

const pixbBase = "https://pixabay.com/api/?key=";
const pixBKey = "24908452-d15071fe842fea1450b1b7ad3";

/* Function exported and called by event listener */
function performAction () {
    let city = document.getElementById('city').value;
    let days = vacDays();

    // get geonames API data
    let geoURL = geoBase + city + geoKey;
    getAPIData(geoURL)
    .then(function(gData) {
        let geoData = {city: gData.geonames[0].name, country: gData.geonames[0].countryName};
        
        // get weatherbit API data
        let weathbURL = weathbBase + `lat=${gData.geonames[0].lat}&lon=${gData.geonames[0].lng}&key=${weathbKey}&units=I&include=minutely`;
        getAPIData(weathbURL)
        .then(function(wData) {
            let weathBData = {relTemp: wData.data[0].app_temp, aqi: wData.data[0].aqi, clouds: wData.data[0].clouds};
            
            // get pixelBay API data
            let pixbayURL = pixbBase +pixBKey+ `&q=${gData.geonames[0].name}+skyline&image_type=photo`;
            getAPIData(pixbayURL)
            .then(function(pData) {
                if (pData.totalHits === 0) {
                    // post data to the server with default picture
                    let photo = "https://cdn.pixabay.com/photo/2017/10/23/05/56/summer-2880261_1280.jpg";
                    postData('/addData', {days, geoData, weathBData, photo});
                } else {
                    // post data to the server
                    postData('/addData', {days, geoData, weathBData, photo: pData.hits[0].webformatURL});
                }
                updateUI();
            })
        });
    });
}

// GET Web API Data
const getAPIData = async (url = '') =>{
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    }   catch (error) {
        console.log('error', error);
    }
}

// POST data to server
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
        return newData
    }   catch(error) {
      console.log('error', error);
      }
  }

// GET Project Data and update the UI.  Also clears the input fields

const updateUI = async () =>{
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log('allData: ', allData);
        document.getElementById('location').innerHTML = `Location:  ${allData.geoData.city}, ${allData.geoData.country}`;
        document.getElementById('dates').innerHTML = `Dates: ${allData.days.start} to ${allData.days.stop}`;
        document.getElementById('daysuntil').innerHTML = `There are ${allData.days.daysTo} days left until your ${allData.days.length} day vacation!`;
        document.getElementById('weather').innerHTML = `Currently in ${allData.geoData.city}, it feels like ${Math.round(Number(allData.weathBData.relTemp))}&deg. The AQI is ${allData.weathBData.aqi} and it is ${allData.weathBData.clouds}% cloudy.`;
        document.getElementById('photo').innerHTML = `<figure><img src="${allData.photo}" alt = "location photo" /><figcaption>Photos provided by <a href="https://pixabay.com/">Pixabay</a></figcaption></figure>`;
        document.getElementById('city').value = '';
        document.getElementById('startDate').value = '';
        document.getElementById('endDate').value = '';
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

    //calculate length of vacation
    let inputDate2 = new Date(endDate);
    let diffInDays = inputDate2.getTime() - inputDate.getTime();
    let vacLength = (Math.round(diffInDays / (1000 * 3600 * 24)));

    //begin, end and full dates
    let begin = startDate.slice(5);
    let end = endDate.slice(5);
    let vacStart = begin + '-' + startDate.slice(0,4);
    let vacEnd = end + '-' + endDate.slice(0,4);
    
    return {beginDay: begin, endDay: end, daysTo: daysToVac, start: vacStart, stop: vacEnd, length: vacLength};
}

export {performAction}