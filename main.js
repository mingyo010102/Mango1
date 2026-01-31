const generateBtn = document.getElementById('generate-btn');
const numSetsInput = document.getElementById('num-sets');
const resultsContainer = document.getElementById('results-container');
const themeToggleBtn = document.getElementById('theme-toggle-btn');

generateBtn.addEventListener('click', () => {
  const numSets = parseInt(numSetsInput.value, 10);
  resultsContainer.innerHTML = '';

  if (isNaN(numSets) || numSets < 1) {
    resultsContainer.textContent = '유효한 숫자를 입력하세요.';
    return;
  }

  for (let i = 0; i < numSets; i++) {
    const lottoNumbers = generateLottoNumbers();
    displayNumbers(lottoNumbers);
  }
});

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
  const setElement = document.createElement('div');
  setElement.classList.add('lotto-set');
  
  const numbersString = numbers.join(', ');
  setElement.textContent = numbersString;
  
  resultsContainer.appendChild(setElement);
}

// Theme toggle logic
(function () {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
      themeToggleBtn.textContent = '🌙';
    }
  }
})();

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
    themeToggleBtn.textContent = '☀️';
    localStorage.removeItem('theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});
