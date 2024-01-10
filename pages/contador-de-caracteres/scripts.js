function count() {
    // node to get the text
    const text = document.getElementById('textInput').value

    // node to show result
    const caractersCounts = document.getElementById('caractersCount')
    const wordsCount = document.getElementById('wordsCount')
    const linesCount = document.getElementById('linesCount')

    // simple line function to count numbers of characters
    caractersCounts.textContent = text.length

    // simple function to count words in the text
    const words = text
        .split(/\s+/)
        .filter(word => word.trim().length > 0)
    wordsCount.textContent = words.length

    // simple function to count lines in the text
    const lines = text.split(/\r\n|\r|\n/).filter(function (line) {
        return line.length > 0
    })
    linesCount.textContent = lines.length
}

// inicialize the input without content
document.getElementById('textInput').value = ""
document.getElementById('textInput').addEventListener('input', count)
