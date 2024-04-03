const form = document.querySelector('input');
let previousElements = [];

form.addEventListener('input', event => {
  event.preventDefault();

  previousElements.forEach(element => {
    element.style.backgroundColor = '';
  });

  const userSelector = event.target.value;

  if (!userSelector.trim()) {
    return;
  }

  // Выбор новых элементов и сохранение их в previousElements
  previousElements = Array.from(document.querySelectorAll(userSelector));

  if (previousElements.length) {
    previousElements.forEach(element => {
      element.style.backgroundColor = '#90EE90';
    });
  }
});
