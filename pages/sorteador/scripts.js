function generateNormal(runTimes) {

    // cleaner for the result div
    document.getElementById('result').innerHTML = ''

    // cleaner for the result div
    const min = parseInt(document.getElementById('minNumber').value)
    const max = parseInt(document.getElementById('maxNumber').value)

    // check if the number of runs is positive and biggest to zero
    let checkRunTimes = runTimes === "" ? 1 : runTimes

    // create array for the result numbers
    let lastNumbers = []

    // runner for normal raffle
    for (let times = 0; times < checkRunTimes; times++) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        lastNumbers.push(randomNumber)
    }

    // call the function to show numbers on the screen
    showNumbersOnScreen(lastNumbers)
}

function generateUnique(runTimes) {

    // cleaner for the result div
    document.getElementById('result').innerHTML = ''

    // cleaner for the result div
    const min = parseInt(document.getElementById('minNumber').value)
    const max = parseInt(document.getElementById('maxNumber').value)

    // check if the number of runs is positive and biggest to zero
    let checkRunTimes = runTimes === "" ? 1 : runTimes

    // create a structure for unique numbers
    const uniqueNumbers = new Set();

    // runner for special raffle with unique numbers | with no repeated numbers
    while (uniqueNumbers.size < checkRunTimes) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
        uniqueNumbers.add(randomNumber)
    }

    // tranform the set in array and show numbers on the screen
    const uniqueNumbersArray = Array.from(uniqueNumbers)
    showNumbersOnScreen(uniqueNumbersArray)
}

// show numbers on the screen and give it all a different time to show it
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

// listener for start the raffle | this function check if inputs are fill
document.getElementById('generate').addEventListener('click', () => {
    const min = document.getElementById('minNumber').value
    const max = document.getElementById('maxNumber').value

    if (max !== '' && min !== '') {
        runRaffle(min, max)

    } else {
        alert('Você precisa preencher o intervalo de números a serem sorteados!')
    }
})

// function for run the raffle | this function check if range of raffle is ok
function runRaffle(min, max) {
    let repeat = document.getElementById('repeatNumber').checked

    let range = (max - min) + 1

    if (repeat === true) {
        
        // if the range of interval numbers are biggest than range of raffle then run raffle 
        range >= numberSweep.value ? generateUnique(numberSweep.value)
            : alert('O intervalo de números precisa ser maior que o total de sorteios, para sorteios únicos!')

    } else {

        // for normal raffle don't need a biggest range of numbers
        generateNormal(numberSweep.value)
    }
}

// node for times of raffle runs
const numberSweep = document.getElementById('numberSweep')

// node for raffle config | repeat and no-repeat config
const repeatNumberLabel = document.getElementById('repeatNumberLabel')

// hide and show, repeat or not repeat config on change numbers of raffle runs
numberSweep.addEventListener('change', () => {
    numberSweep.value > 1
        ? repeatNumberLabel.style.display = 'flex'
        : repeatNumberLabel.style.display = 'none'
})