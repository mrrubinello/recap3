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
  cardContainer.innerHTML = "";
  if (currentPage >= 1 && currentPage <= maxPage) {
    currentPage++;
    fetchCharacters(currentPage);
    pagination.textContent = "1 / " + currentPage;
  }
});

prevButton.addEventListener("click", (event) => {
  event.preventDefault();
  cardContainer.innerHTML = "";
  if (currentPage >= 2 && currentPage <= maxPage) {
    currentPage--;
    fetchCharacters(currentPage);
    pagination.textContent = "1 / " + currentPage;
  } else if (currentPage === 2) {
    return;
  }
});

async function fetchCharacters(page) {
  try {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character/?page=" + page
    );

    //debugging
    // console.log(data.results[0]);

    if (response.ok) {
      cardContainer.innerHTML = "";
      const data = await response.json();
      data.results.forEach((character) => {
        //create card with data
        //console.log(data.results);
        const card = createCharacterCard(
          character.image,
          character.name,
          character.status,
          character.type,
          character.episode.length
        );
        cardContainer.append(card);
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
