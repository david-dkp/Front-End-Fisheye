import { getQueryParams } from "../utils/urlUtils.js"
import { getPhotographerById } from "../apis/photographersApi.js"
import { getPhotographerMedias, updateMediaLike } from "../apis/mediasApi.js"
import { getPhotographImagePath } from "../utils/imageUtils.js"
import { createMedia } from "../factories/medias.js"
import { createMediaSorting } from "../factories/mediasSorting.js"
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

const sortingDropDownListElement = document.querySelector(
    ".sorting-dropdown-list"
)

const sortingItemPlaceHolderElement = document.querySelector(
    ".sorting-item-placeholder"
)

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

    sortingItemPlaceHolderElement.textContent = activeSortingItem.name
    const chevronElement = document.createElement("i")
    chevronElement.classList.add("fa-solid", "fa-chevron-down")

    sortingItemPlaceHolderElement.appendChild(chevronElement)

    const sortingMediasItemsOrder = mediasSortingItems.sort((a, b) => {
        if (a.id === activeSortingItem.id) {
            return -1
        }
        if (b.id === activeSortingItem.id) {
            return 1
        }
        return 0
    })

    const sortingMediasElements = sortingMediasItemsOrder.map((item, i) => {
        const sortingItemElement = createMediaSorting({
            name: item.name,
            showChevron: i === 0,
            isChevronUp: isSortingDropDownOpen,
            onClick: async () => {
                activeSortingItem = item
                isSortingDropDownOpen = !isSortingDropDownOpen
                sortingDropDownListElement.classList.toggle("open")
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
        return sortingItemElement.getMediaSortingDOM()
    })

    sortingDropDownListElement.append(...sortingMediasElements)

    // if (isSortingDropDownOpen) {
    //     const activeSortingItemElement = createMediaSorting({
    //         name: activeSortingItem.name,
    //         showChevron: true,
    //         isChevronUp: true,
    //         onClick: () => {
    //             isSortingDropDownOpen = false
    //             renderMediasSortingItems()
    //         },
    //     }).getMediaSortingDOM()
    //     sortingDropDownListElement.appendChild(activeSortingItemElement)

    //     const otherSortingItems = mediasSortingItems.filter(
    //         (item) => item.id !== activeSortingItem.id
    //     )
    //     const otherSortingItemsElements = otherSortingItems.map((item) => {
    //         const mediaSortingElement = createMediaSorting({
    //             name: item.name,
    //             onClick: async () => {
    //                 activeSortingItem = item
    //                 isSortingDropDownOpen = false
    //                 renderMediasSortingItems()
    //                 renderPhotographerMedias(
    //                     activeSortingItem.sortMedias(
    //                         await getPhotographerMedias(photographerId)
    //                     )
    //                 )
    //             },
    //         }).getMediaSortingDOM()

    //         return mediaSortingElement
    //     })
    //     sortingDropDownListElement.append(...otherSortingItemsElements)
    // } else {
    //     const activeSortingItemElement = createMediaSorting({
    //         name: activeSortingItem.name,
    //         isChevronUp: false,
    //         showChevron: true,
    //         onClick: async () => {
    //             isSortingDropDownOpen = true
    //             renderMediasSortingItems()
    //             renderPhotographerMedias(
    //                 activeSortingItem.sortMedias(
    //                     await getPhotographerMedias(photographerId)
    //                 )
    //             )
    //         },
    //     }).getMediaSortingDOM()

    //     sortingDropDownListElement.appendChild(activeSortingItemElement)
    // }
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
    renderMediasSortingItems()
}

init()
