 //to get country name interernation 
 const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
};



//to get date and time 
const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000)

    console.log(curDate)

    const options = {
        weeday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",

    };
    const formatter = new Intl.DateTimeFormat("dt", options)
    console.log(formatter)
    return formatter.format(curDate)
}


let weather_locaton = document.querySelector(".locaton")
let weather_date_time = document.querySelector(".date_time")
let currentWeatherStatus = document.querySelector(".weather_status")
let w_icon = document.querySelector(".weather_icon")

let weatherTemp = document.querySelector(".temp")
let weatherMin_temp = document.querySelector(".min_temp")
let weatherMax_temp = document.querySelector(".max_temp")


let weather_feels_status = document.querySelector(".w_feels_statu")
let weather_humidity_status = document.querySelector(".w_humidity_statu")
let weather_wind_status = document.querySelector(".w_wind_statu")
let weather_pressure = document.querySelector(".w_pressure_statu")

//apikey   9c4bca3a3aabcc25c98719a91261b3f2,,,,,0d945c6b839c5acf5d142de348f2da62

const searchBox = document.querySelector(".search_bar input")
const searchButton = document.querySelector(".search_bar span")




let city = "Varanasi"

const getWeatherData = async (city) => {
const wetherUrl = `https://api.openweathermap.org/data/2.5/weather? unit=metric &q=${city}&APPID=9c4bca3a3aabcc25c98719a91261b3f2&units=metric`
    try {
        const res = await fetch(wetherUrl)
        const data = await res.json();
        console.log(data)
        //desturaction of object
        const { weather, sys, name, main, wind, dt } = data;

        weather_locaton.innerHTML = `${name}, ${getCountryName(sys.country)}`;

        weather_date_time.innerHTML = getDateTime(dt);

        currentWeatherStatus.innerHTML = `${data.weather[0].main}`

        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`

        weatherTemp.innerHTML = `${Math.floor(data.main.temp)}&#176C`

        weatherMin_temp.innerHTML = `Min: ${Math.floor(data.main.temp_min)}&#176C`
        weatherMax_temp.innerHTML = `Max: ${Math.floor(data.main.temp_max)}&#176C`



        weather_feels_status.innerHTML = `${main.feels_like}&#176`
        weather_humidity_status.innerHTML = `${main.humidity}%`

        weather_wind_status.innerHTML = `${wind.speed}m/s`
        weather_pressure.innerHTML = `${main.pressure}hPa`

    } catch (error) {
        console.log(error)
    }
}
searchButton.addEventListener("click", () => {
    getWeatherData(searchBox.value)
})
document.body.addEventListener("load", getWeatherData(city))