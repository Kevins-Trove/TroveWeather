// -------------------------------------------------------------
// Global Declarations
// -------------------------------------------------------------
class ForecastDay {
    constuctor( city, conditions, date, temp, wind, humidity){
        this.city = city;
        this.conditions = conditions;
        this.dateTime = date;
        this.temp = temp;
        this.wind = wind;
        this.humidity = humidity;
    }
}

var forecast = [];

const openWeatheMapApiKey = '7b85f2bb86fc3cfd4942d30f29f7e19d';
const city = 'Seattle';
const countryCode = 'US';


fetchWeatherData(city, countryCode, openWeatheMapApiKey)
    .then(data => displayForecast(data))
    .catch(error => console.error('An error occurred:', error));

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city, countryCode, apiKey) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=imperial&appid=${openWeatheMapApiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

// Function to display weather forecast
function displayForecast(forecastData) {
    if (!forecastData) {
        alert('There is no forcast available for that city.');
        return;
    }

    // Iterate through each forecast entry
    console.log(forecastData);
    
    forecast = [];
    forecastData.list.forEach(entry => {
        var day = new ForecastDay();
        
        day.city = forecastData.city.name;
        day.dateTime = dayjs(entry.dt_txt);
        day.temp = entry.main.temp + "&#176;F";
        day.wind = entry.wind.speed + " mph";
        day.humidity = entry.main.humidity + "%";
        day.conditions = entry.weather[0].main;
        
        forecast.push(day);    
        
    });

    // Select only six days 
    var selectForecast = [5];
    
    for (var i =0 ; i <6 ; i++){
        selectForecast[i] = getDayForecast( dayjs().add(i, 'day'));
        //console.log( selectForecast[i]);
    }
    
    // Update controls
    $("#cityName").text(forecastData.city.name);
    
    var days = $(".dayDate");
    var temp = $(".temp");
    var wind = $(".wind");
    var humitity = $(".temp");

    
    temp.each(function(index) {
        $(this).text(selectForecast[index].temp);
      });

      wind.each(function(index) {
        $(this).text(selectForecast[index].wind);
      });

      humitity.each(function(index) {
        $(this).text(selectForecast[index].humitity);
      });


    
}

// select the forcast from noon for each day unless there is no noon then use last entry for that day
function getDayForecast(dateMatch){
    var dateCheck = dayjs(dateMatch);
    var day = new ForecastDay();
    
    forecast.forEach(entry => {
        if ( entry.dateTime.isSame(dateCheck, 'date')){
            day = entry
 
            if (entry.dateTime.hour() == 12) {
                return day;
            }
        }
    });

    return day;

}