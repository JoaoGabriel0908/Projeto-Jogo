'use strict'

const cardContainer = document.querySelector('.card')
const loaderContainer = document.querySelector('.loader')


// Trazendo os jogos
const pesquisarJogos = async(page) => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/games?key=${apikey}${page}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// Trazendo os jogos da página 2
const pesquisarJogos2 = async() => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/games?key=${apikey}&page=2`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// Pegando a descrição de cada jogo
const pegarDescricao = async(id) => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/games/${id}?key=${apikey}`
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Colocando os generos dos jogos em formatos de links
const pegarGenero = (genero) => `
    <a href="#" onClick="buscarJogos(${genero.name})">
        ${genero.name}
    </a>
    `

// const pegarPlataformas = (plataforma) => plataforma.platform.name

// Criando o card com os jogos que buscamos 
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
        <p class="info"> Genero: <p class="info2">${genres.map(pegarGenero).join(' / ')}</p></p>
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
    return card
}

// Carregando os jogos e mostrando na tela
const carregarJogos = async(page=1) => {
    const container = document.querySelector('.card')
    const {results, count} = await pesquisarJogos(`&page=${page}`)
    const cards = results.map(criarCard)
    container.replaceChildren(...cards)
    const totalPage = Math.ceil (count/19);
    document.querySelector('#pageTotal').textContent = `/ ${totalPage}`;
    document.querySelector('#page').value = page    
}

carregarJogos()

// Carregando os jogos e mostrando na tela
// const carregarJogos2 = async() => {
//     const container = document.querySelector('.card2')
//     const {results} = await pesquisarJogos2()
//     const cards = results.map(criarCard)
//     container.replaceChildren(...cards)
    
// }

// carregarJogos2()

// Pegando a api por generos
const jogosGeneros = async(genres) => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/games?genres=${genres}&key=${apikey}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// // Criando o card dos generos
const criarGenero = ({name, background_image, genres, released}) => {
    
    const card = document.createElement('div')
    card.classList.add('card-jogo')
    card.innerHTML = `
        <span class="card-image-container">
            <img src=${background_image} class="card-image">
        </span>
        <span class="card-nome">
            <h1>${name}</h1>
        </span>
        <span class="card-generos">
            <p class="info"> Genero: <p class="info2">${genres.map(pegarGenero).join(' / ')}</p></p>
        </span>
        <span class="card-data">
            <p class="info"> Lançamento: <p class="info2">${released}</p></p>
        </span>
    `
    return card
}

const pegandoEnter = ({key, target}) => {
    if(key === 'Enter'){
        buscarJogos(target.value)
    }
}

document.querySelector('.jogo')
        .addEventListener('keypress', pegandoEnter);

// Carregando array e trazendo na tela
const carregarInfos = async (name) => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/games?key=${apikey}&search=${name}`
    const response = await fetch(url)
    return response.json()
}

// Criando cards que foi pesquisado pelo usuário
const createCard = ({background_image, name, genres, released}) => {
    
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
    return card
}

// Buscando jogos que o usuário trouxe
const buscarJogos = async (name) => {
    const container = document.querySelector('.jogosPesquisados')
    const {results} = await carregarInfos(name);
    const cards = results.map(createCard);
    container.replaceChildren(...cards)
    return cards
}

// // Pegando o click do enter e pesquisando
// const handleKeypress = ({key, target}) => {
//     if(key === 'Enter'){
//         buscarJogos(target.value)
//     }
// }

const handlePage = ({key, target}) => {
    const pagina = document.querySelector('#page').value
    if(key === 'Enter'){
        carregarJogos(pagina, target.value)
    }
}

const handleNext = () => {
    let page = Number (document.querySelector('#page').value);
    const totalPages = Number(document.querySelector('#pageTotal').textContent.replace('/',' '))
    if(page < totalPages) {
        page++;

        carregarJogos(page)
    }
}

const handlePrevious = () => {
    let page = Number (document.querySelector('#page').value);
    if(page > 1) {
        page--;

        carregarJogos(page)
    }
}

document.querySelector('#page')
        .addEventListener('keypress', handlePage)

document.querySelector('#page-next')
        .addEventListener('click', handleNext)

document.querySelector('#page-previous')
        .addEventListener('click', handlePrevious)

// //function para limpar elementos ao pesquisar
// const limparElementos = (elemento) => {
//     while (elemento.firstChild) {
//       elemento.removeChild(elemento.lastChild);
//     }
//   };

// const abrirModal = () =>{
//     document
//         .getElementById('modal-container')
//         .classList.add('active')
// } 
    
// const fecharModal = () =>{
//     document
//         .getElementById('modal-container')
//         .classList.remove('active')
// }
    
// // Modal
// document
//     .getElementById('abrir-modal')
//     .addEventListener('click', abrirModal)
    
// document
//     .getElementById('fechar')
//     .addEventListener('click', fecharModal)

// document
//     .getElementById('modal-container')
//     .addEventListener('click', fecharModal)