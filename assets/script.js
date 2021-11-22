// Initialize data query selectors
let cityForm = document.querySelector("#city-form");
let cityContainerEl = document.querySelector("#city-container");
let cityInput = document.querySelector("#city-input");
let cityButton = document.querySelector("#city-button");
let cityTitle = document.querySelector("#current-city");
let currentWeatherEl = document.querySelector(".current")
let dailyForecastEl = document.querySelector("#forecast-display");
let forecastHeader = document.querySelector("#forecast-header");
let forecastDate = document.querySelector(".forecast-time");


// Personal API key to be used for project and from here on out

const apiKey = "cc742ab3f18c60ff03116b342797094a"





function getCityWeather(cityName) {

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    
    console.log(cityName);
    console.log(apiUrl);

    
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {             
                const lat = data.coord.lat;
                const lon = data.coord.lon;
                let apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`;
                fetch(apiUrl2)
                    .then(function(response) {
                        if (response.ok) {
                            response.json().then(function(data2) {
                                console.log(apiUrl2);
                                console.log(data2);
                                let uvIndex = data2.current.uvi;
                                let uvIndexDiv = document.createElement("div");
                                if (uvIndex < 3){
                                    uvIndexDiv.setAttribute("class", "low");
                                }
                                else if (uvIndex >= 3 && uvIndex < 6 ) {
                                    uvIndexDiv.setAttribute("class", "moderate");
                                }
                                else if (uvIndex >= 6 && uvIndex < 8 ) {
                                    uvIndexDiv.setAttribute("class", "high");
                                }
                                else if (uvIndex >= 8 && uvIndex < 11 ) {
                                    uvIndexDiv.setAttribute("class", "very-high");
                                }
                                else if (uvIndex >= 11 ) {
                                    uvIndexDiv.setAttribute("class", "extreme");
                                };
                                
                                // Data array of faily weather attributes
                                // Index ranging from 1-5 for next five days in data object
                                const dailyData = [
                                    data2.daily[1],
                                    data2.daily[2],
                                    data2.daily[3],
                                    data2.daily[4],
                                    data2.daily[5]
                                ];

                                uvIndexDiv.innerHTML = `UV Index: ${data2.current.uvi}`
                                topDivContent2.appendChild(uvIndexDiv);

                                // 5 day forecast list creation
                                dailyData.forEach(displayForecast);
                            })
                        }

                    })
                    .catch(function(error) {

                        alert("Error: Unable to Connect to OpenWeatherMap");

                    })

                console.log(data);
                
                let forecastDiv = document.createElement("div");
                let topDiv = document.createElement("div");
                let topDivContent = document.createElement("div");
                let topDivContent2 = document.createElement("div");
                
                cityTitle.textContent = data.name; // adds title of city
                forecastHeader.innerHTML = `5 Day Forecast for ${data.name}`;
                currentWeatherEl.appendChild(forecastDiv);
                // Adds styling class and creates divs for display
                forecastDiv.appendChild(topDiv);
                topDiv.setAttribute("class", "flex justify-center ")
                topDivContent.setAttribute("class", "flex-initial");

                topDivContent2.setAttribute("class", "flex-initial flex-col pt-3 pb-3")
                topDiv.appendChild(topDivContent);
                topDiv.appendChild(topDivContent2);
                topDivContent.innerHTML = 
                `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">`;

                topDivContent2.innerHTML = 
                    `<div>Currently: ${data.weather[0].main} / ${Math.floor(data.main.temp)} F</div>
                    <div>Hi Temp: ${Math.floor(data.main.temp_max)} F</div>
                    <div>Lo Temp: ${Math.floor(data.main.temp_min)} F</div>
                    <div>Humidity: ${data.main.humidity}%</div>
                    <div>Wind: ${Math.floor(data.wind.speed)}mph</div>`;
            })
        }
    })
    .catch(function(error) {
        alert("Error: Unable to Connect to OpenWeatherMap");
    })
} 


var searchCity = function(event) {

    // prevents page from refreshing by default
    event.preventDefault();
    dailyForecastEl.innerHTML = "";
    currentWeatherEl.innerHTML = "";
    
    // get value from input element
    cityName = cityInput.value.trim()
    
    if (cityName) {
        getCityWeather(cityName);
        // clear old content
        cityInput.value = "";

    }
    else {
        alert("Invalid City Name: Try Again!")
        forecastHeader.innerHTML = "";
        cityTitle.innerHTML = "";
    }

    
    
    
}

var displayForecast = function(array){
    // initialized variables as daily weather attributes
    let hiTemp = `${Math.floor(array.temp.max)}`;
    let loTemp = `${Math.floor(array.temp.min)}`;
    let windSpeed = `${Math.floor(array.wind_speed)}`;
    let humidity = `${array.humidity}`;
    let date = `${array.dt}`;
    // converts time [Inspired by StackOverflow! :) ]
        function timeConverter(UNIX_timestamp){
            var a = new Date(UNIX_timestamp * 1000); // Create new DATE object and used its built in methods below
            var months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            
            var time = date + ' ' + month + ' ' + year;
            return time;
        }
      console.log(timeConverter(date));
   

    // append each list as a child to ul under class ".forecast"
    let dateHeader = document.createElement("h4"); // starting with header for time to display
    dateHeader.setAttribute("class", "forecast-time"); // set class to "forecast-time" to manipulate
    dateHeader.innerHTML = `${timeConverter(date)}`; // set inner html to sorted date

    let bigDiv = document.createElement("li");
    bigDiv.setAttribute("class", "border-2 p-1");

    let forecastTopDiv = document.createElement("div");
    forecastTopDiv.setAttribute("class", "flex-col justify-center border-b-1 p-1");
    forecastTopDiv.innerHTML = 
    `<div class="flex justify-center">
    <img src="http://openweathermap.org/img/wn/${array.weather[0].icon}@2x.png" alt="${array.weather[0].description}">
    </div>`;

    forecastTopDiv.append(dateHeader);

    // div elements to append to bigDiv
    let forecastTopDivContent = document.createElement("div");
    forecastTopDivContent.innerHTML = `Hi: ${hiTemp}`;
    forecastTopDiv.appendChild(forecastTopDivContent);

    let forecastTopDivContent2 = document.createElement("div");
    forecastTopDivContent2.innerHTML = `Lo: ${loTemp}`;
    forecastTopDiv.appendChild(forecastTopDivContent2);


    let forecastBottomDiv = document.createElement("div");
    forecastBottomDiv.setAttribute("class", "p-1");
    forecastBottomDiv.innerHTML = `<div>Wind: ${windSpeed}mph</div>` + `<div>Humidity: ${humidity}%</div>`;

    bigDiv.append(forecastTopDiv, forecastBottomDiv);
    

    dailyForecastEl.appendChild(bigDiv);
    
}

// Event Listener(s)
cityForm.addEventListener("submit", searchCity);


