export const getPhotographers = async () => {
    // Penser à remplacer par les données récupérées dans le json
    const data = await fetch("./data/photographers.json").then((results) =>
        results.json()
    )
    // et bien retourner le tableau photographers seulement une fois
    return data.photographers
}

export const getPhotographerById = async (id) => {
    const photographers = await getPhotographers()
    if (!photographers) return null

    return photographers.find((photographer) => photographer.id == id)
}
