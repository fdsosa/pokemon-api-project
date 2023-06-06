let listContainer = document.getElementById('list');
let listNav = document.getElementById('listNav');
let listAmount = document.getElementById('listAmount');
let loader = document.getElementById('loading-container');
let initialPkm = 1;
let cantPkm = 20; 
let activeFilterType = null;

document.getElementById('filterButton').addEventListener('click', filterList);

document.getElementById('previousList').addEventListener('click', () => {changeList('previous')});
document.getElementById('nextList').addEventListener('click', () => {changeList('next')});

document.getElementById('20-items').addEventListener('click', () => {cantPkm = 20; drawListOfPokemons(initialPkm, cantPkm, activeFilterType)});
document.getElementById('40-items').addEventListener('click', () => {cantPkm = 40; drawListOfPokemons(initialPkm, cantPkm, activeFilterType)});
document.getElementById('60-items').addEventListener('click', () => {cantPkm = 60; drawListOfPokemons(initialPkm, cantPkm, activeFilterType)});

//RETURN POKEMON OBJECT
async function getPokemon(pkm) { 
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkm}`)
    const pokemon = await response.json();
    return pokemon;
}

async function drawPokemonInList(pkm) {
    console.log('Dibujando...')
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
  card.setAttribute('id','targetContainer');
  card.style.display = 'flex';
  card.appendChild(img);  
  card.appendChild(pkmTitle)
  card.appendChild(pkmID)
  card.appendChild(listTypes);
  listContainer.appendChild(card);
  console.log('Dibujo terminado')
} 

async function drawListOfPokemons(initial, cant, filterType) {
    console.log('Accediendo lista de dibujado');
    if (listContainer.hasChildNodes()) {
        deleteListItems();
    }
    //Show loader
    listContainer.style.display = 'none';
    listAmount.style.display = 'none';
    listNav.style.display = 'none';
    loader.style.display = 'flex';
    //Filter function
    let filterLastPokemon = initial;
    if(activeFilterType != null) {
        var filteredPokemons = await pokemonsType(filterType)
    }
    for(i = initial; i < initial+cant; i++) {
        console.log('Iterando en el for');
        if (activeFilterType !== null && i < filteredPokemons.length) {
            console.log(filteredPokemons[i])
            await drawPokemonInList(filteredPokemons[i]); 
        } else  if (activeFilterType == null){
            await drawPokemonInList(i);
        }
    }
    //Hide loader
    listContainer.style.display = 'flex';
    listAmount.style.display = 'flex';
    listNav.style.display = 'flex';
    loader.style.display = 'none';
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
        drawListOfPokemons(cantPkm+initialPkm, cantPkm, activeFilterType);
        initialPkm = cantPkm+initialPkm;
    } else if (direction === 'previous' && initialPkm != 1) {
        deleteListItems();
        drawListOfPokemons(initialPkm-cantPkm, cantPkm, activeFilterType);
        initialPkm = initialPkm-cantPkm;
    }
}

//GET POKEMONS BY TYPE
async function pokemonsType(type) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
    let pokemons = await response.json();
    pokemons = pokemons.pokemon.map(pokemon => pokemon.pokemon.name);
    console.log(pokemons)
    return pokemons;
};

async function filterList() {
    console.log('Filtrando...')
    let typeValue = document.getElementById('filterSelect').value;
    if (typeValue == 'all') {
        activeFilterType = null;
        drawListOfPokemons(initialPkm, cantPkm);
    } else {
        activeFilterType = typeValue;
        drawListOfPokemons(initialPkm, cantPkm, typeValue);
    }
    console.log('Filtrando finalizado')
}

drawListOfPokemons(initialPkm, cantPkm)