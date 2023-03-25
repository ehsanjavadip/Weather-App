//Get All Elements : 
const txtcity = document.querySelector("#txtcity");
const btngo = document.querySelector("#btngo");
const errorcity = document.querySelector(".errorcity");
const cities = document.querySelector(".cities");

 

//this is my openweather map api key
const apiKey = "edc228562ac0a8aa3116d41c0687cf56";

//click function : 
btngo.addEventListener("click", getCity);

function getCity(event) {
   event.preventDefault();
   var city = txtcity.value;
   txtcity.value = "";
   errorcity.innerText = "";

   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    if (city == "") {
    } else {
        fetch(url)
            .then(data => data.json())
            .then(val => {
                const { main, name, sys, weather } = val;
                
                var icon;
                const li = document.createElement("li");
                li.classList.add("city");

                var day = moment().format('dddd');
                var numt = moment().format('Do');
                var month = moment().format('MMMM');
                var year = moment().format('YYYY');
                
                var forcast = weather[0].description;

                switch (forcast) {
                    case "scattered clouds" : 
                      icon = "./assets/icons/cloudy.svg";
                      break;
                    case "clear sky" :
                      if(moment().format('a') == "am") {
                        icon = "./assets/icons/clear-day.svg";
                        break;
                      } else {
                        icon = "./assets/icons/clear-night.svg";
                        break;
                      }
                    case "overcast clouds" : 
                      icon = "./assets/icons/overcast.svg";
                      break;
                    case "few clouds" : 
                      icon = "./assets/icons/cloudy.svg";
                      break;
                    case "haze" : 
                      icon = "./assets/icons/haze.svg";
                      break;
                    case "broken clouds" : 
                      icon = "./assets/icons/partly-cloudy-day.svg";
                      break;

                    default:
                        icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
                }

                const markup = `
                    <p class="ptime">${day}, ${numt} ${month} ${year}</p>
                    <img src='${icon}' alt="weather logo" width="170px" class="imgweather"/>
                    <h3 data-name=${name},${sys.country}>${name} ${sys.country}</h3>
                    <h4>${Math.round(main.temp)} C</h4>
                    <p class="wdes">${weather[0].description}</p>
                    <div class="temperture">
                        <p class="ptemp">Min : ${main.temp_min} | Max : ${main.temp_max}</p>
                    </div>

                `;
                li.innerHTML = markup;
                cities.appendChild(li);
                console.log(weather[0].icon);
            })

            .catch(() => errorcity.innerText = "Please Enter a valid City")
        }
}