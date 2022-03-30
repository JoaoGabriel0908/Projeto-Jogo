'use strict'

const pesquisarJogos = async() => {
    const apikey = 'd462cb0d3a6c4874afb375fb232625ca'
    const url = `https://api.rawg.io/api/games?key=${apikey}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function arrayToObj(genres) {
    let resposta = {}
    for(const element of genres) {
        resposta[element[0]] = element[1]
    }
    return resposta
}

const criarCard = ({background_image, name, resposta}) => {
    const card = document.createElement('div')
    card.classList.add('card-jogo')
    card.innerHTML = `
    <div class="card-image-container">
        <img src=${background_image} class="card-image">
    </div>
    <span class="card-nome">
        <h1>${name}</h1>
    </span>
    <span class="card-plataforma">
         ${resposta}
    </span>

    `
    console.log(resposta)
//     <div class="card-image-container">
//     <img src="${produto.imagem}" alt="monitor" class="card-image">
//      </div>
//      <span class="card-nome">
//     ${produto.nome}
//      </span>
//      <span class="card-plataforma">
//     ${produto.plataforma}
//      </span>
//       <span class="card-genero">
//     R$ ${produto.genero}
//      </span>
    return card;
}

const carregarJogos = async() => {
    const container = document.querySelector('.card')
    const {results} = await pesquisarJogos()
    const cards = results.map(criarCard)
    container.replaceChildren(...cards)
    return cards
}

carregarJogos()









