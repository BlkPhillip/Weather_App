let weather = {
  apiKey: WEATHER_API,
  unsplashApiKey: UNSPLASH_API,
  fetchWeather: function (address) {
    fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        address +
        "?unitGroup=metric&key=" +
        this.apiKey +
        "&contentType=json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.displayWeather(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });

    fetch(
      `https://api.unsplash.com/search/photos?query=${address}&client_id=${this.unsplashApiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const imageUrl = data.results[0].urls.regular;

          // Set the background image
          this.setBackgroundImage(imageUrl);
        }
      })
      .catch((error) => {
        console.error("Error fetching background image:", error);
      });
  },
  setBackgroundImage: function (imageUrl) {
    // Set the background image of the .background element
    document.querySelector("body").style.backgroundImage = `url('${imageUrl}')`;
  },

  displayWeather: function (data) {
    const { address, timezone, resolvedAddress } = data;
    const { description, tempmax, tempmin, sunrise, sunset } = data.days[0];

    const utcTime = luxon.DateTime.utc();
    const localTime = utcTime.setZone(timezone);

    document.querySelector(".city").innerText = address;
    document.querySelector(".description").innerText = description;
    document.querySelector(".time-zone").innerText = resolvedAddress;

    const svgTempmax = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M416 0c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm-160-16C256 50.1 205.9 0 144 0S32 50.1 32 112v166.5C12.3 303.2 0 334 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-34-12.3-64.9-32-89.5V112zM144 448c-44.1 0-80-35.9-80-80 0-25.5 12.2-48.9 32-63.8V112c0-26.5 21.5-48 48-48s48 21.5 48 48v192.2c19.8 14.8 32 38.3 32 63.8 0 44.1-35.9 80-80 80zm16-125.1V112c0-8.8-7.2-16-16-16s-16 7.2-16 16v210.9c-18.6 6.6-32 24.2-32 45.1 0 26.5 21.5 48 48 48s48-21.5 48-48c0-20.9-13.4-38.5-32-45.1z"></path></svg>`;

    document.querySelector(".temp-max").innerHTML =
      svgTempmax + "&nbsp;" + tempmax + "°C";

    const svgTempmin = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M192 384c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-35.346 28.654-64 64-64s64 28.654 64 64zm32-84.653c19.912 22.563 32 52.194 32 84.653 0 70.696-57.303 128-128 128-.299 0-.609-.001-.909-.003C56.789 511.509-.357 453.636.002 383.333.166 351.135 12.225 321.755 32 299.347V96c0-53.019 42.981-96 96-96s96 42.981 96 96v203.347zM208 384c0-34.339-19.37-52.19-32-66.502V96c0-26.467-21.533-48-48-48S80 69.533 80 96v221.498c-12.732 14.428-31.825 32.1-31.999 66.08-.224 43.876 35.563 80.116 79.423 80.42L128 464c44.112 0 80-35.888 80-80z"></path></svg>`;

    document.querySelector(".temp-min").innerHTML =
      svgTempmin + "&nbsp;" + tempmin + "°C";

    const svgSunrise = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline></svg>`;

    document.querySelector(".sunrise").innerHTML =
      svgSunrise + "&nbsp;" + sunrise;

    const svgSunset = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="16 5 12 9 8 5"></polyline></svg>`;

    document.querySelector(".sunset").innerHTML = svgSunset + "&nbsp;" + sunset;

    document.querySelector(".current-date").innerText =
      localTime.toLocaleString({
        weekday: "short",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    document.querySelector(".current-time").innerText =
      localTime.toLocaleString({
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      });

    const currentWeatherData = data.days[0].hours.reduce(
      (closest, hourData) => {
        const hourTime = luxon.DateTime.fromSeconds(hourData.datetimeEpoch, {
          zone: timezone,
        });
        const closestTime = luxon.DateTime.fromSeconds(closest.datetimeEpoch, {
          zone: timezone,
        });

        if (hourTime.hour === localTime.hour) {
          return hourData;
        } else {
          return closest;
        }
      }
    );

    if (currentWeatherData) {
      const { icon, temp, humidity, windspeed, solarradiation, precipprob } =
        currentWeatherData;

      document.querySelector(".icon").src = "./svg/" + icon + ".svg";
      document.querySelector(".temp").innerText = temp + "°C";

      const svgHumidity = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M352 146.4c-34.4-48.6-67.5-78.5-90.8-96.6-3.1-2.4-7.3-2.4-10.4-.1-23 17.1-56.1 48.4-90.5 96.5-37.3 52-63 108.4-64.2 170.9 0 1.2-.1 2.5-.1 3.7 0 18.4 3.9 35.9 10.9 52.1 4.1 9.3 9.2 18.1 15.2 26.3 28.5 39 77.8 64.8 133.8 64.8 88.4 0 160.1-64.1 160.1-143.2 0-63.7-27-122.2-64-174.4zm-86 264.3h-.5c-9.9 0-12-14.1-2.6-17.1 45.1-14.2 69.6-38.5 86.4-80.8 3.5-8.9 16.7-6.5 16.8 3.1v1.4c-.1 51.6-44.9 93.4-100.1 93.4z"></path></svg>`;

      document.querySelector(".humidity").innerHTML =
        svgHumidity + "&nbsp" + humidity + "%";

      const svgWindspeed = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M13 5.5C13 3.57 11.43 2 9.5 2 7.466 2 6.25 3.525 6.25 5h2c0-.415.388-1 1.25-1C10.327 4 11 4.673 11 5.5S10.327 7 9.5 7H2v2h7.5C11.43 9 13 7.43 13 5.5zM15.5 15H8v2h7.5c.827 0 1.5.673 1.5 1.5S16.327 20 15.5 20c-.862 0-1.25-.585-1.25-1h-2c0 1.475 1.216 3 3.25 3 1.93 0 3.5-1.57 3.5-3.5S17.43 15 15.5 15z"></path><path d="M18 5c-2.206 0-4 1.794-4 4h2c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2H2v2h16c2.206 0 4-1.794 4-4S20.206 5 18 5zM2 15H6V17H2z"></path></svg>`;

      document.querySelector(".wind").innerHTML =
        svgWindspeed + "&nbsp" + windspeed + " Km/h";

      const svgSolar = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M312 256h79.1c9.2 0 16.9-7.7 16-16.8-4.6-43.6-27-81.8-59.5-107.8-7.6-6.1-18.8-4.5-24 3.8L281.9 202c18 11.2 30.1 31.2 30.1 54zm-97.8 54.1L172.4 377c-4.9 7.8-2.4 18.4 5.8 22.5 21.1 10.4 44.7 16.5 69.8 16.5s48.7-6.1 69.9-16.5c8.2-4.1 10.6-14.7 5.8-22.5l-41.8-66.9c-9.8 6.2-21.4 9.9-33.8 9.9s-24.1-3.7-33.9-9.9zM104.9 256H184c0-22.8 12.1-42.8 30.2-54.1l-41.7-66.8c-5.2-8.3-16.4-9.9-24-3.8-32.6 26-54.9 64.2-59.5 107.8-1.1 9.2 6.7 16.9 15.9 16.9zM248 504c137 0 248-111 248-248S385 8 248 8 0 119 0 256s111 248 248 248zm0-432c101.5 0 184 82.5 184 184s-82.5 184-184 184S64 357.5 64 256 146.5 72 248 72zm0 216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z"></path></svg>`;

      document.querySelector(".solar-radiation").innerHTML =
        svgSolar + "&nbsp" + solarradiation + " W/m²";

      const svgPrecip = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M8 13H10V17H8zM8 18H10V20H8zM11 15H13V19H11zM11 20H13V22H11zM14 13H16V17H14zM14 18H16V20H14z"></path><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path></svg>`;

      document.querySelector(".precip").innerHTML =
        svgPrecip + "&nbsp" + precipprob + "%";
    }
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    weather.search();
  }
});
