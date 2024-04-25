1\. Введение[](#intro)
--------------------------

CSS [абсолютное позиционирование](https://www.w3.org/TR/css-position-3/#absolute-position) позволяет авторам размещать элементы в любом месте страницы, не обращая внимания на расположение других элементов, кроме содержащего их блока. Эта гибкость может быть очень полезной, но и очень ограниченной - часто вы хотите позиционировать относительно _какого-то_ другого элемента. Якорное позиционирование (с помощью функций [anchor()](#funcdef-anchor) и [anchor-size()](#funcdef-anchor-size)) позволяет авторам добиться этого, "привязывая" абсолютно позиционированный элемент к одному или нескольким другим элементам на странице, а также позволяя им попробовать несколько возможных позиций, чтобы найти "лучшую", которая позволяет избежать перекрытия/переполнения.

Например, автор может захотеть расположить всплывающую подсказку по центру и выше целевого элемента, если только это не приведет к тому, что подсказка окажется за пределами экрана, в этом случае она должна быть ниже целевого элемента. Этого можно добиться с помощью следующего CSS:

[](#example-880ca553)

```css
.anchor {
anchor-name: --tooltip;
}
.tooltip {
/* Fixpos означает, что нам не нужно беспокоиться о
связи между блоками;
всплывающая подсказка может находиться в любом месте DOM. */
position: fixed;

/* Все поведение привязки будет по умолчанию
ссылаться на якорь --tooltip. */
position-anchor: --tooltip;

/* Выравнивает нижнюю часть всплывающей подсказки по верхней части якоря;
По умолчанию это также выравнивание по центру по горизонтали
всплывающей подсказки и якоря (в горизонтальном режиме письма). */
inset-area: block-start;

/* Автоматическая смена, если окно переполнено
чтобы верхняя часть всплывающей подсказки выровнялась по нижней части якоря
вместо этого. */
position-try: flip-block;

/* Предотвращение слишком широких размеров */
max-inline-size: 20em;
}
```

2\. Определение якоря[](#determining)
------------------------------------------

### 2.1. Создание якоря: свойство [anchor-name](#propdef-anchor-name)[](#name)

| | |
| --- | --- |
| Имя: | anchor-name |
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | none [\|](https://www.w3.org/TR/css-values-4/#comb-one) [&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)[#](https://www.w3.org/TR/css-values-4/#mult-comma)|
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | none |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to)| всем элементам, которые генерируют [основной блок](https://www.w3.org/TR/css-display-3/#principal-box)|
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | нет |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | n/a |
| [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed)| как указано |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | согласно грамматике |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | дискретный |

Свойство [anchor-name](#propdef-anchor-name) объявляет, что элемент является элементом якоря, и задает ему список имен якорей, на которые он должен ориентироваться. Значения определяются следующим образом:

none

Свойство не имеет эффекта.

[&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)#

Если элемент генерирует [основной блок](https://www.w3.org/TR/css-display-3/#principal-box), то он является [якорным элементом](#anchor-element), со списком [имен якорей](#anchor-name), как указано. Каждое имя якоря - это [tree-scoped name](https://drafts.csswg.org/css-scoping-1/#css-tree-scoped-name).

В противном случае свойство не имеет эффекта.

Имена [якорей](#anchor-name) не обязательно должны быть уникальными. Не все элементы могут быть [якорными элементами](#anchor-element) для данного позиционируемого элемента, поэтому имя может быть использовано повторно в нескольких местах, если их использование распределено соответствующим образом.

Примечание: Если несколько элементов имеют общее [имя якоря](#anchor-name) и все они видны для данного позиционированного элемента, то [целевой элемент якоря](#target-anchor-element) будет последним в порядке DOM. [anchor-scope](#propdef-anchor-scope) можно использовать для ограничения того, какие имена видны данному элементу.

[Anchor names](#anchor-name) по умолчанию не ограничиваются [containment](https://www.w3.org/TR/css-contain-2/#containment); даже если элемент имеет [style](https://www.w3.org/TR/css-contain-2/#style-containment) или [layout containment](https://www.w3.org/TR/css-contain-2/#layout-containment) (или любое другое подобное ограничение), имена якорей его потомков будут видны элементам в других местах страницы.

Примечание: Если элемент находится в [пропущенном содержимом](https://www.w3.org/TR/css-contain-2/#skips-its-contents) другого элемента (например, из-за [content-visibility: hidden](https://www.w3.org/TR/css-contain-2/#propdef-content-visibility)), он не является [допустимым якорным элементом](#acceptable-anchor-element), действуя так, как будто у него нет имен.

#### 2.1.1. Неявные якорные элементы[](#implicit)

Некоторые спецификации могут определять, что при определенных обстоятельствах конкретный элемент является неявным якорным элементом для данного позиционированного элемента.

[](#example-e6312e6e)TODO заполнить новые детали, связанные с popover. Это делает объявленный элемент [неявным якорным элементом](#implicit-anchor-element) для элемента с атрибутом.

На [неявные якорные элементы](#implicit-anchor-element) можно ссылаться с помощью ключевого слова [implicit](#valdef-anchor-implicit), а не ссылаться на некоторое значение [anchor-name](#propdef-anchor-name).

[Псевдоэлементы](https://www.w3.org/TR/CSS21/selector.html#x22) имеют тот же [неявный элемент якоря](#implicit-anchor-element), что и их [исходный элемент](https://www.w3.org/TR/selectors-4/#originating-element), если не указано иное.

Примечание: Без этого эти [псевдоэлементы](https://www.w3.org/TR/CSS21/selector.html#x22), которые часто недоступны по другим спецификациям, не могут быть позиционированы с помощью [неявных якорных элементов](#implicit-anchor-element).

### 2.2. Масштабирование имен якорей: свойство [anchor-scope](#propdef-anchor-scope)[](#anchor-scope)

| | |
| --- | --- |
| Имя: | anchor-scope |
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | none [\|](https://www.w3.org/TR/css-values-4/#comb-one) all \| [&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)[#](https://www.w3.org/TR/css-values-4/#mult-comma) |
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | none |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | [все элементы](https://www.w3.org/TR/css-pseudo/#generated-content "Включает ::before и ::after псевдоэлементы.") |
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | нет |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | n/a |
| [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed) | как указано |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | согласно грамматике |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | дискретный |

Это свойство распространяет указанные [имена якорей](#anchor-name) и поиск этих имен якорей на поддерево этого элемента. См. [§ 2 Определение якоря](#determining).

Значения имеют следующие значения:

none

Никаких изменений в области видимости [имя якоря](#anchor-name).

все

Указывает, что все [имена якорей](#anchor-name), определенные этим элементом или его потомками - чья область действия еще не ограничена потомком с помощью [anchor-scope](#propdef-anchor-scope)- должны быть в области действия только для потомков этого элемента; и ограничивает потомков только сопоставлением имен якорей с [элементами якоря](#anchor-element) в пределах этого поддерева.

[&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)

Указывает, что совпадающее [имя якоря](#anchor-name), определенное этим элементом или его потомками, область действия которого еще не ограничена потомком с помощью [anchor-scope](#propdef-anchor-scope)-должно быть в области действия только для потомков этого элемента; и ограничивает потомков только совпадением этих имен якорей с [элементами якоря](#anchor-element) в пределах этого поддерева.

Это свойство не влияет на [неявные якорные элементы](#implicit-anchor-element).

[](#example-714bc97a)Когда шаблон проектирования используется повторно, [anchor-scope](#propdef-anchor-scope) может предотвратить столкновения имен в идентичных компонентах. Например, если список содержит позиционированные элементы в каждом элементе списка, которые хотят позиционировать себя относительно элемента списка, в котором они находятся,

li {
anchor-name: --list-item;
anchor-scope: --list-item;
}
li .positioned {
position: absolute;
position-anchor: --list-item;
inset-area: inline-start;
}

Без [anchor-scope](#propdef-anchor-scope) все элементы `[li](https://html.spec.whatwg.org/multipage/grouping-content.html#the-li-element)` были бы видны всем позиционированным элементам, и поэтому все они позиционировались бы относительно _конечного_ `[li](https://html.spec.whatwg.org/multipage/grouping-content.html#the-li-element)`, складываясь друг на друга.

### 2.3. Поиск якоря[](#target)

Несколько вещей в этой спецификации находят [целевой элемент якоря](#target-anchor-element), учитывая спецификатор якоря, который является либо [&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident) (и [tree-scoped reference](https://drafts.csswg.org/css-scoping-1/#css-tree-scoped-reference)), который должен соответствовать значению [anchor-name](#propdef-anchor-name) в другом месте на странице, либо ключевому слову [implicit](#valdef-anchor-implicit), либо ничему (отсутствующий спецификатор).

Чтобы определить целевой элемент [anchor element](#anchor-element), задайте запрос элемента query el и необязательный спецификатор [anchor specifier](#anchor-specifier):

1.  Если спецификация якоря не была передана, верните [целевой элемент якоря](#target-anchor-element) для запроса el, учитывая [спецификатор якоря по умолчанию](#default-anchor-specifier).

2.  Если спецификатор якоря является [неявным](#valdef-anchor-implicit):

1.  Если API Popover определяет [неявный элемент якоря](#implicit-anchor-element) для запроса el, который является [допустимым элементом якоря](#acceptable-anchor-element) для запроса el, верните этот элемент.

2.  В противном случае вернуть ничего.


    Примечание: Будущие API могут также определить неявные элементы якоря. Когда они появятся, они будут явно обрабатываться в этом алгоритме, чтобы обеспечить координацию.

3.  Иначе, якорь spec является [&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident). Вернуть последний элемент el в порядке дерева, удовлетворяющий следующим условиям:

* el является [якорным элементом](#anchor-element) с [якорным именем](#anchor-name) из anchor spec.

* [имя якоря](#anchor-name) и спецификация якоря el связаны с одним и тем же [деревом](https://dom.spec.whatwg.org/#concept-tree) [корнем](https://dom.spec.whatwg.org/#concept-tree-root).

  Примечание: [имя якоря](#anchor-name) - это [имя с привязкой к дереву](https://drafts.csswg.org/css-scoping-1/#css-tree-scoped-name), а спецификация якоря - это [ссылка с привязкой к дереву](https://drafts.csswg.org/css-scoping-1/#css-tree-scoped-reference).

* el является [допустимым элементом якоря](#acceptable-anchor-element) для запроса el.


    Если ни один элемент не удовлетворяет этим условиям, верните ничего.
    
    Примечание: [anchor-scope](#propdef-anchor-scope) может ограничивать видимость определенных [anchor names](#anchor-name), что может влиять на то, какие элементы могут быть [anchor elements](#anchor-element) для данного поиска.


Примечание: Общее правило, отраженное в этих условиях, заключается в том, что el должен быть полностью размещен до того, как будет размещен query el. Правила CSS о порядке расположения контекстов укладки дают нам гарантии этого, а список условий выше точно перефразирует правила контекстов укладки в то, что нужно для этой цели, гарантируя отсутствие возможной круговой ошибки в позиционировании якорей.

Примечание: [имя якоря](#propdef-anchor-name), определенное стилями в одном [теневом дереве](https://dom.spec.whatwg.org/#concept-shadow-tree), не будет видно [функциям якоря](#anchor-functions) в стилях в другом теневом дереве, что сохраняет инкапсуляцию. Однако _элементы_ в разных деревьях теней могут привязываться друг к другу, если имя якоря и функция якоря принадлежат стилям одного и того же дерева, например, при использовании [::part()](https://www.w3.org/TR/css-shadow-parts-1/#selectordef-part) для стилизации элемента внутри тени. ([Неявные якорные элементы](#implicit-anchor-element) также по своей сути не ограничены одним деревом, но детали этого зависят от API, назначающего их).

Элемент el является допустимым якорным элементом для [абсолютно позиционированного](https://www.w3.org/TR/css-position-3/#absolute-position) элемента запроса el, если верно все следующее:

* Либо el является потомком [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) запроса el, либо содержащий блок запроса el является [начальным содержащим блоком](https://www.w3.org/TR/css-display-3/#initial-containing-block).

* Если el имеет тот же [содержащий блок](https://www.w3.org/TR/css-display-3/#containing-block), что и запрос el, то либо el не является [абсолютно позиционированным](https://www.w3.org/TR/css-position-3/#absolute-position), либо el предшествует запросу el в порядке дерева.

* Если el имеет другой [содержащий блок](https://www.w3.org/TR/css-display-3/#containing-block), чем запрос el, то последний содержащий блок в [цепочке содержащих блоков](https://www.w3.org/TR/css-display-3/#containing-block-chain) el перед достижением содержащего блока запроса el либо не [абсолютно позиционирован](https://www.w3.org/TR/css-position-3/#absolute-position), либо предшествует запросу el в порядке дерева.

* el является либо [элементом](https://www.w3.org/TR/css-display-3/#elements), либо [псевдоэлементом](https://www.w3.org/TR/selectors-4/#pseudo-element), который действует как элемент.

  [](#issue-74e37020)определите термин, который на самом деле означает это, соответствуя ::before/after/backdrop/etc (но не ::marker/placeholder/etc, чья рамка не определяется).

* el не находится в [пропущенном содержимом](https://www.w3.org/TR/css-contain-2/#skips-its-contents) другого элемента.


### 2.4. Якоря по умолчанию: свойство [position-anchor](#propdef-position-anchor)[](#position-anchor)

| | |
| --- | --- |
| Имя: | position-anchor |
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | [&lt;anchor-element&gt;](#typedef-anchor-element)|
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | implicit |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to)| [абсолютно позиционированным](https://www.w3.org/TR/css-position-3/#absolute-position) элементам |
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | нет |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | n/a |
| [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed) | как указано |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | согласно грамматике |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | дискретный |

Свойство [position-anchor](#propdef-position-anchor) определяет спецификатор якоря по умолчанию для всех [функций якоря](#anchor-functions) элемента, позволяя нескольким элементам использовать один и тот же набор функций якоря (и списки [опций позиции](#position-options-list)!), меняя при этом, на какой [элемент якоря](#anchor-element) ссылается каждый элемент.

Элемент [target anchor element](#target-anchor-element), выбранный спецификатором [default anchor specifier](#default-anchor-specifier) (если он существует), является элементом якоря по умолчанию для данного элемента.

Его значения идентичны терминам [&lt;anchor-element&gt;](#typedef-anchor-element) в [anchor()](#funcdef-anchor) и [anchor-size()](#funcdef-anchor-size).

[](#example-e2ad92db)Например, в следующем коде элементы .foo и .bar могут использовать одни и те же свойства позиционирования, просто меняя элемент якоря, на который они ссылаются:

.anchored {
position: absolute;
top: calc(.5em \+ anchor(outside));
/\* Поскольку имя якоря не было указано,
это автоматически ссылается на
элемент якоря по умолчанию. */
}

.foo.anchored {
position-anchor: --foo;
}
.bar.anchored {
position-anchor: --bar;
}

### 2.5. Релевантность якоря[](#anchor-relevance)

Если [элемент якоря](#anchor-element) является [целевым элементом якоря](#target-anchor-element) для любого позиционированного элемента, который является [релевантным для пользователя](https://www.w3.org/TR/css-contain-2/#relevant-to-the-user), то элемент якоря также является релевантным для пользователя.

Примечание: Это означает, что, например, якорь в поддереве [content-visibility: auto](https://www.w3.org/TR/css-contain-2/#propdef-content-visibility) предотвратит [пропуск его содержимого](https://www.w3.org/TR/css-contain-2/#skips-its-contents), пока позиционируемый элемент, опирающийся на него, является [релевантным для пользователя](https://www.w3.org/TR/css-contain-2/#relevant-to-the-user).

3\. Позиционирование на основе якоря[](#positioning)
--------------------------------------------

[Абсолютно позиционированный](https://www.w3.org/TR/css-position-3/#absolute-position) элемент может позиционироваться относительно одного или нескольких [элементов-якорей](#anchor-element) на странице.

Функция [inset-area](#propdef-inset-area) предлагает удобную концепцию позиционирования на основе сетки относительно [элемента якоря по умолчанию](#default-anchor-element); для более сложного позиционирования или позиционирования относительно нескольких элементов можно использовать функцию [anchor()](#funcdef-anchor) в [свойствах вставки](https://drafts.csswg.org/css-logical-1/#inset-properties) для явной ссылки на края [элемента якоря](#anchor-element).

### 3.1. Свойство [inset-area](#propdef-inset-area) Property[](#inset-area)

| | |
| --- | --- |
| Имя: | inset-area |
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | none [\|](https://www.w3.org/TR/css-values-4/#comb-one) [&lt;inset-area&gt;](#typedef-inset-area)|
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | none |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to)| позиционированным элементам с [элементом якоря по умолчанию](#default-anchor-element)|
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | нет |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | n/a |
| [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed) | как указано |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | согласно грамматике |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | TBD |

В большинстве случаев при позиционировании якоря нужно заботиться только о краях [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) позиционируемого элемента и краях [элемента якоря по умолчанию](#default-anchor-element). Эти линии можно представить как определение сетки 3x3; [inset-area](#propdef-inset-area) позволяет легко настроить [свойства вставки](https://drafts.csswg.org/css-logical-1/#inset-properties) позиционируемого элемента, указав, в какой области этой [сетки inset-area](#inset-area-grid) вы хотите разместить позиционируемый элемент. Его синтаксис таков:

&lt;inset-area&gt; = \[
\[ left [|](https://www.w3.org/TR/css-values-4/#comb-one) center [|](https://www.w3.org/TR/css-values-4/#comb-one) right [|](https://www.w3.org/TR/css-values-4/#comb-one) span-left [|](https://www.w3.org/TR/css-values-4/#comb-one) span-right
[|](https://www.w3.org/TR/css-values-4/#comb-one) x-start [|](https://www.w3.org/TR/css-values-4/#comb-one) x-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-x-start [|](https://www.w3.org/TR/css-values-4/#comb-one) span-x-end
[|](https://www.w3.org/TR/css-values-4/#comb-one) x-self-start [|](https://www.w3.org/TR/css-values-4/#comb-one) x-self-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-x-self-start [|](https://www.w3.org/TR/css-values-4/#comb-one) span-x-self-end
[|](https://www.w3.org/TR/css-values-4/#comb-one) span-all \]
[||](https://www.w3.org/TR/css-values-4/#comb-any)
\[ top [|](https://www.w3.org/TR/css-values-4/#comb-one) center [|](https://www.w3.org/TR/css-values-4/#comb-one) bottom [|](https://www.w3.org/TR/css-values-4/#comb-one) span-top [|](https://www.w3.org/TR/css-values-4/#comb-one) span-bottom
[|](https://www.w3.org/TR/css-values-4/#comb-one) y-start [|](https://www.w3.org/TR/css-values-4/#comb-one) y-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-y-start [|](https://www.w3.org/TR/css-values-4/#comb-one) span-y-end
[|](https://www.w3.org/TR/css-values-4/#comb-one) y-self-start [|](https://www.w3.org/TR/css-values-4/#comb-one) y-self-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-y-self-start [|](https://www.w3.org/TR/css-values-4/#comb-one) span-y-self-end
[|](https://www.w3.org/TR/css-values-4/#comb-one) span-all \]
[|](https://www.w3.org/TR/css-values-4/#comb-one)
\[ block-start [|](https://www.w3.org/TR/css-values-4/#comb-one) center [|](https://www.w3.org/TR/css-values-4/#comb-one) block-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-block-start [|](https://www.w3.org/TR/css-values-4/#comb-one) span-block-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-all \]
[||](https://www.w3.org/TR/css-values-4/#comb-any)
\[ inline-start [|](https://www.w3.org/TR/css-values-4/#comb-one) center [|](https://www.w3.org/TR/css-values-4/#comb-one) inline-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-inline-start [|](https://www.w3.org/TR/css-values-4/#comb-one) span-inline-end
[|](https://www.w3.org/TR/css-values-4/#comb-one) span-all \]
[|](https://www.w3.org/TR/css-values-4/#comb-one)
\[ self-block-start [|](https://www.w3.org/TR/css-values-4/#comb-one) self-block-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-self-block-start [|](https://www.w3.org/TR/css-values-4/#comb-one) span-self-block-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-all \]
[||](https://www.w3.org/TR/css-values-4/#comb-any)
\[ self-inline-start [|](https://www.w3.org/TR/css-values-4/#comb-one) self-inline-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-self-inline-start [|](https://www.w3.org/TR/css-values-4/#comb-one) span-self-inline-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-all \]
[|](https://www.w3.org/TR/css-values-4/#comb-one)
\[ начало [|](https://www.w3.org/TR/css-values-4/#comb-one) центр [|](https://www.w3.org/TR/css-values-4/#comb-one) конец [|](https://www.w3.org/TR/css-values-4/#comb-one) span-start [|](https://www.w3.org/TR/css-values-4/#comb-one) span-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-all \][{1,2}](https://www.w3.org/TR/css-values-4/#mult-num-range)
[|](https://www.w3.org/TR/css-values-4/#comb-one)
\[ self-start [|](https://www.w3.org/TR/css-values-4/#comb-one) center [|](https://www.w3.org/TR/css-values-4/#comb-one) self-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-self-start [|](https://www.w3.org/TR/css-values-4/#comb-one) span-self-end [|](https://www.w3.org/TR/css-values-4/#comb-one) span-all \][{1,2}](https://www.w3.org/TR/css-values-4/#mult-num-range)
\]

нет

Свойство не имеет эффекта.

[&lt;inset-area&gt;](#typedef-inset-area)

Если элемент не имеет [якорного элемента по умолчанию](#default-anchor-element) или не является [абсолютно позиционированным](https://www.w3.org/TR/css-position-3/#absolute-position) элементом, это значение не имеет эффекта.

В противном случае свойство выбирает область сетки [inset-area grid](#inset-area-grid) и делает ее [содержащим блоком](https://www.w3.org/TR/css-display-3/#containing-block) элемента.

Примечание: Это означает, что свойства [inset](https://drafts.csswg.org/css-logical-1/#inset-properties) задают смещение от области вставки, а значения некоторых свойств, например [max-height: 100%](https://www.w3.org/TR/css-sizing-3/#propdef-max-height), будут относительными по отношению к области вставки.

Кроме того, значение [normal](https://www.w3.org/TR/css-align-3/#valdef-align-self-normal) для свойств [self-alignment properties](https://www.w3.org/TR/css-align-3/#self-alignment-properties) ведет себя как [start](https://www.w3.org/TR/css-align-3/#valdef-self-position-start), [end](https://www.w3.org/TR/css-align-3/#valdef-self-position-end) или [anchor-center](#valdef-justify-self-anchor-center), в зависимости от позиционирования области, чтобы обеспечить хорошее выравнивание по умолчанию для позиционируемого элемента.

Подробнее об этих эффектах см. в [§ 3.1.1 Разрешение &lt;inset-area&gt;s](#resolving-spans).

Кроме того, любые [auto](https://www.w3.org/TR/css-position-3/#valdef-top-auto) [inset properties](https://drafts.csswg.org/css-logical-1/#inset-properties) разрешаются в 0.

#### 3.1.1. Разрешение [&lt;inset-area&gt;](#typedef-inset-area)s[](#resolving-spans)

Сетка inset-area - это сетка 3x3, состоящая из четырех линий сетки по каждой оси. По порядку:

* начальный край премодификации [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) элемента или край anchor-start() [элемента якоря по умолчанию](#default-anchor-element), если он находится более [start](https://www.w3.org/TR/css-writing-modes-4/#start)-направленно

* край якоря(начало) [элемента якоря по умолчанию](#default-anchor-element)

* край якоря (конец) [элемента якоря по умолчанию](#default-anchor-element)

* конечный край пре-модификации [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) элемента, или край anchor-start() [элемента якоря по умолчанию](#default-anchor-element), если он находится более [end](https://www.w3.org/TR/css-writing-modes-4/#end)-направленно.


В [&lt;inset-area&gt;](#typedef-inset-area) выделяется область этой сетки путем указания строк и столбцов, которые эта область занимает, причем каждое из двух ключевых слов указывает на одну из них:

начало, конец, самоначало, самоконец

верхний, нижний, левый, правый

y-start, y-end, y-self-start, y-self-end

x-start, x-end, x-self-start, x-self-end

block-start, block-end, block-self-start, block-self-end

inline-start, inline-end, inline-self-start, inline-self-end

центр

Единственная соответствующая строка или столбец, в зависимости от того, какую ось задает это ключевое слово.

Как и в [anchor()](#funcdef-anchor), простые логические ключевые слова ([start](#valdef-inset-area-start), [end](#valdef-inset-area-end) и т. д.) относятся к режиму записи [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) элемента. Ключи [x-start](#valdef-inset-area-x-start)/etc определяют их направление таким же образом, но по указанной физической оси.

Логические ключевые слова "self" ([self-start](#valdef-inset-area-self-start), [x-self-end](#valdef-inset-area-x-self-end) и т. д.) идентичны, но относятся к собственному режиму записи элемента.

span-start, span-end

span-top, span-bottom

span-y-start, span-y-end

span-x-start, span-x-end

span-block-start, span-block-end

span-inline-start, span-inline-end

Две строки или столбца, в зависимости от того, какую ось задает это ключевое слово: центральная строка/столбец и строка/столбец, соответствующие другой половине ключевого слова, как в однопутевых ключевых словах.

(Например, [span-top](#valdef-inset-area-span-top) охватывает первые две строки - центральную и верхнюю).

span-all

Все три строки или столбца, в зависимости от того, какую ось задает это ключевое слово.

Некоторые ключевые слова неоднозначно определяют, к какой оси они относятся: [center](#valdef-inset-area-center), [span-all](#valdef-inset-area-span-all), а также ключевые слова [start](#valdef-inset-area-start)/etc, которые не указывают ось блока или инлайна в явном виде. Если другое ключевое слово однозначно указывает на свою ось, то неоднозначное ключевое слово относится к противоположной оси. (Например, в слове block-start center ключевое слово center относится к оси inline). Если же оба ключевых слова неоднозначны, то первое относится к блочной оси [содержащего блока] элемента (https://www.w3.org/TR/css-display-3/#containing-block), а второе - к линейной оси. (Например, span-all start эквивалентен span-all inline-start).

Если задано только одно ключевое слово, оно ведет себя как второе ключевое слово [span-all](#valdef-inset-area-span-all), если данное ключевое слово однозначно относительно своей оси; в противном случае оно ведет себя так, как если бы данное ключевое слово повторялось. (Например, [top](#valdef-inset-area-top) эквивалентно top span-all, а [center](#valdef-inset-area-center) эквивалентно center center).

* * *

[&lt;inset-area&gt;](#typedef-inset-area) также подразумевает [самовыравнивание](https://www.w3.org/TR/css-align-3/#self-align) по умолчанию, которое будет использоваться, если свойство [самовыравнивания](https://www.w3.org/TR/css-align-3/#self-alignment-properties) для элемента - [normal](https://www.w3.org/TR/css-align-3/#valdef-align-self-normal):

* Если область вставки включает центральную область по оси, то выравнивание по этой оси по умолчанию будет [anchor-center](#valdef-justify-self-anchor-center).

* В противном случае выравнивание противоположно региону, который он указывает: если он указывает "начальный" регион своей оси, выравнивание по умолчанию по этой оси будет [end](https://www.w3.org/TR/css-align-3/#valdef-self-position-end); и т. д.


[](#example-7921ad0f)Например, если предположить, что режим написания эквивалентен английскому (horizontal-tb, ltr), то значение span-x-start top соответствует области "начало" вертикальной оси, а также областям "начало" и "центр" горизонтальной оси, поэтому выравнивание по умолчанию будет [align-self: end;](https://www.w3.org/TR/css-align-3/#propdef-align-self) и [justify-self: anchor-center;](https://www.w3.org/TR/css-align-3/#propdef-justify-self)

![](images/inset-area-example.png)

Пример позиционирования [inset-area: span-x-start top](#propdef-inset-area).

Примечание: Когда [элемент якоря по умолчанию](#default-anchor-element) частично или полностью находится за пределами предварительно модифицированного [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block), некоторые строки или столбцы сетки [inset-area](#inset-area-grid) могут быть нулевого размера.

### 3.2. Функция [anchor()](#funcdef-anchor)[](#anchor-pos)

[Абсолютно позиционированный](https://www.w3.org/TR/css-position-3/#absolute-position) элемент может использовать функцию anchor() в качестве значения в своих [свойствах вставки](https://drafts.csswg.org/css-logical-1/#inset-properties) для ссылки на позицию одного или нескольких [элементов якоря](#anchor-element). Функция [anchor()](#funcdef-anchor) разрешается в [&lt;length&gt;](https://www.w3. org/TR/css-values-4/#length-value "Расширяется до: advance measure | cap | ch | cm | dvb | dvh | dvi | dvmax | dvmin | dvw | em | ex | ic | in | lh | lvb | lvh | lvi | lvmax | lvmin | lvw | mm | pc | pt | px | q | rcap | rch | rem | rex | ric | rlh | svb | svh | svi | svmax | svmin | svw | vb | vh | vi | vmax | vmin | vw").

&lt;anchor()&gt; = anchor( [&lt;anchor-element&gt;](#typedef-anchor-element)[?](https://www.w3.org/TR/css-values-4/#mult-opt) [&lt;anchor-side&gt;](#typedef-anchor-side)[,](https://www.w3.org/TR/css-values-4/#comb-comma) [&lt;length-percentage&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage)[?](https://www.w3.org/TR/css-values-4/#mult-opt) )
[&lt;anchor-element&gt;](#typedef-anchor-element) = [&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident) [|](https://www.w3.org/TR/css-values-4/#comb-one) implicit
[&lt;anchor-side&gt;](#typedef-anchor-side) = inside [|](https://www.w3.org/TR/css-values-4/#comb-one) outside
[|](https://www.w3.org/TR/css-values-4/#comb-one) top [|](https://www.w3.org/TR/css-values-4/#comb-one) left [|](https://www.w3.org/TR/css-values-4/#comb-one) right [|](https://www.w3.org/TR/css-values-4/#comb-one) bottom
[|](https://www.w3.org/TR/css-values-4/#comb-one) начало [|](https://www.w3.org/TR/css-values-4/#comb-one) конец [|](https://www.w3.org/TR/css-values-4/#comb-one) self start [|](https://www.w3.org/TR/css-values-4/#comb-one) self end
[|](https://www.w3.org/TR/css-values-4/#comb-one) [&lt;процент&gt;](https://www.w3.org/TR/css-values-4/#percentage-value) [|](https://www.w3.org/TR/css-values-4/#comb-one) center

Функция [anchor()](#funcdef-anchor) имеет три аргумента:

* значение [&lt;anchor-element&gt;](#typedef-anchor-element) указывает, как найти элемент [anchor](#anchor-element), из которого она будет черпать информацию о позиционировании. Если значение опущено, то оно ведет себя как [спецификатор якоря по умолчанию](#default-anchor-specifier) элемента. Возможные значения:

  [&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)

  Указывает имя [якоря](#anchor-name), которое он будет искать. Это имя является [древовидной ссылкой](https://drafts.csswg.org/css-scoping-1/#css-tree-scoped-reference).

  implicit

  Выбирает [неявный элемент якоря](#implicit-anchor-element), определенный для элемента, если это возможно.

  Подробности см. в разделе [целевой элемент якоря](#target-anchor-element).

* Значение [&lt;anchor-side&gt;](#typedef-anchor-side) указывает на позицию соответствующей стороны [целевого якорного элемента](#target-anchor-element). Возможные значения:

  внутри

  снаружи

  Устанавливается на одну из сторон [якорного элемента](#anchor-element), в зависимости от того, в каком [свойстве вставки](https://drafts.csswg.org/css-logical-1/#inset-properties) оно используется. [inside](#valdef-anchor-inside) относится к той же стороне, что и свойство inset (прикрепляя элемент к "внутренней" стороне якоря), а [outside](#valdef-anchor-outside) - к противоположной.

  верхний

  справа

  нижний

  левый

  Относится к указанной стороне [элемента якоря](#anchor-element).

  Примечание: Они используются только в [свойствах вставки](https://drafts.csswg.org/css-logical-1/#inset-properties) на соответствующей оси. Например, [left](#valdef-anchor-left) можно использовать в свойствах [left](https://www.w3.org/TR/css-position-3/#propdef-left), [right](https://www.w3.org/TR/css-position-3/#propdef-right) или логических вставках, относящихся к горизонтальной оси.

  начало

  конец

  самоначинание

  самоконец

  Отсылает к одной из сторон [якорного элемента](#anchor-element) по той же оси, что и свойство [inset](https://drafts.csswg.org/css-logical-1/#inset-properties), в котором он используется, путем разрешения ключевого слова относительно [writing mode](https://www.w3. org/TR/css-writing-modes-4/#writing-mode) либо позиционируемого элемента (для [self-start](#valdef-anchor-self-start) и [self-end](#valdef-anchor-self-end)), либо содержащего блока позиционируемого элемента (для [start](#valdef-anchor-start) и [end](#valdef-anchor-end)).

  [&lt;процент&gt;](https://www.w3.org/TR/css-values-4/#percentage-value)

  center

  Обозначает позицию, соответствующую проценту между сторонами [start](#valdef-anchor-start) и [end](#valdef-anchor-end), причем 0% эквивалентно началу, а 100% - концу.

  [center](#valdef-anchor-center) эквивалентен 50%.

* Необязательный заключительный аргумент [&lt;length-percentage&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage) является запасным значением, указывающим, к чему должна разрешиться функция, если она является [invalid anchor function](#valid-anchor-function).


Функция [anchor()](#funcdef-anchor), представляющая [действительную функцию якоря](#valid-anchor-function), разрешается в [вычисленное значение](https://www.w3.org/TR/css-cascade-5/#computed-value) время (используя [чередование стилей и макетов](#style--layout-interleave)) в значение [&lt;length&gt;](https://www.w3. org/TR/css-values-4/#length-value "Расширяется до: advance measure | cap | ch | cm | dvb | dvh | dvi | dvmax | dvmin | dvw | em | ex | ic | in | lh | lvb | lvh | lvi | lvmax | lvmin | lvw | mm | pc | pt | px | q | rcap | rch | rem | rex | rex | rch | rem | rex | ric | rlh | svb | svh | svi | svmax | svmin | svw | vb | vh | vi | vmax | vmin | vw"), которые выравнивают край [вставки- модифицированный содержащий блок](https: //www. w3.org/TR/css-position-3/#inset-modified-containing-block), соответствующего свойству, в котором появляется функция, с указанным краем границы [целевого элемента якоря](#target-anchor-element), предполагая, что все [контейнеры прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container) между целевым элементом якоря и [содержащим блоком](https://www.w3.org/TR/css-display-3/#containing-block) позиционированного элемента прокручены до их начальной позиции прокрутки (но смотрите [§ 3.4 Учет прокрутки](#scroll)).

Примечание: Это означает, что переходы или [анимация](https://www.w3.org/TR/web-animations-1/#concept-animation) свойства, использующего [функцию якоря](#anchor-functions), будут работать "как положено" при любых возможных изменениях: перемещении элемента якоря, добавлении или удалении элементов якоря из документа, изменении свойства [anchor-name](#propdef-anchor-name) у якорей и т. д.

Если [целевой элемент якоря](#target-anchor-element) является [фрагментированным](https://www.w3.org/TR/css-break-4/#fragment), вместо него используется выровненный по оси ограничительный прямоугольник пограничных полей фрагментов.

[](#issue-3c6fe13f)Нужно ли контролировать, к какому боксу мы обращаемся, чтобы можно было выровнять по padding или content edge?

Позиционированный элемент дополнительно визуально смещается на его [snapshotted scroll offset](#snapshotted-scroll-offset), как бы дополнительным преобразованием [translate()](https://www.w3.org/TR/css-transforms-1/#funcdef-transform-translate).

[](#example-ef794aa0)Например, в .bar { top: anchor(--foo top); }, [anchor()](#funcdef-anchor) будет разрешен на длину, которая выровняет верхний край элемента `.bar` с верхним краем якоря --foo.

С другой стороны, в .bar { bottom: anchor(--foo top); } вместо этого разрешится в длину, которая выровняет _нижний_ край элемента `.bar` с верхним краем якоря --foo.

Поскольку значения [top](https://www.w3.org/TR/css-position-3/#propdef-top) и [bottom](https://www.w3.org/TR/css-position-3/#propdef-bottom) задают вставки с разных краев (верх и низ [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) элемента, соответственно), один и тот же [anchor()](#funcdef-anchor) обычно разрешается в разные длины в каждом случае.

[](#example-a7ac0832)Поскольку функция [anchor()](#funcdef-anchor) разрешается в [&lt;length&gt;](https://www.w3. org/TR/css-values-4/#length-value "Расширяется до: advance measure | cap | ch | cm | dvb | dvh | dvi | dvmax | dvmin | dvw | em | ex | ic | in | lh | lvb | lvh | lvi | lvmax | lvmin | lvw | mm | pc | pt | px | q | rcap | rch | rem | rex | ric | rlh | svb | svh | svi | svmax | svmin | svw | vb | vh | vi | vmax | vmin | vw"), его можно использовать в [математических функциях] (https: //www. w3.org/TR/css-values-4/#math-function), как и любую другую длину.

Например, следующий пример настроит элемент таким образом, чтобы его [inset-modified containing block](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block) был центрирован на [anchor element](#anchor-element) и был как можно шире, не переполняя [containing block](https://www.w3.org/TR/css-display-3/#containing-block):

.centered-message {
position: fixed;
max-width: max-content;
justify-self: center;

-center: anchor(--x 50%);
--half-distance: min(
abs(0% \- var(--center)),
abs(100% \- var(--center))
);
слева: calc(var(--center)\- var(-half-distance));
справа: calc(var(--center) \- var(--half-distance));
bottom: anchor(--x top);
}

Это может быть уместно, например, для сообщения об ошибке в элементе `[input](https://html.spec.whatwg.org/multipage/input.html#the-input-element)`, так как центрирование облегчит определение того, на какой вход ссылаются.

### 3.3. Центрирование по якорю: значение [anchor-center](#valdef-justify-self-anchor-center)[](#anchor-center)

| | |
| --- | --- |
| Имя: | [justify-self](https://www.w3.org/TR/css-align-3/#propdef-justify-self), [align-self](https://www.w3.org/TR/css-align-3/#propdef-align-self), [justify-items](https://www.w3.org/TR/css-align-3/#propdef-justify-items), [align-items](https://www.w3.org/TR/css-align-3/#propdef-align-items)|
| [Новые значения:](https://www.w3.org/TR/css-values/#value-defs) | anchor-center |

Свойства [selfalignment](https://www.w3.org/TR/css-align-3/#self-alignment-properties) позволяют [абсолютно позиционированному](https://www.w3.org/TR/css-position-3/#absolute-position) элементу выравниваться внутри [inset-modified containing block](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block). Существующих значений, плюс тщательно подобранных [свойств вставки](https://drafts.csswg.org/css-logical-1/#inset-properties), обычно достаточно для полезного выравнивания, но распространенный случай позиционирования с якорем - центрирование по элементу якоря - требует тщательной и несколько сложной настройки.

Новое значение anchor-center предельно упрощает этот случай: если позиционируемый элемент имеет [default anchor element](#default-anchor-element), то он выравнивается таким образом, чтобы центрироваться над стандартным якорным элементом по соответствующей оси.

Кроме того, все [auto](https://www.w3.org/TR/css-position-3/#valdef-top-auto) [свойства вставки](https://drafts.csswg.org/css-logical-1/#inset-properties) разрешаются в 0. Однако [доступное пространство](https://www.w3.org/TR/css-sizing-3/#available) для позиционированного элемента по соответствующей оси уменьшается до размера самого большого прямоугольника, который центрируется на [якорном элементе по умолчанию](#default-anchor-element) и не переполняет [модифицированный вставкой содержащий блок](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block). (Возможно, нулевого размера, если центр якоря не находится в пределах блока, содержащего inset-modified).

Если элемент не [абсолютно позиционирован](https://www.w3.org/TR/css-position-3/#absolute-position) или не имеет [элемента якоря по умолчанию](#default-anchor-element), это значение ведет себя как [center](https://www.w3.org/TR/css-align-3/#valdef-self-position-center) и не оказывает дополнительного влияния на то, как разрешаются [свойства вставки](https://drafts.csswg.org/css-logical-1/#inset-properties).

### 3.4. Учет прокрутки[](#scroll)

Поскольку прокрутка часто выполняется в отдельном потоке от верстки по причинам производительности, а [anchor()](#funcdef-anchor) может привести как к изменению позиционирования (которое может быть обработано в потоке прокрутки), так и к изменению верстки (что невозможно), anchor() определяется так, что все [scroll containers](https://www.w3.org/TR/css-overflow-3/#scroll-container) между элементом якоря и содержащим блоком позиционированного элемента находятся в их начальной позиции прокрутки. Это означает, что позиционируемый элемент не будет выровнен относительно своего якоря, если все контейнеры прокрутки не находятся в своих начальных положениях.

Чтобы компенсировать это, не теряя при этом производительности отдельного потока прокрутки, мы определяем:

[абсолютно позиционированный](https://www.w3.org/TR/css-position-3/#absolute-position) элемент query el нуждается в регулировке прокрутки по горизонтальной или вертикальной оси, если верны оба следующих условия:

* query el имеет [элемент якоря по умолчанию](#default-anchor-element).

* хотя бы одна функция [anchor()](#funcdef-anchor) в используемых [inset properties](https://drafts.csswg.org/css-logical-1/#inset-properties) запроса el по оси ссылается на [target anchor element](#target-anchor-element) с таким же ближайшим [scroll container](https://www.w3. org/TR/css-overflow-3/#scroll-container) предком, как и [элемент якоря по умолчанию](#default-anchor-element) запроса el, или используемое свойство [самовыравнивания](https://www.w3.org/TR/css-align-3/#self-alignment-properties) запроса el в оси имеет значение [anchor-center](#valdef-justify-self-anchor-center).


Примечание: Если у запроса el есть список [опций позиции](#position-options-list), то на то, нуждается ли он [в регулировке прокрутки](#needs-scroll-adjustment) в оси, также влияет примененный стиль отката.

Смещение прокрутки запроса el представляет собой пару длин для горизонтальной и вертикальной осей соответственно. Каждая длина вычисляется следующим образом:

* Если запрос el [нуждается в регулировке прокрутки](#needs-scroll-adjustment) в оси, то длина равна сумме [смещений прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-offset) всех [контейнеров прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container) предков [элемента якоря по умолчанию](#default-anchor-element) в той же оси, вплоть до [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) запроса el, но не включая его;

* В противном случае длина равна 0.


[](#issue-5446f06a)Определите точное время моментального снимка: обновляется каждый кадр, перед пересчетом стиля.

### 3.5. Валидность[](#anchor-valid)

Функция [anchor()](#funcdef-anchor) является действительной функцией якоря только в том случае, если верны все следующие условия:

* Она используется в свойстве [inset](https://drafts.csswg.org/css-logical-1/#inset-properties) на [absolutely-positioned](https://www.w3.org/TR/css-position-3/#absolute-position) элементе.

* Если ее [&lt;anchor-side&gt;](#typedef-anchor-side) указывает на физическое ключевое слово, она используется в свойстве [inset](https://drafts.csswg.org/css-logical-1/#inset-properties) на этой оси. (Например, [left](#valdef-anchor-left) может использоваться только в [left](https://www.w3.org/TR/css-position-3/#propdef-left), [right](https://www.w3.org/TR/css-position-3/#propdef-right) или логическом свойстве вставки по горизонтальной оси).

* Результат определения [целевого элемента якоря](#target-anchor-element) не является ничем, если в качестве элемента, на котором он используется, указан запрашиваемый элемент, а в качестве спецификатора якоря - значение [&lt;anchor-element&gt;](#typedef-anchor-element), указанное в функции.


Если любое из этих условий ложно, функция [anchor()](#funcdef-anchor) разрешается в указанное в ней резервное значение. Если запасное значение не указано, то она разрешается в 0px.

4\. Изменение размера на основе якоря[](#sizing)
----------------------------------

[Абсолютно позиционированный](https://www.w3.org/TR/css-position-3/#absolute-position) элемент может использовать функцию anchor-size() в своих [свойствах размера](https://www.w3.org/TR/css-sizing-3/#sizing-property) для указания размера одного или нескольких [элементов-якорей](#anchor-element). Функция [anchor-size()](#funcdef-anchor-size) разрешается в [&lt;length&gt;](https://www.w3. org/TR/css-values-4/#length-value "Расширяется до: advance measure | cap | ch | cm | dvb | dvh | dvi | dvmax | dvmin | dvw | em | ex | ic | in | lh | lvb | lvh | lvi | lvmax | lvmin | lvw | mm | pc | pt | px | q | rcap | rch | rem | rex | ric | rlh | svb | svh | svi | svmax | svmin | svw | vb | vh | vi | vmax | vmin | vw").

### 4.1. Функция [anchor-size()](#funcdef-anchor-size)[](#anchor-size-fn)

anchor-size() = anchor-size( [&lt;anchor-element&gt;](#typedef-anchor-element)[?](https://www.w3.org/TR/css-values-4/#mult-opt) [&lt;anchor-size&gt;](#typedef-anchor-size)[,](https://www.w3.org/TR/css-values-4/#comb-comma) [&lt;length-percentage&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage)[?](https://www.w3.org/TR/css-values-4/#mult-opt) )
[&lt;anchor-size&gt;](#typedef-anchor-size) = width [|](https://www.w3.org/TR/css-values-4/#comb-one) height [|](https://www.w3.org/TR/css-values-4/#comb-one) block [|](https://www.w3.org/TR/css-values-4/#comb-one) inline [|](https://www.w3.org/TR/css-values-4/#comb-one) self-block [|](https://www.w3.org/TR/css-values-4/#comb-one) self-inline

Функция [anchor-size()](#funcdef-anchor-size) аналогична [anchor()](#funcdef-anchor) и принимает те же аргументы, за исключением того, что ключевые слова [&lt;anchor-side&gt;](#typedef-anchor-side) заменяются на [&lt;anchor-size&gt;](#typedef-anchor-size), означающие расстояние между двумя противоположными сторонами.

Физические ключевые слова [&lt;anchor-size&gt;](#typedef-anchor-size) (width и height) относятся к ширине и высоте, соответственно, элемента [целевого якоря](#target-anchor-element). В отличие от [anchor()](#funcdef-anchor), здесь нет ограничений на совпадение осей; например, [width: anchor-size(--foo height);](https://www.w3.org/TR/css-sizing-3/#propdef-width) является допустимым.

Логические ключевые слова [&lt;anchor-size&gt;](#typedef-anchor-size) (block, inline, self-block и self-inline) сопоставляются с одним из физических ключевых слов в соответствии либо с [writing mode](https://www.w3. org/TR/css-writing-modes-4/#writing-mode) элемента (для [self-block](#valdef-anchor-size-self-block) и [self-inline](#valdef-anchor-size-self-inline)) или режимом записи [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block) элемента (для [block](#valdef-anchor-size-block) и [inline](#valdef-anchor-size-inline)).

Функция [anchor-size()](#funcdef-anchor-size), представляющая [valid anchor-size function](#valid-anchor-size-function), разрешается в [вычисленное значение](https://www.w3.org/TR/css-cascade-5/#computed-value) время (через [чередование стиля и макета](#style--layout-interleave)) до [&lt;length&gt;](https://www.w3. org/TR/css-values-4/#length-value "Расширяется до: advance measure | cap | ch | cm | dvb | dvh | dvi | dvmax | dvmin | dvw | em | ex | ic | in | lh | lvb | lvh | lvi | lvmax | lvmin | lvw | mm | pc | pt | px | q | rcap | rch | rem | rex | rex | rx | rx | px | px | px | q. | rch | rem | rex | ric | rlh | svb | svh | svi | svmax | svmin | svw | vb | vh | vi | vmax | vmin | vw"), разделяющие соответствующие края границы (либо слева и справа, либо сверху и снизу, в зависимости от того, что находится на указанной оси) [целевого якорного элемента](#target-anchor-element).

### 4.2. Валидность[](#anchor-size-valid)

Функция [anchor-size()](#funcdef-anchor-size) является допустимой функцией размера якоря только в том случае, если верны все следующие условия:

* Она используется в свойстве [sizing property](https://www.w3.org/TR/css-sizing-3/#sizing-property) для [absolutely-positioned](https://www.w3.org/TR/css-position-3/#absolute-position) элемента.

* Для элемента, на котором она используется, существует [целевой элемент якоря](#target-anchor-element) и значение [&lt;anchor-element&gt;](#typedef-anchor-element), указанное в функции.


Если любое из этих условий ложно, функция [anchor-size()](#funcdef-anchor-size) разрешается в указанное в ней резервное значение. Если запасное значение не указано, она разрешается в 0px.

5\. Управление переполнением[](#fallback)
------------------------------------

Позиционирование якоря, хотя и является мощным, может быть непредсказуемым. Элемент [якорь](#anchor-element) может находиться в любом месте страницы, поэтому позиционирование элемента каким-либо определенным образом (например, над якорем или справа от него) может привести к тому, что позиционированный элемент переполнит свой [содержащий блок](https://www.w3.org/TR/css-display-3/#containing-block) или окажется частично за пределами экрана.

Чтобы исправить ситуацию, [абсолютно позиционированный](https://www.w3.org/TR/css-position-3/#absolute-position) элемент может использовать свойство [position-try-options](#propdef-position-try-options) для ссылки на несколько вариантов наборов свойств позиционирования/выравнивания (генерируемых из существующих стилей элемента или указанных в правилах [@position-try](#at-ruledef-position-try)), которые UA может попробовать, если элемент переполняет свою начальную позицию. Каждый из них применяется к элементу по очереди, и победителем считается тот, который не приводит к переполнению элемента [содержащего блока](https://www.w3.org/TR/css-display-3/#containing-block).

[position-try-order](#propdef-position-try-order) позволяет дополнительно сортировать эти опции по доступному пространству, которое они определяют, если для элемента важнее иметь как можно больше пространства, а не строго следовать какому-то объявленному порядку.

### 5.1. Предоставление запасных опций: свойство [position-try-options](#propdef-position-try-options)[](#position-try-options)

| | |
| --- | --- |
| Имя: | position-try-options |
| [Value:](https://www.w3.org/TR/css-values/#value-defs) | none [\|](https://www.w3.org/TR/css-values-4/#comb-one) \[ \[ [&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident) [\|](https://www.w3.org/TR/css-values-4/#comb-any) [&lt;try-tactic&gt;](#typedef-position-try-options-try-tactic)\] \| inset-area( [&lt;'inset-area'&gt;](#propdef-inset-area) ) \][#](https://www.w3.org/TR/css-values-4/#mult-comma)|
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | none |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | [абсолютно-позиционным](https://www.w3.org/TR/css-position-3/#absolute-position) элементам |
| [Inherited:](https://www.w3.org/TR/css-cascade/#inherited-property) | no |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | n/a |
| [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed) | как указано |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | согласно грамматике |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | дискретный |

Это свойство предоставляет список альтернативных стилей позиционирования, которые следует попробовать, когда [абсолютно позиционированный бокс](https://www.w3.org/TR/css-position-3/#absolute-position) выходит за пределы своего [вставного модифицированного содержащего блока](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block). Изначально этот список вариантов позиционирования пуст.

Каждая запись в списке, разделенная запятыми, представляет собой отдельный вариант: либо имя блока [@position-try](#at-ruledef-position-try), либо [&lt;try-tactic&gt;](#typedef-position-try-options-try-tactic), представляющий собой автоматическое преобразование существующего вычисленного стиля элемента.

Значения имеют следующие значения:

none

Свойство не имеет эффекта; список [опций позиции](#position-options-list) элемента пуст.

[&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)

Если существует правило [@position-try](#at-ruledef-position-try) с данным именем, то связанная с ним [опция позиции](#position-option) добавляется в список [опций позиции](#position-options-list).

В противном случае это значение не имеет никакого эффекта.

[&lt;try-tactic&gt;](#typedef-position-try-options-try-tactic)

Автоматически создает опцию [position option](#position-option) из вычисляемого стиля элемента, меняя местами значения свойств [margin](https://www.w3.org/TR/css-box-4/#margin-properties), [sizing](https://www.w3.org/TR/css-sizing-3/#sizing-property), [inset](https://drafts.csswg.org/css-logical-1/#inset-properties) и [self-alignment](https://www.w3.org/TR/css-align-3/#self-alignment-properties) между сторонами элемента, и добавляет ее в список [position options list](#position-options-list).

[&lt;try-tactic&gt;](#typedef-position-try-options-try-tactic) = flip-block [||](https://www.w3.org/TR/css-values-4/#comb-any) flip-inline [||](https://www.w3.org/TR/css-values-4/#comb-any) flip-start

flip-block

меняет местами значения в [оси блока](https://www.w3.org/TR/css-writing-modes-4/#block-axis) (например, между [margin-block-start](https://www.w3.org/TR/css-logical-1/#propdef-margin-block-start) и [margin-block-end](https://www.w3.org/TR/css-logical-1/#propdef-margin-block-end)), по сути, зеркально отображая строку [inline-axis](https://www.w3.org/TR/css-writing-modes-4/#inline-axis).

flip-inline

меняет местами значения по оси [inline axis](https://www.w3.org/TR/css-writing-modes-4/#inline-axis), по сути, зеркально отражая строку [block-axis](https://www.w3.org/TR/css-writing-modes-4/#block-axis).

flip-start

меняет местами значения свойств [start](https://www.w3.org/TR/css-writing-modes-4/#start) и [end](https://www.w3.org/TR/css-writing-modes-4/#end) (например, между [margin-block-start](https://www.w3.org/TR/css-logical-1/#propdef-margin-block-start) и [margin-inline-start](https://www.w3.org/TR/css-logical-1/#propdef-margin-inline-start)), по сути, зеркально отображая диагональ, проведенную из угла [start](https://www.w3.org/TR/css-writing-modes-4/#block-start)-[start](https://www.w3.org/TR/css-writing-modes-4/#inline-start) в угол [end](https://www.w3.org/TR/css-writing-modes-4/#block-end)-[end](https://www.w3.org/TR/css-writing-modes-4/#inline-end).

Если задано несколько ключевых слов, преобразования комбинируются, чтобы получить один [вариант позиции](#position-option).

[](#issue-3980b8c2)Определите, как изменяются сами значения при переворачивании: anchor(top) становится anchor(bottom); start становится end; и т. д.

[&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident) || [&lt;try-tactic&gt;](#typedef-position-try-options-try-tactic)

Комбинирует эффекты двух предыдущих опций: если существует правило [@position-try](#at-ruledef-position-try) с заданным именем, то применяет его [position option](#position-option) к базовому стилю элемента, преобразует его в соответствии с указанным [&lt;try-tactic&gt;](#typedef-position-try-options-try-tactic), а затем добавляет результат в список [position options list](#position-options-list) элемента.

В противном случае ничего не делает.

inset-area( [&lt;'inset-area'&gt;](#propdef-inset-area) )

Автоматически создает опцию [position option](#position-option), состоящую исключительно из свойства [inset-area](#propdef-inset-area) с заданным значением.

### 5.2. Определение порядка отката: свойство [position-try-order](#propdef-position-try-order)[](#position-try-order-property)

| | |
| --- | --- |
| Имя: | position-try-order |
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | normal [\|](https://www.w3.org/TR/css-values-4/#comb-one) [&lt;try-size&gt;](#typedef-try-size)|
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | normal | [\|](https://www.w3.org/TR/css-cascade/#initial-values)
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to)| [абсолютно позиционированным элементам](https://www.w3.org/TR/css-position-3/#absolute-position)|
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | нет |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | n/a |
| [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed) | как указано |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | согласно грамматике |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | дискретный |

Это свойство задает порядок, в котором будут опробованы [список опций позиции](#position-options-list).

[&lt;try-size&gt;](#typedef-try-size) = most-width [|](https://www.w3.org/TR/css-values-4/#comb-one) most-height [|](https://www.w3.org/TR/css-values-4/#comb-one) most-block-size [|](https://www.w3.org/TR/css-values-4/#comb-one) most-inline-size

нормальный

Попробуйте опции [position options](#position-option) в порядке, указанном в [position-try-options](#propdef-position-try-options).

наибольшая ширина

наибольшая высота

наибольший размер блока

most-inline-size

Для каждой записи в списке [position options list](#position-options-list), [примените опцию position option](#apply-a-position-option), используя эту опцию к элементу, и найдите указанный [inset-modified containing block](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block) размер, который получается в результате применения этих стилей. Стабильно отсортируйте список опций позиции в соответствии с этим размером, причем наибольший размер будет первым.

[](#example-a1ca8230)Например, следующие стили первоначально расположат всплывающий список под его якорной кнопкой, но если она переполнится, то решат, оставить ли всплывающий список под якорем или переместить его выше, в зависимости от того, какой вариант даст ему больше места.

.anchor { anchor-name: --foo; }
.list {
позиция: фиксированная;
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

Автогенерируемая опция [flip-block](#valdef-position-try-options-flip-block) и опция --top-scrollable всегда будут находить одну и ту же доступную высоту, поскольку обе они растягиваются по вертикали от [top: 0](https://www.w3.org/TR/css-position-3/#propdef-top) (верхний край области просмотра) до [bottom: anchor(top)](https://www.w3.org/TR/css-position-3/#propdef-bottom) (верхняя часть якоря), поэтому они сохраняют заданный порядок. В результате элемент сначала попытается выровняться относительно якоря на своей естественной высоте (используя [align-self: end](https://www.w3.org/TR/css-align-3/#propdef-align-self), автоматически измененный из базовых стилей), но если это также вызовет переполнение, он вернется к заполнению пространства и прокрутке.

### 5.3. Сокращение [position-try](#propdef-position-try)[](#position-try-prop)

| | |
| --- | --- |
| Имя: | position-try |
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | [&lt;'position-try-order'&gt;](#propdef-position-try-order)[?](https://www.w3.org/TR/css-values-4/#mult-opt) [&lt;'position-try-options'&gt;](#propdef-position-try-options)|
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | см. отдельные свойства |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | см. отдельные свойства |
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | см. отдельные свойства |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | см. отдельные свойства |
| [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed) | см. отдельные свойства |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | см. отдельные свойства |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | согласно грамматике |

Это сокращение задает как [position-try-options](#propdef-position-try-options), так и [position-try-order](#propdef-position-try-order). Если параметр &lt;'position-try-order'&gt; опущен, то он устанавливается в начальное значение свойства.

### 5.4. Правило [@position-try](#at-ruledef-position-try)[](#fallback-rule)

Правило @position-try определяет опцию позиции с заданным именем, указывая один или несколько наборов свойств позиционирования, которые будут применены к элементу через [position-try-options](#propdef-position-try-options),

Синтаксис правила [@position-try](#at-ruledef-position-try) следующий:

@position-try [&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident) {
[&lt;declaration-list&gt;](https://www.w3.org/TR/css-syntax-3/#typedef-declaration-list)
}

[&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident), указанный в прелюдии, является именем правила. Если объявлено несколько правил [@position-try](#at-ruledef-position-try) с одинаковым именем, то побеждает последнее в порядке следования документов.

Правило [@position-try](#at-ruledef-position-try) принимает только следующие [свойства](https://www.w3.org/TR/css-cascade-5/#css-property):

* [свойства вставки](https://drafts.csswg.org/css-logical-1/#inset-properties)

* [margin properties](https://www.w3.org/TR/css-box-4/#margin-properties)

* [sizing properties](https://www.w3.org/TR/css-sizing-3/#sizing-property)

* [свойства самовыравнивания](https://www.w3.org/TR/css-align-3/#self-alignment-properties)

* [position-anchor](#propdef-position-anchor)

* [inset-area](#propdef-inset-area)


Недопустимо использовать значение !important для свойств в списке [&lt;declaration-list&gt;](https://www.w3.org/TR/css-syntax-3/#typedef-declaration-list). Это приводит к тому, что свойство, для которого оно используется, становится недействительным, но не делает недействительным правило @property-try в целом.

Все свойства в [@position-try](#at-ruledef-position-try) применяются к элементу как часть Position Fallback Origin, нового [cascade origin](https://www.w3.org/TR/css-cascade-6/#origin), который находится между [Author Origin](https://www.w3.org/TR/css-cascade-5/#cascade-origin-author) и [Animation Origin](https://www.w3.org/TR/css-cascade-5/#cascade-origin-animation).

Как и в случае с [Animation Origin](https://www.w3.org/TR/css-cascade-5/#cascade-origin-animation), использование значений [revert](https://www.w3.org/TR/css-cascade-5/#valdef-all-revert) или [revert-layer](https://www.w3.org/TR/css-cascade-5/#valdef-all-revert-layer) (или любых других, которые откатят свойство к предыдущему началу) действует так, как если бы свойство было частью [Author Origin](https://www.w3.org/TR/css-cascade-5/#cascade-origin-author). (Таким образом, вместо этого происходит возврат к [User Origin](https://www.w3.org/TR/css-cascade-5/#cascade-origin-user)).

Примечание: [принятые @position-try свойства](#accepted-position-try-properties) - это самая маленькая группа свойств, которые влияют только на размер и положение самого поля, не изменяя область его содержимого. Это значительно упрощает реализацию возврата позиции, не слишком сокращая возможные варианты поведения. Ожидается, что будущее расширение [container queries](https://www.w3.org/TR/css-contain-3/#container-query) позволит запрашивать элемент на основе используемого им position fallback, что позволит обрабатывать многие случаи, не разрешенные этим ограниченным списком.

[](#issue-5b530169)Было бы полезно иметь возможность определять, когда ваш якорь(и) полностью находится за пределами экрана, и полностью подавлять его отображение. Например, всплывающие подсказки, находящиеся за пределами скроллера и удерживающие текст, к которому они привязаны, не хотят просто нависать над произвольными частями страницы, потому что их якорь имеет такую позицию относительно области прокрутки.

Примечание: Если несколько элементов, использующих разные якоря, хотят использовать одно и то же обратное позиционирование, только относительно своих якорей, опустите [&lt;anchor-element&gt;](#typedef-anchor-element) в [anchor()](#funcdef-anchor) и вместо этого укажите якорь каждого элемента в [position-anchor](#propdef-position-anchor).

Примечание: Наиболее распространенные типы обратного позиционирования (размещение позиционируемого элемента по одну сторону от якоря, но при необходимости переворачивание на противоположную сторону) могут быть выполнены автоматически с помощью ключевых слов в [position-try-options](#propdef-position-try-options), без использования [@position-try](#at-ruledef-position-try) вообще.

### 5.5. Применение отката позиции[](#fallback-apply)

Когда позиционированный элемент переполняет свой [inset-modified containing block](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block) и имеет непустой [position options list](#position-options-list), он [определяет стили отката позиции](#determine-the-position-fallback-styles) для элемента, чтобы попытаться найти вариант, позволяющий избежать переполнения.

Эти измененные стили применяются к элементу через [чередование](#style--layout-interleave), поэтому они влияют на [вычисляемые значения](https://www.w3.org/TR/css-cascade-5/#computed-value) (и могут вызывать переходы/etc), даже если они зависят от макета и [используемых значений](https://www.w3.org/TR/css-cascade-5/#used-value).

Чтобы применить опцию позиции к элементу el, заданному [опцией позиции](#position-option) новых стилей:

1.  С новыми стилями, вставленными в каскад в [position fallback origin](#position-fallback-origin), разрешите каскад и выполните достаточную верстку, чтобы определить [used styles](https://www.w3.org/TR/css-cascade-5/#used-value) элемента el.

2.  Верните [использованные стили](https://www.w3.org/TR/css-cascade-5/#used-value).


Чтобы определить стили возврата позиции для элемента el:

1.  Пусть базовые стили - это текущие используемые стили элемента el.

2.  [Для каждой](https://infra.spec.whatwg.org/#list-iterate) опции в списке [опций позиции](#position-options-list):

1.  Пусть скорректированные стили - это результат [применения опции позиции](#apply-a-position-option) к el.

2.  Пусть el rect - это размер и положение поля отступа el, когда оно размещено с помощью настроенных стилей. Пусть cb rect - это размер и положение [вставленного-модифицированного содержащего блока](https://www.w3.org/TR/css-position-3/#inset-modified-containing-block).

3.  Если у el есть смещение [snapshotted scroll offset](#snapshotted-scroll-offset), вычтите его из положения как el rect, так и cb rect.

4.  Если прямоугольник el не полностью содержится в прямоугольнике cb, [продолжите](https://infra.spec.whatwg.org/#iteration-continue).

5.  Установите опцию как последнюю удачную позицию el. Верните скорректированные стили.

3.  Утверждение: Предыдущий шаг завершился, не найдя [вариант позиции](#position-option), который позволяет избежать переполнения.

4.  Если у el есть [последний успешный вариант позиции](#last-successful-position-option), верните el результат [применения варианта позиции](#apply-a-position-option), использующий этот вариант.

5.  Верните базовые стили.


Примечание: Потомки, переполняющие el, не влияют на этот расчет, только собственный [margin box](https://www.w3.org/TR/css-box-4/#margin-box) el.

Во время полной верстки, когда элемент определил свои резервные стили (или определил, что не использует их), размещение последующих элементов не может изменить это решение.

[](#example-58b895a3)Например, у вас есть два позиционированных элемента, A и B, причем A размещен перед B. Если B переполняется и заставляет содержащий его блок A получить полосы прокрутки, это не заставит A вернуться и заново определить свои резервные стили в попытке избежать переполнения. (В лучшем случае это может привести к экспоненциальным затратам на верстку; в худшем - это циклично и никогда не разрешится).

Другими словами, верстка не "идет назад".

В момент определения и доставки событий `[ResizeObserver](https://www.w3.org/TR/resize-observer-1/#resizeobserver)`, если элемент el имеет [опцию последней удачной позиции](#last-successful-position-option) и если для него верно хотя бы одно из следующих условий, удалите его опцию последней удачной позиции:

* el не является [абсолютно позиционированным](https://www.w3.org/TR/css-position-3/#absolute-position) элементом

* вычисленное значение параметра [position-try-options](#propdef-position-try-options) для el изменилось

* Любое из правил [@position-try](#at-ruledef-position-try), на которые ссылается [position-try-options](#propdef-position-try-options) el, было добавлено, удалено или изменено.


Примечание: Время этого удаления намеренно совпадает с обработкой [последних запомненных размеров](https://www.w3.org/TR/css-sizing-4/#last-remembered).

[](#issue-21c2b50d)Убедитесь, что теперь смещение прокрутки в моментальном снимке корректно, учитывая чередование.

Реализации могут наложить определяемое реализацией ограничение на длину списков [опций позиции](#position-options-list), чтобы ограничить объем лишней работы по компоновке, которая может потребоваться. Это ограничение должно быть не менее пяти.

[](#example-e9cc9812)Например, следующий CSS сначала попытается расположить "popover" под [элементом](https://www.w3.org/TR/css-display-3/#elements), но если он не поместится на экране, то переключится на расположение выше; по умолчанию он выравнивается влево, но переключится на выравнивание вправо, если это не поместится.

#myPopover {
position: fixed;
top: anchor(--button bottom);
left: anchor(--button left);
position-try-options: flip-inline, flip-block, flip-block flip-inline;

/\* Ширина всплывающего окна должна быть не меньше ширины кнопки */
min-width: anchor-size(--button width);

/\* Высота всплывающего окна не меньше, чем 2 пункта меню */
min-height: 6em;
}

6\. DOM Интерфейсы[](#interfaces)
---------------------------------

### 6.1. Интерфейс CSSPositionTryRule[](#om-position-try)

Интерфейс `[CSSPositionTryRule](#csspositiontryrule)` представляет правило [@position-try](#at-ruledef-position-try):

\[[Exposed](https://webidl.spec.whatwg.org/#Exposed)=Window\]
интерфейс `CSSPositionTryRule` : [CSSRule](https://www.w3.org/TR/cssom-1/#cssrule) {
readonly атрибут [CSSOMString](https://www.w3.org/TR/cssom-1/#cssomstring) [name](#dom-csspositiontryrule-name);
\[[SameObject](https://webidl.spec.whatwg.org/#SameObject), [PutForwards](https://webidl.spec.whatwg.org/#PutForwards)=[cssText](https://www.w3.org/TR/cssom-1/#dom-cssstyledeclaration-csstext)\] readonly атрибут [CSSStyleDeclaration](https://www.w3.org/TR/cssom-1/#cssstyledeclaration) [style](#dom-csspositiontryrule-style);
};

Атрибут `name` представляет собой имя, объявленное в прелюдии правила.

Атрибут `style` представляет стили, объявленные в теле правила, в указанном порядке. В этом правиле действительны только [принятые свойства @position-try](#accepted-position-try-properties).

[](#issue-45287b7f)соотнесите понятие валидности с тем, что мы делаем в подобных ситуациях.

7\. Приложение: Чередование стилей и макетов[](#interleaving)
----------------------------------------------------------

Чередование стиля и макета - это техника, при которой обновление стиля может происходить в поддереве в процессе макетирования, что приводит к ретроактивному обновлению [вычисленных стилей] элементов (https://www.w3.org/TR/css-cascade-5/#computed-value).

[](#issue-56f04754)Это не правильная спецификация для этой концепции, она, вероятно, должна быть в [Cascade](https://www.w3.org/TR/css-cascade/), но мне нужен набросок, чтобы ссылаться на него.

Примечание: [Style & layout interleaving](#style--layout-interleave) уже используется с [container queries](https://www.w3.org/TR/css-contain-3/#container-query) и [container query lengths](https://drafts.csswg.org/css-contain-3/#container-query-length). Длина типа 10cqw преобразуется в [вычисленную длину](https://www.w3.org/TR/css-values-4/#computed-length) с использованием информации о размере контейнера запроса, что может вызвать [переходы](https://www.w3.org/TR/css-transitions-1/), когда контейнер меняет размер между макетами.

Свойства [accepted @position-try properties](#accepted-position-try-properties) также [interleaved](#style--layout-interleave) при разрешении fallback (см. [position-try](#propdef-position-try)).

[](#issue-584007ee)Очевидно, что это нуждается в более подробном описании, но пока достаточно "действовать так, как вы уже делаете для контейнерных запросов". Это поведение также не определено, но, по крайней мере, оно совместимо (в какой-то степени?).

8\. Соображения безопасности[](#sec)
-----------------------------------

Никаких проблем с безопасностью в этом документе поднято не было.

9\. Соображения конфиденциальности[](#priv)
-----------------------------------

В этом документе не поднимались вопросы конфиденциальности.
