export const createMediaSorting = ({ id, name, sortMedias }) => {
    const getMediaSortingDOM = () => {
        const sortingItemElement = document.createElement("li")
        sortingItemElement.classList.add("sorting-item")
        sortingItemElement.textContent = name
    }

    return { id, getMediaSortingDOM, sortMedias }
}
