document.addEventListener("DOMContentLoaded", generateQuote);

function generateQuote() {
    const quoteElement = document.getElementById("quote");

    // Fetch a random quote from the Quotable API
    fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => {
            const quoteText = data.content;
            const author = data.author;

            // Display the quote
            quoteElement.innerHTML = `"${quoteText}" - ${author}`;
        })
        .catch(error => {
            console.error("Error fetching quote:", error);
        });
}
