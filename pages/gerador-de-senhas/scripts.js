const sliderElement = document.getElementById("slider")
const generateButton = document.getElementById("generateButton")
const sizePassword = document.getElementById("valor")
const password = document.getElementById("password")
const containerPassword = document.getElementById("container-password")

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@"

let newPass = ""

sizePassword.innerHTML = sliderElement.value

slider.oninput = function () {
    sizePassword.innerHTML = this.value
}

generateButton.addEventListener('click', generatePassword)
function generatePassword() {

    let pass = ""

    for (let i = 0, n = charset.length; i < sliderElement.value; ++i) {
        pass += charset.charAt(Math.floor(Math.random() * n))
    }

    containerPassword.classList.remove("hide")
    password.innerHTML = pass
    newPass = pass
}

containerPassword.addEventListener('click', copyPassword )
function copyPassword() {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(newPass)
        return
    }

    navigator.clipboard.writeText(newPass)
        .then(() => {
            alert("Senha copiada com sucesso!")
        })
        .catch(err => {
            console.error('Erro ao copiar senha com Clipboard API:', err)
            fallbackCopyTextToClipboard(newPass)
        })
}

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