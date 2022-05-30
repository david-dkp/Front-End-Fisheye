function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data

    const picture = `assets/photographers/${portrait}`

    function getUserCardDOM() {
        const articleElement = document.createElement("article")
        articleElement.classList.add("photographer-card")

        const profileImageElement = document.createElement("img")
        profileImageElement.classList.add("photographer-photo")
        profileImageElement.setAttribute("src", picture)
        profileImageElement.setAttribute("alt", name)

        const nameElement = document.createElement("h2")
        nameElement.classList.add("photographer-name")
        nameElement.textContent = name

        const locationElement = document.createElement("h3")
        locationElement.classList.add("photographer-location")
        locationElement.textContent = `${city}, ${country}`

        const taglineElement = document.createElement("p")
        taglineElement.classList.add("photographer-tagline")
        taglineElement.textContent = tagline

        const priceElement = document.createElement("p")
        priceElement.classList.add("photographer-price")
        priceElement.textContent = `${price}/jour`

        articleElement.appendChild(profileImageElement)
        articleElement.appendChild(nameElement)
        articleElement.appendChild(locationElement)
        articleElement.appendChild(taglineElement)
        articleElement.appendChild(priceElement)
        return articleElement
    }
    return { name, picture, getUserCardDOM }
}
