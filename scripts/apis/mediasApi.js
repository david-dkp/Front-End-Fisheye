let medias = await fetch("./data/photographers.json")
    .then((results) => results.json())
    .then((data) => data.media)

export const getPhotographerMedias = async (id) => {
    return medias.filter((media) => media.photographerId == id)
}

export const updateMediaLike = async (mediaId, likes) => {
    const media = medias.find((media) => media.id == mediaId)
    media.likes = likes
    return media
}
