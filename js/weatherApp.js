//access DOM Elements
const cityInfoElement = document.querySelector(".city-info");
const searchInputElement = document.querySelector(".search-city");
const showButtonElement = document.querySelector(".show-city-info");
const clearElement = document.querySelector(".clear");

const baseUrl =
  "https://api.weatherstack.com/current?access_key=52c26a88b489342befdd7f85d2a32b73&query=";

showButtonElement.addEventListener("click", function (e) {
  e.preventDefault();
  if (searchInputElement.value) {
    getCityInfo(searchInputElement.value.trim());
  } else {
    showAndRemoveError(searchInputElement, "Please enter city name");
    cityInfoElement.innerHTML = "";
  }
});

//clear previous results
cityInfoElement.addEventListener("click", function (e) {
  if (e.target.className === "clear") {
    cityInfoElement.innerHTML = "";
    searchInputElement.value = "";
  }
});

// show And Remove Error
function showAndRemoveError(searchInput, errorMessage) {
  const p = document.createElement("p");
  p.className = "error";
  p.innerText = errorMessage;
  searchInput.before(p);
  setTimeout(function () {
    p.remove();
  }, 1000);
}

const getCityInfo = async (cityName) => {
  const response = await fetch(`${baseUrl}${cityName}`);
  const cityInfo = await response.json();
  cityInfoElement.innerHTML = "";
  cityInfoElement.append(clearElement);
  cityInfoElement.innerHTML += `<li>temperature : ${cityInfo["current"]["temperature"]}</li>
                                <li>city : ${cityInfo["location"]["name"]}</li>
                                <li>country : ${cityInfo["location"]["country"]}</li>
                                <li>latitude : ${cityInfo["location"]["lat"]}</li>
                                <li>longtitude : ${cityInfo["location"]["lon"]}</li>`;
};