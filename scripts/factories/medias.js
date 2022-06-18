import { getMediaImagePath } from "../utils/imageUtils.js"

export const createMedia = (media, onHeartIconClick, onMediaClick) => {
    const { id, title, image, video, likes, date, price } = media

    function getMediaCardDOM() {
        const mediaCardElement = document.createElement("li")
        mediaCardElement.classList.add("photograph-media-card")
        mediaCardElement.onclick = onMediaClick
        mediaCardElement.ariaLabel = `${title}, closeup view`
        mediaCardElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                onMediaClick()
            }
        })

        const mediaImageElement = image
            ? document.createElement("img")
            : document.createElement("video")
        mediaImageElement.classList.add("photograph-media-image")
        mediaImageElement.setAttribute(
            "src",
            image ? getMediaImagePath(image) : getMediaImagePath(video)
        )
        mediaImageElement.setAttribute("alt", title)

        const mediaInfosElement = document.createElement("div")
        mediaInfosElement.classList.add("photograph-media-infos")

        const mediaNameElement = document.createElement("p")
        mediaNameElement.classList.add("photograph-media-name")
        mediaNameElement.textContent = title

        const mediaLikesCountElement = document.createElement("p")
        mediaLikesCountElement.classList.add("photograph-media-likes-count")
        mediaLikesCountElement.textContent = likes

        const mediaLikeIconElement = document.createElement("i")
        mediaLikeIconElement.classList.add(
            "fa-solid",
            "fa-heart",
            "photograph-media-like-icon"
        )
        mediaLikeIconElement.setAttribute("tabindex", "0")
        mediaLikeIconElement.addEventListener("click", onHeartIconClick)
        mediaLikeIconElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                onHeartIconClick(event)
            }
        })
        mediaInfosElement.appendChild(mediaNameElement)
        mediaInfosElement.appendChild(mediaLikesCountElement)
        mediaInfosElement.appendChild(mediaLikeIconElement)

        mediaCardElement.appendChild(mediaImageElement)
        mediaCardElement.appendChild(mediaInfosElement)

        return mediaCardElement
    }

    return {
        id,
        title,
        image,
        video,
        likes,
        date,
        price,
        getMediaCardDOM,
    }
}
