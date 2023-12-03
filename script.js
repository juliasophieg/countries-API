const baseUrl = "https://restcountries.com/v3.1/all";
const countriesWrapper = document.querySelector("#countries-wrapper");
const countryTextElement = document.querySelector("#country-text");
const flagElement = document.querySelector("#flag");
const continentElement = document.querySelector("#continent");
const populationElement = document.querySelector("#population");
const capitalElement = document.querySelector("#capital");
const allCountriesButton = document.querySelector("#all-countries");
const randomButton = document.querySelector("#random");
const quizButton = document.querySelector("#quiz");

//Fetching all countries
allCountriesButton.addEventListener("click", function () {
  const fetchAllCountries = async () => {
    const response = await fetch(baseUrl);
    const countries = await response.json();

    console.log(countries);

    //Sorting by common name
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    countriesWrapper.innerHTML = "";

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

      //Expand
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
  };

  fetchAllCountries();
});

//Fetching random countries
randomButton.addEventListener("click", function () {
  const fetchRandomCountry = async () => {
    const response = await fetch(baseUrl);
    const countries = await response.json();

    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex].name.common;
    const randomFlag = countries[randomIndex].flag;
    const randomContinent = countries[randomIndex].continents;
    const randomPopulation = countries[randomIndex].population;
    const randomCapital = countries[randomIndex].capital;

    countryTextElement.textContent = randomCountry;
    flagElement.textContent = randomFlag;
    continentElement.textContent = `Continent: ${randomContinent}`;
    populationElement.textContent = `Population ${randomPopulation}`;
    capitalElement.textContent = `Capital: ${randomCapital}`;
  };

  fetchRandomCountry();
});
