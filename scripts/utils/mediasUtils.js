export const sortMediasByPopularity = (medias) => {
    return medias.sort((a, b) => {
        return b.likes - a.likes
    })
}

export const sortMediasByTitle = (medias) => {
    return medias.sort((a, b) => {
        return a.title.localeCompare(b.title)
    })
}

export const sortMediasByDate = (medias) => {
    return medias.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })
}
