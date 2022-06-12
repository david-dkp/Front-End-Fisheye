/**
 * @typedef {Object} Media
 * @property {string} id
 * @property {string} photographerId
 * @property {string} title
 * @property {string} image
 * @property {number} likes
 * @property {string} date
 * @property {number} price
 */

let medias = await fetch("./data/photographers.json")
    .then((results) => results.json())
    .then((data) => data.media)

/**
 *
 * @param {string} the id of the photographer
 * @returns {Array<Media>} the medias of the photographer
 */
export const getPhotographerMedias = async (id) => {
    return medias.filter((media) => media.photographerId == id)
}

export const updateMediaLike = async (mediaId, likes) => {
    const media = medias.find((media) => media.id == mediaId)
    media.likes = likes
    return media
}

export const unusued = {}
