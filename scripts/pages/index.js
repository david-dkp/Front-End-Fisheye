import { getPhotographers } from "../apis/photographersApi.js"
import { createPhotographer } from "../factories/photographer.js"

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section")

    photographers.forEach((photographer) => {
        const photographerModel = createPhotographer(photographer)
        const userCardDOM = photographerModel.getUserCardDOM()
        photographersSection.appendChild(userCardDOM)
    })
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers()
    displayData(photographers)
}

init()
