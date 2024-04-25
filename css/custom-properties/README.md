# Кастомные свойства

## Когда использовать
1. когда нам нужно использовать одно и то же значение в нескольких местах (DRY)
2. когда мы знаем, что значение будет изменено.

## Защитные значения
Совершенно глупое использование кастомок "объявили — сразу используем", хотя это прекрасно работает.

```css
.button {
  --button-background: var(--color-text-reversed);
  --button-border-color: var(--color-border);
  --button-border-radius: 2em;
  --button-border-size: 1px;
  --button-color: var(--color-text);
  --button-padding: 0.5em 1.1em;

  align-items: center;
  background-color: var(--button-background);
  border-radius: var(--button-border-radius);
  border: var(--button-border-size) solid var(--button-border-color);
  color: var(--button-color);
  display: inline-flex;
  gap: 0.5em;
  justify-content: center;
  padding: var(--button-padding);
}
```

глупость заключается в том, что такие кастомки вы никогда больше не сможете использовать. Ситуацию спасают резервные значения.

```css
color: var(--button-color, var(--color-text));
```
код ставится чище, а использование безопаснее.

```css
.button {
  align-items: center;
  background-color: var(--button-background, var(--color-text-reversed));
  border-radius: var(--button-border-radius);
  border: var(--button-border-size, 2em) solid var(--button-border-color, var(--color-border));
  color: var(--button-color, var(--color-text));
  display: inline-flex;
  gap: 0.5em;
  justify-content: center;
  padding: var(--button-padding, 0.5em 1.1em);
}
```
