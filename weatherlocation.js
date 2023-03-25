function load() {
    if (navigator.geolocation) {
      // if browser support geolocation api
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      alert("Your browser not support geolocation api");
    }
  }
  
  function onSuccess(position) {
    const { latitude, longitude } = position.coords; // getting lat and lon of the user device from coords obj
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
  }
  
  function onError(error) {
    // if any error occur while getting user location then we'll show it in infoText
    windows.alert("location not found");
  }
  
  function fetchData() {
    // getting api response and returning it with parsing into js obj and in another
    // then function calling weatherDetails function with passing api result as an argument
    fetch(api)
      .then((res) => res.json())
      .then((result) => weatherDetails(result))
      .catch(() => {
        window.alert("Cant Access to Open weather Map API");
      });
  }
  
  
  function weatherDetails(info) {
      const city = info.name;
      const country = info.sys.country;
      const { description, id } = info.weather[0];
      const { temp, feels_like, humidity } = info.main;
  
      //passing a particular weather info to a particular element
      document.querySelector("#tempertureg").innerText = Math.floor(temp);
      document.querySelector("#wdes").innerText = description;
      document.querySelector("#location").innerText = `${city}, ${country}`;
      document.querySelector("#humidity").innerText = "Humidity :" + " " + `${humidity}%`;
  }
  
  
  window.onload = load();