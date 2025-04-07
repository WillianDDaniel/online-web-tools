document.addEventListener('DOMContentLoaded', function() {
    const compareButton = document.getElementById('compareButton');

    compareButton.addEventListener('click', function() {
        const textA = document.getElementById('textA').value;
        const textB = document.getElementById('textB').value;
        const ignoreCase = document.getElementById('ignoreCase').checked;
        const ignoreSpaces = document.getElementById('ignoreSpaces').checked;

        compareTexts(textA, textB, ignoreCase, ignoreSpaces);
    });

    function compareTexts(textA, textB, ignoreCase, ignoreSpaces) {
        let processedA = textA;
        let processedB = textB;

        if (ignoreCase) {
            processedA = processedA.toLowerCase();
            processedB = processedB.toLowerCase();
        }

        if (ignoreSpaces) {
            processedA = processedA.replace(/\s+/g, '');
            processedB = processedB.replace(/\s+/g, '');
        }

        const result = document.getElementById('result');
        result.style.display = 'inline-block';

        if (processedA === processedB) {
            result.style.color = '#4CAF50';
            result.textContent = 'Os textos são idênticos!';
        } else {
            result.style.color = '#f44336';
            result.textContent = 'Os textos são diferentes.';

            const similarity = calculateSimilarity(processedA, processedB);
            result.textContent += ` Similaridade: ${similarity.toFixed(2)}%`;
        }
    }

    function calculateSimilarity(textA, textB) {
        if (textA.length === 0 && textB.length === 0) return 100;
        if (textA.length === 0 || textB.length === 0) return 0;

        const maxLength = Math.max(textA.length, textB.length);
        let matchingChars = 0;

        const minLength = Math.min(textA.length, textB.length);
        for (let i = 0; i < minLength; i++) {
            if (textA[i] === textB[i]) {
                matchingChars++;
            }
        }

        return (matchingChars / maxLength) * 100;
    }
});