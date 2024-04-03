# `:has()`
Этот псевдокласс, известный как «родительский селектор», позволяет выбирать элемент в зависимости от его потомков.

## Синтаксис
```css
:has(селектор) { свойства }
```

`селектор` - может быть сложным, например `:has(h2, h3)`, `:has(input:checked ~ span)`.

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

Чтобы стилизовать <img>, только если его родитель <section>также содержит <h2>:

```css
section:has(h2) img {
    border: 5px solid lime;
}
```

## Можно ли использовать
Пока нет поддержки основного браузера, но вы можете играть с ним в свое удовольствие в Safari Technology Preview. Посмотрите эту демонстрацию в поддерживаемых браузерах.

## почитать
- https://www.bram.us/2021/12/21/the-css-has-selector-is-way-more-than-a-parent-selector/
- [CSS-селекторы уровня 4](https://www.w3.org/TR/selectors-4/) (официальная спецификация)
- [Селектор CSS :has() — это больше, чем «родительский селектор»](https://www.bram.us/2021/12/21/the-css-has-selector-is-way-more-than-a-parent-selector/) Брамуса ван Дамма.
- [Селектор CSS :has()](https://css-tricks.com/the-css-has-selector/) Робина Рендла (CSS Tricks)