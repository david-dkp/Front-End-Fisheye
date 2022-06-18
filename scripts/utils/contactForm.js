import {
    validateStringNotEmpty,
    validateStringWithRegex,
} from "../form/validators/index.js"
import { getQueryParams } from "../utils/urlUtils.js"

//Dom elements
const modal = document.getElementById("contact_modal")
const firstNameInput = document.querySelector(".firstname-input")
const lastNameInput = document.querySelector(".lastname-input")
const emailInput = document.querySelector(".email-input")
const messageInput = document.querySelector(".message-input")

const firstNameErrorTextElement = document.querySelector(
    ".error-text-firstname"
)
const lastNameErrorTextElement = document.querySelector(".error-text-lastname")
const emailErrorTextElement = document.querySelector(".error-text-email")
const messageErrorTextElement = document.querySelector(".error-text-message")

const contactButtonElement = document.querySelector(
    ".photograph-header .contact_button"
)
const contactCloseButtonElement = document.querySelector(".modal-close-button")
const contactFormElement = document.querySelector("form")

function displayModal() {
    modal.style.display = "flex"
    modal.setAttribute("open", "true")
    firstNameInput.focus()
}

function closeModal() {
    modal.style.display = "none"
    modal.setAttribute("open", "false")
}

const firstNameErrorText = "Veuillez entrer votre prénom."

//Setup on submit url
const urlParams = getQueryParams()

const hiddenIdInputElement = document.createElement("input")
hiddenIdInputElement.type = "hidden"
hiddenIdInputElement.name = "id"
hiddenIdInputElement.value = urlParams.id
contactFormElement.prepend(hiddenIdInputElement)

function validateFirstName() {
    const errorText = validateStringNotEmpty(
        firstNameInput.value,
        firstNameErrorText
    )
    if (errorText) {
        firstNameErrorTextElement.innerHTML = errorText
        return false
    } else {
        firstNameErrorTextElement.innerHTML = ""
        return true
    }
}

const lastNameErrorText = "Veuillez entrer votre nom."

function validateLastName() {
    const errorText = validateStringNotEmpty(
        lastNameInput.value,
        lastNameErrorText
    )
    if (errorText) {
        lastNameErrorTextElement.innerHTML = errorText
        return false
    } else {
        lastNameErrorTextElement.innerHTML = ""
        return true
    }
}

const emailErrorText = "Veuillez entrer une adresse e-mail valide."
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

function validateEmail() {
    const errorText = validateStringWithRegex(
        emailInput.value,
        emailRegex,
        emailErrorText
    )
    if (errorText) {
        emailErrorTextElement.innerHTML = errorText
        return false
    } else {
        emailErrorTextElement.innerHTML = ""
        return true
    }
}

const messageErrorText = "Veuillez entrer un message."

function validateMessage() {
    const errorText = validateStringNotEmpty(
        messageInput.value,
        messageErrorText
    )
    if (errorText) {
        messageErrorTextElement.innerHTML = errorText
        return false
    } else {
        messageErrorTextElement.innerHTML = ""
        return true
    }
}

//Listen to each fields change, and run their validation in real time
firstNameInput.addEventListener("input", () => {
    validateFirstName()
})

lastNameInput.addEventListener("input", () => {
    validateLastName()
})

emailInput.addEventListener("input", () => {
    validateEmail()
})

messageInput.addEventListener("input", () => {
    validateMessage()
})

const fieldsValidators = [
    validateFirstName,
    validateLastName,
    validateEmail,
    validateMessage,
]

//Run validation of each fields at once
function validateAllFields() {
    let hasError = false
    for (const validator of fieldsValidators) {
        const isFieldValid = validator()

        if (!isFieldValid) {
            hasError = true
        }
    }
    return !hasError
}

function validateContactForm() {
    const isFormValid = validateAllFields()

    if (isFormValid) {
        contactFormElement.submit()
    }
}
const handleKeyUp = (event) => {
    if (event.key === "Escape") {
        contactCloseButtonElement.click()
    }
}

contactButtonElement.onclick = displayModal
contactCloseButtonElement.onclick = () => {
    closeModal()
    document.removeEventListener("keyup", handleKeyUp)
}

document.addEventListener("keyup", handleKeyUp)

contactFormElement.addEventListener("submit", (e) => {
    e.preventDefault()
    validateContactForm()
})
