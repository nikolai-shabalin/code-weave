# `:has()`
Этот псевдокласс, известный как «родительский селектор», позволяет выбирать элемент в зависимости от его потомков.

## Синтаксис
```css
:has(селектор) { свойства }
селектор:has(селектор ) { свойства }
```

`селектор` - может быть простым и сложным, например `:has(h2, h3)`, `:has(input:checked ~ span)`.

## Пример
```css
section:has(h2) {
  backgroung-color: lightgray;
}
```

У `<section>` появляется светло-серый фон, если он содержит `<h2>`.

```html
<!-- секция с серым фоном -->
<section> 
  <h2>Заголовок</h2>
  <p>Текст</p>
</section>

<!-- секция без серого фона -->
<section>
  <h3>Заголовок</h3>
  <p>Текст</p>
</section>
```

Есть несколько довольно интересных вариантов использования. Например, мы можем по-разному стилизовать изображение в `<figure>` зависимости от того, сопровождается ли оно расширением `<figcaption>`. Или мы могли бы настроить таргетинг на метки в форме, за которыми следуют недопустимые входные данные. Возможности безграничны.

Чтобы стилизовать `<section>` элементы, содержащие `<h2>`:

```css
section:has(h2) {
  background: lightgray;
}
```

Чтобы стилизовать <img>, только если его родитель `<section>` также содержит `<h2>`:

```css
section:has(h2) img {
  border: 5px solid lime;
}
```

## Примеры использования

### Уменьшаем нативные отступы у текстовых элементов.

```css
h1:has(+ h2) {
  margin-block-end: 10px;
}
```

Обычно сужается верхний отступ у `h2` — `h1 + h2 { margin-block-start: 10px }`, но поток-то идёт сверху вниз.

### Добавляем стили если есть подпись к картинке

```html
<section>
  <figure>
    <img src="https://placedog.net/500/280" alt="My aunt sally's dog is a golden retreiver." />
    <figcaption>My Aunt Sally's Doggo</figcaption>
  </figure>
</section>
```

```css
figure:has(figcaption) {
  background: #c3baba;
  padding: 0.6rem;
  max-width: 50%;
  border-radius: 5px;
}
```

У изображения появляется рамка объединяя текст и картинку. Появляется только если есть подпись `<figcaption>`.

### Стили для выбранной опции

```html
<select>
  <option value="1" selected>Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
  <option value="4">Option 4</option>
  <option value="5">Option 5</option>
</select>
```

```css
option:checked {
  background-color: darkcyan;
  color: white;
}
```

У выбранного `<option>` появляется фон.

### Меняем стили селекта от выбранной опции

```html
<select>
  <option value="maroon" selected>Maroon</option>
  <option value="indigo">Indigo</option>
  <option value="dodgerblue">Dodgerblue</option>
  <option value="green">Green</option>
  <option value="orangered">Orangered</option>
</select>
```

```css
select {
  --background: black;
  font: inherit;
  font-size: 24px;
  color: #fff;

  &:has([value="maroon"]:checked) {
    --background: maroon;
  }
  &:has([value="indigo"]:checked) {
    --background: indigo;
  }
  &:has([value="dodgerblue"]:checked) {
    --background: dodgerblue;
  }
  &:has([value="green"]:checked) {
    --background: green;
  }
  &:has([value="orangered"]:checked) {
    --background: orangered;
  }
}

/* если ничего не выбрано */
option {
  background-color: var(--background);
  color: black;
}
```

`<select>` меняет цвет фона от выбранного `<option>`

### Подсвечиваем обязательность действительного заполнения селекта

```html
<select required>
  <option>Please select in option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
  <option value="4">Option 4</option>
</select>
```

```css
select {
  font: inherit;
  font-size: 24px;
}

/*   style for <select> elemants without a valid selected <option>.  */
select[required]:not(:has([value]:checked)) {
  border: 0.5em solid red;
}
```

Если выбрана первая опция, то селект подсвечивается.

### Изменение размера текста всего сайта от выбранной опции

```html
<select class="textSize">
  <option value="xs">Extra Small</option>
  <option value="s">Small</option>
  <option value="m" selected>Medium</option>
  <option value="l">Large</option>
  <option value="xl">Extra Large</option>
</select>
```

```css
:root {
  &:has(.textSize [value="xs"]:checked) { --fontSize: 0.8em; }
  &:has(.textSize [value="s"]:checked) { --fontSize: 0.9em; }
  &:has(.textSize [value="m"]:checked) { --fontSize: 1em; }
  &:has(.textSize [value="l"]:checked) { --fontSize: 1.2em; }
  &:has(.textSize [value="xl"]:checked) { --fontSize: 1.5em; }
}

body {
  font-size: var(--fontSize, 1em);
}
```


### Темизация всего сайта от выбранной опции

```html
<select class="theme">
  <option value="dark" selected>Dark</option>
  <option value="light">Light</option>
  <option value="color">Color</option>
</select>
```

```css
:root {
  &:has(.theme [value="dark"]:checked) {
    --background: #000;
    --color: #fff;
    --line-color: hotpink;
  }
  &:has(.theme [value="light"]:checked) {
    --background: #ddd;
    --color: #000;
    --line-color: darkgoldenrod;
    --button-background: #0001;
  }
  &:has(.theme [value="color"]:checked) {
    --background: linear-gradient(60deg, maroon, darkblue);
    --color: #aff;
    --line-color: #f55;
    --content-background: #0004;
  }
}

body {
  background: var(--background);
  color: var(--color);
}

.content {
  background-color: var(--content-background, none);
}

h1 {
  text-decoration-color: var(--line-color, currentcolor)
}

button {
  background-color: var(--button-background, #fff3);
  color: var(--color);
  border: 2px solid var(--line-color, currentcolor);
}
```



## Можно ли использовать&
На этот вопрос можно всегда ответить посмотрев на [caniuse](https://caniuse.com/css-has), а также обратив внимание на Baseline.

## Статьи
- https://www.bram.us/2021/12/21/the-css-has-selector-is-way-more-than-a-parent-selector/
- [CSS-селекторы уровня 4](https://www.w3.org/TR/selectors-4/) (официальная спецификация)
- [Селектор CSS :has() — это больше, чем «родительский селектор»](https://www.bram.us/2021/12/21/the-css-has-selector-is-way-more-than-a-parent-selector/) Брамуса ван Дамма.
- [Селектор CSS :has()](https://css-tricks.com/the-css-has-selector/) Робина Рендла (CSS Tricks)
