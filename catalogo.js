'use strict'

// Trazendo os jogos
const pesquisarJogos = async(page) => {
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

const cardGenero = ({image_background, name}) => {
    
    const card = document.createElement('div')
    card.classList.add('card-genero')
    card.innerHTML = `
    <span class="card-image-container">
        <img src=${image_background} class="card-image">
    </span>
    <span class="card-nome">
        <h1>${name}</h1>
    </span>

`
return card
}

const carregarGeneros = async() => {
    const container = document.querySelector('.card-container-genero')
    const {results} = await trazerGeneros()
    const cards = results.map(cardGenero)
    container.replaceChildren(...cards)
}

carregarGeneros()

// Carregando array e trazendo na tela
const pegarGenero = async (name) => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/games?key=${apikey}&genres=${name}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
}

// Criando cards que foi pesquisado pelo usuário
const createCard = ({background_image, name, genres}) => {
    
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

// Buscando jogos que o usuário trouxe
const buscarGeneros = async (name) => {
    const container = document.querySelector('.jogosPesquisados')
    const {results} = await pegarGenero(name);
    const cards = results.map(createCard);
    container.replaceChildren(...cards)
    return cards
}

const pegandoEnter = async ({key, target}) => {
    if(key === 'Enter'){
        await buscarGenero(target.value)
    }
}

document.querySelector('#genero')
        .addEventListener('keypress', pegandoEnter);