// Funções para converter texto
function convertToUpperCase() {
    let text = document.getElementById('inputText');
    let convertedText = text.value.toUpperCase();
    text.value = convertedText
}
document.getElementById('toUpperCase').addEventListener('click', convertToUpperCase )

function convertToLowerCase() {
    let text = document.getElementById('inputText');
    let convertedText = text.value.toLowerCase();
    text.value = convertedText
}
document.getElementById('toLowerCase').addEventListener('click', convertToLowerCase )