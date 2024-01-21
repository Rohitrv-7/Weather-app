const APIkey = "85be21544f777fd2bb5a0aa965c8efc0";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const weatherdata = document.querySelector(".containerbox");
const city = document.querySelector("#city");
const btn = document.querySelector("#btn");

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    const cityname = city.value;
    getweatherdata(cityname)
});

async function getweatherdata(cityname){
    console.log("fetching")
    try {
        const res = await fetch(url+ cityname + `&appid=${APIkey}`)

        if(!res.ok){
            throw new Error("Network Response was not ok")
        }
        const data = await res.json();
        console.log(data)
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}`,
            `Wind Speed: ${data.wind.speed}`,
        ]
        weatherdata.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">`
        weatherdata.querySelector(".temprature").textContent = `${temp}°C`;
        weatherdata.querySelector(".description").textContent = description;
        weatherdata.querySelector(".details").innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("");
    } catch (error) {
        console.log(error)
    }
}