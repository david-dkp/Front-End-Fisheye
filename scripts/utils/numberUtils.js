export const getFormattedNumberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export const getFormattedPrice = (price) => {
    return `${getFormattedNumberWithSpaces(price)} €`
}
