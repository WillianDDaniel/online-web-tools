document.addEventListener('DOMContentLoaded', function () {
  const lengthSlider = document.getElementById('lengthSlider');
  const lengthValue = document.getElementById('lengthValue');
  const uppercaseOption = document.getElementById('uppercaseOption');
  const lowercaseOption = document.getElementById('lowercaseOption');
  const numbersOption = document.getElementById('numbersOption');
  const symbolsOption = document.getElementById('symbolsOption');
  const generateButton = document.getElementById('generateButton');
  const passwordResult = document.getElementById('passwordResult');
  const passwordDisplay = document.getElementById('passwordDisplay');
  const strengthValue = document.getElementById('strengthValue');
  const strengthProgress = document.getElementById('strengthProgress');
  const copyButton = document.getElementById('copyButton');
  const historyButton = document.getElementById('historyButton');
  const passwordHistory = document.getElementById('passwordHistory');
  const historyList = document.getElementById('historyList');
  const toast = document.getElementById('toast');

  let passwordsHistory = [];

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  lengthSlider.addEventListener('input', function () {
    lengthValue.textContent = this.value;
  });

  function generatePassword() {
    if (!uppercaseOption.checked && !lowercaseOption.checked &&
      !numbersOption.checked && !symbolsOption.checked) {
      showToast('Selecione pelo menos um tipo de caractere');
      return;
    }

    let charset = '';
    if (uppercaseOption.checked) charset += uppercase;
    if (lowercaseOption.checked) charset += lowercase;
    if (numbersOption.checked) charset += numbers;
    if (symbolsOption.checked) charset += symbols;

    const length = parseInt(lengthSlider.value);

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    let passwordValid = true;

    if (uppercaseOption.checked && !/[A-Z]/.test(password)) passwordValid = false;
    if (lowercaseOption.checked && !/[a-z]/.test(password)) passwordValid = false;
    if (numbersOption.checked && !/[0-9]/.test(password)) passwordValid = false;
    if (symbolsOption.checked && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) passwordValid = false;

    if (!passwordValid) {
      return generatePassword();
    }

    passwordDisplay.textContent = password;
    passwordResult.classList.add('show');

    evaluatePasswordStrength(password);

    addToHistory(password);

    return password;
  }

  function evaluatePasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const uniqueChars = new Set(password).size;
    const variety = uniqueChars / password.length;
    if (variety > 0.7) score += 1;

    let strength = '';
    strengthProgress.className = 'strength-progress';
    strengthValue.className = 'strength-value';

    if (score <= 3) {
      strength = 'Fraca';
      strengthProgress.classList.add('weak');
      strengthValue.classList.add('weak');
    } else if (score <= 5) {
      strength = 'Média';
      strengthProgress.classList.add('medium');
      strengthValue.classList.add('medium');
    } else if (score <= 7) {
      strength = 'Forte';
      strengthProgress.classList.add('strong');
      strengthValue.classList.add('strong');
    } else {
      strength = 'Muito Forte';
      strengthProgress.classList.add('very-strong');
      strengthValue.classList.add('very-strong');
    }

    strengthValue.textContent = strength;
  }

  function addToHistory(password) {
    if (passwordsHistory.length >= 10) {
      passwordsHistory.pop();
    }

    passwordsHistory.unshift(password);

    updateHistoryList();
  }

  function updateHistoryList() {
    historyList.innerHTML = '';

    if (passwordsHistory.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'Nenhuma senha gerada ainda.';
      emptyMessage.style.textAlign = 'center';
      emptyMessage.style.color = 'var(--gray-500)';
      historyList.appendChild(emptyMessage);
      return;
    }

    passwordsHistory.forEach((password, index) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';

      const passwordText = document.createElement('span');
      passwordText.className = 'history-item-password';
      passwordText.textContent = password;

      const copyBtn = document.createElement('button');
      copyBtn.className = 'history-item-copy';
      copyBtn.textContent = 'Copiar';
      copyBtn.addEventListener('click', () => {
        copyToClipboard(password);
        showToast('Senha copiada para a área de transferência!');
      });

      historyItem.appendChild(passwordText);
      historyItem.appendChild(copyBtn);
      historyList.appendChild(historyItem);
    });
  }

  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  function showToast(message, duration = 3000) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  generateButton.addEventListener('click', generatePassword);

  passwordDisplay.addEventListener('click', function () {
    if (this.textContent === '********') return;

    copyToClipboard(this.textContent);
    showToast('Senha copiada para a área de transferência!');
  });

  copyButton.addEventListener('click', function () {
    if (passwordDisplay.textContent === '********') {
      showToast('Gere uma senha primeiro');
      return;
    }

    copyToClipboard(passwordDisplay.textContent);
    showToast('Senha copiada para a área de transferência!');
  });

  historyButton.addEventListener('click', function () {
    passwordHistory.classList.toggle('show');
    this.textContent = passwordHistory.classList.contains('show') ? 'Ocultar Histórico' : 'Histórico';
  });

  updateHistoryList();
});
