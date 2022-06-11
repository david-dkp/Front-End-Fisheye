export const createMediaSorting = ({
    name,
    showChevron = false,
    isChevronUp = false,
    onClick = () => {},
}) => {
    const getMediaSortingDOM = () => {
        const sortingItemElement = document.createElement("li")
        sortingItemElement.classList.add("sorting-item")
        sortingItemElement.textContent = name

        if (showChevron) {
            const chevronElement = document.createElement("i")
            chevronElement.classList.add(
                "fa-solid",
                isChevronUp ? "fa-chevron-up" : "fa-chevron-down"
            )
            sortingItemElement.appendChild(chevronElement)
        }
        sortingItemElement.addEventListener("click", onClick)

        return sortingItemElement
    }

    return { getMediaSortingDOM }
}
