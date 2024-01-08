function count() {
    const text = document.getElementById('textInput').value
    const caractersCounts = document.getElementById('caractersCount')
    const wordsCount = document.getElementById('wordsCount')
    const linesCount = document.getElementById('linesCount')

    caractersCounts.textContent = text.length

    const words = text
        .split(/\s+/)
        .filter(word => word.trim().length > 0)
    wordsCount.textContent = words.length

    const lines = text.split(/\r\n|\r|\n/).filter(function (line) {
        return line.length > 0
    })
    linesCount.textContent = lines.length
}
document.getElementById('textInput').value = ""
document.getElementById('textInput').addEventListener('input', count)
