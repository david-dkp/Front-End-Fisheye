import { getQueryParams } from "../utils/urlUtils.js"
import { getPhotographerById } from "../apis/photographersApi.js"
import { getPhotographerMedias, updateMediaLike } from "../apis/mediasApi.js"
import { getPhotographImagePath } from "../utils/imageUtils.js"
import { createMedia } from "../factories/medias.js"
import { createMediaSorting } from "../factories/mediasSorting.js"
import { init as initImageViewer } from "../utils/imageViewer.js"

import {
    sortMediasByPopularity,
    sortMediasByTitle,
    sortMediasByDate,
} from "../utils/mediasUtils.js"
import {
    getFormattedNumberWithSpaces,
    getFormattedPrice,
} from "../utils/numberUtils.js"

const queryParams = getQueryParams()
if (queryParams.firstname) {
    console.log({
        firstname: queryParams.firstname,
        lastname: queryParams.lastname,
        email: queryParams.email,
        message: queryParams.message,
    })
}

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

const sortingDropDownListElement = document.querySelector(
    ".sorting-dropdown-list"
)

const currentSortingItemElement = document.querySelector(
    ".current-sorting-item"
)

const currentSortingItemIconElement =
    currentSortingItemElement.querySelector("i")

const currentSortingNameElement = currentSortingItemElement.querySelector(
    ".current-sorting-name"
)

const toggleDropDownList = () => {
    isSortingDropDownOpen = !isSortingDropDownOpen

    sortingDropDownListElement.classList.toggle("open")
    sortingDropDownListElement.setAttribute(
        "aria-hidden",
        !isSortingDropDownOpen
    )

    currentSortingItemElement.classList.toggle("open")
    currentSortingItemElement.setAttribute(
        "aria-expanded",
        isSortingDropDownOpen
    )
    if (isSortingDropDownOpen) {
        currentSortingItemIconElement.classList.remove("fa-chevron-down")
        currentSortingItemIconElement.classList.add("fa-chevron-up")
    } else {
        currentSortingItemIconElement.classList.remove("fa-chevron-up")
        currentSortingItemIconElement.classList.add("fa-chevron-down")
    }
}

currentSortingItemElement.onclick = () => {
    toggleDropDownList()
}

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

let activeSortingItem = mediasSortingItems[0]
let isSortingDropDownOpen = false

const updateTotalLikesCount = (totalLikesCount) => {
    photographTotalLikesCountElement.textContent = totalLikesCount
}

const renderMediasSortingItems = () => {
    sortingDropDownListElement.innerHTML = ""

    currentSortingNameElement.textContent = activeSortingItem.name

    const sortingMediasItemsOrder = mediasSortingItems
        .sort((a, b) => {
            if (a.id === activeSortingItem.id) {
                return -1
            }
            if (b.id === activeSortingItem.id) {
                return 1
            }
            return 0
        })
        .filter((item) => item.id !== activeSortingItem.id)

    const sortingMediasElements = sortingMediasItemsOrder.map((item, i) => {
        const sortingItemElement = createMediaSorting({
            name: item.name,
            onClick: async () => {
                activeSortingItem = item
                toggleDropDownList()
                renderMediasSortingItems()

                if (i !== 0) {
                    renderPhotographerMedias(
                        activeSortingItem.sortMedias(
                            await getPhotographerMedias(photographerId)
                        )
                    )
                }
            },
        })
        const sortingItemDomElement = sortingItemElement.getMediaSortingDOM()
        return sortingItemDomElement
    })

    sortingDropDownListElement.setAttribute(
        "arial-expanded",
        isSortingDropDownOpen
    )
    sortingDropDownListElement.append(...sortingMediasElements)
}

const renderPhotographerMedias = (medias) => {
    mediasSection.textContent = ""
    medias.forEach((media, index) => {
        const mediaDOM = createMedia(
            media,
            async (e) => {
                e.stopPropagation()
                await updateMediaLike(media.id, media.likes + 1)
                const newMedias = await getPhotographerMedias(photographerId)
                updateTotalLikesCount(
                    newMedias.reduce((acc, media) => acc + media.likes, 0)
                )
                renderPhotographerMedias(
                    activeSortingItem.sortMedias(newMedias)
                )
            },
            () => {
                initImageViewer(medias, index)
            }
        )
        const domElement = mediaDOM.getMediaCardDOM()
        domElement.setAttribute("tabindex", "0")
        mediasSection.appendChild(domElement)
    })
}

const renderContactTitle = (photograph) => {
    const contactTitleElement = document.querySelector(".modal-header h2")
    contactTitleElement.textContent = "Contactez-moi " + photograph.name
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
    renderMediasSortingItems()
    renderContactTitle(photographer)
}

init()
