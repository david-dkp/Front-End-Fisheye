export const createMediaSorting = ({ name, onClick = () => {} }) => {
    const getMediaSortingDOM = () => {
        const sortingItemElement = document.createElement("li")

        const sortingButtonElement = document.createElement("button")
        sortingButtonElement.classList.add("sorting-item")
        sortingButtonElement.textContent = name
        sortingButtonElement.addEventListener("click", onClick)

        sortingItemElement.appendChild(sortingButtonElement)

        return sortingItemElement
    }

    return { getMediaSortingDOM }
}
