/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=9a0aa1d79eec2973ac957eee1b69585b&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  (d.getMonth() + 1) +'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener("click", performAction);

function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const newfeeling = document.getElementById('feelings').value;
    console.log(newDate);
    getWeather(baseURL, zipCode, apiKey)
    
        .then(function (data){
            console.log(data);
            // Add data to POST request
            postData('/addData', {temperature: data.main.temp, date: newDate, userResponse: newfeeling });
    })
    .then(function(){
        updateUI()
       }
    )
};

/* GET web API Data */
const getWeather = async(baseURL, zip, key)=>{
    const res = await fetch(baseURL+zip+key)
    try {
        const data = await res.json();
        return data;
    }  
    catch(error) {
        //Appropriately handle the error
        console.log('error', error);
    }
}


// POST Request to store date, temp and user input
const postData = async( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
    });
    try {
        const newData = await response.json;
        return newData;
    }
    catch(error) {
        //Appropriately handle the error
        console.log('error', error);
    }
}


// Update UI dynamically
const updateUI = async() => {
    const request = await fetch('/all');;
    try{
        const allData = await request.json()
        console.log(allData);
        document.getElementById('date').innerHTML = "📅 The date is: " + allData.date;
        document.getElementById('temp').innerHTML ="🌡️ The temperature is: " +"" + allData.temperature;
        document.getElementById('content').innerHTML = "😌 You are feeling: " + allData.feeling;
    }
    catch(error) {
        //Appropriately handle the error
        console.log('error', error)
    }
}
