import { getQueryParams } from "../utils/urlUtils.js"
import { getPhotographerById } from "../apis/photographersApi.js"
import { getPhotographerMedias } from "../apis/mediasApi.js"
import { getPhotographImagePath } from "../utils/imageUtils.js"
import { createMedia } from "../factories/medias.js"
import {
    getFormattedNumberWithSpaces,
    getFormattedPrice,
} from "../utils/numberUtils.js"

//Dom elements
const photographNameElement = document.querySelector(".photograph-infos-name")
const photographLocationElement = document.querySelector(
    ".photograph-infos-location"
)
const photographTaglineElement = document.querySelector(
    ".photograph-infos-tagline"
)
const photographImageElement = document.querySelector(
    ".photograph-header-image"
)
const photographTotalLikesCountElement = document.querySelector(
    ".photograph-floating-total-likes-count"
)
const photographPriceElement = document.querySelector(
    ".photograph-floating-price"
)

const renderPhotographerMedias = (medias) => {
    const mediasSection = document.querySelector(".photograph-medias")
    medias.forEach((media) => {
        const mediaDOM = createMedia(media)
        mediasSection.appendChild(mediaDOM.getMediaCardDOM())
    })
}

const renderPhotographer = (photographer, totalLikesCount) => {
    console.log(photographer)
    photographNameElement.textContent = photographer.name
    photographLocationElement.textContent =
        photographer.city + ", " + photographer.country
    photographTaglineElement.textContent = photographer.tagline
    photographImageElement.setAttribute(
        "src",
        getPhotographImagePath(photographer.portrait)
    )
    photographImageElement.setAttribute("alt", photographer.name)
    photographTotalLikesCountElement.textContent =
        getFormattedNumberWithSpaces(totalLikesCount)
    photographPriceElement.textContent = getFormattedPrice(photographer.price)
}

const init = async () => {
    const queryParams = getQueryParams()
    const id = queryParams.id

    const photographer = await getPhotographerById(id)
    const photographerMedias = await getPhotographerMedias(id)

    const totalLikesCount = photographerMedias.reduce(
        (likesCount, media) => likesCount + media.likes,
        0
    )
    renderPhotographer(photographer, totalLikesCount)

    renderPhotographerMedias(photographerMedias)
}

init()
