export const getPhotographerMedias = async (id) => {
    const data = await fetch("./data/photographers.json").then((results) =>
        results.json()
    )
    return data.media.filter((media) => media.photographerId == id)
}
