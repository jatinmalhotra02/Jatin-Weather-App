const card = document.querySelector(".card");
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search");
const tempBox = document.querySelector(".temp-box");
const weatherIcon = document.querySelector(".weather-icon img");
const currentTemp = document.querySelector(".current-temp");
const descriptionDisplay = document.querySelector(".description");
const locationResponseIcon = document.querySelector(".location-response-icon");
const locationResponseName = document.querySelector(".location-response-name");
const weatherDetails = document.querySelector(".weather-details");

// ERROR BOX
const errorBox = document.querySelector(".error-box");
const errorIcon = document.querySelector(".error-icon img");
const errorMessage = document.querySelector(".error-message");

searchButton.addEventListener("click", search);
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        search();
    }
})

function search () {

    // 
    tempBox.style.display = "none";
    errorBox.style.display = "none";

    const cityName = document.querySelector(".search-bar input").value;
    
    if (cityName === '') { 
        card.style.height = "128px";
        return;
    }
        


    const apiKey = "156c3f32351ce6aeb8a61bcbb5f58c71";
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`

    fetch(apiCall)
    .then(response => response.json())
    // SUCCESS
    .then(
        result => {


            if (result.cod == '404') {
                card.style.height = "385px"
                errorBox.style.display = "flex";
                errorIcon.classList.add("grow-in");
                errorMessage.classList.add("grow-in");
                return;
            }

            tempBox.style.display = "flex";
            card.style.height = "720px"

            weatherIcon.classList.add("slide-in");
            currentTemp.classList.add("grow-in");
            descriptionDisplay.classList.add("grow-in");
            locationResponseIcon.classList.add("grow-in");
            locationResponseName.classList.add("grow-in");
            weatherDetails.classList.add("grow-in");

            console.log(result);
            const city = result.name;
            const country = result.sys.country;
            const {description, id} = result.weather[0];
            const {temp, humidity, } = result.main;
            const windSpeed = result.wind.speed;

            document.querySelector(".current-temp .num").innerText = Math.round(temp);
            document.querySelector(".description").innerText = description;
            document.querySelector(".location-response-name").innerText = `${city}, ${country}`;
            document.querySelector(".humidity").innerText = humidity + "%";
            document.querySelector(".wind-speed").innerText = windSpeed + " Km/h";

            if (id === 800) {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3222/3222807.png";
            }
            else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4150/4150897.png";
            }
            else if (id >= 600 && id <= 622) {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/5906/5906790.png";
            }
            else if (id >= 701 && id <= 781) {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1146/1146799.png";
            }
            else if (id >= 801 && id <= 804) {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/252/252035.png";
            }
        }
    )

}