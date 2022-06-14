import { getPhotographImagePath } from "../utils/imageUtils.js"

export const createPhotographer = (data) => {
    const { name, portrait, city, country, tagline, price, id } = data

    const picture = getPhotographImagePath(portrait)

    function getUserCardDOM() {
        const articleElement = document.createElement("article")
        articleElement.classList.add("photographer-card")

        const linkElement = document.createElement("a")
        linkElement.classList.add("photographer-link")
        linkElement.setAttribute("href", "./photographer.html?id=" + id)

        const profileImageElement = document.createElement("img")
        profileImageElement.classList.add("photographer-photo")
        profileImageElement.setAttribute("src", picture)
        profileImageElement.setAttribute("alt", name)

        const nameElement = document.createElement("h2")
        nameElement.classList.add("photographer-name")
        nameElement.textContent = name

        linkElement.appendChild(profileImageElement)
        linkElement.appendChild(nameElement)

        const locationElement = document.createElement("h3")
        locationElement.classList.add("photographer-location")
        locationElement.textContent = `${city}, ${country}`

        const taglineElement = document.createElement("p")
        taglineElement.classList.add("photographer-tagline")
        taglineElement.textContent = tagline

        const priceElement = document.createElement("p")
        priceElement.classList.add("photographer-price")
        priceElement.textContent = `${price}/jour`

        articleElement.appendChild(linkElement)
        articleElement.appendChild(locationElement)
        articleElement.appendChild(taglineElement)
        articleElement.appendChild(priceElement)
        return articleElement
    }
    return { name, picture, getUserCardDOM }
}
