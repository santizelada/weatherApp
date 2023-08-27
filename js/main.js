const apiKey = "ea64807460cedbd450d314ef4e2597be"
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?q="

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city)
{
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const card = document.querySelector(".card")


    
    card.classList.remove("hot-bg", "warm-bg", "cold-bg", "very-cold-bg");




    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else if (city == "") {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else {

        
    var data = await response.json()
    
    document.querySelector(".city").innerHTML = data.name
    // document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F"
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp - 273.15) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
    document.querySelector(".wind").innerHTML = data.wind.speed + "m/h"

    const temperatureCelsius = Math.round(data.main.temp - 273.15);
    


    if (temperatureCelsius > 25) {
        card.classList.add("hot-bg");
        card.classList.remove("warm-bg", "cold-bg", "very-cold-bg", "colorDefault");

    } else if (temperatureCelsius > 15) {
        card.classList.add("warm-bg");
        card.classList.remove("hot-bg", "cold-bg", "very-cold-bg", "colorDefault");
    } else if (temperatureCelsius > 5) {
        card.classList.add("cold-bg");
        card.classList.remove("hot-bg", "warm-bg", "very-cold-bg", "colorDefault");
    } else {
        card.classList.add("very-cold-bg");
        card.classList.remove("hot-bg", "warm-bg", "cold-bg", "colorDefault");

    }



    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "/img/clouds.png"
    }
    else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "/img/clear.png"
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "/img/drizzle.png"
    }
    else if (data.weather[0].main == "Humidity") {
        weatherIcon.src = "/img/mist.png"
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "/img/rain.png"
    }
    else if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "/img/clouds.png"
    }
    else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "/img/snow.png"
    }
    else if (data.weather[0].main == "wind") {
        weatherIcon.src = "/img/wind.png"
    }
    document.querySelector(".weather").style.display = "block"
    document.querySelector(".error").style.display = "none"
    }

}

searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value)
    })

searchBox.addEventListener("keydown", function(event){
    if (event.key === "Enter"){
        checkWeather(searchBox.value)
    }
})

checkWeather()


