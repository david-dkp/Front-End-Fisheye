export const createMedia = (media) => {
    const { title, image, likes, date, price } = media

    function getMediaCardDOM() {
        const mediaCardElement = document.createElement("div")
        mediaCardElement.classList.add("photograph-media-card")

        const mediaImageElement = document.createElement("img")
        mediaImageElement.classList.add("photograph-media-image")
        mediaImageElement.setAttribute("src", image)

        const mediaInfosElement = document.createElement("div")
        mediaInfosElement.classList.add("photograph-media-infos")

        const mediaNameElement = document.createElement("p")
        mediaNameElement.classList.add("photograph-media-name")
    }
}
