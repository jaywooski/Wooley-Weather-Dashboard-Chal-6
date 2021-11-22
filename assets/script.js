let searchForm = document.querySelector("#search-form");;
let cityInput = document.querySelector("#city-input");
let cityButton = document.querySelector("#city-button");
let cityTitle = document.querySelector("#current-city");
let currentWeatherEl = document.querySelector(".current")
let dailyForecastEl = document.querySelector(".forecast");
// Personal API key to be used for project and from here on out

const apiKey = "cc742ab3f18c60ff03116b342797094a"





 function getCityWeather(cityName) {
    // event.preventDefault();
    // console.log(cityForm.value);
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    
    console.log(cityName);
    console.log(apiUrl);

    // console.log(cityForm);
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {             
                const lat = data.coord.lat;
                const lon = data.coord.lon;
                let apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`
                fetch(apiUrl2)
                    .then(function(response) {
                        if (response.ok) {
                            response.json().then(function(data2) {
                               
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
                                
                                uvIndexDiv.innerHTML = `UV Index: ${data2.current.uvi}`
                                topDivContent2.appendChild(uvIndexDiv);
                                
                            })
                        }// Currently: ${data.weather[0].main}
                    }).catch(function(error) {
                        alert("Error: City name invalid");
                    })
                console.log(data);
                
                let forecastDiv = document.createElement("div");
                let topDiv = document.createElement("div");
                let bottomDiv = document.createElement("div");
                let topDivContent = document.createElement("div");
                let topDivContent2 = document.createElement("div");
                
                cityTitle.textContent = data.name; // adds title of city
                currentWeatherEl.appendChild(forecastDiv);
                // Adds styling class and creates divs for display
                forecastDiv.appendChild(topDiv);
                topDiv.setAttribute("class", "flex justify-center ")
                topDivContent.setAttribute("class", "flex-initial");

                forecastDiv.appendChild(bottomDiv);
                topDivContent2.setAttribute("class", "flex-initial flex-col pt-3 pb-3")
                topDiv.appendChild(topDivContent);
                topDiv.appendChild(topDivContent2);
                topDivContent.innerHTML = 
                `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">`;

                topDivContent2.innerHTML = 
                    `<div>Currently: ${data.weather[0].main} / ${data.main.temp} F</div>
                    <div>Hi Temp: ${data.main.temp_max} F</div>
                    <div>Lo Temp: ${data.main.temp_min} F</div>
                    <div>Humidity: ${data.main.humidity}%</div>
                    <div>Wind Speed: ${data.wind.speed} mph</div>`;
                
                
                
            })
        }// Currently: ${data.weather[0].main}
    })
    .catch(function(error) {
        alert("Error: City name invalid");
    })
} 
// cityButton.addEventListener("submit", getCityName);

var searchCity = function(event) {

    // prevents page from refreshing by default
    event.preventDefault();
    
    // get value from input element
    cityName = cityInput.value.trim()
    
    if (cityName) {
        getCityWeather(cityName);
    }
    else {
        alert("Unable to connect to OpenWeatherMap")
    }

    // clear old content
    cityInput.textContent = "";
    
    
}

// var displayCurrentWeather = function(data){
//     // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    
    
    
    
    
// }
// searchCity();

searchForm.addEventListener("submit", searchCity);


