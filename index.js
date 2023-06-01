// SEARCH POKEMON BUTTON
const srchBtn = document.getElementById('searchButton');
srchBtn.addEventListener('click', searchPokemon);

//RETURN POKEMON OBJECT
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

async function drawPokemon(pkm) {
  //INITIAL LOADER
  let loader = document.getElementById('loading-container');
  loader.style.display = 'flex';
  //TITLE
  let pkmTitle = document.createElement('h4');
  pkmTitle.innerText = pkm.name.toUpperCase();
  //ID
  let pkmID = document.createElement('span');
  pkmID.innerText = `#${pkm.id}`;
  //IMAGE
  let img = new Image(200,200);
  img.src = pkm.sprites.front_default;
  //TYPES
  let listTypes = document.createElement('ul');
  for (let i = 0; i < pkm.types.length; i++) {
    let itemType = document.createElement('li');
    itemType.innerText = pkm.types[i].type.name.toUpperCase();
    itemType.classList.add(pkm.types[i].type.name);
    listTypes.appendChild(itemType);
  }
  console.log(pkm.types[0]);
  /*
  img.addEventListener("mouseover", () => {img.src = pkm.sprites.back_default})
  img.addEventListener("mouseout", () => {img.src = pkm.sprites.front_default})
  */
 //REMOVE PREVIOUS POKEMON IF NEEDED
 let targetContainer = document.getElementById('targetPresentation');
  while (targetContainer.hasChildNodes()) {
   targetContainer.removeChild(targetContainer.firstChild);
  }
  loader.style.display = 'none'; 
  targetContainer.style.display = 'flex';
  targetContainer.appendChild(img);  
  targetContainer.appendChild(pkmTitle)
  targetContainer.appendChild(pkmID)
  targetContainer.appendChild(listTypes);
}