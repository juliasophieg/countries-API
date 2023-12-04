const baseUrl = "https://restcountries.com/v3.1/all";
const countriesWrapper = document.querySelector("#countries-wrapper");
const allCountriesButton = document.querySelector("#all-countries");
const randomButton = document.querySelector("#random");
const gamesButton = document.querySelector("#games");

//Fetching countries
const fetchCountries = async () => {
  const response = await fetch(baseUrl);
  const countries = await response.json();

  //Function to display information about country/countries
  function displayData() {
    const countryDiv = document.createElement("div");
    countryDiv.classList.add("country-div");
    const countryBanner = document.createElement("div");
    countryBanner.classList.add("country-banner");
    const countryInfo = document.createElement("div");
    countryInfo.classList.add("country-info");
    const countryInfoText = document.createElement("div");
    countryInfoText.classList.add("country-info-text");
    const countryName = document.createElement("h2");
    const moreButton = document.createElement("button");
    moreButton.classList.add("show-more");
    const countryContinent = document.createElement("p");
    countryContinent.classList.add("continent");
    const countryPopulation = document.createElement("p");
    countryPopulation.classList.add("population");
    const countryCapital = document.createElement("p");
    countryCapital.classList.add("capital");
    const countryFlag = new Image(150);

    countryInfoText.appendChild(countryContinent);
    countryInfoText.appendChild(countryPopulation);
    countryInfoText.appendChild(countryCapital);
    countryInfo.appendChild(countryInfoText);
    countryInfo.appendChild(countryFlag);
    countryBanner.appendChild(countryName);
    countryBanner.appendChild(moreButton);
    countryDiv.appendChild(countryBanner);
    countryDiv.appendChild(countryInfo);
    countriesWrapper.appendChild(countryDiv);

    return {
      countryName,
      countryBanner,
      moreButton,
      countryInfo,
      countryContinent,
      countryPopulation,
      countryCapital,
      countryFlag,
    };
  }

  // GET ALL COUNTRIES

  allCountriesButton.addEventListener("click", function () {
    //Sorting alphabetically by common name
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    countriesWrapper.innerHTML = "";

    // Creating a div-element for every country

    countries.forEach((country) => {
      const {
        countryName,
        countryBanner,
        moreButton,
        countryInfo,
        countryContinent,
        countryPopulation,
        countryCapital,
        countryFlag,
      } = displayData(country);

      //Putting information from countries into divs

      countryName.textContent = country.name.common;
      countryContinent.textContent = `Continent: ${country.continents}`;
      countryPopulation.textContent = `Population: ${country.population}`;
      countryCapital.textContent = `Capital: ${country.capital}`;
      countryFlag.src = country.flags.png;

      //Show more info when clicking the down-arrow
      countryInfo.style.display = "none";
      countryBanner.addEventListener("click", function (e) {
        moreButton.classList.toggle("close");
        if (countryInfo.style.display === "none") {
          countryInfo.style.display = "flex";
        } else {
          countryInfo.style.display = "none";
        }
      });
    });
  });

  // GET RANDOM COUNTRY

  randomButton.addEventListener("click", function () {
    countriesWrapper.innerHTML = "";

    // Getting random index

    const randomIndex = Math.floor(Math.random() * countries.length);

    // Creating elements for random country

    const {
      countryName,
      moreButton,
      countryContinent,
      countryPopulation,
      countryCapital,
      countryFlag,
    } = displayData(countries);

    //Putting information from random country into div

    countryName.textContent = countries[randomIndex].name.common;
    countryContinent.textContent = `Continent: ${countries[randomIndex].continents}`;
    countryPopulation.textContent = `Population: ${countries[randomIndex].population}`;
    countryCapital.textContent = `Capital: ${countries[randomIndex].capital}`;
    countryFlag.src = countries[randomIndex].flags.png;

    //Hide open/close button
    moreButton.style.display = "none";
  });
};
fetchCountries();

//GAMES BUTTON MESSAGE

gamesButton.addEventListener("click", function () {
  countriesWrapper.innerHTML = "";
  const gamesDiv = document.createElement("div");
  gamesDiv.classList.add("games-div");
  gamesDiv.textContent = "Oh no! No games exist yet :(";
  countriesWrapper.appendChild(gamesDiv);
});
