/*
// When the #search-input element contains the value Red 
and the #search-button element is clicked, an alert 
should appear with the text "Pokémon not found"

// When the #search-input element contains the value 
Pikachu and the #search-button element is clicked, the values
in the #pokemon-name, #pokemon-id, #weight, #height, #hp, 
#attack, #defense, #special-attack, #special-defense, and 
#speed elements should be PIKACHU, #25 or 25, Weight: 60 or 
60, Height: 4 or 4, 35, 55, 40, 50, 50, and 90, respectively

// When the #search-input element contains the value Pikachu 
and the #search-button element is clicked, you should add an 
img element with the id of "sprite" and the src set to the Pokémon's 
front_default sprite to the page

// When the #search-input element contains the value Pikachu and 
the #search-button element is clicked, the #types element should 
contain a single inner element with the value ELECTRIC. The #types
element content should be cleared between searches

// When the #search-input element contains the value 94 and the 
#search-button element is clicked, the values in the #pokemon-name, 
#pokemon-id, #weight, #height, #hp, #attack, #defense, #special-attack, 
#special-defense, and #speedelements should be GENGAR, #94 or 94, Weight: 
405 or 405, Height: 15 or 15, 60, 65, 60, 130, 75, and 110, respectively

// When the #search-input element contains the value 94 and the #search-
button element is clicked, you should add an img element with the id of 
sprite and the src set to the Pokémon's front_default sprite to the page

// When the #search-input element contains the value 94 and the #search-button 
element is clicked, the #types element should contain two inner elements 
with the text values GHOST and POISON, respectively. The #types element content 
should be cleared between searches
*/

const pokeAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pokemonInfo = document.getElementById("pokemon-info");
const BTN = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

const fetchPokeAPI = async () => {
  try {
    const response = await fetch(pokeAPI);
    const data = await response.json();
    searchByNameOrId(data);
  } catch (error) {
    console.error(error);
  }
};

const fetchFeatures = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const validationInput = () => {
  let searchValue = searchInput.value;
  const inputRegex = /[^a-zA-Z]+/gi;
  const inputSpecialFameleRegex = /[\u2640]/;
  const inputSpecialMaleRegex = /[\u2642]/;
  const inputIdRegex = /^\d+$/;

  if (inputIdRegex.test(searchValue)) {
    searchValue = parseInt(searchValue);
    return searchValue;
  } else if (isNaN(searchValue)) {
    searchValue = searchValue.replace(inputRegex, "").toLowerCase();
    return searchValue;
  } else if (
    inputSpecialFameleRegex.test(searchValue) ||
    inputSpecialMaleRegex.test(searchValue)
  ) {
    searchValue = searchValue
      .replace(inputSpecialFameleRegex, "-f")
      .toLowerCase();
    searchValue = searchValue
      .replace(inputSpecialMaleRegex, "-m")
      .toLowerCase();
    return searchValue;
  }
};

const searchByNameOrId = (data) => {
  const nameOrId = validationInput();
  const { count, results } = data;
  let findIndexByIdOrName;

  if (isNaN(nameOrId)) {
    findIndexByIdOrName = results.findIndex((index) => index.name === nameOrId);
  } else if (!isNaN(nameOrId)) {
    findIndexByIdOrName = results.findIndex((index) => index.id === nameOrId);
  }

  if (findIndexByIdOrName < 0 || findIndexByIdOrName >= count) {
    alert("Pokemon not Found");
  } else {
    const { url } = results[findIndexByIdOrName];
    const featuresURL = url;
    const pokemonFeatures = fetchFeatures(featuresURL);
    console.log(pokemonFeatures);
    return pokemonFeatures;
  }
};

const displayPokemonFeatures = (data) => {
  const features = searchByNameOrId(data);
  const { name, id, weight, height, sprites, stats, types } = features;
  const { front_default } = sprites;

  const kindPokemon = types
    .map((type) => {
      const name = types.type.name;
      return `<span>${name}</span>`;
    })
    .join("");

  const statisticRows = stats
    .map((stat) => {
      const name = stats.stat.name;
      const base_stat = stats.base_stat;
      return `<tr>
      <td>${name}:</td>
      <td><span class="base-stat">${base_stat}</span></td>
      </tr>`;
    })
    .join("");

  pokemonInfo.innerHTML = `
  <div id="pokemon-info">
    <table>
        <tr>
            <td>Pokemon Name: ${name}</td>
            <td><span id="pokemon-id">#${id}</span></td>
        </tr>
        <tr>
            <td>Weight:</td>
            <td><span id="weight">${weight}</span></td>
        </tr>
        <tr>
            <td>Height:</td>
            <td><span id="height">${height}</span></td>
        </tr>
    </table>
    <img src="${front_default}" alt="pokemon-avatar">
    <p id="types">${kindPokemon}</p>

    <table>
        ${statisticRows}
    </table>
  </div>
`;
};

BTN.addEventListener("click", (event) => {
  event.preventDefault();
  fetchPokeAPI();
});
