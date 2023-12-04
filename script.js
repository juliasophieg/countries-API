const baseUrl = "https://restcountries.com/v3.1/all";
const countriesWrapper = document.querySelector("#countries-wrapper");
const allCountriesButton = document.querySelector("#all-countries");
const randomButton = document.querySelector("#random");
const gamesButton = document.querySelector("#games");

//Fetching countries
const fetchCountries = async () => {
  const response = await fetch(baseUrl);
  const countries = await response.json();

  //Showing all countries

  allCountriesButton.addEventListener("click", function () {
    //Sorting alphabetically by common name
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    countriesWrapper.innerHTML = "";

    // Creating div-element for every country

    countries.forEach((country) => {
      const countryDiv = document.createElement("div");
      countryDiv.classList.add("country-div");
      const countryButton = document.createElement("div");
      countryButton.classList.add("country-button");
      const countryInfo = document.createElement("div");
      countryInfo.classList.add("country-info");
      const countryInfoText = document.createElement("div");
      countryInfoText.classList.add("country-info-text");
      const countryName = document.createElement("h2");
      const moreButton = document.createElement("button");
      moreButton.classList.add("show-more");
      const countryContinent = document.createElement("p");
      const countryPopulation = document.createElement("p");
      const countryCapital = document.createElement("p");
      const countryFlag = new Image(150);

      //Putting information from countries into divs

      countryName.textContent = country.name.common;
      countryContinent.textContent = `Continent: ${country.continents}`;
      countryPopulation.textContent = `Population: ${country.population}`;
      countryCapital.textContent = `Capital: ${country.capital}`;
      countryFlag.src = country.flags.png;

      countryInfoText.appendChild(countryContinent);
      countryInfoText.appendChild(countryPopulation);
      countryInfoText.appendChild(countryCapital);

      countryInfo.appendChild(countryInfoText);
      countryInfo.appendChild(countryFlag);

      countryButton.appendChild(countryName);
      countryButton.appendChild(moreButton);

      countryDiv.appendChild(countryButton);
      countryDiv.appendChild(countryInfo);

      countriesWrapper.appendChild(countryDiv);

      //Show more info when clicking the down-arrow
      countryInfo.style.display = "none";
      countryButton.addEventListener("click", function (e) {
        moreButton.classList.toggle("close");
        if (countryInfo.style.display === "none") {
          countryInfo.style.display = "flex";
        } else {
          countryInfo.style.display = "none";
        }
      });
    });
  });

  //Showing random country
  randomButton.addEventListener("click", function () {
    countriesWrapper.innerHTML = "";

    // Getting random index

    const randomIndex = Math.floor(Math.random() * countries.length);

    // Creating div-elements for random country

    const countryDiv = document.createElement("div");
    countryDiv.classList.add("country-div");
    const countryButton = document.createElement("div");
    countryButton.classList.add("country-button");
    const countryInfo = document.createElement("div");
    countryInfo.classList.add("country-info");
    const countryInfoText = document.createElement("div");
    countryInfoText.classList.add("country-info-text");
    const countryName = document.createElement("h2");
    const countryContinent = document.createElement("p");
    const countryPopulation = document.createElement("p");
    const countryCapital = document.createElement("p");
    const countryFlag = new Image(150);

    //Putting information from random country into divs

    countryName.textContent = countries[randomIndex].name.common;
    countryContinent.textContent = `Continent: ${countries[randomIndex].continents}`;
    countryPopulation.textContent = `Population: ${countries[randomIndex].population}`;
    countryCapital.textContent = `Capital: ${countries[randomIndex].capital}`;
    countryFlag.src = countries[randomIndex].flags.png;

    countryInfoText.appendChild(countryContinent);
    countryInfoText.appendChild(countryPopulation);
    countryInfoText.appendChild(countryCapital);

    countryInfo.appendChild(countryInfoText);
    countryInfo.appendChild(countryFlag);

    countryButton.appendChild(countryName);

    countryDiv.appendChild(countryButton);
    countryDiv.appendChild(countryInfo);

    countriesWrapper.appendChild(countryDiv);
  });
};
fetchCountries();

//Games button message

gamesButton.addEventListener("click", function () {
  countriesWrapper.innerHTML = "";
  const gamesDiv = document.createElement("div");
  gamesDiv.classList.add("games-div");
  gamesDiv.textContent = "Oh no! No games exist yet :(";
  countriesWrapper.appendChild(gamesDiv);
});
