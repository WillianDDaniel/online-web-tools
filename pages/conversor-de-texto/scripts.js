document.addEventListener('DOMContentLoaded', function () {
  const inputText = document.getElementById('inputText');
  const outputText = document.getElementById('outputText');
  const toUpperCase = document.getElementById('toUpperCase');
  const toLowerCase = document.getElementById('toLowerCase');
  const toCapitalize = document.getElementById('toCapitalize');
  const toCapitalizeSentence = document.getElementById('toCapitalizeSentence');
  const toAlternate = document.getElementById('toAlternate');
  const toInverse = document.getElementById('toInverse');
  const removeExtraSpaces = document.getElementById('removeExtraSpaces');
  const copyText = document.getElementById('copyText');
  const swapText = document.getElementById('swapText');
  const clearText = document.getElementById('clearText');
  const removeAccents = document.getElementById('removeAccents');
  const removeNumbers = document.getElementById('removeNumbers');
  const removePunctuation = document.getElementById('removePunctuation');
  const addLineNumbers = document.getElementById('addLineNumbers');
  const findText = document.getElementById('findText');
  const replaceText = document.getElementById('replaceText');
  const findReplaceButton = document.getElementById('findReplaceButton');
  const customCaseText = document.getElementById('customCaseText');
  const applyCustomCase = document.getElementById('applyCustomCase');
  const charCount = document.getElementById('charCount');
  const wordCount = document.getElementById('wordCount');
  const lineCount = document.getElementById('lineCount');
  const paragraphCount = document.getElementById('paragraphCount');
  const toast = document.getElementById('toast');

  function convertToUpperCase() {
    outputText.value = processText(inputText.value.toUpperCase());
  }

  function convertToLowerCase() {
    outputText.value = processText(inputText.value.toLowerCase());
  }

  function convertToCapitalize() {
    const text = inputText.value;
    const processedText = text.replace(/\b\w/g, match => match.toUpperCase());
    outputText.value = processText(processedText);
  }

  function convertToCapitalizeSentence() {
    const text = inputText.value.toLowerCase();
    const sentences = text.split(/([.!?]+\s+)/g);
    let result = '';

    for (let i = 0; i < sentences.length; i++) {
      if (i % 2 === 0) {
        if (sentences[i].length > 0) {
          result += sentences[i].charAt(0).toUpperCase() + sentences[i].slice(1);
        }
      } else {
        result += sentences[i];
      }
    }

    if (result.length > 0) {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }

    outputText.value = processText(result);
  }

  function convertToAlternate() {
    const text = inputText.value;
    let result = '';

    for (let i = 0; i < text.length; i++) {
      if (i % 2 === 0) {
        result += text[i].toUpperCase();
      } else {
        result += text[i].toLowerCase();
      }
    }

    outputText.value = processText(result);
  }

  function convertToInverse() {
    const text = inputText.value;
    let result = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === char.toUpperCase()) {
        result += char.toLowerCase();
      } else {
        result += char.toUpperCase();
      }
    }

    outputText.value = processText(result);
  }

  function removeSpaces() {
    const text = inputText.value;
    const processedText = text
      .replace(/\s+/g, ' ')
      .replace(/^\s+|\s+$/g, '')
      .replace(/\n\s*\n+/g, '\n');

    outputText.value = processText(processedText);
  }

  function swapTexts() {
    const temp = inputText.value;
    inputText.value = outputText.value;
    outputText.value = temp;
    updateTextStats();
  }

  function clearTexts() {
    inputText.value = '';
    outputText.value = '';
    updateTextStats();
  }

  function findAndReplace() {
    const text = inputText.value;
    const find = findText.value;

    if (!find) {
      showToast('Por favor, digite o texto a ser localizado.');
      return;
    }

    const replace = replaceText.value;
    const regex = new RegExp(find, 'g');
    const processedText = text.replace(regex, replace);

    outputText.value = processText(processedText);
  }

  function applyCustomCasePattern() {
    const text = inputText.value;
    const pattern = customCaseText.value;

    if (!pattern) {
      showToast('Por favor, digite um padrão de capitalização.');
      return;
    }

    let result = '';
    let patternIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (/[a-zA-Z]/.test(char)) {
        const patternChar = pattern[patternIndex % pattern.length];

        if (patternChar === patternChar.toUpperCase()) {
          result += char.toUpperCase();
        } else {
          result += char.toLowerCase();
        }

        patternIndex++;
      } else {
        result += char;
      }
    }

    outputText.value = processText(result);
  }

  function processText(text) {
    let processedText = text;

    if (removeAccents.checked) {
      processedText = removeAccentsFromText(processedText);
    }

    if (removeNumbers.checked) {
      processedText = processedText.replace(/[0-9]/g, '');
    }

    if (removePunctuation.checked) {
      processedText = processedText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    }

    if (addLineNumbers.checked) {
      processedText = addLineNumbersToText(processedText);
    }

    return processedText;
  }

  function removeAccentsFromText(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function addLineNumbersToText(text) {
    const lines = text.split('\n');
    let result = '';

    for (let i = 0; i < lines.length; i++) {
      result += (i + 1) + '. ' + lines[i] + '\n';
    }

    return result.trim();
  }

  function copyToClipboard() {
    if (!outputText.value) {
      showToast('Não há texto para copiar');
      return;
    }

    outputText.select();
    document.execCommand('copy');
    showToast('Texto copiado para a área de transferência!');
  }

  function showToast(message, duration = 3000) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  function updateTextStats() {
    const text = inputText.value;

    charCount.textContent = text.length;

    const wordMatches = text.match(/\b\S+\b/g);
    wordCount.textContent = wordMatches ? wordMatches.length : 0;

    const lines = text.split('\n');
    lineCount.textContent = lines.length;

    const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim() !== '');
    paragraphCount.textContent = paragraphs.length;
  }

  inputText.addEventListener('input', updateTextStats);
  toUpperCase.addEventListener('click', convertToUpperCase);
  toLowerCase.addEventListener('click', convertToLowerCase);
  toCapitalize.addEventListener('click', convertToCapitalize);
  toCapitalizeSentence.addEventListener('click', convertToCapitalizeSentence);
  toAlternate.addEventListener('click', convertToAlternate);
  toInverse.addEventListener('click', convertToInverse);
  removeExtraSpaces.addEventListener('click', removeSpaces);
  copyText.addEventListener('click', copyToClipboard);
  swapText.addEventListener('click', swapTexts);
  clearText.addEventListener('click', clearTexts);
  findReplaceButton.addEventListener('click', findAndReplace);
  applyCustomCase.addEventListener('click', applyCustomCasePattern);

  updateTextStats();
});
