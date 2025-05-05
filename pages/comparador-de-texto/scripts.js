document.addEventListener('DOMContentLoaded', function() {
  const textA = document.getElementById('textA');
  const textB = document.getElementById('textB');
  const countA = document.getElementById('countA');
  const countB = document.getElementById('countB');
  const compareButton = document.getElementById('compareButton');
  const clearButton = document.getElementById('clearButton');
  const swapTexts = document.getElementById('swapTexts');
  const highlightDiff = document.getElementById('highlightDiff');
  const resultContainer = document.getElementById('resultContainer');
  const resultTitle = document.getElementById('resultTitle');
  const similarityBar = document.getElementById('similarityBar');
  const similarityPercentage = document.getElementById('similarityPercentage');
  const differencesSection = document.getElementById('differencesSection');
  const differencesList = document.getElementById('differencesList');

  const ignoreCase = document.getElementById('ignoreCase');
  const ignoreSpaces = document.getElementById('ignoreSpaces');
  const ignorePunctuation = document.getElementById('ignorePunctuation');
  const ignoreAccents = document.getElementById('ignoreAccents');

  textA.addEventListener('input', updateCharacterCount);
  textB.addEventListener('input', updateCharacterCount);
  compareButton.addEventListener('click', performComparison);
  clearButton.addEventListener('click', clearAll);
  swapTexts.addEventListener('click', swapTextContent);
  highlightDiff.addEventListener('click', highlightDifferences);

  function updateCharacterCount() {
    countA.textContent = `${textA.value.length} caracteres`;
    countB.textContent = `${textB.value.length} caracteres`;
  }

  function clearAll() {
    textA.value = '';
    textB.value = '';
    updateCharacterCount();
    resultContainer.classList.remove('visible');
    differencesSection.classList.remove('visible');
    textA.classList.remove('highlighted');
    textB.classList.remove('highlighted');
  }

  function swapTextContent() {
    const tempText = textA.value;
    textA.value = textB.value;
    textB.value = tempText;
    updateCharacterCount();

    textA.classList.add('pulse');
    textB.classList.add('pulse');

    setTimeout(() => {
      textA.classList.remove('pulse');
      textB.classList.remove('pulse');
    }, 600);
  }

  function highlightDifferences() {
    if(textA.value.trim() === '' || textB.value.trim() === '') {
      alert('Por favor, preencha ambos os textos para destacar as diferenças.');
      return;
    }

    const originalA = textA.value;
    const originalB = textB.value;

    performComparison();

    highlightTextDifferences(originalA, originalB);
  }

  function processText(text) {
    let processed = text;

    if (ignoreCase.checked) {
      processed = processed.toLowerCase();
    }

    if (ignoreSpaces.checked) {
      processed = processed.replace(/\s+/g, '');
    }

    if (ignorePunctuation.checked) {
      processed = processed.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    }

    if (ignoreAccents.checked) {
      processed = processed.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    return processed;
  }

  function performComparison(highlightMode = false) {
    const originalA = textA.value;
    const originalB = textB.value;

    if(originalA.trim() === '' || originalB.trim() === '') {
      alert('Por favor, preencha ambos os textos para comparar.');
      return;
    }

    const processedA = processText(originalA);
    const processedB = processText(originalB);

    const similarity = calculateSimilarity(processedA, processedB);

    resultContainer.classList.add('visible');

    compareButton.classList.add('pulse');
    setTimeout(() => compareButton.classList.remove('pulse'), 600);

    if (processedA === processedB) {
      resultTitle.textContent = '✓ Os textos são idênticos!';
      resultTitle.className = 'result-title identical';
      similarityBar.style.width = '100%';
      similarityPercentage.textContent = '100%';
      differencesSection.classList.remove('visible');
    } else {
      resultTitle.textContent = '✗ Os textos são diferentes';
      resultTitle.className = 'result-title different';

      similarityBar.style.width = '0%';
      setTimeout(() => {
        similarityBar.style.width = `${similarity}%`;
        similarityPercentage.textContent = `${similarity.toFixed(2)}%`;
      }, 100);

      showDifferences(originalA, originalB, processedA, processedB, highlightMode);
    }
  }

  function calculateSimilarity(textA, textB) {
    const m = textA.length;
    const n = textB.length;

    if (m === 0 && n === 0) return 100;
    if (m === 0 || n === 0) return 0;

    const row1 = new Int32Array(m + 1);
    const row2 = new Int32Array(m + 1);
    let prev = row1;
    let curr = row2;

    for (let i = 0; i <= m; i++) {
      prev[i] = i;
    }

    for (let j = 1; j <= n; j++) {
      curr[0] = j;

      for (let i = 1; i <= m; i++) {
        const indicator = textA[i - 1] === textB[j - 1] ? 0 : 1;
        curr[i] = Math.min(
          curr[i - 1] + 1,
          prev[i] + 1,
          prev[i - 1] + indicator
        );
      }

      [prev, curr] = [curr, prev];
    }

    const distance = prev[m];
    const maxLength = Math.max(m, n);

    console.log("Distance:", distance);
    return ((maxLength - distance) / maxLength) * 100;
  }

  function showDifferences(originalA, originalB, processedA, processedB, highlightMode) {
    differencesSection.classList.add('visible');
    differencesList.innerHTML = '';

    if (highlightMode) {
      highlightTextDifferences(originalA, originalB);
      return;
    }

    const segments = findDifferentSegments(originalA, originalB, processedA, processedB);

    const maxDiffs = Math.min(5, segments.length);

    for (let i = 0; i < maxDiffs; i++) {
      const diffItem = document.createElement('div');
      diffItem.className = 'difference-item';

      const segment = segments[i];
      diffItem.innerHTML = `
        <strong>Diferença ${i + 1}:</strong>
        <span class="difference-original">${segment.original}</span>
        <span class="difference-modified">${segment.modified}</span>
      `;

      differencesList.appendChild(diffItem);
    }

    if (segments.length > 5) {
      const moreInfo = document.createElement('p');
      moreInfo.textContent = `E mais ${segments.length - 5} diferenças encontradas.`;
      moreInfo.style.textAlign = 'center';
      moreInfo.style.marginTop = '1rem';
      differencesList.appendChild(moreInfo);
    }

    if (segments.length > 0) {
      const viewSideBySideBtn = document.createElement('button');
      viewSideBySideBtn.textContent = "Ver textos lado a lado";
      viewSideBySideBtn.className = "compare-button";
      viewSideBySideBtn.style.marginTop = "1rem";
      viewSideBySideBtn.style.backgroundColor = "#3a56d4";
      viewSideBySideBtn.onclick = function() {
        highlightTextDifferences(originalA, originalB);
      };

      differencesList.appendChild(viewSideBySideBtn);
    }
  }

  function findDifferentSegments(originalA, originalB, processedA, processedB) {

    const wordsA = originalA.split(/\s+/);
    const wordsB = originalB.split(/\s+/);

    const differences = [];

    let i = 0, j = 0;
    while (i < wordsA.length || j < wordsB.length) {
      let wordA = i < wordsA.length ? processText(wordsA[i]) : null;
      let wordB = j < wordsB.length ? processText(wordsB[j]) : null;

      if (wordA === wordB) {
        i++;
        j++;
      } else {

        let foundMatch = false;
        let tempI = i + 1;
        let tempJ = j + 1;

        const windowSize = 5;
        for (let offset = 1; offset <= windowSize; offset++) {
          if (i + offset < wordsA.length && processText(wordsA[i + offset]) === wordB) {
            tempI = i + offset;
            foundMatch = true;
            break;
          }

          if (j + offset < wordsB.length && wordA === processText(wordsB[j + offset])) {
            tempJ = j + offset;
            foundMatch = true;
            break;
          }
        }

        differences.push({
          original: wordsA.slice(i, tempI).join(' ') || '[nada]',
          modified: wordsB.slice(j, tempJ).join(' ') || '[nada]'
        });

        i = tempI;
        j = tempJ;

        if (!foundMatch) {
          i++;
          j++;
        }
      }
    }

    return differences;
  }

  function highlightTextDifferences(textA, textB) {
    differencesSection.classList.add('visible');
    differencesList.innerHTML = '';

    const linesA = textA.split('\n');
    const linesB = textB.split('\n');

    const diffContainer = document.createElement('div');
    diffContainer.className = 'diff-container';
    diffContainer.style.display = 'flex';
    diffContainer.style.gap = '1rem';
    diffContainer.style.marginTop = '1rem';

    const diffViewA = document.createElement('div');
    diffViewA.className = 'diff-view';
    diffViewA.style.flex = '1';
    diffViewA.style.padding = '1rem';
    diffViewA.style.border = '1px solid #ddd';
    diffViewA.style.borderRadius = '5px';
    diffViewA.style.background = '#f9f9f9';
    diffViewA.style.whiteSpace = 'pre-wrap';
    diffViewA.style.maxHeight = '400px';
    diffViewA.style.overflowY = 'auto';

    const diffViewB = document.createElement('div');
    diffViewB.className = 'diff-view';
    diffViewB.style.flex = '1';
    diffViewB.style.padding = '1rem';
    diffViewB.style.border = '1px solid #ddd';
    diffViewB.style.borderRadius = '5px';
    diffViewB.style.background = '#f9f9f9';
    diffViewB.style.whiteSpace = 'pre-wrap';
    diffViewB.style.maxHeight = '400px';
    diffViewB.style.overflowY = 'auto';

    const titleA = document.createElement('h4');
    titleA.textContent = 'Texto Original';
    titleA.style.marginBottom = '10px';

    const titleB = document.createElement('h4');
    titleB.textContent = 'Texto Comparativo';
    titleB.style.marginBottom = '10px';

    diffViewA.appendChild(titleA);
    diffViewB.appendChild(titleB);

    const maxLines = Math.max(linesA.length, linesB.length);

    for (let i = 0; i < maxLines; i++) {
      const lineA = i < linesA.length ? linesA[i] : '';
      const lineB = i < linesB.length ? linesB[i] : '';

      const lineElementA = document.createElement('div');
      const lineElementB = document.createElement('div');

      lineElementA.style.padding = '2px 0';
      lineElementB.style.padding = '2px 0';

      const processedA = processText(lineA);
      const processedB = processText(lineB);

      if (processedA !== processedB) {
        lineElementA.style.backgroundColor = '#ffecb3';
        lineElementB.style.backgroundColor = '#ffecb3';
      }

      lineElementA.textContent = lineA;
      lineElementB.textContent = lineB;

      diffViewA.appendChild(lineElementA);
      diffViewB.appendChild(lineElementB);
    }

    diffContainer.appendChild(diffViewA);
    diffContainer.appendChild(diffViewB);

    differencesList.appendChild(diffContainer);

    const diffTitle = document.createElement('h4');
    diffTitle.className = 'differences-title';
    diffTitle.textContent = 'Visualização das diferenças:';
    differencesList.insertBefore(diffTitle, diffContainer);

    textA.classList.add('highlighted');
    textB.classList.add('highlighted');
  }

  updateCharacterCount();
});
