const photographers = await fetch("./data/photographers.json")
    .then((results) => results.json())
    .then((data) => data.photographers)

export const getPhotographers = async () => {
    return photographers
}

export const getPhotographerById = async (id) => {
    const photographers = await getPhotographers()
    if (!photographers) return null

    return photographers.find(
        (photographer) => photographer.id.toString() === id.toString()
    )
}
