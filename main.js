'use strict'

const pesquisarJogos = async() => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/games?key=${apikey}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const pegarGenero = (genero) => genero.name

// const pegarPlataformas = (plataforma) => plataforma.platform.name

const criarCard = ({background_image, name, genres, parent_platforms}) => {
    
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
         ${genres.map(pegarGenero)}
    </span>
    
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

const carregarJogos = async() => {
    const container = document.querySelector('.card')
    const {results} = await pesquisarJogos()
    const cards = results.map(criarCard)
    container.replaceChildren(...cards)
    return cards
}

carregarJogos()

// const imgs = document.querySelector(".card-image-container")
// const img = document.querySelector(".card-image-container img")

// let cont = 0;

// function carrosel (){
//     cont++;

//     if(cont > img.length -1){
//         cont = 0;
//     }

//     imgs.style.transforme = `translateX(${-cont * 500}px)`;
// }
