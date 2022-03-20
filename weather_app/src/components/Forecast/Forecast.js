import React, { useState } from 'react';
import classes from './Forecast.module.css';

const Forecast = () => {

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    /* input for city must be encoded before use in URL */
    const uriEncodedCity = encodeURIComponent(city);

    const x = new Date();

    const todayDayNumber = x.getDay();
    
    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    
function getForecast(i) {
    const APIkey = '37933eeecc2aa2f82d2f070336b953c5';
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${uriEncodedCity}&appid=${APIkey}&units=${unit}`;

    i.preventDefault();
    fetch( apiURL)
    .then((response) => response.json())
    .then(response => {
        setResponseObj(response)
        console.log(response);

        document.getElementById('place').textContent = response.city.name;

        let mylist = response.list;
        let forecastDayNumber = todayDayNumber;
    
        for (i= 0; i < mylist.length; i++) {
            let time = mylist[i].dt_txt;
            if (time.includes("18:00:00")) {
                forecastDayNumber +=1;
                if (forecastDayNumber === 7){forecastDayNumber = 0;}

                let theDayName = document.createElement('span');
                theDayName.textContent = weekday[forecastDayNumber];

                let theTemp = document.createElement("p");
                theTemp.textContent = response.list[i].main.temp + "\xb0";

                const iconcode = response.list[i].weather[0].icon;
                const icon_path = "//openweathermap.org/img/w/" + iconcode + ".png";
                let theIcon = document.createElement("img");
                theIcon.src=icon_path;

                let theDay = document.createElement("div");
                theDay.appendChild(theDayName);
                theDay.appendChild(theTemp);
                theDay.appendChild(theIcon);

                document.getElementById("weatherCards").appendChild(theDay);
            }
        }

        
    })
    .catch(err => {
        console.error(err);
    });
}

    return (
        
        <div>
           <h2>Check the weather in your area</h2>
           <form onSubmit={getForecast}>
               <input className='classes.textInput' type="text" placeholder='Enter City' maxLength='50' 
               value={city}
               onChange={(i) => setCity(i.target.value)}>
               </input>
               <label className={classes.Radio}>
                   <input type="radio" name='units' 
                   checked={unit === "imperial"} value="imperial" 
                   onChange={(i) => setUnit(i.target.value)}>
                   </input>
                   Fahrenheit
               </label>
               <label className={classes.Radio}>
                   <input type='radio' name='units' checked={unit === "metric"}
                   value="metric" onChange={(i) => setUnit(i.target.value)}>
                   </input>
                   Celcius
               </label>

               <button className={classes.Button} type='submit'>Get Forecast</button>
           </form>
           
       </div>
    )
}

export default Forecast;