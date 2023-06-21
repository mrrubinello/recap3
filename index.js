import { createCharacterCard } from "./components/card/card.js";

/*
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";
*/

const cardContainer = document.querySelector('[data-js="card-container"]');

async function fetchCharacters() {
  const url = "https://rickandmortyapi.com/api/character/";

  const response = await fetch(url);
  const data = await response.json();
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
      console.rerror("Bad response");
    }
  } catch (error) {
    //log error
    console.error(error);
  }
}

fetchCharacters();
