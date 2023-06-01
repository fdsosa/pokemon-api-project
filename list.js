let listContainer = document.getElementById('list');
let initialPkm = 1;
let cantPkm = 20; 

document.getElementById('previousList').addEventListener('click', () => {changeList('previous')});
document.getElementById('nextList').addEventListener('click', () => {changeList('next')});

document.getElementById('20-items').addEventListener('click', () => {cantPkm = 20; drawListOfPokemons(initialPkm, cantPkm)});
document.getElementById('40-items').addEventListener('click', () => {cantPkm = 40; drawListOfPokemons(initialPkm, cantPkm)});
document.getElementById('60-items').addEventListener('click', () => {cantPkm = 60; drawListOfPokemons(initialPkm, cantPkm)});

//RETURN POKEMON OBJECT
async function getPokemon(pkm) { 
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkm}`)
    const pokemon = await response.json();
    return pokemon;
}

async function drawPokemonInList(pkm) {
  //TITLE
  pkm = await getPokemon(pkm);
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
  let card = document.createElement('div');
  card.classList.add('targetPresentation');
  card.style.display = 'flex';
  card.appendChild(img);  
  card.appendChild(pkmTitle)
  card.appendChild(pkmID)
  card.appendChild(listTypes);
  listContainer.appendChild(card);
} 

async function drawListOfPokemons(initial, cant) {
    if (listContainer.hasChildNodes()) {
        deleteListItems();
    }
    for(i = initial; i < initial+cant; i++) {
        await drawPokemonInList(i);
    }
}

//CLEAN LIST
function deleteListItems() {
    while(listContainer.hasChildNodes()) {
        listContainer.removeChild(listContainer.firstChild);
    }
}

//PREVIOUS OR NEXT LIST
function changeList(direction) {
    if (direction === 'next') {
        deleteListItems();
        drawListOfPokemons(cantPkm+initialPkm, cantPkm);
        initialPkm = cantPkm+initialPkm;
    } else if (direction === 'previous' && initialPkm != 1) {
        deleteListItems();
        drawListOfPokemons(initialPkm-cantPkm, cantPkm);
        initialPkm = initialPkm-cantPkm;
    }
}

drawListOfPokemons(initialPkm, cantPkm)