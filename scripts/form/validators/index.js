const validateStringNotEmpty = (string, errorText) => {
    if (!string || string.length < 1) {
        return errorText
    } else {
        return null
    }
}

const validateStringWithRegex = (string, regex, errorText) => {
    if (!string.match(regex)) {
        return errorText
    } else {
        return null
    }
}

export { validateStringNotEmpty, validateStringWithRegex }
