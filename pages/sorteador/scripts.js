document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const numberSweep = document.getElementById('numberSweep');
  const minNumber = document.getElementById('minNumber');
  const maxNumber = document.getElementById('maxNumber');
  const repeatNumber = document.getElementById('repeatNumber');
  const repeatNumberLabel = document.getElementById('repeatNumberLabel');
  const generateBtn = document.getElementById('generate');
  const resultDiv = document.getElementById('result');
  const clearResultBtn = document.getElementById('clearResult');
  const decreaseSweepBtn = document.getElementById('decreaseSweep');
  const increaseSweepBtn = document.getElementById('increaseSweep');

  // Iniciar com a opção de números únicos oculta
  repeatNumberLabel.style.display = 'none';

  // Função para limpar o estado vazio do resultado
  function clearEmptyState() {
      const emptyState = resultDiv.querySelector('.empty-state');
      if (emptyState) {
          resultDiv.removeChild(emptyState);
      }
  }

  // Função para restaurar o estado vazio
  function restoreEmptyState() {
      resultDiv.innerHTML = `
          <div class="empty-state">
              <i class="fas fa-random"></i>
              <p>Os números sorteados aparecerão aqui</p>
          </div>
      `;
  }

  // Função para gerar números aleatórios normais (pode repetir)
  function generateNormal(runTimes) {
      // Limpar resultados anteriores
      resultDiv.innerHTML = '';
      
      // Obter valores mínimo e máximo
      const min = parseInt(minNumber.value);
      const max = parseInt(maxNumber.value);
      
      // Verificar se o número de sorteios é válido
      let checkRunTimes = runTimes === "" ? 1 : parseInt(runTimes);
      
      // Array para os números sorteados
      let lastNumbers = [];
      
      // Gerar números aleatórios
      for (let times = 0; times < checkRunTimes; times++) {
          const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          lastNumbers.push(randomNumber);
      }
      
      // Mostrar números na tela
      showNumbersOnScreen(lastNumbers);
  }

  // Função para gerar números aleatórios únicos (sem repetição)
  function generateUnique(runTimes) {
      // Limpar resultados anteriores
      resultDiv.innerHTML = '';
      
      // Obter valores mínimo e máximo
      const min = parseInt(minNumber.value);
      const max = parseInt(maxNumber.value);
      
      // Verificar se o número de sorteios é válido
      let checkRunTimes = runTimes === "" ? 1 : parseInt(runTimes);
      
      // Set para números únicos
      const uniqueNumbers = new Set();
      
      // Gerar números únicos aleatórios
      while (uniqueNumbers.size < checkRunTimes) {
          const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          uniqueNumbers.add(randomNumber);
      }
      
      // Converter Set para Array e mostrar na tela
      const uniqueNumbersArray = Array.from(uniqueNumbers);
      showNumbersOnScreen(uniqueNumbersArray);
  }

  // Função para mostrar números na tela com animação
  function showNumbersOnScreen(numbers) {
      // Remover o estado vazio se existir
      clearEmptyState();

      numbers.forEach((number, index) => {
          setTimeout(() => {
              const numberElement = document.createElement("div");
              numberElement.className = 'result-number';
              numberElement.innerHTML = `
                  <span class="number-label">Número ${index + 1}</span>
                  <span class="number-value">${number}</span>
              `;
              resultDiv.appendChild(numberElement);
              
              // Scroll suave para o resultado mais recente
              numberElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, (index + 1) * 500); // Tempo reduzido para melhor experiência
      });
  }

  // Verificar e executar o sorteio
  function runRaffle(min, max) {
      let isUnique = repeatNumber.checked;
      let range = (max - min) + 1;
      let sweepValue = parseInt(numberSweep.value) || 1;
      
      // Validar se pode fazer sorteio único
      if (isUnique) {
          if (range >= sweepValue) {
              // Adicionar classe de "carregando" ao botão
              generateBtn.classList.add('loading');
              generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sorteando...';
              
              // Timeout para simular processamento
              setTimeout(() => {
                  generateUnique(sweepValue);
                  // Restaurar botão
                  generateBtn.classList.remove('loading');
                  generateBtn.innerHTML = '<i class="fas fa-dice"></i> Sortear Agora';
              }, 500);
          } else {
              showError('O intervalo de números precisa ser maior que o total de sorteios para sorteios únicos!');
          }
      } else {
          // Adicionar classe de "carregando" ao botão
          generateBtn.classList.add('loading');
          generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sorteando...';
          
          // Timeout para simular processamento
          setTimeout(() => {
              generateNormal(sweepValue);
              // Restaurar botão
              generateBtn.classList.remove('loading');
              generateBtn.innerHTML = '<i class="fas fa-dice"></i> Sortear Agora';
          }, 500);
      }
  }

  // Função para mostrar mensagem de erro
  function showError(message) {
      alert(message);
  }

  // Event listener para iniciar o sorteio
  generateBtn.addEventListener('click', () => {
      const min = parseInt(minNumber.value);
      const max = parseInt(maxNumber.value);
      
      // Validações
      if (isNaN(min) || isNaN(max)) {
          showError('Você precisa preencher o intervalo de números a serem sorteados!');
          return;
      }
      
      if (min >= max) {
          showError('O valor mínimo deve ser menor que o valor máximo!');
          return;
      }
      
      // Executar o sorteio
      runRaffle(min, max);
  });

  // Event listener para mostrar/ocultar a opção de números únicos
  numberSweep.addEventListener('input', () => {
      const value = parseInt(numberSweep.value) || 0;
      repeatNumberLabel.style.display = value > 1 ? 'flex' : 'none';
      
      // Se ajustar para 1, desabilitar a opção de não repetir
      if (value <= 1) {
          repeatNumber.checked = false;
      }
  });

  // Event listener para limpar resultados
  clearResultBtn.addEventListener('click', () => {
      restoreEmptyState();
  });

  // Event listeners para botões + e -
  decreaseSweepBtn.addEventListener('click', () => {
      let value = parseInt(numberSweep.value) || 1;
      if (value > 1) {
          numberSweep.value = value - 1;
          
          // Disparar evento para verificar visibilidade da opção de números únicos
          const event = new Event('input');
          numberSweep.dispatchEvent(event);
      }
  });

  increaseSweepBtn.addEventListener('click', () => {
      let value = parseInt(numberSweep.value) || 0;
      numberSweep.value = value + 1;
      
      // Disparar evento para verificar visibilidade da opção de números únicos
      const event = new Event('input');
      numberSweep.dispatchEvent(event);
  });

  // Impedir valores negativos nos inputs
  [numberSweep, minNumber, maxNumber].forEach(input => {
      input.addEventListener('change', () => {
          if (input.value < 0) input.value = 0;
      });
  });
});