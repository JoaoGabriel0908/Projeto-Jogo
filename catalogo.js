'use strict'

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


// Carregandos os generos e trazendo no card
const buscarGenero = async (genres) => {
    const container = document.querySelector('.card-container')
    const {results} = await jogosGeneros(genres)
    const cards = results.map(criarGenero)
    container.replaceChildren(...cards)
    console.log(cards)
}