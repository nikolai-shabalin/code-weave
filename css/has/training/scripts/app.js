const form = document.querySelector('input');

form.addEventListener('input', event => {
  event.preventDefault();
  const userSelector = event.target.value;

  if (!userSelector.trim()) {
    return;
  }

  if (userSelector) {
    // Проверяем, существует ли уже элемент <style> с идентификатором 'userStyle'
    let oldStyle = document.getElementById('userStyle');
    if (oldStyle) {
      // Если существует, удаляем его
      oldStyle.remove();
    }

    let style = document.createElement('style');

    // Добавляем в него CSS-правило
    style.innerHTML = `${userSelector} { background-color: #90EE90; }`;

    // Добавляем уникальный идентификатор
    style.id = 'userStyle';

    // Добавляем элемент <style> в <head> документа
    document.head.appendChild(style);
  }
});
