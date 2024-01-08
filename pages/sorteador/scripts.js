function generateNormal(runTimes) {

    document.getElementById('result').innerHTML = ''

    const min = parseInt(document.getElementById('minNumber').value)
    const max = parseInt(document.getElementById('maxNumber').value)
    let checkRunTimes = runTimes === "" ? 1 : runTimes

    let lastNumbers = []

    for (let times = 0; times < checkRunTimes; times++) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        lastNumbers.push(randomNumber)
    }
    showNumbersOnScreen(lastNumbers)
}

function generateUnique(runTimes) {

    document.getElementById('result').innerHTML = ''

    const min = parseInt(document.getElementById('minNumber').value)
    const max = parseInt(document.getElementById('maxNumber').value)

    let checkRunTimes = runTimes === "" ? 1 : runTimes

    const uniqueNumbers = new Set();

    while (uniqueNumbers.size < checkRunTimes) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
        uniqueNumbers.add(randomNumber)
    }

    const uniqueNumbersArray = Array.from(uniqueNumbers)
    showNumbersOnScreen(uniqueNumbersArray)
}

function showNumbersOnScreen(lastNumbers) {
    lastNumbers.forEach((number, index) => {

        setTimeout(() => {
            const showNumbers = document.createElement("div")
            showNumbers.innerHTML = `<span>${index + 1}° Número:</span> ${number}`
            showNumbers.classList.add('fade-in')
            document.getElementById('result').append(showNumbers)
        }, (index + 1) * 1500)


    });
}

document.getElementById('generate').addEventListener('click', () => {
    const min = document.getElementById('minNumber').value
    const max = document.getElementById('maxNumber').value

    if (max !== '' && min !== '') {
        runRaffle(min, max)

    } else {
        alert('Você precisa preencher o intervalo de números a serem sorteados!')
    }
})

function runRaffle(min, max) {
    let reapet = document.getElementById('repeatNumber').checked

    let range = (max - min) + 1

    if (reapet === true) {

        range >= numberSweep.value ? generateUnique(numberSweep.value)
            : alert('O intervalo de números precisa ser maior que o total de sorteios, para sorteios únicos!')

    } else {
        generateNormal(numberSweep.value)
    }
}

const numberSweep = document.getElementById('numberSweep')
const repeatNumberLabel = document.getElementById('repeatNumberLabel')

numberSweep.addEventListener('change', () => {
    numberSweep.value > 1
        ? repeatNumberLabel.style.display = 'flex'
        : repeatNumberLabel.style.display = 'none'
})