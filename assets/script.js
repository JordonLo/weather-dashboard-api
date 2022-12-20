var latOfCity;
var lonOfCity;
var cityAndDateEl = document.getElementById('city-and-date');
var currentTempEl = document.getElementById('current-temp');
var currentWindEl = document.getElementById('current-wind');
var currentHumidityEl = document.getElementById('current-humidity');
var currentSymbolEl = document.getElementById('current-symbol');
var inputEl = document.getElementById('exampleDataList');
var searchButton = document.getElementById("search-button");
var dataListEl = document.getElementById("datalistOptions");
var inputValue;
var userButtonEl = document.getElementById("user-button");
var locationList = ['Atlanta','Denver', 'Seattle', 'San Francisco', 'Orlando', 'New York'];

for (let i = 0; i < locationList.length; i++) {
    const listElementValue = locationList[i];
    var listEl = document.createElement('option');
    listEl.setAttribute('value',locationList[i]);
    dataListEl.appendChild(listEl);
}

renderLastViewedCity();

function renderLastViewedCity(){
var lastCity = localStorage.getItem("userCityName");
var userButtonEl = document.createElement('button');
userButtonEl.setAttribute('class','btn btn-lg city-btn');
userButtonEl.setAttribute('id','user-button');
userButtonEl.textContent = lastCity;
document.getElementById('custom-btn').appendChild(userButtonEl);
console.log(lastCity);
};

function getApi(inputValue){

 localStorage.setItem("userCityName", inputValue);
 
var coordinateRequesrURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + inputValue + '&limit=5&appid=c733f29fb2e44ff15762ff2d60996023&units';
fetch(coordinateRequesrURL)
   .then(function (response){
    return response.json();
   })
   .then(function(data){
    console.log(data)
    latOfCity = data[0].lat;
    lonOfCity = data[0].lon;
    console.log(data[0].lat);
    console.log(data[0].lon);

  var requestURL = ('https://api.openweathermap.org/data/2.5/forecast?lat=' + latOfCity + '&lon=' + lonOfCity + '&appid=c733f29fb2e44ff15762ff2d60996023&units=imperial');
  
  fetch(requestURL)
   .then(function (response){
    return response.json();
   })
   .then(function(data){
    console.log(data)
    console.log(data.list[0].main.temp);
    console.log(data.list[0].wind.speed);
    console.log(data.list[0].main.humidity);
    console.log(data.list[0].weather.id);

    var currentDate = dayjs(data.list[0].dt_txt).format('MM/DD/YYYY'); 
    cityAndDateEl.textContent = data.city.name + " (" + currentDate + ")";

    currentTempEl.textContent = 'Temp: ' + data.list[0].main.temp + ' F';
    currentWindEl.textContent = 'Wind: ' + data.list[0].wind.speed + ' MPH';
    currentHumidityEl.textContent = 'Humidity: ' + data.list[0].main.humidity + ' %';
    
    currentSymbolEl.setAttribute("var", data.list[0].weather.icon);
    currentSymbolEl.setAttribute("number", data.list[0].weather.id);
    currentSymbolEl.setAttribute("name", data.list[0].weather.description);

    document.getElementById('day-1-date').textContent = dayjs(data.list[0].dt_txt).format('MM/DD/YYYY');
    document.getElementById('day-1-temp').textContent = 'Temp: ' + data.list[0].main.temp + ' F';
    document.getElementById('day-1-wind').textContent = 'Wind: ' + data.list[0].wind.speed + ' MPH';
    document.getElementById('day-1-hum').textContent = 'Humidity: ' + data.list[0].main.humidity + ' %';

    document.getElementById('day-2-date').textContent = dayjs(data.list[8].dt_txt).format('MM/DD/YYYY');
    document.getElementById('day-2-temp').textContent = 'Temp: ' + data.list[8].main.temp + ' F';
    document.getElementById('day-2-wind').textContent = 'Wind: ' + data.list[8].wind.speed + ' MPH';
    document.getElementById('day-2-hum').textContent = 'Humidity: ' + data.list[8].main.humidity + ' %';

    document.getElementById('day-3-date').textContent = dayjs(data.list[16].dt_txt).format('MM/DD/YYYY');
    document.getElementById('day-3-temp').textContent = 'Temp: ' + data.list[16].main.temp + ' F';
    document.getElementById('day-3-wind').textContent = 'Wind: ' + data.list[16].wind.speed + ' MPH';
    document.getElementById('day-3-hum').textContent = 'Humidity: ' + data.list[16].main.humidity + ' %';

    document.getElementById('day-4-date').textContent = dayjs(data.list[24].dt_txt).format('MM/DD/YYYY');
    document.getElementById('day-4-temp').textContent = 'Temp: ' + data.list[24].main.temp + ' F';
    document.getElementById('day-4-wind').textContent = 'Wind: ' + data.list[24].wind.speed + ' MPH';
    document.getElementById('day-4-hum').textContent = 'Humidity: ' + data.list[24].main.humidity + ' %';

    document.getElementById('day-5-date').textContent = dayjs(data.list[32].dt_txt).format('MM/DD/YYYY');
    document.getElementById('day-5-temp').textContent = 'Temp: ' + data.list[32].main.temp + ' F';
    document.getElementById('day-5-wind').textContent = 'Wind: ' + data.list[32].wind.speed + ' MPH';
    document.getElementById('day-5-hum').textContent = 'Humidity: ' + data.list[32].main.humidity + ' %';
   });
});
}

searchButton.addEventListener('click', function(){
    inputValue = inputEl.value;
    console.log(inputValue);
getApi(inputEl.value);
});

console.log(userButtonEl);

userButtonEl.addEventListener('click', function(){
    inputValue = userButtonEl.textContent;
    console.log(inputValue);
    getApi(inputValue)
});