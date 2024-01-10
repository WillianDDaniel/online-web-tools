// input slider element to choose a size to the new password
const sliderElement = document.getElementById("slider")
const sizePassword = document.getElementById("valor")

// run button
const generateButton = document.getElementById("generateButton")

// element to show generated password
const password = document.getElementById("password")
const containerPassword = document.getElementById("container-password")

// range of characters to make a new password
const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@"

let newPass = ""

sizePassword.innerHTML = sliderElement.value

slider.oninput = function () {
    sizePassword.innerHTML = this.value
}

generateButton.addEventListener('click', generatePassword)

function generatePassword() {

    let pass = ""

    // runner for generate a new password
    for (let i = 0, n = charset.length; i < sliderElement.value; ++i) {
        pass += charset.charAt(Math.floor(Math.random() * n))
    }

    // show on the screen the new password
    containerPassword.classList.remove("hide")
    password.innerHTML = pass
    newPass = pass
}

// listener button to copy the new password 
containerPassword.addEventListener('click', copyPassword )
function copyPassword() {

    // make to make sure a copy of the new password
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(newPass)
        return
    }

    // if navigator clipboard is enable, copy pass
    navigator.clipboard.writeText(newPass)
        .then(() => {
            alert("Senha copiada com sucesso!")
        })
        .catch(err => {
            console.error('Erro ao copiar senha com Clipboard API:', err)
            fallbackCopyTextToClipboard(newPass)
        })
}

// if navigator clipboard is wrong, call this function
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea")
    textArea.value = text

    document.body.appendChild(textArea)
    textArea.select()

    try {
        const successful = document.execCommand('copy')
        const message = successful ? 'Senha copiada com sucesso!' : 'Não foi possível copiar a senha.'
        alert(message)
    } catch (err) {
        console.error('Erro ao copiar senha com execCommand:', err)
        alert("Não foi possível copiar a senha. Por favor, tente novamente.")
    }

    document.body.removeChild(textArea)
}