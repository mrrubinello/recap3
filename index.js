import { createCharacterCard } from "./components/card/card.js";

const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42;
const page = 1;
const searchQuery = "";
let currentPage = 1;

const cardContainer = document.querySelector('[data-js="card-container"]');

nextButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (currentPage >= 1 && currentPage <= maxPage) {
    currentPage++;
    cardContainer.innerHTML = "";
    console.log(currentPage);
    fetchCharacters(currentPage);
  }
});

async function fetchCharacters(page) {
  let url = "https://rickandmortyapi.com/api/character/";
  //console.log(url);
  if (page === 1) {
    url;
    console.log("ja");
  } else {
    url = "https://rickandmortyapi.com/api/character/?page=" + page;
    console.log(url);
  }

  let response = await fetch(url);
  let data = await response.json();

  //debugging
  // console.log(data.results[0]);

  try {
    if (response.ok) {
      cardContainer.innerHTML = "";
      data.results.forEach((character) => {
        //create card with data
        //console.log(data.results);
        createCharacterCard(
          character.image,
          character.name,
          character.status,
          character.type,
          character.episode.length
        );
      });
    } else {
      //log error bad response
      console.error("Bad response");
    }
  } catch (error) {
    //log error
    console.error(error);
  }
}

fetchCharacters();
