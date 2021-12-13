/* Global Variables */
const baseURL  = 'http://api.geonames.org/searchJSON?q=';
const apiKey = '&maxRows=10&username=jdawg2021';

// Event listener to add function to existing HTML DOM element
// document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction () {
    let city = document.getElementById('city').value;
    let mood = document.getElementById('feelings').value;
    let apiUrl = baseURL + city + apiKey;
    getWeatherData(apiUrl)
    .then(function(data) {
        console.log(data);
        postData('/addData', {date: newDate, temp: data.main.temp, mood: mood});
    updateUI();
    });
}

/* Function to GET Web API Data*/
const getWeatherData = async (apiUrl) =>{
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
        document.getElementById('date').innerHTML = `Date - ${allData.date}`;
        document.getElementById('temp').innerHTML = `Tempurature - ${Math.round(Number(allData.temp))}&deg`;
        document.getElementById('content').innerHTML = `Feeling - ${allData.mood}`;
        document.getElementById('zip').value = '';
        document.getElementById('feelings').value = '';
    }   catch (error) {
        console.log('error', error)
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
console.log(d);
let newDate = (d.getMonth()+1)+'-'+ d.getDate()+'-'+ d.getFullYear();

export {performAction}