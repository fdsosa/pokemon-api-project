const srchBtn = document.getElementById('searchButton');
srchBtn.addEventListener('click', searchPokemon);

async function getPokemon(pkm) { 
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkm}`)
  const pokemon = await response.json();
  return pokemon;
}


async function searchPokemon() {
  let pkmName = document.getElementById('pokemonName').value;
  let pkmObject = await getPokemon(pkmName);
  console.log(pkmObject)
  drawPokemon(pkmObject);
}

function drawPokemon(pkm) {
    let img = new Image(300,300);
    img.src = pkm.sprites.front_default;
    img.addEventListener("mouseover", () => {img.src = pkm.sprites.back_default})
    img.addEventListener("mouseout", () => {img.src = pkm.sprites.front_default})
    let mainContainer = document.getElementById('resultContainer');
    mainContainer.appendChild(img)
}

//initPage();