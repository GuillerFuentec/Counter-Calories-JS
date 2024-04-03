const pokeAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pokemonInfo = document.getElementById("pokemon-info");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

const fetchPokemonData = async (nameOrId) => {
  try {
    const response = await fetch(`${pokeAPI}/${nameOrId}`);
    if (!response.ok) {
      throw new Error("Pokemon not found");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const validationInput = () => {
  let searchValue = searchInput.value.trim();
  const inputIdRegex = /^\d+$/;

  if (inputIdRegex.test(searchValue)) {
    return parseInt(searchValue);
  } else {
    searchValue = searchValue.replace(/[^\w\s]/gi, "").toLowerCase().replace(/\s+/g, "-");
    return searchValue;
  }
};

const searchByNameOrId = async () => {
  try {
    const nameOrId = validationInput();
    const pokemonData = await fetchPokemonData(nameOrId);
    displayPokemonFeatures(pokemonData);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const calculateStats = (stats) => {
  const formattedStats = {};
  stats.forEach((stat) => {
    formattedStats[stat.stat.name] = stat.base_stat;
  });
  return formattedStats;
};

const displayPokemonFeatures = (data) => {
  const { name, id, weight, height, sprites, stats, types } = data;
  const { front_default } = sprites;

  const kindPokemon = types.map((type) => {
    return `<span>${type.type.name}</span>`;
  }).join(' ');

  const formattedStats = calculateStats(stats);

  pokemonInfo.innerHTML = `
    <div id="pokemon-info">
      <table>
          <tr>
              <td id="pokemon-name">${name.toUpperCase()}</td>
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
          <tr>
              <td>HP:</td>
              <td><span id="hp">${formattedStats["hp"]}</span></td>
          </tr>
          <tr>
              <td>Attack:</td>
              <td><span id="attack">${formattedStats["attack"]}</span></td>
          </tr>
          <tr>
              <td>Defense:</td>
              <td><span id="defense">${formattedStats["defense"]}</span></td>
          </tr>
          <tr>
              <td>Special Attack:</td>
              <td><span id="special-attack">${formattedStats["special-attack"]}</span></td>
          </tr>
          <tr>
              <td>Special Defense:</td>
              <td><span id="special-defense">${formattedStats["special-defense"]}</span></td>
          </tr>
          <tr>
              <td>Speed:</td>
              <td><span id="speed">${formattedStats["speed"]}</span></td>
          </tr>
      </table>
      <p id="types">${kindPokemon}</p>
      <img id="sprite" src="${front_default}" alt="pokemon-sprite">
    </div>
  `;
};

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  searchByNameOrId();
});
