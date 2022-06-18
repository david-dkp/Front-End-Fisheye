import { getMediaImagePath } from "../utils/imageUtils.js"

//Dom elements
const mediaViewerDialogElement = document.querySelector(".media-viewer-dialog")
const mediaViewerLeftButtonElement = document.querySelector(
    ".media-viewer-left-button"
)
const mediaViewerRightButtonElement = document.querySelector(
    ".media-viewer-right-button"
)
const mediaViewerCloseButtonElement = document.querySelector(
    ".media-viewer-close-button"
)
const mediaViewerMediaNameElement = document.querySelector(
    ".media-viewer-media-name"
)
const mediaViewerMediaContainerElement = document.querySelector(
    ".media-viewer-media-container"
)

let currentMedias
let currentMediaIndex

const renderImageAtIndex = (index) => {
    const currentMediaElement = mediaViewerMediaContainerElement.querySelector(
        ".media-viewer-media-image"
    )
    currentMediaElement && currentMediaElement.remove()
    const media = currentMedias[index]
    if (media.video) {
        const videoElement = document.createElement("video")
        videoElement.classList.add("media-viewer-media-image")
        videoElement.setAttribute("src", getMediaImagePath(media.video))
        videoElement.setAttribute("alt", media.title)
        videoElement.setAttribute("autoplay", "true")
        mediaViewerMediaContainerElement.prepend(videoElement)
    } else {
        const imageElement = document.createElement("img")
        imageElement.classList.add("media-viewer-media-image")
        imageElement.setAttribute("src", getMediaImagePath(media.image))
        imageElement.setAttribute("alt", media.title)
        mediaViewerMediaContainerElement.prepend(imageElement)
    }

    mediaViewerMediaNameElement.innerHTML = media.title
}

const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft") {
        mediaViewerLeftButtonElement.click()
    } else if (event.key === "ArrowRight") {
        mediaViewerRightButtonElement.click()
    } else if (event.key === "Escape") {
        mediaViewerCloseButtonElement.click()
    }
}

mediaViewerLeftButtonElement.onclick = () => {
    if (currentMediaIndex > 0) {
        currentMediaIndex--
        renderImageAtIndex(currentMediaIndex)
    }
}

mediaViewerRightButtonElement.onclick = () => {
    if (currentMediaIndex < currentMedias.length - 1) {
        currentMediaIndex++
        renderImageAtIndex(currentMediaIndex)
    }
}

mediaViewerCloseButtonElement.onclick = () => {
    mediaViewerDialogElement.setAttribute("open", "false")
    mediaViewerDialogElement.style.display = "none"
    document.removeEventListener("keyup", handleKeyUp)
}

document.addEventListener("keyup", handleKeyUp)

export const init = (medias, mediaIndex) => {
    currentMedias = medias
    currentMediaIndex = mediaIndex
    mediaViewerDialogElement.style.display = "flex"
    mediaViewerDialogElement.setAttribute("open", "true")
    mediaViewerRightButtonElement.focus()
    renderImageAtIndex(mediaIndex)
}
