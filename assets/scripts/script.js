// -------------------------------------------------------------
// Global Declarations
// -------------------------------------------------------------
class ForecastDay {
    constuctor( city, conditions, date, temp, wind, humidity){
        this.city = city;
        this.conditions = conditions;
        this.date = date;
        this.temp = temp;
        this.wind = wind;
        this.humidity = humidity;
    }
}

var forecast;

const openWeatheMapApiKey = '7b85f2bb86fc3cfd4942d30f29f7e19d';
const city = 'Seattle';
const countryCode = 'US';


fetchWeatherData(city, countryCode, openWeatheMapApiKey)
    .then(data => displayForecast(data))
    .catch(error => console.error('An error occurred:', error));

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city, countryCode, apiKey) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${openWeatheMapApiKey}`;

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
        console.error('No forecast data available.');
        return;
    }

    console.log(forecastData.city.name);
    
    
    // Iterate through each forecast entry
    console.log(forecastData);
    forecastData.list.forEach(entry => {
        var day = new ForecastDay();
        day.city = forecastData.city.name;
        
        // select the weather at noon each day
        var time = new Date(entry.dt_txt)
        if (time.getHours() == 12){
            day.date = entry.dt_txt;
            day.temp = entry.main.temp;
            day.wind = entry.wind.speed;
            day.humidity = entry.main.humidity;
            day.conditions = entry.weather[0].main;
            console.log(day);
         
    
        }
        

        //$("#cityName").text(forecastData.city.name);

    });
}


this.city = city;
this.conditions = conditions;
this.date = date;
this.temp = temp;
this.wind = wind;
this.humidity = humidity;
