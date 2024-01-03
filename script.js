const baseUrl = "https://restcountries.com/v3.1/all";
const countriesWrapper = document.querySelector("#countries-wrapper");
const allCountriesButton = document.querySelector("#all-countries");
const randomButton = document.querySelector("#random");
const gamesButton = document.querySelector("#games");
const header = document.querySelector("header");
const home = document.querySelector(".home");
const menu = document.querySelector(".menu");
const base = document.querySelector(".base");

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

  //GAMES

  gamesButton.addEventListener("click", function () {
    countriesWrapper.innerHTML = "";
    const flagGuess = document.createElement("div");
    flagGuess.classList.add("games-div");
    const flagGuessTitle = document.createElement("h2");
    const flagGuessBtns = document.createElement("div");
    flagGuessBtns.classList.add("buttons-div");
    const flagGuessInfo = document.createElement("button");
    flagGuessInfo.classList.add("game-info");
    const flagGuessPlay = document.createElement("button");
    flagGuessPlay.classList.add("game-play");

    /*const capitalGuess = document.createElement("div");
    capitalGuess.classList.add("games-div");
    const capitalGuessTitle = document.createElement("h2");
    const capitalGuessBtns = document.createElement("div");
    capitalGuessBtns.classList.add("buttons-div");
    const capitalGuessInfo = document.createElement("button");
    capitalGuessInfo.classList.add("game-info");
    const capitalGuessPlay = document.createElement("button");
    capitalGuessPlay.classList.add("game-play");*/

    flagGuessTitle.textContent = "Guess the Flag";
    flagGuessInfo.textContent = "How to play";
    flagGuessPlay.textContent = "Play!";

    /*capitalGuessTitle.textContent = "Guess the Capital";
    capitalGuessInfo.textContent = "How to play";
    capitalGuessPlay.textContent = "Play!";*/

    flagGuess.appendChild(flagGuessTitle);
    flagGuessBtns.appendChild(flagGuessInfo);
    flagGuessBtns.appendChild(flagGuessPlay);
    flagGuess.appendChild(flagGuessBtns);
    countriesWrapper.appendChild(flagGuess);

    /*capitalGuess.appendChild(capitalGuessTitle);
    capitalGuessBtns.appendChild(capitalGuessInfo);
    capitalGuessBtns.appendChild(capitalGuessPlay);
    capitalGuess.appendChild(capitalGuessBtns);
    countriesWrapper.appendChild(capitalGuess);*/

    flagGuessInfo.addEventListener("click", function () {
      alert;
    });

    //Generate question
    function generateQuestion() {
      //Shuffle array function
      function shuffle(array) {
        let currentIndex = array.length,
          randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }

        return array;
      }

      //Shuffle entire countries array in order to get different answer groups each time
      shuffle(countries);

      //Creating answers-array
      const answerOptions = [
        countries[1].name.common,
        countries[2].name.common,
        countries[3].name.common,
        countries[4].name.common,
      ];

      //Shuffle answers array so correct answer position changes each time
      shuffle(answerOptions);

      //Correct answer
      const correctAnswer = countries[1].name.common;

      //Question wrapper
      const questionWrapper = document.createElement("div");
      questionWrapper.classList.add("question-wrapper");
      countriesWrapper.appendChild(questionWrapper);

      //Flag
      const flag = new Image(350);
      questionWrapper.appendChild(flag);
      flag.src = countries[1].flags.png;
      flag.classList.add("flag-game");

      //Question
      const question = document.createElement("h2");
      question.textContent = "Which country has this flag?";
      questionWrapper.appendChild(question);

      //Answer options
      const answersWrapper = document.createElement("div");
      answersWrapper.classList.add("answers-wrapper");
      questionWrapper.appendChild(answersWrapper);

      answerOptions.forEach((answer) => {
        const answerBox = document.createElement("div");
        answerBox.classList.add("answer");
        answersWrapper.appendChild(answerBox);

        answerBox.textContent = answer;
        //When clicking on an answer
        answerBox.addEventListener("click", function () {
          if (answer === correctAnswer) {
            //If correct answer: Show message and "Next"-button
            answerBox.style.backgroundColor = "#BFF2B2";

            const rightAnswerWrapper = document.createElement("div");
            rightAnswerWrapper.classList.add("right-answer-wrapper");
            answersWrapper.appendChild(rightAnswerWrapper);

            const correctMessage = document.createElement("p");
            correctMessage.textContent = "Right answer! ⭐";
            rightAnswerWrapper.appendChild(correctMessage);

            const nextQuestion = document.createElement("button");
            nextQuestion.textContent = "Next";
            nextQuestion.classList.add("next");
            rightAnswerWrapper.appendChild(nextQuestion);
            nextQuestion.addEventListener("click", function () {
              countriesWrapper.innerHTML = "";
              generateQuestion();
            });
          } else {
            //If wrong answer: Show message and let the user try again
            answerBox.style.backgroundColor = "#FF8F8F";
            console.log("Wrong answer, try again");
          }
        });
      });
    }

    //Play flag game
    flagGuessPlay.addEventListener("click", function () {
      header.style.display = "flex";
      base.style.display = "none";
      countriesWrapper.innerHTML = "";
      generateQuestion();
    });
  });
};
fetchCountries();

home.addEventListener("click", function () {
  header.style.display = "none";
  base.style.display = "flex";
  window.location.href = "/";
});
