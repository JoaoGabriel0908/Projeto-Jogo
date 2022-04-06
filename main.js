'use strict'

const pesquisarJogos = async() => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/games?key=${apikey}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const pegarDescricao = async(id) => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/games/${id}?key=${apikey}`
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const pegarGenero = (genero) => genero.name

// const pegarPlataformas = (plataforma) => plataforma.platform.name

const criarCard = ({background_image, name, genres, parent_platforms, released}) => {
    
    const card = document.createElement('div')
    card.classList.add('card-jogo')
    card.innerHTML = `
    <span class="card-image-container">
        <img src=${background_image} class="card-image">
    </span>
    <div class="descricao">
    <span class="card-nome">
        <h1>${name}</h1>
    </span>
    <span class="card-generos">
        <p class="info"> Genero: <p class="info2">${genres.map(pegarGenero)}</p></p>
    </span>
    <span class="card-data">
        <p class="info"> Lançamento: <p class="info2">${released}</p></p>
    </span>
    </div>
    
    `
    // <span class="card-plataforma">
        // ${parent_platforms.map(pegarPlataformas)}
    //</span>
    
    // console.log(parent_platforms)
    return card;
}


const carregarPrincipal = async() => {
    const container = document.querySelector('.card2')
    const {results} = await pesquisarJogos()
    const cards = results.map(criarCard)
    container.replaceChildren(...cards)
    return cards
}

carregarPrincipal()

const carregarDescricao = async(id) => {
    const container = document.querySelector('.card2')
    const {results} = await pegarDescricao()
    const cards = results.map(criarCard)
    container.replaceChildren(...cards)
    return cards
}

carregarDescricao()

const carregarJogos = async() => {
    const container = document.querySelector('.card')
    const {results} = await pesquisarJogos()
    const cards = results.map(criarCard)
    container.replaceChildren(...cards)
    return cards
}

carregarJogos()

const buscarGenero = async() => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/genres?key=${apikey}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const criarGenero = ({name}) => {
    
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `
        <span class="card-image-container">
            <img src=${background_image} class="card-image">
        </span>
        <span class="card-nome">
            <h1>${name}</h1>
        </span>
    
    `
    return card
}

const carregarGeneros = async() => {
    const container = document.querySelector('.card-genero')
    const {results} = await buscarGenero()
    const generos = results.map(criarGenero)
    container.replaceChildren(...generos)
    return generos
}

// carregarGeneros()

const criarJogos = ({games, image_background}) => {
    
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `
        <span class="card-image-container">
            <img src=${image_background} class="card-image">
        </span>
        <span class="card-nome">
            <h1>${games}</h1>
        </span>
    
    `
    return card
}

const jogosGeneros = async() => {
    const container = document.querySelector('jogosGeneros')
    const {results} = await buscarGenero()
    const jogos = results.map(criarJogos)
    container.replaceChildren(...jogos)
    return jogos
}



//function para limpar elementos ao pesquisar
const limparElementos = (elemento) => {
    while (elemento.firstChild) {
      elemento.removeChild(elemento.lastChild);
    }
  };

const handleClickHawks = async ({ target }) => {
    //identifica se uma imagem de time foi clicada
    if (target.classList.value === "logos") {
      //chamada função para limpar os cards
      limparElementos(container);
  
      //buscando players por meio do id da imagem
      const players = await searchPlayers(target.id);
  
      players.map(criarImg);
  
      document.getElementById("team").value = target.id;
    }
  };
  
//   document.getElementById("buscar").addEventListener("click", carregarCard);
  
//   document
//     .getElementById("container-teams")
//     .addEventListener("click", handleClickHawks);


// const abrirModal = () =>{
//         document
//             .getElementById('modal-container')
//             .classList.add('active')
// } 

const abrirModal = () =>{
    document
        .getElementById('modal-container')
        .classList.add('active')
} 
    
const fecharModal = () =>{
    document
        .getElementById('modal-container')
        .classList.remove('active')
}
    
// Modal
document
    .getElementById('abrir-modal')
    .addEventListener('click', abrirModal)
    
document
    .getElementById('fechar')
    .addEventListener('click', fecharModal)

document
    .getElementById('modal-container')
    .addEventListener('click', fecharModal)