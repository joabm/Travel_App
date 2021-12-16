/* Global Variables */
const baseURL  = 'http://api.geonames.org/searchJSON?q=';
const apiKey = '&maxRows=10&username=jdawg2021';

const weatherbitKey = '30a9f6f3f3ea4f5aae669490a3553361';

// Event listener to add function to existing HTML DOM element
// document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction () {
    let city = document.getElementById('city').value;
    let startDate = document.getElementById('startDate').value;
    let daysToVacation = daysToVac(startDate);
    console.log(daysToVacation);

    let apiUrl = baseURL + city + apiKey;
    getAPIData(apiUrl)
    .then(function(data) {
        console.log(data);
        postData('/addData', {date: startDate, city: data.geonames[0].name, country: data.geonames[0].countryName, lat: data.geonames[0].lat, lng: data.geonames[0].lng});
    updateUI();
    });
}

/* Function to GET Web API Data*/
const getAPIData = async (apiUrl) =>{
    const response = await fetch(apiUrl);
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
        // document.getElementById('feelings').value = '';
    }   catch (error) {
        console.log('error', error)
    }
}

// Calculate days until vacation
function daysToVac (startDate) {
    let d = new Date();
    let inputDate = new Date(startDate);
    let diffInTime = inputDate.getTime() - d.getTime();
    let daysToVacation = (Math.round(diffInTime / (1000 * 3600 * 24)) + 1);
    console.log(`days to vacation:  ${daysToVacation}`);

    return daysToVacation;
}


export {performAction}