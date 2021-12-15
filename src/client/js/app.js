/* Global Variables */
const baseURL  = 'http://api.geonames.org/searchJSON?q=';
const apiKey = '&maxRows=10&username=jdawg2021';

// Event listener to add function to existing HTML DOM element
// document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction () {
    let city = document.getElementById('city').value;
    // let mood = document.getElementById('feelings').value;
    daysToVac();
    let apiUrl = baseURL + city + apiKey;
    getGeoNamesData(apiUrl)
    .then(function(data) {
        console.log(data);
        postData('/addData', {city: data.geonames[0].name, country: data.geonames[0].countryName, lat: data.geonames[0].lat, lng: data.geonames[0].lng});
    updateUI();
    });
}

/* Function to GET Web API Data*/
const getGeoNamesData = async (apiUrl) =>{
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
        document.getElementById('city').value = '';
        // document.getElementById('feelings').value = '';
    }   catch (error) {
        console.log('error', error)
    }
}

// Calculate days until vacation
function daysToVac () {
    let d = new Date();
    console.log(`Today is : ${d}`);

    let inputDate = document.getElementById('startDate').value;
    let vacDate = new Date(inputDate);
    console.log('Input date is: ', vacDate);

    let diffInTime = vacDate.getTime() - d.getTime();
    let daysToVacation = Math.round(diffInTime / (1000 * 3600 * 24));
    console.log(`days to vacation:  ${daysToVacation}`);

    return daysToVacation;
}


export {performAction}