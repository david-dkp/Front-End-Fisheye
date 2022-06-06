import { getQueryParams } from "../utils/urlUtils.js"
import { getPhotographerById } from "../apis/photographersApi.js"
import { getPhotographImagePath } from "../utils/imageUtils.js"

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

const renderPhotographer = async (id) => {
    const photographer = await getPhotographerById(id)
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
}

const init = () => {
    const queryParams = getQueryParams()
    const id = queryParams.id

    renderPhotographer(id)
}

init()
