'use strict'

// Trazendo os jogos
const pesquisarJogos = async() => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/games?key=${apikey}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

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
const carregarJogos = async() => {
    const container = document.querySelector('.card')
    const {results} = await pesquisarJogos()
    const cards = results.map(criarCard)
    container.replaceChildren(...cards)
    return cards
}

const trazerGeneros = async() => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/genres?key=${apikey}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const cardGenero =  ({image_background, name}) => {
    
    const card = document.createElement('div')
    card.classList.add('card-genero')
    card.innerHTML = ` <div onclick=handleClick()>
    <span class="card-image-container" >
        <img src=${image_background} class="card-image">
    </span>
    <span class="card-nome">
        <h1>${name}</h1>
    </span>
    </div>
`
return card
}

const carregarGeneros = async(name) => {
    const container = document.querySelector('.card-container-genero')
    const {results} = await trazerGeneros(name)
    const cards = results.map(cardGenero)
    container.replaceChildren(...cards)
    return cards
}

carregarGeneros()

// Carregando array e trazendo na tela
const pegarGenero = async(genres) => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/games?genres=${genres}&key=${apikey}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// Criando cards que foi pesquisado pelo usuário
const createCard = ({background_image, name}) => {
    
    const card = document.createElement('div')
    card.classList.add('card-jogo')
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

// Buscando jogos que o usuário trouxe
const buscarGeneros = async (genres) => {
    const container = document.querySelector('.jogosPesquisados')
    const {results} = await pegarGenero(genres);
    const cards = results.map(createCard);
    container.replaceChildren(...cards)
    console.log(cards)
    return cards
}

const pegandoEnter =  async ({key, target}) => {
    if(key === 'Enter'){
        await buscarGeneros(target.value)
    }
}

document.querySelector('#genero')
        .addEventListener('keypress', pegandoEnter);


const handleClick = async ({target}) => {
    carregarGeneros(target.results)
}

    
