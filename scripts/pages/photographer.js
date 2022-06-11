import { getQueryParams } from "../utils/urlUtils.js"
import { getPhotographerById } from "../apis/photographersApi.js"
import { getPhotographerMedias, updateMediaLike } from "../apis/mediasApi.js"
import { getPhotographImagePath } from "../utils/imageUtils.js"
import { createMedia } from "../factories/medias.js"
import {
    sortMediasByPopularity,
    sortMediasByTitle,
    sortMediasByDate,
} from "../utils/mediasUtils.js"
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
const mediasSection = document.querySelector(".photograph-medias")

let photographerId

const mediasSortingItems = [
    {
        id: "popularity",
        name: "Popularité",
        sortMedias: sortMediasByPopularity,
    },
    {
        id: "date",
        name: "Date",
        sortMedias: sortMediasByDate,
    },
    {
        id: "title",
        name: "Titre",
        sortMedias: sortMediasByTitle,
    },
]

const activeSortingItem = mediasSortingItems[0]

const updateTotalLikesCount = (totalLikesCount) => {
    photographTotalLikesCountElement.textContent = totalLikesCount
}

const renderPhotographerMedias = (medias) => {
    mediasSection.textContent = ""
    medias.forEach((media) => {
        const mediaDOM = createMedia(media, async () => {
            await updateMediaLike(media.id, media.likes + 1)
            const newMedias = await getPhotographerMedias(photographerId)
            updateTotalLikesCount(
                newMedias.reduce((acc, media) => acc + media.likes, 0)
            )
            renderPhotographerMedias(activeSortingItem.sortMedias(newMedias))
        })
        mediasSection.appendChild(mediaDOM.getMediaCardDOM())
    })
}

const renderPhotographer = (photographer, totalLikesCount) => {
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
    photographerId = queryParams.id

    const photographer = await getPhotographerById(photographerId)
    const photographerMedias = await getPhotographerMedias(photographerId)

    const totalLikesCount = photographerMedias.reduce(
        (likesCount, media) => likesCount + media.likes,
        0
    )
    renderPhotographer(photographer, totalLikesCount)
    renderPhotographerMedias(activeSortingItem.sortMedias(photographerMedias))
}

init()
