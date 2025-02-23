"use strict";

let quotes = [];

async function getQuotes() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/ryzmdn/quotes-generator/refs/heads/main/quotes.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (result.code !== 200 || !result.data) {
      throw new Error("Data is not found or the format is invalid.");
    }

    quotes = result.data;

    if (quotes.length === 0) {
      return;
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const quote = document.getElementById("quote");
    const author = document.getElementById("author");

    quote.textContent = randomQuote.quote;
    author.textContent = randomQuote.author;
    author.href = `https://www.google.com/search?q=${encodeURIComponent(randomQuote.author)}`;
  } catch (error) {
    console.log(`Error! ${error}`);
  }
}

getQuotes();
