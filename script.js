const baseUrl = "https://type.fit/api/quotes";
const quoteWrapper = document.querySelector("#quote-wrapper");
const quoteTextElement = document.querySelector("#quote-text");
const randomButton = document.querySelector("#random");
const catgoriesButton = document.querySelector("#catagories");

randomButton.addEventListener("click", function () {
  const fetchRandomQuote = async () => {
    const response = await fetch(baseUrl);
    const quotes = await response.json();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex].text;

    quoteTextElement.textContent = randomQuote;
  };

  fetchRandomQuote();
});
