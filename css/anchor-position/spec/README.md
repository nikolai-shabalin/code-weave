# Позиционирование якоря

```html
<button></button>
<button type="button"></button>
<button type="button" role="button"></button> <!-- бессмысленный атрибут, так как role у <button> есть по умолчанию -->
```

```html
<button>Купить</button>
<button type="button">Купить</button>
<button type="button">
  <span class="visually-hidden">Купить</span>
</button>
<button type="button" aria-label="Купить"></button>
```

## 1. Введение

CSS [absolute positioning](https://www.w3.org/TR/css-position-3/#absolute-position) позволяет авторам размещать элементы в любом месте страницы, не обращая внимания на расположение других элементов, кроме содержащего их блока. Такая гибкость может быть очень полезной, но также и очень ограниченной - часто вы хотите позиционировать относительно *какого-то* другого элемента. Якорное позиционирование (с помощью функций [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor) и [anchor-size()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor-size)) позволяет авторам добиться этого, "привязывая" абсолютно позиционированный элемент к одному или нескольким другим элементам на странице, а также позволяя им попробовать несколько возможных позиций, чтобы найти "лучшую", которая позволяет избежать перекрытия/переполнения.

Например, автор может захотеть расположить всплывающую подсказку по центру и выше целевого элемента, если только это не приведет к тому, что подсказка окажется за пределами экрана, в этом случае она должна быть ниже целевого элемента. Этого можно добиться с помощью следующего CSS:

```css
.anchor {
anchor-name: --tooltip;
}
.tooltip {
/* Фикспозиция означает, что нам не нужно беспокоиться о
связи между блоками;
всплывающая подсказка может находиться в любом месте DOM. */
position: fixed;

/* Все поведение привязки будет по умолчанию
ссылаться на якорь --tooltip. */
position-anchor: --tooltip;

/* Выравнивает нижнюю часть всплывающей подсказки по верхней части якоря;
также по умолчанию горизонтально выравнивается по центру
по горизонтали по центру (в горизонтальных режимах письма). */
inset-area: block-start;

/* Автоматическая смена, если окно переполнено
чтобы верхняя часть всплывающей подсказки выровнялась по нижней части якоря
вместо этого. */
position-try: flip-block;

/* Предотвращает слишком широкое окно */
max-inline-size: 20em;
}
```

## 2. Определение якоря

### 2.1. Создание якоря: свойство [anchor-name](https://www.w3.org/TR/css-anchor-position-1/#propdef-anchor-name)

| Имя: | anchor-name |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | none https://www.w3.org/TR/css-values-4/#comb-one https://www.w3.org/TR/css-values-4/#typedef-dashed-identhttps://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | нет |
| https://www.w3.org/TR/css-cascade/#applies-to | все элементы, которые генерируют https://www.w3.org/TR/css-display-3/#principal-box |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | n/a |
| https://www.w3.org/TR/css-cascade/#computed | как указано |
| https://www.w3.org/TR/cssom/#serializing-css-values | по грамматике |
| https://www.w3.org/TR/web-animations/#animation-type | дискретно |

Свойство [anchor-name](https://www.w3.org/TR/css-anchor-position-1/#propdef-anchor-name) определяет, что элемент является якорным элементом, и дает ему список имен якорных элементов, на которые он должен ориентироваться. Значения определены следующим образом:

**none**Свойство не имеет эффекта.**[<dashed-ident>](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)#**Если элемент порождает [principal box](https://www.w3.org/TR/css-display-3/#principal-box), то элемент является [anchor element](https://www.w3.org/TR/css-anchor-position-1/#anchor-element), со списком [anchor names](https://www.w3.org/TR/css-anchor-position-1/#anchor-name), как указано. Каждое имя якоря - это [tree-scoped name](https://drafts.csswg.org/css-scoping-1/#css-tree-scoped-name).
В противном случае свойство не имеет эффекта.

Имена [Anchor names](https://www.w3.org/TR/css-anchor-position-1/#anchor-name) не обязательно должны быть уникальными. Не все элементы могут быть [якорными элементами](https://www.w3.org/TR/css-anchor-position-1/#anchor-element) для данного позиционированного элемента, поэтому имя может быть использовано повторно в нескольких местах, если их использование распределено соответствующим образом.

ПРИМЕЧАНИЕ: Если несколько элементов имеют общее [имя якоря](https://www.w3.org/TR/css-anchor-position-1/#anchor-name) и все они видны для данного позиционированного элемента, то [целевой элемент якоря](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element) будет последним в порядке DOM. [anchor-scope](https://www.w3.org/TR/css-anchor-position-1/#propdef-anchor-scope) можно использовать для ограничения видимости имен для данного элемента.

По умолчанию [Anchor names](https://www.w3.org/TR/css-anchor-position-1/#anchor-name) *не* ограничиваются [containment](https://www.w3.org/TR/css-contain-2/#containment); даже если элемент имеет [style](https://www.w3.org/TR/css-contain-2/#style-containment) или [layout containment](https://www.w3.org/TR/css-contain-2/#layout-containment) (или любое другое подобное ограничение), имена якорей его потомков видны элементам в других местах страницы.

ПРИМЕЧАНИЕ: Если элемент находится в [пропущенном содержимом](https://www.w3.org/TR/css-contain-2/#skips-its-contents) другого элемента (например, из-за [content-visibility: hidden](https://www.w3.org/TR/css-contain-2/#propdef-content-visibility)), он не является [допустимым якорным элементом](https://www.w3.org/TR/css-anchor-position-1/#acceptable-anchor-element), действуя так, как будто у него нет имен.

### **2.1.1. Неявные якорные элементы**.

Некоторые спецификации могут определять, что при определенных обстоятельствах конкретный элемент является неявным якорным элементом для данного позиционированного элемента.

TODO заполняет новые детали, связанные с popover. Это делает объявленный элемент [неявным якорным элементом](https://www.w3.org/TR/css-anchor-position-1/#implicit-anchor-element) для элемента с атрибутом.

На [неявные якорные элементы](https://www.w3.org/TR/css-anchor-position-1/#implicit-anchor-element) можно ссылаться с помощью ключевого слова [implicit](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-implicit), а не ссылаться на некоторое значение [anchor-name](https://www.w3.org/TR/css-anchor-position-1/#propdef-anchor-name).

[Псевдоэлементы](https://www.w3.org/TR/CSS21/selector.html#x22) имеют тот же [неявный якорный элемент](https://www.w3.org/TR/css-anchor-position-1/#implicit-anchor-element), что и их [исходный элемент](https://www.w3.org/TR/selectors-4/#originating-element), если не указано иное.

ПРИМЕЧАНИЕ: Без этого эти [псевдоэлементы](https://www.w3.org/TR/CSS21/selector.html#x22), которые часто недоступны по другим спецификациям, не могут быть позиционированы с помощью [неявных якорных элементов](https://www.w3.org/TR/css-anchor-position-1/#implicit-anchor-element).

### 2.2. Масштабирование имен якорей: свойство [anchor-scope](https://www.w3.org/TR/css-anchor-position-1/#propdef-anchor-scope)

| Имя: | anchor-scope |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | none https://www.w3.org/TR/css-values-4/#comb-one all | https://www.w3.org/TR/css-values-4/#typedef-dashed-identhttps://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | none |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-pseudo/#generated-content |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | n/a |
| https://www.w3.org/TR/css-cascade/#computed | как указано |
| https://www.w3.org/TR/cssom/#serializing-css-values | по грамматике |
| https://www.w3.org/TR/web-animations/#animation-type | дискретно |

Это свойство распространяет указанные [имена якорей](https://www.w3.org/TR/css-anchor-position-1/#anchor-name) и поиск этих имен якорей на поддерево этого элемента. См. [§ 2 Определение якоря](https://www.w3.org/TR/css-anchor-position-1/#determining).

Значения имеют следующие значения:

**none**Не изменяет область видимости [имени якоря](https://www.w3.org/TR/css-anchor-position-1/#anchor-name).**all**Указывает, что все [имена якорей](https://www.w3.org/TR/css-anchor-position-1/#anchor-name), определенные этим элементом или его потомками, область видимости которых еще не ограничена потомком с помощью [anchor-scope](https://www.w3.org/TR/css-anchor-position-1/#propdef-anchor-scope)- должны быть в области видимости только для потомков этого элемента; и ограничивает потомков только сопоставлением имен якорей с [элементами якорей](https://www.w3.org/TR/css-anchor-position-1/#anchor-element) в пределах этого поддерева. **[<dashed-ident>](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)**Указывает, что совпадающее [имя якоря](https://www.w3.org/TR/css-anchor-position-1/#anchor-name), определенное этим элементом или его потомками, область действия которых еще не ограничена потомком с помощью [anchor-scope](https://www.w3.org/TR/css-anchor-position-1/#propdef-anchor-scope)-должно быть в области действия только для потомков этого элемента; и ограничивает потомков только совпадением этих имен якорей с [элементами якорей](https://www.w3.org/TR/css-anchor-position-1/#anchor-element) в пределах этого поддерева.

Это свойство не влияет на [неявные якорные элементы](https://www.w3.org/TR/css-anchor-position-1/#implicit-anchor-element).

Когда шаблон проектирования используется повторно,

[anchor-scope](https://www.w3.org/TR/css-anchor-position-1/#propdef-anchor-scope)

может предотвратить столкновение имен идентичных компонентов. Например, если список содержит позиционированные элементы в каждом элементе списка, которые хотят позиционировать себя относительно элемента списка, в котором они находятся,

```css
li {
  anchor-name: --list-item;
  anchor-scope: --list-item;
}
li .positioned {
  position: absolute;
  position-anchor: --list-item;
  inset-area: inline-start;
}

```

Без [anchor-scope](https://www.w3.org/TR/css-anchor-position-1/#propdef-anchor-scope) все элементы `[li](https://html.spec.whatwg.org/multipage/grouping-content.html#the-li-element)` были бы видны всем позиционированным элементам, и поэтому все они позиционировались бы относительно *конечного* `[li](https://html.spec.whatwg.org/multipage/grouping-content.html#the-li-element)`, складываясь друг на друга.

### 2.3. Поиск якоря

Несколько вещей в этой спецификации находят [целевой элемент якоря](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element), учитывая спецификатор якоря, который является либо [<даш-идентом>](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident) (и [древовидной ссылкой](https://drafts.csswg.org/css-scoping-1/#css-tree-scoped-reference)), который должен соответствовать значению [anchor-name](https://www.w3.org/TR/css-anchor-position-1/#propdef-anchor-name) в другом месте на странице, либо ключевым словом [implicit](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-implicit), либо ничем (отсутствующий спецификатор).

Чтобы определить

целевой [якорный элемент](https://www.w3.org/TR/css-anchor-position-1/#anchor-element)

задается элемент запроса

запрос el

и необязательный

[спецификатор якоря](https://www.w3.org/TR/css-anchor-position-1/#anchor-specifier)

спецификатор якоря

:

1. Если спецификация якоря не была передана, возвращает [целевой элемент якоря](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element) для запроса el, учитывая [спецификатор якоря по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-specifier) запроса el.
2. Если спецификатор якоря является [неявным](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-implicit):
1. Если API Popover определяет [неявный элемент якоря](https://www.w3.org/TR/css-anchor-position-1/#implicit-anchor-element) для запроса el, который является [допустимым элементом якоря](https://www.w3.org/TR/css-anchor-position-1/#acceptable-anchor-element) для запроса el, верните этот элемент.
2. В противном случае вернуть ничего.

ПРИМЕЧАНИЕ: Будущие API могут также определять неявные элементы якоря. Когда они появятся, они будут явно обрабатываться в этом алгоритме, чтобы обеспечить координацию.

3. Иначе, якорь spec - это [<dashed-ident>](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident). Вернуть последний элемент el в порядке дерева, удовлетворяющий следующим условиям:
- el является [якорным элементом](https://www.w3.org/TR/css-anchor-position-1/#anchor-element) с [якорным именем](https://www.w3.org/TR/css-anchor-position-1/#anchor-name) якоря spec.
- [имя якоря](https://www.w3.org/TR/css-anchor-position-1/#anchor-name) и спецификация якоря el связаны с одним и тем же [деревом](https://dom.spec.whatwg.org/#concept-tree) [корнем](https://dom.spec.whatwg.org/#concept-tree-root).

  ПРИМЕЧАНИЕ: [имя якоря](https://www.w3.org/TR/css-anchor-position-1/#anchor-name) - это [имя с привязкой к дереву](https://drafts.csswg.org/css-scoping-1/#css-tree-scoped-name), а спецификация якоря - это [ссылка с привязкой к дереву](https://drafts.csswg.org/css-scoping-1/#css-tree-scoped-reference).

- el - это [допустимый элемент якоря](https://www.w3.org/TR/css-anchor-position-1/#acceptable-anchor-element) для запроса el.

Если ни один элемент не удовлетворяет этим условиям, верните ничего.

ПРИМЕЧАНИЕ: [anchor-scope](https://www.w3.org/TR/css-anchor-position-1/#propdef-anchor-scope) может ограничивать видимость определенных [anchor names](https://www.w3.org/TR/css-anchor-position-1/#anchor-name), что может влиять на то, какие элементы могут быть [anchor elements](https://www.w3.org/TR/css-anchor-position-1/#anchor-element) для данного поиска.


ПРИМЕЧАНИЕ: Общее правило, отраженное в этих условиях, заключается в том, что el должен быть полностью размещен до того, как будет размещен query el. Правила CSS о порядке расположения контекстов укладки дают нам гарантии этого, а список условий выше точно перефразирует правила контекста укладки в то, что важно для этой цели, гарантируя отсутствие возможного кругооборота в позиционировании якорей.

ПРИМЕЧАНИЕ: [имя якоря](https://www.w3.org/TR/css-anchor-position-1/#propdef-anchor-name), определенное стилями в одном [теневом дереве](https://dom.spec.whatwg.org/#concept-shadow-tree), не будет видно [функции якоря](https://www.w3.org/TR/css-anchor-position-1/#anchor-functions) в стилях в другом теневом дереве, сохраняя инкапсуляцию. Однако *элементы* в разных деревьях теней могут привязываться друг к другу, если имя якоря и функция якоря принадлежат стилям одного и того же дерева, например, при использовании [::part()](https://www.w3.org/TR/css-shadow-parts-1/#selectordef-part) для стилизации элемента внутри тени. ([Неявные якорные элементы](https://www.w3.org/TR/css-anchor-position-1/#implicit-anchor-element) также не ограничиваются одним деревом, но детали этого зависят от API, назначающего их).

Элемент

el

является

допустимый якорный элемент

для

[абсолютно позиционированный](https://www.w3.org/TR/css-position-3/#absolute-position)

элемент

запрос el

если справедливы все следующие условия:

- Либо el является потомком [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) запроса el, либо содержащий блок запроса el является [начальным содержащим блоком](https://www.w3.org/TR/css-display-3/#initial-containing-block).
- Если el имеет тот же [содержащий блок](https://www.w3.org/TR/css-display-3/#containing-block), что и запрос el, то либо el не является [абсолютно позиционированным](https://www.w3.org/TR/css-position-3/#absolute-position), либо el предшествует запросу el в порядке дерева.
- Если el имеет другой [содержащий блок](https://www.w3.org/TR/css-display-3/#containing-block), чем запрос el, то последний содержащий блок в [цепочке содержащих блоков](https://www.w3.org/TR/css-display-3/#containing-block-chain) el перед достижением содержащего блока запроса el либо не является [абсолютно позиционированным](https://www.w3.org/TR/css-position-3/#absolute-position), либо предшествует запросу el в порядке дерева.
- el - это либо [элемент](https://www.w3.org/TR/css-display-3/#elements), либо [псевдоэлемент](https://www.w3.org/TR/selectors-4/#pseudo-element), который действует как элемент.

  Определите термин, который на самом деле означает это, соответствуя ::before/after/backdrop/etc (но не ::marker/placeholder/etc, чья рамка не определяется).

- el не находится в [пропущенном содержимом](https://www.w3.org/TR/css-contain-2/#skips-its-contents) другого элемента.

### 2.4. Якоря по умолчанию: свойство [position-anchor](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-anchor)

| Имя: | position-anchor |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | https://www.w3.org/TR/css-anchor-position-1/#typedef-anchor-element |
| https://www.w3.org/TR/css-cascade/#initial-values | implicit |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-position-3/#absolute-position элементы |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | n/a |
| https://www.w3.org/TR/css-cascade/#computed | как указано |
| https://www.w3.org/TR/cssom/#serializing-css-values | по грамматике |
| https://www.w3.org/TR/web-animations/#animation-type | дискретно |

Свойство [position-anchor](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-anchor) определяет спецификатор якоря по умолчанию для всех [функций якоря](https://www.w3.org/TR/css-anchor-position-1/#anchor-functions) элемента, позволяя нескольким элементам использовать один и тот же набор функций якоря (и [списки опций позиции](https://www.w3.org/TR/css-anchor-position-1/#position-options-list)!), меняя при этом, на какой [элемент якоря](https://www.w3.org/TR/css-anchor-position-1/#anchor-element) ссылается каждый из них.

Элемент [target anchor element](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element), выбранный спецификатором [default anchor specifier](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-specifier) (если он существует), является элементом якоря по умолчанию для данного элемента.

Его значения идентичны значениям [<анкор-элемент>](https://www.w3.org/TR/css-anchor-position-1/#typedef-anchor-element) в [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor) и [anchor-size()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor-size).

Например, в следующем коде оба элемента .foo и .bar могут использовать одни и те же свойства позиционирования, просто меняя элемент якоря, на который они ссылаются:

```css
.anchored {
position: absolute;
top: calc(.5em + anchor(outside));
/* Поскольку имя якоря не было указано,
это автоматически ссылается на
элемент якоря по умолчанию. */
}

.foo.anchored {
position-anchor: --foo;
}
.bar.anchored {
position-anchor: --bar;
}
```

### 2.5. Актуальность якоря

Если [элемент якоря](https://www.w3.org/TR/css-anchor-position-1/#anchor-element) является [целевым элементом якоря](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element) для любого позиционированного элемента, который является [релевантным для пользователя](https://www.w3.org/TR/css-contain-2/#relevant-to-the-user), то элемент якоря также является релевантным для пользователя.

ПРИМЕЧАНИЕ: Это означает, что, например, якорь в поддереве [content-visibility: auto](https://www.w3.org/TR/css-contain-2/#propdef-content-visibility) предотвратит [пропуск его содержимого](https://www.w3.org/TR/css-contain-2/#skips-its-contents), пока позиционируемый элемент, опирающийся на него, является [релевантным для пользователя](https://www.w3.org/TR/css-contain-2/#relevant-to-the-user).

## 3. Позиционирование на основе якоря

Элемент [absolutely-positioned](https://www.w3.org/TR/css-position-3/#absolute-position) может позиционироваться относительно одного или нескольких [anchor elements](https://www.w3.org/TR/css-anchor-position-1/#anchor-element) на странице.

Функция [inset-area](https://www.w3.org/TR/css-anchor-position-1/#propdef-inset-area) предлагает удобную концепцию позиционирования на основе сетки относительно [якорного элемента по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element); для более сложного позиционирования или позиционирования относительно нескольких элементов можно использовать функцию [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor) в свойствах [inset properties](https://drafts.csswg.org/css-logical-1/#inset-properties) для явного обращения к краям [якорного элемента](https://www.w3.org/TR/css-anchor-position-1/#anchor-element).

### 3.1. Свойство [inset-area](https://www.w3.org/TR/css-anchor-position-1/#propdef-inset-area)

| Имя: | inset-area |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | none https://www.w3.org/TR/css-values-4/#comb-one https://www.w3.org/TR/css-anchor-position-1/#typedef-inset-area |
| https://www.w3.org/TR/css-cascade/#initial-values | none |
https://www.w3.org/TR/css-cascade/#applies-to | Позиционированные элементы с https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element | https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element | нет
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | n/a |
| https://www.w3.org/TR/css-cascade/#computed | как указано |
| https://www.w3.org/TR/cssom/#serializing-css-values | согласно грамматике |
| https://www.w3.org/TR/web-animations/#animation-type | TBD |

В большинстве случаев при позиционировании якоря нужно заботиться только о краях [содержащего блока] (https://www.w3.org/TR/css-display-3/#containing-block) позиционируемого элемента и краях [элемента якоря по умолчанию] (https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element). Эти линии можно представить как определение сетки 3x3; [inset-area](https://www.w3.org/TR/css-anchor-position-1/#propdef-inset-area) позволяет легко настроить [свойства вставки](https://drafts.csswg.org/css-logical-1/#inset-properties) позиционируемого элемента, указав, в какой области этой [сетки inset-area](https://www.w3.org/TR/css-anchor-position-1/#inset-area-grid) должен находиться позиционируемый элемент. Ее синтаксис следующий:

```
<inset-area> = [
  [ left| center| right| span-left| span-right
| x-start| x-end| span-x-start| span-x-end
| x-self-start| x-self-end| span-x-self-start| span-x-self-end
| span-all ]
||
  [ top| center| bottom| span-top| span-bottom
| y-start| y-end| span-y-start| span-y-end
| y-self-start| y-self-end| span-y-self-start| span-y-self-end
| span-all ]
|
  [ block-start| center| block-end| span-block-start| span-block-end| span-all ]
||
  [ inline-start| center| inline-end| span-inline-start| span-inline-end
| span-all ]
|
  [ self-block-start| self-block-end| span-self-block-start| span-self-block-end| span-all ]
||
  [ self-inline-start| self-inline-end| span-self-inline-start| span-self-inline-end| span-all ]
|
  [ start| center| end| span-start| span-end| span-all ]{1,2}|
  [ self-start| center| self-end| span-self-start| span-self-end| span-all ]{1,2}
]
```

**none**Свойство не имеет эффекта.**[<inset-area>](https://www.w3.org/TR/css-anchor-position-1/#typedef-inset-area)**Если элемент не имеет [элемента якоря по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element), или не является [абсолютно позиционированным](https://www.w3.org/TR/css-position-3/#absolute-position) элементом, это значение не имеет эффекта.
В противном случае свойство выбирает область сетки [inset-area grid](https://www.w3.org/TR/css-anchor-position-1/#inset-area-grid) и делает ее [содержащим блоком](https://www.w3.org/TR/css-display-3/#containing-block) элемента.
ПРИМЕЧАНИЕ: Это означает, что свойства [inset](https://drafts.csswg.org/css-logical-1/#inset-properties) задают смещение от области вставки, а значения некоторых свойств, например [max-height: 100%](https://www.w3.org/TR/css-sizing-3/#propdef-max-height), будут относительными по отношению к области вставки.
Кроме того, значение [normal](https://www.w3.org/TR/css-align-3/#valdef-align-self-normal) для свойств [self-alignment properties](https://www.w3.org/TR/css-align-3/#self-alignment-properties) ведет себя как [start](https://www.w3.org/TR/css-align-3/#valdef-self-position-start), [end](https://www.w3.org/TR/css-align-3/#valdef-self-position-end) или [anchor-center](https://www.w3.org/TR/css-anchor-position-1/#valdef-justify-self-anchor-center), в зависимости от позиционирования региона, чтобы обеспечить хорошее выравнивание по умолчанию для позиционируемого элемента.
Подробнее об этих эффектах см. в [§ 3.1.1 Разрешение <inset-area>s](https://www.w3.org/TR/css-anchor-position-1/#resolving-spans).
Кроме того, все [auto](https://www.w3.org/TR/css-position-3/#valdef-top-auto) [свойства вставки](https://drafts.csswg.org/css-logical-1/#inset-properties) разрешаются в 0.

### **3.1.1. Разрешение [<inset-area>](https://www.w3.org/TR/css-anchor-position-1/#typedef-inset-area)s**.

Сетка inset-area - это сетка 3x3, состоящая из четырех линий сетки по каждой оси. По порядку:

- начальный край премодификации элемента [содержащий блок](https://www.w3.org/TR/css-display-3/#containing-block) или край anchor-start() [элемента якоря по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element), если он более [начальный](https://www.w3.org/TR/css-writing-modes-4/#start)ward
- край якоря(начало) [элемента якоря по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element)
- край якоря (конец) [элемента якоря по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element)
- конечный край премодификации [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) элемента или край anchor-start() для [элемента якоря по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element), если он более [конечный](https://www.w3.org/TR/css-writing-modes-4/#end)вард.

В [<inset-area>](https://www.w3.org/TR/css-anchor-position-1/#typedef-inset-area) выделяется область этой сетки путем указания строк и столбцов, которые она занимает, причем каждое из двух ключевых слов указывает на одну из них:

**start, end, self-start, self-endtop, bottom, left, righty-start, y-end, y-self-start, y-self-endx-start, x-end, x-self-start, x-self-endblock-start, block-end, block-self-start, block-self-endinline-start, inline-end, inline-self-start, inline-self-endcenter**Одна соответствующая строка или столбец, в зависимости от того, какую ось задает это ключевое слово.
Как и в [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor), простые логические ключевые слова ([start](https://www.w3.org/TR/css-anchor-position-1/#valdef-inset-area-start), [end](https://www.w3.org/TR/css-anchor-position-1/#valdef-inset-area-end) и т. д.) относятся к режиму записи [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) элемента. Логические слова [x-start](https://www.w3.org/TR/css-anchor-position-1/#valdef-inset-area-x-start)/etc определяют их направление таким же образом, но по указанной физической оси.
Логические ключевые слова "self" ([self-start](https://www.w3.org/TR/css-anchor-position-1/#valdef-inset-area-self-start), [x-self-end](https://www.w3.org/TR/css-anchor-position-1/#valdef-inset-area-x-self-end) и т. д.) идентичны, но относятся к собственному режиму записи элемента. **span-start, span-endspan-top, span-bottomspan-y-start, span-y-endspan-x-start, span-x-endspan-block-start, span-block-endspan-inline-start, span-inline-end**Две строки или колонки, в зависимости от того, какую ось задает данное ключевое слово: центральная строка/колонка и строка/колонка, соответствующая другой половине ключевого слова, как в однопутевых ключевых словах.
(Например, [span-top](https://www.w3.org/TR/css-anchor-position-1/#valdef-inset-area-span-top) охватывает первые две строки - центральную и верхнюю.)**span-all**Все три строки или столбца, в зависимости от того, какую ось задает данное ключевое слово.

Некоторые ключевые слова неоднозначно определяют, к какой оси они относятся: [center](https://www.w3.org/TR/css-anchor-position-1/#valdef-inset-area-center), [span-all](https://www.w3.org/TR/css-anchor-position-1/#valdef-inset-area-span-all) и ключевые слова [start](https://www.w3.org/TR/css-anchor-position-1/#valdef-inset-area-start)/etc, которые не указывают ось блока или инлайна явно. Если другое ключевое слово однозначно указывает на свою ось, то неоднозначное ключевое слово относится к противоположной оси. (Например, в слове block-start center ключевое слово center относится к оси inline). Если же оба ключевых слова неоднозначны, то первое относится к блочной оси [содержащего блока] элемента (https://www.w3.org/TR/css-display-3/#containing-block), а второе - к линейной оси. (Например, span-all start эквивалентен span-all inline-start).

Если указано только одно ключевое слово, то второе ключевое слово [span-all](https://www.w3.org/TR/css-anchor-position-1/#valdef-inset-area-span-all) ведет себя так же, как и [span-all](https://www.w3.org/TR/css-anchor-position-1/#valdef-inset-area-span-all), если данное ключевое слово однозначно относительно своей оси; в противном случае оно ведет себя так же, как если бы данное ключевое слово повторялось. (Например, [top](https://www.w3.org/TR/css-anchor-position-1/#valdef-inset-area-top) эквивалентно top span-all, а [center](https://www.w3.org/TR/css-anchor-position-1/#valdef-inset-area-center) эквивалентно center center).

---

В [<inset-area>](https://www.w3.org/TR/css-anchor-position-1/#typedef-inset-area) также подразумевается [self-alignment](https://www.w3.org/TR/css-align-3/#self-align) по умолчанию, которое будет использоваться, если свойство [self-alignment](https://www.w3.org/TR/css-align-3/#self-alignment-properties) для элемента - [normal](https://www.w3.org/TR/css-align-3/#valdef-align-self-normal):

- Если область вставки включает центральную область по оси, то выравнивание по этой оси по умолчанию будет [anchor-center](https://www.w3.org/TR/css-anchor-position-1/#valdef-justify-self-anchor-center).
- В противном случае выравнивание будет противоположным заданному региону: если он задает "начальный" регион своей оси, выравнивание по умолчанию по этой оси будет [end](https://www.w3.org/TR/css-align-3/#valdef-self-position-end); и т. д.

Например, если принять английский эквивалентный режим написания (horizontal-tb, ltr), то значение span-x-start top относится к области "начало" вертикальной оси, а также к областям "начало" и "центр" горизонтальной оси, поэтому выравнивание по умолчанию будет [align-self: end;](https://www.w3.org/TR/css-align-3/#propdef-align-self) и [justify-self: anchor-center;](https://www.w3.org/TR/css-align-3/#propdef-justify-self)* Пример позиционирования [inset-area: span-x-start top](https://www.w3.org/TR/css-anchor-position-1/#propdef-inset-area)*.

![https://www.w3.org/TR/css-anchor-position-1/images/inset-area-example.png](https://www.w3.org/TR/css-anchor-position-1/images/inset-area-example.png)

ПРИМЕЧАНИЕ: Когда [якорный элемент по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element) частично или полностью находится за пределами предварительно модифицированного [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block), некоторые строки или столбцы [сетки inset-area](https://www.w3.org/TR/css-anchor-position-1/#inset-area-grid) могут иметь нулевой размер.

### 3.2. Функция [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor)

Элемент [absolutely-positioned](https://www.w3.org/TR/css-position-3/#absolute-position) может использовать функцию anchor() в качестве значения в своих [inset properties](https://drafts.csswg.org/css-logical-1/#inset-properties) для ссылки на позицию одного или более [anchor elements](https://www.w3.org/TR/css-anchor-position-1/#anchor-element). Функция [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor) разрешается в [<length>](https://www.w3.org/TR/css-values-4/#length-value).

```
<anchor()> = anchor(<anchor-element>?<anchor-side>,<length-percentage>? )
<anchor-element> =<dashed-ident>| implicit
<сторона якоря> = inside| outside
| top| left| right| bottom
| начало| конец| самоначало| самоконец
|<процент>| центр
```

Функция [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor) имеет три аргумента:

- значение [<якорный элемент>](https://www.w3.org/TR/css-anchor-position-1/#typedef-anchor-element) указывает, как найти элемент [якорь](https://www.w3.org/TR/css-anchor-position-1/#anchor-element), из которого она будет черпать информацию о позиционировании. Если это значение опущено, оно действует как [спецификатор якоря по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-specifier) элемента. Его возможные значения:

  **[<dashed-ident>](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)** Определяет имя [anchor name](https://www.w3.org/TR/css-anchor-position-1/#anchor-name), которое он будет искать. Это имя является [древовидной ссылкой](https://drafts.csswg.org/css-scoping-1/#css-tree-scoped-reference).**implicit**Выбирает [неявный элемент якоря](https://www.w3.org/TR/css-anchor-position-1/#implicit-anchor-element), определенный для данного элемента, если это возможно.

  Подробности см. в разделе [целевой элемент якоря](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element).

- значение [<сторона якоря>](https://www.w3.org/TR/css-anchor-position-1/#typedef-anchor-side) указывает на позицию соответствующей стороны [целевого элемента якоря](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element). Его возможными значениями являются:

  **insideoutside**Определяет одну из сторон [якорного элемента](https://www.w3.org/TR/css-anchor-position-1/#anchor-element), в зависимости от того, в каком [свойстве вставки](https://drafts.csswg.org/css-logical-1/#inset-properties) оно используется. [inside](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-inside) относится к той же стороне, что и свойство inset (прикрепляя элемент к "внутренней" стороне якоря), а [outside](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-outside) - к противоположной.**toprightbottomleft**Определяет указанную сторону [элемента якоря](https://www.w3.org/TR/css-anchor-position-1/#anchor-element).
  ПРИМЕЧАНИЕ: Они используются только в [свойствах вставки](https://drafts.csswg.org/css-logical-1/#inset-properties) на оси соответствия. Например, [left](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-left) можно использовать в [left](https://www.w3.org/TR/css-position-3/#propdef-left), [right](https://www.w3.org/TR/css-position-3/#propdef-right) или логических свойствах вставки, которые относятся к горизонтальной оси.**startendself-startself-end**Отсылает к одной из сторон [якорного элемента](https://www.w3.org/TR/css-anchor-position-1/#anchor-element) в той же оси, что и [свойство вставки](https://drafts.csswg.org/css-logical-1/#inset-properties), в котором оно используется, путем разрешения ключевого слова относительно [режима записи](https://www.w3.org/TR/css-writing-modes-4/#writing-mode) либо позиционированного элемента (для [self-start](https://www. w3.org/TR/css-anchor-position-1/#valdef-anchor-self-start) и [self-end](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-self-end)), либо содержащего блока позиционируемого элемента (для [start](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-start) и [end](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-end)).**[<percentage>](https://www.w3.org/TR/css-values-4/#percentage-value)center**Определяет позицию, соответствующую проценту между сторонами [start](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-start) и [end](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-end), причем 0% эквивалентно началу, а 100% - концу.
  [center](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-center) эквивалентно 50 %.

- Необязательный заключительный аргумент [<длина-процент>](https://www.w3.org/TR/css-values-4/#typedef-length-percentage) является запасным значением, указывающим, к чему должна разрешиться функция, если она является [недопустимой функцией якоря](https://www.w3.org/TR/css-anchor-position-1/#valid-anchor-function).

Функция [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor), представляющая [допустимую функцию привязки](https://www.w3.org/TR/css-anchor-position-1/#valid-anchor-function), в момент [вычисленного значения](https://www.w3.org/TR/css-cascade-5/#computed-value) (с использованием [чередования стилей и макетов](https://www.w3.org/TR/css-anchor-position-1/#style--layout-interleave)) разрешается в [<длину>](https://www.w3.org/TR/css-values-4/#length-value), которая выровняет край [вставного модифицированного содержащего блока](https://www.w3. org/TR/css-position-3/#inset-modified-containing-block), соответствующий свойству, в котором появляется функция, с указанным краем границы [целевого якорного элемента](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element), предполагая, что все [контейнеры прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container) между целевым якорным элементом и [содержащим блоком](https://www.w3.org/TR/css-display-3/#containing-block) позиционированного элемента прокручены до их начальной позиции прокрутки (но смотрите [§ 3.4 Учет прокрутки](https://www.w3.org/TR/css-anchor-position-1/#scroll)).

ПРИМЕЧАНИЕ: Это означает, что переходы или [анимация](https://www.w3.org/TR/web-animations-1/#concept-animation) свойства, использующего [функцию якоря](https://www.w3.org/TR/css-anchor-position-1/#anchor-functions), будут работать "как положено" при любых возможных изменениях: перемещении элемента якоря, добавлении или удалении элементов якоря из документа, изменении свойства [anchor-name](https://www.w3.org/TR/css-anchor-position-1/#propdef-anchor-name) у якорей и т. д.

Если [целевой якорный элемент](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element) является [фрагментированным](https://www.w3.org/TR/css-break-4/#fragment), то вместо него используется выровненный по оси ограничительный прямоугольник пограничных боксов фрагментов.

Нужно ли контролировать, к какому боксу мы обращаемся, чтобы можно было выравнивать по padding или по границе содержимого?

Позиционированный элемент дополнительно визуально смещается на его [snapshotted scroll offset](https://www.w3.org/TR/css-anchor-position-1/#snapshotted-scroll-offset), как бы дополнительным преобразованием [translate()](https://www.w3.org/TR/css-transforms-1/#funcdef-transform-translate).

Например, в .bar { top: anchor(--foo top); }

[anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor)

разрешится в длину, которая выстроит в ряд

```
.bar
```

верхний край элемента с верхним краем якоря --foo.

С другой стороны, в .bar { bottom: anchor(--foo top); } вместо этого разрешится длина, которая выровняет *нижний* край элемента `.bar` с верхним краем якоря --foo.

Поскольку значения [top](https://www.w3.org/TR/css-position-3/#propdef-top) и [bottom](https://www.w3.org/TR/css-position-3/#propdef-bottom) задают вставки с разных краев (сверху и снизу [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) элемента соответственно), один и тот же [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor) обычно разрешается на разные длины в каждом из них.

Поскольку

[anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor)

разрешается в

[<длина>](https://www.w3.org/TR/css-values-4/#length-value)

, ее можно использовать в

[математических функциях](https://www.w3.org/TR/css-values-4/#math-function)

как и любая другая длина.

Например, следующая команда установит элемент так, чтобы его [вставка-модифицированный содержащий блок](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block) был центрирован на [якорном элементе](https://www.w3.org/TR/css-anchor-position-1/#anchor-element) и был как можно шире, не переполняя [содержащий блок](https://www.w3.org/TR/css-display-3/#containing-block):

```css
.centered-message {
  position: fixed;
  max-width: max-content;
  justify-self: center;

  -center: anchor(--x 50%);
  --half-distance: min(
    abs(0% - var(--center)),
    abs(100% - var(--center))
  );
  left: calc(var(--center) - var(--half-distance));
  right: calc(var(--center) - var(--half-distance));
  bottom: anchor(--x top);
}

```

Это может быть уместно, например, для сообщения об ошибке в элементе `[input](https://html.spec.whatwg.org/multipage/input.html#the-input-element)`, так как центрирование облегчит определение того, на какой вход ссылаются.

### 3.3. Центрирование по якорю: значение [anchor-center](https://www.w3.org/TR/css-anchor-position-1/#valdef-justify-self-anchor-center)

| Имя: | https://www.w3.org/TR/css-align-3/#propdef-justify-self, https://www.w3.org/TR/css-align-3/#propdef-align-self, https://www.w3.org/TR/css-align-3/#propdef-justify-items, https://www.w3.org/TR/css-align-3/#propdef-align-items |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | anchor-center |

Свойства [самовыравнивания](https://www.w3.org/TR/css-align-3/#self-alignment-properties) позволяют [абсолютно позиционированному](https://www.w3.org/TR/css-position-3/#absolute-position) элементу выравнивать себя внутри [вставного модифицированного содержащего блока](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block). Существующих значений, плюс тщательно подобранных [свойств вставки](https://drafts.csswg.org/css-logical-1/#inset-properties), обычно достаточно для полезного выравнивания, но распространенный случай позиционирования с якорем - центрирование по элементу якоря - требует тщательной и несколько сложной настройки.

Новое значение anchor-center предельно упрощает этот случай: если позиционируемый элемент имеет [default anchor element](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element), то он выравнивается таким образом, чтобы центрироваться над элементом default anchor по соответствующей оси.

Кроме того, все [auto](https://www.w3.org/TR/css-position-3/#valdef-top-auto) [свойства вставки](https://drafts.csswg.org/css-logical-1/#inset-properties) разрешаются в 0. Однако [доступное пространство](https://www.w3.org/TR/css-sizing-3/#available) для позиционируемого элемента по соответствующей оси уменьшается до размера самого большого прямоугольника, который центрируется на [якорном элементе по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element) и не переполняет [модифицированный вставкой содержащий блок](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block). (Возможно, нулевой размер, если центр якоря не находится в пределах блока, содержащего вставку).

Если элемент не [абсолютно позиционирован](https://www.w3.org/TR/css-position-3/#absolute-position), или не имеет [элемента якоря по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element), это значение ведет себя как [center](https://www.w3.org/TR/css-align-3/#valdef-self-position-center) и не оказывает дополнительного влияния на то, как разрешаются [свойства вставки](https://drafts.csswg.org/css-logical-1/#inset-properties).

### 3.4. Учет прокрутки

Поскольку прокрутка часто выполняется в отдельном потоке от верстки по соображениям производительности, а [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor) может привести как к изменению позиционирования (которое может быть обработано в потоке прокрутки), так и к изменению верстки (которое не может), anchor() определяется так, что все [scroll containers](https://www.w3.org/TR/css-overflow-3/#scroll-container) между элементом якоря и содержащим блоком позиционированного элемента находятся в их начальной позиции прокрутки. Это означает, что позиционируемый элемент *не* будет выровнен относительно своего якоря, если любой из контейнеров прокрутки *не* находится в начальной позиции.

Чтобы компенсировать это и не потерять преимущества производительности отдельного потока прокрутки, мы определяем:

An

[absolutely-positioned](https://www.w3.org/TR/css-position-3/#absolute-position)

элемент

запрос el

нуждается в регулировке прокрутки

по горизонтальной или вертикальной оси, если верны оба следующих условия:

- query el имеет [элемент якоря по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element).
- По крайней мере одна функция [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor) в используемых [свойствах вставки](https://drafts.csswg.org/css-logical-1/#inset-properties) запроса el по оси ссылается на [целевой элемент якоря](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element) с тем же ближайшим [контейнером прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container) предком, что и [элемент якоря по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element), или используемое [свойство самовыравнивания](https://www.w3.org/TR/css-align-3/#self-alignment-properties) запроса el по оси имеет значение [anchor-center](https://www.w3.org/TR/css-anchor-position-1/#valdef-justify-self-anchor-center).

ПРИМЕЧАНИЕ: Если у запроса el есть [список параметров позиции](https://www.w3.org/TR/css-anchor-position-1/#position-options-list), то на то, нуждается ли он [в регулировке прокрутки](https://www.w3.org/TR/css-anchor-position-1/#needs-scroll-adjustment) в оси, также влияет применяемый стиль возврата.

Смещение прокрутки запроса el представляет собой пару длин для горизонтальной и вертикальной осей соответственно. Каждая длина вычисляется следующим образом:

- Если запрос el [нуждается в регулировке прокрутки](https://www.w3.org/TR/css-anchor-position-1/#needs-scroll-adjustment) в оси, то длина равна сумме [смещений прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-offset) всех [контейнеров прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container) предков [элемента якоря по умолчанию](https://www.w3.org/TR/css-anchor-position-1/#default-anchor-element) в той же оси, вплоть до [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) запроса el, но не включая его;
- В противном случае длина равна 0.

Определите точное время моментального снимка: обновляется каждый кадр, перед пересчетом стиля.

### 3.5. Действительность

Функция [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor) является действительной функцией привязки только в том случае, если верны все следующие условия:

- Она используется в свойстве [inset](https://drafts.csswg.org/css-logical-1/#inset-properties) на [absolutely-positioned](https://www.w3.org/TR/css-position-3/#absolute-position) элементе.
- Если в ее [<anchor-side>](https://www.w3.org/TR/css-anchor-position-1/#typedef-anchor-side) указано физическое ключевое слово, то она используется в [inset property](https://drafts.csswg.org/css-logical-1/#inset-properties) на этой оси. (Например, [left](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-left) может использоваться только в [left](https://www.w3.org/TR/css-position-3/#propdef-left), [right](https://www.w3.org/TR/css-position-3/#propdef-right) или логическом свойстве вставки по горизонтальной оси).
- Результат определения [target anchor element](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element) не является ничем, если в качестве элемента запроса указан элемент, на котором он используется, а в качестве спецификатора якоря - значение [<anchor-element>](https://www.w3.org/TR/css-anchor-position-1/#typedef-anchor-element), указанное в функции.

Если любое из этих условий ложно, функция [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor) разрешается в указанное в ней значение обратного хода. Если запасное значение не указано, то она разрешается в 0px.

## 4. Изменение размера на основе якоря

Элемент [absolutely-positioned](https://www.w3.org/TR/css-position-3/#absolute-position) может использовать функцию anchor-size() в своих [sizing properties](https://www.w3.org/TR/css-sizing-3/#sizing-property) для указания размера одного или нескольких [anchor elements](https://www.w3.org/TR/css-anchor-position-1/#anchor-element). Функция [anchor-size()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor-size) разрешается в [<length>](https://www.w3.org/TR/css-values-4/#length-value).

### 4.1. Функция [anchor-size()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor-size)

```
anchor-size() = anchor-size(<anchor-element>?<anchor-size>,<length-percentage>? )
<anchor-size> = width| height| block| inline| self-block| self-inline

```

Функция [anchor-size()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor-size) аналогична [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor) и принимает те же аргументы, за исключением того, что ключевые слова [<anchor-side>](https://www.w3.org/TR/css-anchor-position-1/#typedef-anchor-side) заменяются на [<anchor-size>](https://www.w3.org/TR/css-anchor-position-1/#typedef-anchor-size), обозначающие расстояние между двумя противоположными сторонами.

Физические ключевые слова [<anchor-size>](https://www.w3.org/TR/css-anchor-position-1/#typedef-anchor-size) (ширина и высота) относятся к ширине и высоте, соответственно, [целевого элемента якоря](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element). В отличие от [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor), здесь нет ограничений на совпадение осей; например, [width: anchor-size(--foo height);](https://www.w3.org/TR/css-sizing-3/#propdef-width) допустимо.

Логические ключевые слова [<anchor-size>](https://www.w3.org/TR/css-anchor-position-1/#typedef-anchor-size) (block, inline, self-block и self-inline) отображаются на одно из физических ключевых слов в соответствии либо с [режимом записи](https://www.w3.org/TR/css-writing-modes-4/#writing-mode) элемента (для [self-block](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-size-self-block) и [self-inline](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-size-self-inline)), либо с режимом записи [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) элемента (для [block](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-size-block) и [inline](https://www.w3.org/TR/css-anchor-position-1/#valdef-anchor-size-inline)).

Функция [anchor-size()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor-size), представляющая [действительную функцию размера якоря](https://www.w3.org/TR/css-anchor-position-1/#valid-anchor-size-function), разрешается в [вычисленное значение](https://www.w3.org/TR/css-cascade-5/#computed-value) время (через [чередование стилей и макетов](https://www.w3.org/TR/css-anchor-position-1/#style--layout-interleave)) до [<длины>](https://www.w3.org/TR/css-values-4/#length-value), разделяющей соответствующие края границы (либо левый и правый, либо верхний и нижний, в зависимости от того, что находится на указанной оси) [целевого элемента якоря](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element).

### 4.2. Валидность

Функция [anchor-size()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor-size) является действительной функцией размера якоря только в том случае, если верны все следующие условия:

- Она используется в свойстве [sizing property](https://www.w3.org/TR/css-sizing-3/#sizing-property) для [absolutely-positioned](https://www.w3.org/TR/css-position-3/#absolute-position) элемента.
- Для элемента, на котором она используется, существует [целевой элемент якоря](https://www.w3.org/TR/css-anchor-position-1/#target-anchor-element) и значение [<элемент якоря>](https://www.w3.org/TR/css-anchor-position-1/#typedef-anchor-element), указанное в функции.

Если любое из этих условий ложно, функция [anchor-size()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor-size) разрешается в указанное в ней значение отката. Если запасное значение не указано, оно принимает значение 0px.

## 5. Управление переполнением

Позиционирование якоря, хотя и является мощным, может быть непредсказуемым. Элемент [якорь](https://www.w3.org/TR/css-anchor-position-1/#anchor-element) может находиться в любом месте страницы, поэтому позиционирование элемента каким-либо определенным образом (например, над якорем или справа от него) может привести к тому, что позиционированный элемент переполнит свой [содержащий блок](https://www.w3.org/TR/css-display-3/#containing-block) или окажется частично за пределами экрана.

Чтобы исправить ситуацию, элемент [absolutely positioned](https://www.w3.org/TR/css-position-3/#absolute-position) может использовать свойство [position-try-options](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try-options) для ссылки на несколько вариантов наборов свойств позиционирования/выравнивания (сгенерированных из существующих стилей элемента или указанных в правилах [@position-try](https://www.w3.org/TR/css-anchor-position-1/#at-ruledef-position-try)), которые UA может попробовать, если элемент выходит за пределы своей начальной позиции. Каждое из них применяется к элементу по очереди, и первое, которое не приводит к переполнению элемента [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block), признается победителем.

[position-try-order](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try-order) позволяет дополнительно сортировать эти опции по доступному пространству, которое они определяют, если для элемента важнее иметь как можно больше места, а не строго следовать какому-то объявленному порядку.

### 5.1. Предоставление запасных опций: свойство [position-try-options](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try-options)

| Имя: | position-try-options |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | none https://www.w3.org/TR/css-values-4/#comb-one [ [https://www.w3.org/TR/css-values-4/#typedef-dashed-ident https://www.w3.org/TR/css-values-4/#comb-any https://www.w3.org/TR/css-anchor-position-1/#typedef-position-try-options-try-tactic] | inset-area( https://www.w3.org/TR/css-anchor-position-1/#propdef-inset-area ) ]https://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | none |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-position-3/#absolute-position элементы |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | n/a |
| https://www.w3.org/TR/css-cascade/#computed | как указано |
| https://www.w3.org/TR/cssom/#serializing-css-values | по грамматике |
| https://www.w3.org/TR/web-animations/#animation-type | дискретно |

Это свойство предоставляет список альтернативных стилей позиционирования, которые можно попробовать использовать, когда [абсолютно позиционированный блок](https://www.w3.org/TR/css-position-3/#absolute-position) выходит за пределы своего [вставка-модифицированный содержащий блок](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block). Изначально этот список вариантов позиционирования пуст.

Каждая запись в списке, разделенная запятыми, представляет собой отдельный вариант: либо имя блока [@position-try](https://www.w3.org/TR/css-anchor-position-1/#at-ruledef-position-try), либо [<try-tactic>](https://www.w3.org/TR/css-anchor-position-1/#typedef-position-try-options-try-tactic), представляющий собой автоматическое преобразование существующего вычисленного стиля элемента.

Значения имеют следующие значения:

**none**Свойство не имеет эффекта; список [опций позиции](https://www.w3.org/TR/css-anchor-position-1/#position-options-list) элемента пуст.**[<dashed-ident>](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)**Если существует правило [@position-try](https://www.w3.org/TR/css-anchor-position-1/#at-ruledef-position-try) с данным именем, связанная с ним [опция позиции](https://www.w3.org/TR/css-anchor-position-1/#position-option) добавляется в список [опций позиции](https://www.w3.org/TR/css-anchor-position-1/#position-options-list).
В противном случае это значение не имеет эффекта.**[<try-tactic>](https://www.w3.org/TR/css-anchor-position-1/#typedef-position-try-options-try-tactic)**Автоматически создает [опцию позиции](https://www.w3.org/TR/css-anchor-position-1/#position-option) из вычисленного стиля элемента, меняя местами значения свойств [margin](https://www.w3.org/TR/css-box-4/#margin-properties), [sizing](https://www.w3.org/TR/css-sizing-3/#sizing-property), [inset](https://drafts.csswg.org/css-logical-1/#inset-properties) и [self-alignment](https://www.w3.org/TR/css-align-3/#self-alignment-properties) между сторонами элемента, и добавляет ее в список [опций позиции](https://www.w3.org/TR/css-anchor-position-1/#position-options-list).

`[<Тактика попытки>](https://www.w3.org/TR/css-anchor-position-1/#typedef-position-try-options-try-tactic) = flip-block [||](https://www.w3.org/TR/css-values-4/#comb-any) flip-inline [||](https://www.w3.org/TR/css-values-4/#comb-any) flip-start`
**flip-block** меняет местами значения в [оси блока](https://www.w3.org/TR/css-writing-modes-4/#block-axis) (между, например, [margin-block-start](https://www.w3.org/TR/css-logical-1/#propdef-margin-block-start) и [margin-block-end](https://www.w3.org/TR/css-logical-1/#propdef-margin-block-end)), по сути, зеркально отражая линию [inline-axis](https://www.w3.org/TR/css-writing-modes-4/#inline-axis).**flip-inline** меняет местами значения в [inline axis](https://www.w3.org/TR/css-writing-modes-4/#inline-axis), по сути, зеркально отражая линию [block-axis](https://www.w3.org/TR/css-writing-modes-4/#block-axis).**flip-start** меняет местами значения [start](https://www. w3.org/TR/css-writing-modes-4/#start) друг с другом, а свойства [end](https://www.w3.org/TR/css-writing-modes-4/#end) друг с другом (например, между [margin-block-start](https://www.w3.org/TR/css-logical-1/#propdef-margin-block-start) и [margin-inline-start](https://www.w3.org/TR/css-logical-1/#propdef-margin-inline-start)), по сути, зеркально отражая диагональ, проведенную из угла [start](https://www.w3.org/TR/css-writing-modes-4/#block-start)-[start](https://www.w3.org/TR/css-writing-modes-4/#inline-start) в угол [end](https://www.w3.org/TR/css-writing-modes-4/#block-end)-[end](https://www.w3.org/TR/css-writing-modes-4/#inline-end).
Если задано несколько ключевых слов, преобразования комбинируются, чтобы получить один вариант [position option](https://www.w3.org/TR/css-anchor-position-1/#position-option).
Определите, как изменяются сами значения при переворачивании: anchor(top) становится anchor(bottom); start становится end и т. д.**[<dashed-ident>](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident) || [<try-tactic>](https://www.w3.org/TR/css-anchor-position-1/#typedef-position-try-options-try-tactic)**Комбинирует эффекты предыдущих двух опций: если есть [@position-try](https://www.w3. org/TR/css-anchor-position-1/#at-ruledef-position-try) правило с заданным именем, то применяет его [опцию position](https://www.w3.org/TR/css-anchor-position-1/#position-option) к базовому стилю элемента, преобразует его в соответствии с указанным [<try-tactic>](https://www.w3.org/TR/css-anchor-position-1/#typedef-position-try-options-try-tactic), а затем добавляет результат в список [опций position](https://www.w3.org/TR/css-anchor-position-1/#position-options-list) элемента.
В противном случае ничего не делает.**inset-area( [<'inset-area'>](https://www.w3.org/TR/css-anchor-position-1/#propdef-inset-area) )**Автоматически создает [вариант позиции](https://www.w3.org/TR/css-anchor-position-1/#position-option), состоящий исключительно из свойства [inset-area](https://www.w3.org/TR/css-anchor-position-1/#propdef-inset-area) с заданным значением.

### 5.2. Определение порядка возврата: свойство [position-try-order](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try-order)

| Имя: | position-try-order |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | normal https://www.w3.org/TR/css-values-4/#comb-one https://www.w3.org/TR/css-anchor-position-1/#typedef-try-size |
| https://www.w3.org/TR/css-cascade/#initial-values | normal |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-position-3/#absolute-position |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | n/a |
| https://www.w3.org/TR/css-cascade/#computed | как указано |
| https://www.w3.org/TR/cssom/#serializing-css-values | по грамматике |
| https://www.w3.org/TR/web-animations/#animation-type | дискретно |

Это свойство определяет порядок, в котором будут выполняться попытки [список опций позиции](https://www.w3.org/TR/css-anchor-position-1/#position-options-list).

```
<try-size> = most-width| most-height| most-block-size| most-inline-size

```

**normal**Пробуем [опции позиции](https://www.w3.org/TR/css-anchor-position-1/#position-option) в порядке, указанном [position-try-options](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try-options).**most-widthmost-heightmost-block-sizemost-inline-size**Для каждой записи в списке [опций позиции](https://www.w3.org/TR/css-anchor-position-1/#position-options-list), [применяем опцию позиции](https://www.w3.org/TR/css-anchor-position-1/#apply-a-position-option), используя эту опцию к элементу, и находим указанный [inset-modified containing block](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block) размер, который получается в результате применения этих стилей. Стабильно отсортируйте список опций положения в соответствии с этим размером, причем наибольший будет стоять на первом месте.

Например, следующие стили первоначально расположат всплывающий список под кнопкой привязки, но если она переполнится, то решат, оставить ли всплывающий список под привязкой или переместить его выше, в зависимости от того, какой вариант даст ему больше места.

```
.anchor { anchor-name: --foo; }
.list {
  position: fixed;
  position-anchor: --foo;
  top: anchor(bottom);
  left: anchor(left);
  align-self: start;
  position-try-options: --bottom-scrollable, flip-block, --top-scrollable;
  position-try-order: most-height;
}
@position-try --bottom-scrollable {
  align-self: stretch;
}
@position-try --top-scrollable {
  top: 0;
  bottom: anchor(top);
  align-self: stretch;
}

```

Автогенерируемая опция [flip-block](https://www.w3.org/TR/css-anchor-position-1/#valdef-position-try-options-flip-block) и опция --top-scrollable всегда будут находить одну и ту же доступную высоту, поскольку обе они растягиваются по вертикали от [top: 0](https://www.w3.org/TR/css-position-3/#propdef-top) (верхний край области просмотра) до [bottom: anchor(top)](https://www.w3.org/TR/css-position-3/#propdef-bottom) (верхняя часть якоря), поэтому они сохраняют заданный порядок. В результате элемент сначала попытается выровняться относительно якоря на своей естественной высоте (используя [align-self: end](https://www.w3.org/TR/css-align-3/#propdef-align-self), автоматически измененный из базовых стилей), но если это также вызовет переполнение, он вернется к заполнению пространства и прокрутке.

### 5.3. Сокращение [position-try](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try)

| Имя: | position-try |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try-orderhttps://www.w3.org/TR/css-values-4/#mult-opt https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try-options |
| https://www.w3.org/TR/css-cascade/#initial-values | см. отдельные свойства |
| https://www.w3.org/TR/css-cascade/#applies-to | см. отдельные свойства |
| https://www.w3.org/TR/css-cascade/#inherited-property | см. индивидуальные свойства |
| https://www.w3.org/TR/css-values/#percentages | смотрите индивидуальные свойства |
| https://www.w3.org/TR/css-cascade/#computed | смотрите индивидуальные свойства |
| https://www.w3.org/TR/web-animations/#animation-type | см. индивидуальные свойства |
| https://www.w3.org/TR/cssom/#serializing-css-values | на грамматику |

Это сокращение задает как [position-try-options](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try-options), так и [position-try-order](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try-order). Если <'position-try-order'> опущен, то он устанавливается в начальное значение свойства.

### 5.4. Правило [@position-try](https://www.w3.org/TR/css-anchor-position-1/#at-ruledef-position-try)

Правило @position-try определяет опцию позиции с заданным именем, указывая один или несколько наборов свойств позиционирования, которые будут применены к элементу через [position-try-options](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try-options),

Синтаксис правила [@position-try](https://www.w3.org/TR/css-anchor-position-1/#at-ruledef-position-try) следующий:

```
@position-try<dashed-ident> {
<declaration-list>
}

```

[<dashed-ident>](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident), указанный в прелюдии, является именем правила. Если объявлено несколько правил [@position-try](https://www.w3.org/TR/css-anchor-position-1/#at-ruledef-position-try) с одинаковым именем, то побеждает последнее в порядке следования документов.

Правило [@position-try](https://www.w3.org/TR/css-anchor-position-1/#at-ruledef-position-try) принимает только следующие [properties](https://www.w3.org/TR/css-cascade-5/#css-property):

- [свойства вставки](https://drafts.csswg.org/css-logical-1/#inset-properties)
- [margin properties](https://www.w3.org/TR/css-box-4/#margin-properties)
- [sizing properties](https://www.w3.org/TR/css-sizing-3/#sizing-property)
- [свойства самовыравнивания](https://www.w3.org/TR/css-align-3/#self-alignment-properties)
- [position-anchor](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-anchor)
- [inset-area](https://www.w3.org/TR/css-anchor-position-1/#propdef-inset-area)

Недопустимо использовать !important для свойств в [<declaration-list>](https://www.w3.org/TR/css-syntax-3/#typedef-declaration-list). Это приводит к тому, что свойство, для которого оно используется, становится недействительным, но не делает недействительным правило @property-try в целом.

Все свойства в [@position-try](https://www.w3.org/TR/css-anchor-position-1/#at-ruledef-position-try) применяются к элементу как часть Position Fallback Origin, нового [cascade origin](https://www.w3.org/TR/css-cascade-6/#origin), который находится между [Author Origin](https://www.w3.org/TR/css-cascade-5/#cascade-origin-author) и [Animation Origin](https://www.w3.org/TR/css-cascade-5/#cascade-origin-animation).

Как и в случае с [Animation Origin](https://www.w3.org/TR/css-cascade-5/#cascade-origin-animation), использование значений [revert](https://www.w3.org/TR/css-cascade-5/#valdef-all-revert) или [revert-layer](https://www.w3.org/TR/css-cascade-5/#valdef-all-revert-layer) (или любых других, которые откатят свойство к предыдущему началу) действует так, как если бы свойство было частью [Author Origin](https://www.w3.org/TR/css-cascade-5/#cascade-origin-author). (Таким образом, оно возвращается к [User Origin](https://www.w3.org/TR/css-cascade-5/#cascade-origin-user)).

ПРИМЕЧАНИЕ: Свойства [accepted @position-try properties](https://www.w3.org/TR/css-anchor-position-1/#accepted-position-try-properties) - это самая маленькая группа свойств, которые влияют только на размер и положение самого поля, не изменяя область его содержимого. Это значительно упрощает реализацию возврата позиции, не слишком сокращая возможные варианты поведения. Ожидается, что будущее расширение [container queries](https://www.w3.org/TR/css-contain-3/#container-query) позволит запрашивать элемент на основе используемого им возврата позиции, что позволит обрабатывать многие случаи, не разрешенные в этом ограниченном списке.

Было бы полезно иметь возможность определять, когда ваш якорь (якоря) находится полностью за пределами экрана, и полностью подавлять его отображение. Например, всплывающие подсказки, находящиеся за пределами скроллера и удерживающие текст, к которому они привязаны, не хотят просто нависать над произвольными частями страницы, потому что их якорь имеет такое положение относительно области прокрутки.

ПРИМЕЧАНИЕ: Если несколько элементов, использующих разные якоря, хотят использовать одно и то же обратное позиционирование, только относительно своих собственных элементов якорей, опустите [<анкор-элемент>](https://www.w3.org/TR/css-anchor-position-1/#typedef-anchor-element) в [anchor()](https://www.w3.org/TR/css-anchor-position-1/#funcdef-anchor) и вместо этого укажите якорь каждого элемента в [position-anchor](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-anchor).

ПРИМЕЧАНИЕ: Наиболее распространенные типы обратного позиционирования (размещение позиционируемого элемента по одну сторону от якоря, но при необходимости переворачивание на противоположную сторону) могут быть выполнены автоматически с помощью ключевых слов в [position-try-options](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try-options), без использования [@position-try](https://www.w3.org/TR/css-anchor-position-1/#at-ruledef-position-try) вообще.

### 5.5. Применение возврата позиции

Когда позиционируемый элемент переполняет свой [inset-modified containing block](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block) и имеет непустой [position options list](https://www.w3.org/TR/css-anchor-position-1/#position-options-list), он [определяет стили возврата позиции](https://www.w3.org/TR/css-anchor-position-1/#determine-the-position-fallback-styles) для элемента, чтобы попытаться найти вариант, позволяющий избежать переполнения.

Эти измененные стили применяются к элементу через [чередование](https://www.w3.org/TR/css-anchor-position-1/#style--layout-interleave), поэтому они влияют на [вычисляемые значения](https://www.w3.org/TR/css-cascade-5/#computed-value) (и могут вызывать переходы/и т. д.), даже если они зависят от макета и [используемых значений](https://www.w3.org/TR/css-cascade-5/#used-value).

Чтобы применить опцию позиции к элементу el, заданному [опцией позиции](https://www.w3.org/TR/css-anchor-position-1/#position-option) новыми стилями:
1. С новыми стилями, вставленными в каскад в [position fallback origin](https://www.w3.org/TR/css-anchor-position-1/#position-fallback-origin), разрешите каскад и выполните достаточную компоновку, чтобы определить [used styles](https://www.w3.org/TR/css-cascade-5/#used-value) элемента el.
2. Верните [использованные стили](https://www.w3.org/TR/css-cascade-5/#used-value).

Чтобы

определить стили возврата позиции

элемента

el

:

1. Пусть базовые стили - это текущие используемые стили элемента el.
2. [Для каждой](https://infra.spec.whatwg.org/#list-iterate) опции в [списке опций позиции](https://www.w3.org/TR/css-anchor-position-1/#position-options-list):
1. Пусть настроенные стили - результат [применения опции позиции](https://www.w3.org/TR/css-anchor-position-1/#apply-a-position-option) к el.
2. Пусть el rect - это размер и положение поля полей el, когда оно размещено с помощью настроенных стилей. Пусть cb rect - это размер и положение [вставленного-модифицированного содержащего блока](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block).
3. Если у el есть [snapshotted scroll offset](https://www.w3.org/TR/css-anchor-position-1/#snapshotted-scroll-offset), вычтите его из положения как el rect, так и cb rect.
4. Если прямоугольник el не полностью содержится в прямоугольнике cb, [продолжите](https://infra.spec.whatwg.org/#iteration-continue).
5. Установите опцию как последнюю удачную позицию el. Верните скорректированные стили.
3. Утверждение: Предыдущий шаг завершился, не найдя [вариант позиции](https://www.w3.org/TR/css-anchor-position-1/#position-option), который позволяет избежать переполнения.
4. Если у el есть [последний успешный вариант позиции](https://www.w3.org/TR/css-anchor-position-1/#last-successful-position-option), верните el результат [применения варианта позиции](https://www.w3.org/TR/css-anchor-position-1/#apply-a-position-option), использующего этот вариант.
5. Верните базовые стили.

ПРИМЕЧАНИЕ: Потомки, переполняющие el, не влияют на этот расчет, только собственный [margin box](https://www.w3.org/TR/css-box-4/#margin-box) el.

При полной верстке, когда элемент определил свои резервные стили (или определил, что не использует их), размещение последующих элементов не может изменить это решение.

Например, у вас есть два позиционированных элемента, A и B, причем A размещен перед B. Если B переполняется и заставляет содержащий его блок A получить полосы прокрутки, это

*не приведет*

заставит A возвращаться назад и заново определять свои стили отката в попытке избежать переполнения. (В лучшем случае это может привести к экспоненциальным затратам на верстку; в худшем - это циклично и никогда не разрешится).

Другими словами, верстка не "идет назад".

В тот момент, когда

```
ResizeObserver
```

определяются и доставляются события, если элемент

el

имеет

[опция последней удачной позиции](https://www.w3.org/TR/css-anchor-position-1/#last-successful-position-option)

и если для него верно хотя бы одно из следующих условий, удалите его опцию последней удачной позиции:

- el не является [абсолютно позиционированным](https://www.w3.org/TR/css-position-3/#absolute-position) элементом
- вычисленное значение [position-try-options](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try-options) для el изменилось.
- Любое из правил [@position-try](https://www.w3.org/TR/css-anchor-position-1/#at-ruledef-position-try), на которые ссылается [position-try-options](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try-options) элемента el, было добавлено, удалено или изменено.

ПРИМЕЧАНИЕ: Время этого удаления намеренно идентично времени обработки [last remembered sizes](https://www.w3.org/TR/css-sizing-4/#last-remembered).

Убедитесь, что теперь, с учетом чередования, смещение прокрутки в моментальном режиме корректно.

Реализации могут наложить определяемое реализацией ограничение на длину списков [position options lists](https://www.w3.org/TR/css-anchor-position-1/#position-options-list), чтобы ограничить объем лишней работы по компоновке, которая может потребоваться. Это ограничение должно быть *по крайней мере* пять.

Например, следующий CSS сначала попытается расположить "popover" под [элементом](https://www.w3.org/TR/css-display-3/#elements), но если он не поместится на экране, то переключится на расположение выше; по умолчанию он выравнивается по левому краю, но переключится на выравнивание по правому краю, если это не удастся.

`#myPopover {
position: fixed;
top: anchor(--button bottom);
left: anchor(--button left);
position-try-options: flip-inline, flip-block, flip-block flip-inline;

/* Ширина всплывающего окна должна быть не меньше ширины кнопки */
min-width: anchor-size(--button width);

/* Высота всплывающего окна не меньше, чем 2 пункта меню */
min-height: 6em;
}`

## 6. Интерфейсы DOM

### 6.1. Интерфейс CSSPositionTryRule

Интерфейс `[CSSPositionTryRule](https://www.w3.org/TR/css-anchor-position-1/#csspositiontryrule)` представляет правило [@position-try](https://www.w3.org/TR/css-anchor-position-1/#at-ruledef-position-try):

```
[Exposed=Window]
interfaceCSSPositionTryRule :CSSRule {
  readonly attributeCSSOMStringname;
  [SameObject,PutForwards=cssText] readonly attributeCSSStyleDeclarationstyle;
};

```

Его атрибут `name` представляет имя, объявленное в прелюдии правила.

Его атрибут `style` представляет стили, объявленные в теле правила, в указанном порядке. В этом правиле действительны только [принятые свойства @position-try](https://www.w3.org/TR/css-anchor-position-1/#accepted-position-try-properties).

Подберите понятие валидности к тому, что мы делаем в подобных ситуациях.

## 7. Приложение: Чередование стилей и макетов

Чередование стиля и компоновки - это техника, при которой обновление стиля может происходить в поддереве во время процесса компоновки, что приводит к ретроактивному обновлению [вычисленных стилей] элементов (https://www.w3.org/TR/css-cascade-5/#computed-value).

Это не совсем корректная спецификация для данной концепции, возможно, она должна быть в [Cascade](https://www.w3.org/TR/css-cascade/), но мне нужен набросок, чтобы ссылаться на него.

ПРИМЕЧАНИЕ: [Чередование стилей и макетов](https://www.w3.org/TR/css-anchor-position-1/#style--layout-interleave) уже используется с [запросами контейнеров](https://www.w3.org/TR/css-contain-3/#container-query) и [длинами запросов контейнеров](https://drafts.csswg.org/css-contain-3/#container-query-length). Длина типа 10cqw преобразуется в [вычисленную длину](https://www.w3.org/TR/css-values-4/#computed-length) с использованием информации о размере контейнера запроса, что может вызвать [переходы](https://www.w3.org/TR/css-transitions-1/), когда контейнер меняет размер между макетами.

Свойства [accepted @position-try properties](https://www.w3.org/TR/css-anchor-position-1/#accepted-position-try-properties) также [interleaved](https://www.w3.org/TR/css-anchor-position-1/#style--layout-interleave) при разрешении fallback (см. [position-try](https://www.w3.org/TR/css-anchor-position-1/#propdef-position-try)).

Очевидно, что это нуждается в более подробном описании, но пока достаточно "действовать так, как вы уже делаете для контейнерных запросов". Это поведение также не определено, но, по крайней мере, оно совместимо (в какой-то степени?).

## 8. Соображения безопасности

Никаких вопросов безопасности в отношении этого документа не поднималось.

## 9. Соображения конфиденциальности

Вопросы конфиденциальности в этом документе не поднимались.
