const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/weather"
}

const SearchBox = document.querySelector('.search-box');
SearchBox.addEventListener('keypress', Setquery);
//keypress event on -> enter
function Setquery(e) {
    if (e.keyCode === 13) {
        getWeatherInfo(SearchBox.value);
    }
}

function getWeatherInfo(cityName) {
    //building URL Using template String
    let Url = `${api.base}?q=${cityName}&units=metric&appid=${api.key}`;
    fetch(Url)
        .then((weather) => {
            console.log(weather)
            return weather.json();
        }).then((response) => {
            console.log(response);
            if (response.cod === 200) {
                displayResults(response);
            } else {
                alert(response.message);
            }
        }).catch((error) => {
            alert(error);
        })
}

function displayResults(WeatherInfo) {
    console.log(WeatherInfo);
    let city = document.querySelector('.location .city');
    city.innerText = `${WeatherInfo.name}, ${WeatherInfo.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(WeatherInfo.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = WeatherInfo.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(WeatherInfo.main.temp_min)}°c / ${Math.round(WeatherInfo.main.temp_max)}°c`;

}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    const DATE_FORMAT_OPTIONS = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }
    return d.toLocaleDateString("guj-IND", DATE_FORMAT_OPTIONS);
    // return `${day}, ${date} , ${month} , ${year}`

}









