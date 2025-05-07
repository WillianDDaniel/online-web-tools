document.addEventListener('DOMContentLoaded', function () {
  const textInput = document.getElementById('textInput');
  const charactersCount = document.getElementById('charactersCount');
  const wordsCount = document.getElementById('wordsCount');
  const charactersNoSpacesCount = document.getElementById('charactersNoSpacesCount');
  const readingTime = document.getElementById('readingTime');
  const characterLimit = document.getElementById('characterLimit');
  const limitProgressBar = document.getElementById('limitProgressBar');
  const limitCounter = document.getElementById('limitCounter');
  const copyButton = document.getElementById('copyButton');
  const clearButton = document.getElementById('clearButton');
  const textPreview = document.getElementById('textPreview');
  const toast = document.getElementById('toast');

  function updateStats() {
    const text = textInput.value;
    const charCount = text.length;
    charactersCount.textContent = charCount;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    wordsCount.textContent = wordCount;

    const charNoSpacesCount = text.replace(/\s+/g, '').length;
    charactersNoSpacesCount.textContent = charNoSpacesCount;

    const minutesToRead = Math.max(1, Math.ceil(wordCount / 200));
    readingTime.textContent = minutesToRead === 1 ? '1 min' : `${minutesToRead} min`;

    updateCharacterLimit(charCount);

    updateTextPreview(text);
  }

  function updateCharacterLimit(charCount) {
    const limit = parseInt(characterLimit.value) || 0;
    const percentage = limit === 0 ? 0 : Math.min(100, (charCount / limit) * 100);

    limitProgressBar.style.width = `${percentage}%`;
    limitCounter.textContent = `${charCount}/${limit}`;

    limitProgressBar.classList.remove('warning', 'danger');
    if (percentage >= 90 && percentage < 100) {
      limitProgressBar.classList.add('warning');
    } else if (percentage >= 100) {
      limitProgressBar.classList.add('danger');
    }
  }

  function updateTextPreview(text) {
    if (text.trim() === '') {
      textPreview.textContent = '...';
    } else {
      const preview = text.trim().substring(0, 50) + (text.length > 50 ? '...' : '');
      textPreview.textContent = preview;
    }
  }

  function showToast(message, duration = 3000) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  textInput.addEventListener('input', updateStats);

  characterLimit.addEventListener('input', function () {
    updateStats();
  });

  copyButton.addEventListener('click', function () {
    if (textInput.value.trim() === '') {
      showToast('Não há texto para copiar');
      return;
    }

    textInput.select();
    document.execCommand('copy');
    showToast('Texto copiado para a área de transferência!');
  });

  clearButton.addEventListener('click', function () {
    if (textInput.value.trim() === '') {
      showToast('O campo já está vazio');
      return;
    }

    textInput.value = '';
    updateStats();
    showToast('Texto limpo com sucesso!');
  });

  updateStats();
});
