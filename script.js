const apiKey = "5b41710c4bb4bb38241c3dd1f635cd6d";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");

        async function checkWeather(city) {
            try {
                const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error("City not found");
                }
                const data = await response.json();

                // Extract the necessary data from the API response
                const temp = Math.round(data.main.temp); // Current temperature
                const humidity = data.main.humidity; // Humidity
                const windSpeed = data.wind.speed; // Wind speed
                const weatherCondition = data.weather[0].main; // Weather condition (Clouds, Clear, etc.)
                const cityName = data.name; // City name

                // Display the weather details in the corresponding elements
                document.querySelector(".city").innerHTML = cityName;
                document.querySelector(".temp").innerHTML = temp + "°C";
                document.querySelector(".humidity").innerHTML = humidity + "%";
                document.querySelector(".wind").innerHTML = windSpeed + " km/h";

                // Update the weather icon based on the condition
                if (weatherCondition === "Clouds") {
                    weatherIcon.src = "images/cloudy.png";
                } else if (weatherCondition === "Clear") {
                    weatherIcon.src = "images/sun.png";
                } else if (weatherCondition === "Rain") {
                    weatherIcon.src = "images/rain.png";
                } else if (weatherCondition === "Drizzle") {
                    weatherIcon.src = "images/snow.png";
                } else if (weatherCondition === "Mist") {
                    weatherIcon.src = "images/mist.png";
                }

                // Make the weather section visible after the data is fetched
                document.querySelector(".weather").style.display = "block";

            } catch (error) {
                console.error(error);
                alert("Error fetching weather data: " + error.message);
            }
        }

        searchBtn.addEventListener("click", () => {
            let cityName = searchBox.value.trim();
            if (cityName !== "") {
                checkWeather(cityName);
            } else {
                alert("Please enter a city name.");
            }
        });