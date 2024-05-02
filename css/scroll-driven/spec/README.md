1\. Введение[](#intro)
--------------------------

Эта спецификация определяет механизмы для управления прогрессом анимации на основе прогресса прокрутки контейнера прокрутки. Эти анимации, управляемые прокруткой

Информация о ссылке 'scroll-driven animations'.[#scroll-driven-animations](#scroll-driven-animations)**Ссылка в:**

* [1.1. Связь с другими спецификациями](#ref-for-scroll-driven-animations)
* [4\. Прикрепление анимации к временным шкалам с прокруткой](#ref-for-scroll-driven-animations①)
* [4.1. Расчеты конечных временных интервалов](#ref-for-scroll-driven-animations②)
* [4.3. События анимации](#ref-for-scroll-driven-animations③)

Информация о ссылке 'scroll-driven animations'.[#scroll-driven-animations](#scroll-driven-animations)**Ссылка в:**

* [1.1. Связь с другими спецификациями](#ref-for-scroll-driven-animations)
* [4\. Прикрепление анимации к временным шкалам с прокруткой](#ref-for-scroll-driven-animations①)
* [4.1. Расчеты конечных временных интервалов](#ref-for-scroll-driven-animations②)
* [4.3. События анимации](#ref-for-scroll-driven-animations③)

использовать временную шкалу, основанную на позиции прокрутки, а не на часовом времени. Этот модуль предоставляет как императивный API, основанный на Web Animations API, так и декларативный API, основанный на CSS Animations. [\[WEB-ANIMATIONS-1\]](#biblio-web-animations-1 "Web Animations")

Существует два типа временных шкал с прокруткой

Информация о ссылке 'scroll-driven timelines'.[#scroll-driven-timelines](#scroll-driven-timelines)**Ссылка в:**

* [1.1. Связь с другими спецификациями](#ref-for-scroll-driven-timelines)
* [4\. Прикрепление анимации к временным шкалам с прокруткой](#ref-for-scroll-driven-timelines①) [(2)](#ref-for-scroll-driven-timelines②)
* [4.1. Расчеты конечного времени](#ref-for-scroll-driven-timelines③)

Информация о ссылке 'scroll-driven timelines'.[#scroll-driven-timelines](#scroll-driven-timelines)**Ссылка в:**

* [1.1. Связь с другими спецификациями](#ref-for-scroll-driven-timelines)
* [4\. Прикрепление анимации к временным шкалам с прокруткой](#ref-for-scroll-driven-timelines①) [(2)](#ref-for-scroll-driven-timelines②)
* [4.1. Расчеты конечной временной шкалы](#ref-for-scroll-driven-timelines③)

:

* [Scroll Progress Timelines](#scroll-timelines), которые привязаны к прогрессу прокрутки конкретного [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container)

* [View Progress Timelines](#view-timelines), которые связаны с прогрессом просмотра конкретного [бокса](https://www.w3.org/TR/css-display-3/#box) через [scrollport](https://www.w3.org/TR/css-overflow-3/#scrollport)


Примечание: Анимации, управляемые прокруткой, прогресс которых связан с позицией прокрутки, отличаются от анимаций, управляемых прокруткой, которые запускаются позицией прокрутки, но прогресс которых определяется временем.

### 1.1. Связь с другими спецификациями[](#other-specs)

Web Animations [\[WEB-ANIMATIONS-1\]](#biblio-web-animations-1 "Web Animations") определяет абстрактную концептуальную модель для анимации на Web-платформе, элементы модели включают [анимации](https://www.w3.org/TR/web-animations-1/#concept-animation) и их [таймлайны](https://www.w3.org/TR/web-animations-1/#timeline), а также связанные с ними интерфейсы программирования. Эта спецификация расширяет модель Web Animations, определяя [управляемые прокруткой временные линии](#scroll-driven-timelines) и позволяя им управлять прогрессом в анимации для создания [управляемых прокруткой анимаций](#scroll-driven-animations).

Эта спецификация представляет как программные интерфейсы для взаимодействия с этими концепциями, так и свойства CSS, которые применяют эти концепции к CSS Animations [\[CSS-ANIMATIONS-1\]](#biblio-css-animations-1 "CSS Animations Level 1"). В той мере, в какой поведение этих свойств CSS описано в терминах интерфейсов программирования, [User Agents](https://infra.spec.whatwg.org/#user-agent), не поддерживающие сценарии, могут соответствовать этой спецификации, реализуя свойства CSS так, чтобы они вели себя так, как если бы основные интерфейсы программирования были на месте.

Как и большинство других операций в CSS, кроме [селектора](https://www.w3.org/TR/CSS21/syndata.html#x15), функции данной спецификации работают над [уплощенным деревом элементов](https://drafts.csswg.org/css-scoping-1/#flat-tree).

### 1.2. Связь с асинхронной прокруткой[](#async-scrolling)

Некоторые агенты пользователя поддерживают асинхронную прокрутку по отношению к макету или сценарию. Данная спецификация предназначена для совместимости с такой архитектурой.

В частности, эта спецификация позволяет выразить эффекты, управляемые прокруткой, таким образом, чтобы не требовалось запускать скрипт каждый раз, когда эффект сэмплируется. Пользовательским агентам, поддерживающим асинхронную прокрутку, разрешается (но не требуется) сэмплировать такие эффекты также асинхронно.

### 1.3. Определения значений[](#values)

Данная спецификация следует [соглашениям определения свойств CSS](https://www.w3.org/TR/CSS2/about.html#property-defs) из [\[CSS2\]](#biblio-css2 "Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification"), используя [синтаксис определения значений](https://www.w3.org/TR/css-values-3/#value-defs) из [\[CSS-VALUES-3\]](#biblio-css-values-3 "CSS Values and Units Module Level 3"). Типы значений, не определенные в данной спецификации, определены в CSS Values & Units \[CSS-VALUES-3\]. Сочетание с другими модулями CSS может расширить определения этих типов значений.

В дополнение к значениям свойств, перечисленным в их определениях, все свойства, определенные в данной спецификации, также принимают в качестве значения свойства [CSS-wide keywords](https://www.w3.org/TR/css-values-4/#css-wide-keywords). Для удобства чтения они не повторяются в явном виде.

2\. Scroll Progress Timelines[](#scroll-timelines)
--------------------------------------------------

Временные шкалы прокрутки

Информация о ссылке 'Scroll progress timelines'.[#scroll-progress-timelines](#scroll-progress-timelines)**Referenced in:**

* [2\. Scroll Progress Timelines](#ref-for-scroll-progress-timelines)
* [2.1. Вычисление прогресса для временной шкалы прокрутки](#ref-for-scroll-progress-timelines①) [(2)](#ref-for-scroll-progress-timelines②)
* [2.2.1. Нотация scroll()](#ref-for-scroll-progress-timelines③) [(2)](#ref-for-scroll-progress-timelines④)
* [2.2.2. Интерфейс ScrollTimeline](#ref-for-scroll-progress-timelines⑤) [(2)](#ref-for-scroll-progress-timelines⑥)
* [2.3. Именованные временные шкалы прогресса прокрутки](#ref-for-scroll-progress-timelines⑦)
* [3\. View Progress Timelines](#ref-for-scroll-progress-timelines⑧) [(2)](#ref-for-scroll-progress-timelines⑨)
* [4.2. Именованная временная шкала и поиск](#ref-for-scroll-progress-timelines①⓪) [(2)](#ref-for-scroll-progress-timelines①①) [(3)](#ref-for-scroll-progress-timelines①②)
* [5.1. Модель обработки HTML: цикл событий](#ref-for-scroll-progress-timelines①③) [(2)](#ref-for-scroll-progress-timelines①④) [(3)](#ref-for-scroll-progress-timelines①⑤)

Информация о ссылке 'Scroll progress timelines'.[#scroll-progress-timelines](#scroll-progress-timelines)**Ссылается в:**

* [2\. Scroll Progress Timelines](#ref-for-scroll-progress-timelines)
* [2.1. Вычисление прогресса для временной шкалы прокрутки](#ref-for-scroll-progress-timelines①) [(2)](#ref-for-scroll-progress-timelines②)
* [2.2.1. Нотация scroll()](#ref-for-scroll-progress-timelines③) [(2)](#ref-for-scroll-progress-timelines④)
* [2.2.2. Интерфейс ScrollTimeline](#ref-for-scroll-progress-timelines⑤) [(2)](#ref-for-scroll-progress-timelines⑥)
* [2.3. Именованные временные шкалы прогресса прокрутки](#ref-for-scroll-progress-timelines⑦)
* [3\. View Progress Timelines](#ref-for-scroll-progress-timelines⑧) [(2)](#ref-for-scroll-progress-timelines⑨)
* [4.2. Именованная временная шкала и поиск](#ref-for-scroll-progress-timelines①⓪) [(2)](#ref-for-scroll-progress-timelines①①) [(3)](#ref-for-scroll-progress-timelines①②)
* [5.1. Модель обработки HTML: цикл событий](#ref-for-scroll-progress-timelines①③) [(2)](#ref-for-scroll-progress-timelines①④) [(3)](#ref-for-scroll-progress-timelines①⑤)

это временные шкалы, связанные с прогрессом в положении прокрутки [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container) вдоль определенной оси. Самая начальная позиция прокрутки представляет 0 % прогресса, а самая конечная - 100 %.

На [Scroll progress timelines](#scroll-progress-timelines) можно ссылаться в [animation-timeline](https://www.w3.org/TR/css-animations-2/#propdef-animation-timeline) анонимно, используя [scroll()](#funcdef-scroll) [функциональную нотацию](https://www.w3.org/TR/css-values-4/#functional-notation) или по имени (см. [§ 4.2 Named Timeline Scoping and Lookup](#timeline-scoping)) после объявления их с помощью свойств [scroll-timeline](#propdef-scroll-timeline). В Web Animations API они могут быть представлены анонимно объектом `[ScrollTimeline](#scrolltimeline)`.

### 2.1. Вычисление прогресса для временной шкалы прокрутки[](#scroll-timeline-progress)

Прогресс ([текущее время](https://www.w3.org/TR/web-animations-1/#timeline-current-time)) для [временной шкалы прогресса прокрутки](#scroll-progress-timelines) вычисляется как: [смещение прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-offset) ÷ ([прокручиваемый перелив](https://www.w3.org/TR/css-overflow-3/#scrollable-overflow) размер - [контейнер прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container) размер)

Если позиция 0% и позиция 100% совпадают (т.е. знаменатель в формуле [current time](https://www.w3.org/TR/web-animations-1/#timeline-current-time) равен нулю), то временная шкала является [неактивной](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

В [paged media](https://www.w3.org/TR/mediaqueries-5/#paged-media), [scroll progress timelines](#scroll-progress-timelines), которые в противном случае ссылались бы на область просмотра документа, также [неактивны](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

### 2.2. Анонимные временные шкалы прокрутки[](#scroll-timelines-anonymous)

#### 2.2.1. Нотация [scroll()](#funcdef-scroll)[](#scroll-notation)

Прокрутка()

Информация о ссылке 'scroll()'.[#funcdef-scroll](#funcdef-scroll)**Ссылка в:**

* [2\. Scroll Progress Timelines](#ref-for-funcdef-scroll)
* [2.2.1. Нотация scroll()](#ref-for-funcdef-scroll①) [(2)](#ref-for-funcdef-scroll②) [(3)](#ref-for-funcdef-scroll③) [(4)](#ref-for-funcdef-scroll④) [(5)](#ref-for-funcdef-scroll⑤)
* [2.3.2. Ось временной шкалы прокрутки: свойство scroll-timeline-axis](#ref-for-funcdef-scroll⑥)
* [3.3.1. Нотация view()](#ref-for-funcdef-scroll⑦)

Информация о ссылке 'scroll()'.[#funcdef-scroll](#funcdef-scroll)**Ссылка в:**

* [2\. Scroll Progress Timelines](#ref-for-funcdef-scroll)
* [2.2.1. Нотация scroll()](#ref-for-funcdef-scroll①) [(2)](#ref-for-funcdef-scroll②) [(3)](#ref-for-funcdef-scroll③) [(4)](#ref-for-funcdef-scroll④) [(5)](#ref-for-funcdef-scroll⑤)
* [2.3.2. Ось временной шкалы прокрутки: свойство scroll-timeline-axis](#ref-for-funcdef-scroll⑥)
* [3.3.1. Нотация view()](#ref-for-funcdef-scroll⑦)

Функциональная нотация может использоваться в качестве значения [&lt;single-animation-timeline&gt;](https://www.w3.org/TR/css-animations-2/#typedef-single-animation-timeline "Expands to: auto | none") в [animation-timeline](https://www.w3.org/TR/css-animations-2/#propdef-animation-timeline) и задает [scroll progress timeline](#scroll-progress-timelines). Его синтаксис следующий.

[&lt;scroll()&gt;](#funcdef-scroll) = scroll( \[ [&lt;scroller&gt;](#typedef-scroller) [||](https://www.w3.org/TR/css-values-4/#comb-any) [&lt;axis&gt;](#typedef-axis) \][?](https://www.w3.org/TR/css-values-4/#mult-opt) )
[&lt;axis&gt;](#typedef-axis)Информация о ссылке '&lt;axis&gt;'.[#typedef-axis](#typedef-axis)**Ссылка в:**

* [2.2.1. Нотация scroll()](#ref-for-typedef-axis) [(2)](#ref-for-typedef-axis①)
* [2.2.2. Интерфейс ScrollTimeline](#ref-for-typedef-axis②)
* [3.3.1. Нотация view()](#ref-for-typedef-axis③) [(2)](#ref-for-typedef-axis④)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-typedef-axis⑤)

Информация о ссылке '&lt;axis&gt;'.[#typedef-axis](#typedef-axis)**Ссылается в:**.

* [2.2.1. Нотация scroll()](#ref-for-typedef-axis) [(2)](#ref-for-typedef-axis①)
* [2.2.2. Интерфейс ScrollTimeline](#ref-for-typedef-axis②)
* [3.3.1. Нотация view()](#ref-for-typedef-axis③) [(2)](#ref-for-typedef-axis④)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-typedef-axis⑤)

= block [|](https://www.w3.org/TR/css-values-4/#comb-one) inline [|](https://www.w3.org/TR/css-values-4/#comb-one) x [|](https://www.w3.org/TR/css-values-4/#comb-one) y
[&lt;scroller&gt;](#typedef-scroller)Информация о ссылке '&lt;scroller&gt;'.[#typedef-scroller](#typedef-scroller)**Ссылка в:**.

* [2.2.1. Нотация scroll()](#ref-for-typedef-scroller) [(2)](#ref-for-typedef-scroller①)

Информация о ссылке '&lt;scroller&gt;'.[#typedef-scroller](#typedef-scroller)**Ссылается в:**

* [2.2.1. Нотация scroll()](#ref-for-typedef-scroller) [(2)](#ref-for-typedef-scroller①)

= root [|](https://www.w3.org/TR/css-values-4/#comb-one) nearest [|](https://www.w3.org/TR/css-values-4/#comb-one) self

По умолчанию [scroll()](#funcdef-scroll) ссылается на [block axis](https://www.w3.org/TR/css-writing-modes-4/#block-axis) ближайшего предка [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container). Его аргументы изменяют этот поиск следующим образом:

block[](#valdef-scroll-block)

Указывает использовать меру прогресса вдоль оси [блока](https://www.w3.org/TR/css-writing-modes-4/#block-axis) контейнера [прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container). (По умолчанию.)

inline[](#valdef-scroll-inline)

Указывает использовать меру прогресса вдоль [оси inline](https://www.w3.org/TR/css-writing-modes-4/#inline-axis) [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container).

x

Информация о ссылке 'x'.[#valdef-scroll-x](#valdef-scroll-x)**Ссылка в:**.

* [2.2.1. Нотация scroll()](#ref-for-valdef-scroll-x)

Информация о ссылке 'x'.[#valdef-scroll-x](#valdef-scroll-x)**Ссылки в:**

* [2.2.1. Нотация scroll()](#ref-for-valdef-scroll-x)

Указывает использовать меру прогресса вдоль [горизонтальной оси](https://www.w3.org/TR/css-writing-modes-4/#x-axis) [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container).

y

Информация о ссылке 'y'.[#valdef-scroll-y](#valdef-scroll-y)**Содержит ссылки в:**.

* [2.2.1. Нотация scroll()](#ref-for-valdef-scroll-y)

Информация о ссылке 'y'.[#valdef-scroll-y](#valdef-scroll-y)**Ссылка в:**

* [2.2.1. Нотация scroll()](#ref-for-valdef-scroll-y)

Указывает использовать меру прогресса вдоль [вертикальной оси](https://www.w3.org/TR/css-writing-modes-4/#y-axis) [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container).

nearest[](#valdef-scroll-nearest)

Указывает использовать ближайшего предка [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container). (По умолчанию.)

root[](#valdef-scroll-root)

Указывает использовать область просмотра документа в качестве [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container).

self[](#valdef-scroll-self)

Указывает на использование собственного [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента в качестве [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container). Если основной бокс не является контейнером прокрутки, то временная шкала [прогресса прокрутки](#scroll-progress-timelines) будет [неактивной](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

Примечание: прогресс указывается относительно [начала прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-origin), которое может меняться в зависимости от [режима записи](https://www.w3.org/TR/css-writing-modes-4/#writing-mode), даже если указаны [x](#valdef-scroll-x) или [y](#valdef-scroll-y).

Ссылки на [корневой элемент](https://www.w3.org/TR/css-display-3/#root-element) распространяются на область просмотра документа (которая функционирует как его [контейнер прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container)).

Каждое использование [scroll()](#funcdef-scroll) соответствует собственному экземпляру `[ScrollTimeline](#scrolltimeline)` в Web Animations API, даже если несколько элементов используют scroll() для ссылки на один и тот же [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container) с одинаковыми аргументами.

#### 2.2.2. Интерфейс `[ScrollTimeline](#scrolltimeline)` Interface[](#scrolltimeline-interface)

enum `ScrollAxis` Информация о ссылке 'ScrollAxis'.[#enumdef-scrollaxis](#enumdef-scrollaxis)**Ссылка в:**.

* [2.2.2. Интерфейс ScrollTimeline](#ref-for-enumdef-scrollaxis) [(2)](#ref-for-enumdef-scrollaxis①) [(3)](#ref-for-enumdef-scrollaxis②)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-enumdef-scrollaxis③)

Информация о ссылке 'ScrollAxis'.[#enumdef-scrollaxis](#enumdef-scrollaxis)**Ссылки в:**

* [2.2.2. Интерфейс ScrollTimeline](#ref-for-enumdef-scrollaxis) [(2)](#ref-for-enumdef-scrollaxis①) [(3)](#ref-for-enumdef-scrollaxis②)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-enumdef-scrollaxis③)

{
``блок``[](#dom-scrollaxis-block),
`"inline"`[](#dom-scrollaxis-inline),
`"x"`[](#dom-scrollaxis-x),
`"y"`[](#dom-scrollaxis-y)
};

словарь `ScrollTimelineOptions` Информация о ссылке 'ScrollTimelineOptions'.[#dictdef-scrolltimelineoptions](#dictdef-scrolltimelineoptions)**Ссылка в:**.

* [2.2.2. Интерфейс ScrollTimeline](#ref-for-dictdef-scrolltimelineoptions)

Информация о ссылке 'ScrollTimelineOptions'.[#dictdef-scrolltimelineoptions](#dictdef-scrolltimelineoptions)**Ссылки в:**

* [2.2.2. Интерфейс ScrollTimeline](#ref-for-dictdef-scrolltimelineoptions)

{
[Element](https://dom.spec.whatwg.org/#element)? `source`[](#dom-scrolltimelineoptions-source);
[ScrollAxis](#enumdef-scrollaxis) `axis`[](#dom-scrolltimelineoptions-axis) = "block";
};

\[[Exposed](https://webidl.spec.whatwg.org/#Exposed)=Window\]
интерфейс `ScrollTimeline` Информация о ссылке 'ScrollTimeline'.[#scrolltimeline](#scrolltimeline)**Referenced in:**

* [2\. Scroll Progress Timelines](#ref-for-scrolltimeline)
* [2.2.1. Нотация scroll()](#ref-for-scrolltimeline①)
* [2.2.2. Интерфейс ScrollTimeline](#ref-for-scrolltimeline②) [(2)](#ref-for-scrolltimeline③) [(3)](#ref-for-scrolltimeline④) [(4)](#ref- for-scrolltimeline⑤) [(5)](#ref-for-scrolltimeline⑥) [(6)](#ref-for-scrolltimeline⑦) [(7)](#ref-for-scrolltimeline⑧)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-scrolltimeline⑨) [(2)](#ref-for-scrolltimeline①⓪) [(3)](#ref-for-scrolltimeline①①)

Информация о ссылке 'ScrollTimeline'.[#scrolltimeline](#scrolltimeline)**Ссылка в:**

* [2\. Scroll Progress Timelines](#ref-for-scrolltimeline)
* [2.2.1. Нотация scroll()](#ref-for-scrolltimeline①)
* [2.2.2. Интерфейс ScrollTimeline](#ref-for-scrolltimeline②) [(2)](#ref-for-scrolltimeline③) [(3)](#ref-for-scrolltimeline④) [(4)](#ref- for-scrolltimeline⑤) [(5)](#ref-for-scrolltimeline⑥) [(6)](#ref-for-scrolltimeline⑦) [(7)](#ref-for-scrolltimeline⑧)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-scrolltimeline⑨) [(2)](#ref-for-scrolltimeline①⓪) [(3)](#ref-for-scrolltimeline①①)

  : [AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline) {
  [constructor](#dom-scrolltimeline-scrolltimeline)(optional [ScrollTimelineOptions](#dictdef-scrolltimelineoptions) `options`[](#dom-scrolltimeline-scrolltimeline-options-options) = {});
  readonly атрибут [Element](https://dom.spec.whatwg.org/#element)? [source](#dom-scrolltimeline-source);
  readonly атрибут [ScrollAxis](#enumdef-scrollaxis) [axis](#dom-scrolltimeline-axis);
  };

Атрибут `[ScrollTimeline](#scrolltimeline)` - это `[AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline)`, который представляет собой временную шкалу [прогресса прокрутки](#scroll-progress-timelines). Его можно передать в конструктор `[Animation](https://www.w3.org/TR/web-animations-1/#animation)` или в метод `[animate()](https://www.w3.org/TR/web-animations-1/#dom-animatable-animate)`, чтобы связать анимацию с временной шкалой прокрутки.

`source`

Информация о ссылке 'source'.[#dom-scrolltimeline-source](#dom-scrolltimeline-source)**Ссылка в:**.

* [2.2.2. Интерфейс ScrollTimeline](#ref-for-dom-scrolltimeline-source) [(2)](#ref-for-dom-scrolltimeline-source①) [(3)](#ref-for-dom-scrolltimeline-source②) [(4)](#ref-for-dom-scrolltimeline-source③)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-dom-scrolltimeline-source④) [(2)](#ref-for-dom-scrolltimeline-source⑤) [(3)](#ref-for-dom-scrolltimeline-source⑥) [(4)](#ref-for-dom-scrolltimeline-source⑦)

Информация о ссылке на 'источник'.[#dom-scrolltimeline-source](#dom-scrolltimeline-source)**Ссылка в:**

* [2.2.2. Интерфейс ScrollTimeline](#ref-for-dom-scrolltimeline-source) [(2)](#ref-for-dom-scrolltimeline-source①) [(3)](#ref-for-dom-scrolltimeline-source②) [(4)](#ref-for-dom-scrolltimeline-source③)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-dom-scrolltimeline-source④) [(2)](#ref-for-dom-scrolltimeline-source⑤) [(3)](#ref-for-dom-scrolltimeline-source⑥) [(4)](#ref-for-dom-scrolltimeline-source⑦)

, типа [Element](https://dom.spec.whatwg.org/#element), readonly, nullable

Элемент [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container), чья позиция прокрутки управляет прогрессом временной шкалы.

`axis`

Информация о ссылке 'axis'.[#dom-scrolltimeline-axis](#dom-scrolltimeline-axis)**Ссылка на:**.

* [2.2.2. Интерфейс ScrollTimeline](#ref-for-dom-scrolltimeline-axis) [(2)](#ref-for-dom-scrolltimeline-axis①)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-dom-scrolltimeline-axis②) [(2)](#ref-for-dom-scrolltimeline-axis③)

Информация о ссылке 'axis'.[#dom-scrolltimeline-axis](#dom-scrolltimeline-axis)**Ссылка на:**.

* [2.2.2. Интерфейс ScrollTimeline](#ref-for-dom-scrolltimeline-axis) [(2)](#ref-for-dom-scrolltimeline-axis①)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-dom-scrolltimeline-axis②) [(2)](#ref-for-dom-scrolltimeline-axis③)

, типа [ScrollAxis](#enumdef-scrollaxis), readonly

Ось прокрутки, по которой движется временная шкала. См. определения значений для [&lt;axis&gt;](#typedef-axis), выше.

Наследуемые атрибуты:

`[currentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)` (наследуется от `[AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline)`)

Представляет прогресс прокрутки [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container) в процентах CSSUnitValue, при этом 0% представляет собой начальную позицию прокрутки (в [режиме записи](https://www.w3.org/TR/css-writing-modes-4/#writing-mode) контейнера прокрутки). Null, если временная шкала [неактивна](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

[](#issue-73faeaf7)Хотя 0% обычно представляет начальную позицию прокрутки [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container), это может быть не так в зависимости от его [распределения содержимого](https://www.w3.org/TR/css-align-3/#content-distribute). См. [CSS Box Alignment 3 § 5.3 Overflow and Scroll Positions](https://www.w3.org/TR/css-align-3/#overflow-scroll-position). Это то, что мы хотим?

[](#issue-00572649)Добавьте примечание о том, может ли `[currentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)` быть отрицательным или > 100%.

`ScrollTimeline(options)`.

Информация о ссылке 'ScrollTimeline(options)'.[#dom-scrolltimeline-scrolltimeline](#dom-scrolltimeline-scrolltimeline)**Ссылка в:**.

* [2.2.2. Интерфейс ScrollTimeline](#ref-for-dom-scrolltimeline-scrolltimeline)

Информация о ссылке 'ScrollTimeline(options)'.[#dom-scrolltimeline-scrolltimeline](#dom-scrolltimeline-scrolltimeline)**Ссылка в:**

* [2.2.2. Интерфейс ScrollTimeline](#ref-for-dom-scrolltimeline-scrolltimeline)

Создает новый объект `[ScrollTimeline](#scrolltimeline)`, используя следующую процедуру:

1.  Пусть timeline будет новым объектом `[ScrollTimeline](#scrolltimeline)`.

2.  Установите для timeline значение `[source](#dom-scrolltimeline-source)`:

    Если член `source` в опциях присутствует и не является null,

    Член `source` опций.

    Иначе,

    `[scrollingElement](https://www.w3.org/TR/cssom-view-1/#dom-document-scrollingelement)` из `[Document](https://dom.spec.whatwg.org/#document)` [связанного](https://html.spec.whatwg.org/multipage/window-object.html#concept-document-window) с `[Window](https://html.spec.whatwg.org/multipage/nav-history-apis.html#window)`, который является [текущим глобальным объектом](https://html.spec.whatwg.org/multipage/webappapis.html#current-global-object).

3.  Установите свойство `[axis](#dom-scrolltimeline-axis)` временной шкалы на соответствующее значение из опций.


Если `[источник](#dom-scrolltimeline-source)` элемента `[ScrollTimeline](#scrolltimeline)` является элементом, чье [основное поле](https://www.w3.org/TR/css-display-3/#principal-box) не существует или не является [контейнером прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container), или если нет [прокручиваемого переполнения](https://www.w3.org/TR/css-overflow-3/#scrollable-overflow), то `[ScrollTimeline](#scrolltimeline)` является [неактивным](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

Длительность `[ScrollTimeline](#scrolltimeline)` равна 100%.

Значения `[source](#dom-scrolltimeline-source)` и `[currentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)` вычисляются при запросе или обновлении одного из них.

### 2.3. Именованные временные шкалы прогресса прокрутки[](#scroll-timelines-named)

[Временные шкалы прогресса прокрутки](#scroll-progress-timelines) также могут быть определены в самом [контейнере прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container), а затем ссылаться по имени на элементы в области видимости имени (см. [§ 4.2 Named Timeline Scoping and Lookup](#timeline-scoping)).

Такие именованные временные шкалы прокрутки

Информация о ссылке 'named scroll progress timelines'.[#named-scroll-progress-timelines](#named-scroll-progress-timelines)**Ссылка в:**

* [2.3.1. Именование временной шкалы прогресса прокрутки: свойство scroll-timeline-name](#ref-for-named-scroll-progress-timelines)
* [2.3.2. Ось временной шкалы прогресса прокрутки: свойство scroll-timeline-axis](#ref-for-named-scroll-progress-timelines①) [(2)](#ref-for-named-scroll-progress-timelines②)
* [Объявление области действия именованной временной шкалы: свойство timeline-scope](#ref-for-named-scroll-progress-timelines③)

Информация о ссылке 'named scroll progress timelines'.[#named-scroll-progress-timelines](#named-scroll-progress-timelines)**Ссылка в:**

* [2.3.1. Именование временной шкалы прогресса прокрутки: свойство scroll-timeline-name](#ref-for-named-scroll-progress-timelines)
* [2.3.2. Ось временной шкалы прогресса прокрутки: свойство scroll-timeline-axis](#ref-for-named-scroll-progress-timelines①) [(2)](#ref-for-named-scroll-progress-timelines②)
* [Объявление области действия именованной временной шкалы: свойство timeline-scope](#ref-for-named-scroll-progress-timelines③)

объявлены в [согласованном списке значений](https://www.w3.org/TR/css-values-4/#coordinated-value-list), построенном из [длинных слов](https://www.w3.org/TR/css-cascade-5/#longhand) [сокращенного свойства](https://www.w3.org/TR/css-cascade-5/#shorthand-property) [scroll-timeline](#propdef-scroll-timeline), которые образуют [группу свойств согласованного списка](https://www.w3.org/TR/css-values-4/#coordinating-list-property) с [scroll-timeline-name](#propdef-scroll-timeline-name) в качестве [базового свойства согласованного списка](https://www.w3.org/TR/css-values-4/#coordinating-list-base-property). См. [CSS Values 4 § A Coordinating List-Valued Properties](https://www.w3.org/TR/css-values-4/#linked-properties).

#### 2.3.1. Именование временной шкалы прокрутки: свойство [scroll-timeline-name](#propdef-scroll-timeline-name)[](#scroll-timeline-name)

| | |
| --- | --- |
| Имя: | scroll-timeline-name<br><br>Информация о ссылке 'scroll-timeline-name'.[#propdef-scroll-timeline-name](#propdef-scroll-timeline-name)**Ссылается в:**<br><br>* [2.3. Именованные временные шкалы прокрутки](#ref-for-propdef-scroll-timeline-name)<br>* [2.3.1. Именование временной шкалы прокрутки: свойство scroll-timeline-name](#ref-for-propdef-scroll-timeline-name①)<br>* [2. 3.3. Сокращение временной шкалы прокрутки: сокращение scroll-timeline](#ref-for-propdef-scroll-timeline-name②) [(2)](#ref-for-propdef-scroll-timeline-name③)<br>* [4.2. Именованная временная шкала и поиск](#ref-for-propdef-scroll-timeline-name④)<br><br>Информация о ссылке 'scroll-timeline-name'. [#propdef-scroll-timeline-name](#propdef-scroll-timeline-name)**Ссылка в:**<br><br>* [2.3. Именованные временные шкалы прокрутки](#ref-for-propdef-scroll-timeline-name)<br>* [2.3.1. Именование временной шкалы прокрутки: свойство scroll-timeline-name](#ref-for-propdef-scroll-timeline-name①)<br>* [2. 3.3. Сокращение временной шкалы прокрутки: сокращение scroll-timeline](#ref-for-propdef-scroll-timeline-name②) [(2)](#ref-for-propdef-scroll-timeline-name③)<br>* [4.2. Именованная временная шкала и поиск](#ref-for-propdef-scroll-timeline-name④)|
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | none [\|](https://www.w3.org/TR/css-values-4/#comb-one) [&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)[#](https://www.w3.org/TR/css-values-4/#mult-comma) |
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | none |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | [все элементы](https://www.w3.org/TR/css-pseudo/#generated-content "Включает ::before и ::after псевдоэлементы.") |
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | нет |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | n/a |
| | [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed) | ключевое слово none или список [CSS-идентификаторов](https://www.w3.org/TR/css-values-4/#css-css-identifier) |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | по грамматике |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | не анимируемый |

Определяет имена для [именованных временных шкал прокрутки](#named-scroll-progress-timelines), связанных с этим элементом.

#### 2.3.2. Ось временной шкалы прокрутки: свойство [scroll-timeline-axis](#propdef-scroll-timeline-axis)[](#scroll-timeline-axis)

| | |
| --- | --- |
| Имя: | scroll-timeline-axis<br><br>Информация о ссылке 'scroll-timeline-axis'.[#propdef-scroll-timeline-axis](#propdef-scroll-timeline-axis)**Содержит ссылки в:**<br><br>* [2.3.2. Ось временной шкалы прокрутки: свойство scroll-timeline-axis](#ref-for-propdef-scroll-timeline-axis)<br>* [2.3.3. Сокращение временной шкалы прокрутки: сокращение scroll-timeline](#ref-for-propdef-scroll-timeline-axis①) [(2)](#ref-for-propdef-scroll-timeline-axis②)<br><br>Информация о ссылке 'scroll-timeline-axis'. [#propdef-scroll-timeline-axis](#propdef-scroll-timeline-axis)**Ссылка в:**<br><br>* [2.3.2. Ось временной шкалы прокрутки: свойство scroll-timeline-axis](#ref-for-propdef-scroll-timeline-axis)<br>* [2.3.3. Сокращение временной шкалы прокрутки: сокращение scroll-timeline](#ref-for-propdef-scroll-timeline-axis①) [(2)](#ref-for-propdef-scroll-timeline-axis②)|
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | \[ блок [\|](https://www.w3.org/TR/css-values-4/#comb-one) inline \| x \| y \][#](https://www.w3.org/TR/css-values-4/#mult-comma) |
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | block |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | [все элементы](https://www.w3.org/TR/css-pseudo/#generated-content "Включает ::before и ::after псевдоэлементы.") |
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | нет |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | n/a |
| | [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed)| список указанных ключевых слов |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | по грамматике |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | не анимируется |

Указывает ось любой [именованной временной шкалы прокрутки](#named-scroll-progress-timelines), исходящей из этого [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container). Если этот бокс не является контейнером прокрутки, то соответствующая именованная временная шкала прокрутки будет [неактивной](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

Значения соответствуют определению для [scroll()](#funcdef-scroll).

#### 2.3.3. Сокращение временной шкалы прокрутки: сокращение [scroll-timeline](#propdef-scroll-timeline)[](#scroll-timeline-shorthand)

| | |
| --- | --- |
| Имя: | scroll-timeline<br><br>Информация о ссылке 'scroll-timeline'.[#propdef-scroll-timeline](#propdef-scroll-timeline)**Ссылка в:**<br><br>* [2\. Scroll Progress Timelines](#ref-for-propdef-scroll-timeline)<br>* [2.3. Named Scroll Progress Timelines](#ref-for-propdef-scroll-timeline①)<br>* [2. 3.3. Сокращение временной шкалы прокрутки: сокращение scroll-timeline](#ref-for-propdef-scroll-timeline②)<br>* [4\. Прикрепление анимации к временной шкале, управляемой прокруткой](#ref-for-propdef-scroll-timeline③)<br><br>Информация о ссылке 'scroll-timeline'. [#propdef-scroll-timeline](#propdef-scroll-timeline)**Ссылается в:**<br><br>* [2\. Scroll Progress Timelines](#ref-for-propdef-scroll-timeline)<br>* [2.3. Named Scroll Progress Timelines](#ref-for-propdef-scroll-timeline①)<br>* [2. 3.3. Сокращение временной шкалы прокрутки: сокращение scroll-timeline](#ref-for-propdef-scroll-timeline②)<br>* [4\. Прикрепление анимации к временной шкале, управляемой прокруткой](#ref-for-propdef-scroll-timeline③)|
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | \[ [&lt;'scroll-timeline-name'&gt;](#propdef-scroll-timeline-name) [&lt;'scroll-timeline-axis'&gt;](#propdef-scroll-timeline-axis)[?](https://www.w3.org/TR/css-values-4/#mult-opt)\][#](https://www.w3.org/TR/css-values-4/#mult-comma)|
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | см. отдельные свойства |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | [всем элементам](https://www.w3.org/TR/css-pseudo/#generated-content "Включает ::before и ::after псевдоэлементы.") |
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | нет |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | см. отдельные свойства |
| [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed) | см. отдельные свойства |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | не анимируется |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | согласно грамматике |

Это свойство является [сокращением](https://www.w3.org/TR/css-cascade-5/#shorthand-property) для установки [scroll-timeline-name](#propdef-scroll-timeline-name) и [scroll-timeline-axis](#propdef-scroll-timeline-axis) в одном объявлении.

3\. Просмотр временных шкал прогресса[](#view-timelines)
----------------------------------------------

Часто требуется, чтобы анимация начиналась и заканчивалась во время той части [временной шкалы прокрутки](#scroll-progress-timelines), в которой находится определенный бокс (субъект прогресса просмотра).

Информация о ссылке 'view progress subject'.[#view-progress-subject](#view-progress-subject)**Ссылается в:**

* [3\. View Progress Timelines](#ref-for-view-progress-subject)

Информация о ссылке 'view progress subject'.[#view-progress-subject](#view-progress-subject)**Ссылка на:**

* [3\. View Progress Timelines](#ref-for-view-progress-subject)

) находится в поле зрения в пределах [scrollport](https://www.w3.org/TR/css-overflow-3/#scrollport). Просмотр временных рамок прогресса

Информация о ссылке 'View progress timelines'.[#view-progress-timelines](#view-progress-timelines)**Referenced in:**

* [3\. View Progress Timelines](#ref-for-view-progress-timelines)
* [3.1. View Progress Timeline Ranges](#ref-for-view-progress-timelines①) [(2)](#ref-for-view-progress-timelines②)
* [3.2. Вычисление прогресса для временной шкалы прогресса просмотра](#ref-for-view-progress-timelines③) [(2)](#ref-for-view-progress-timelines④)
* [3.3.1. Нотация view()](#ref-for-view-progress-timelines⑤)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-view-progress-timelines⑥) [(2)](#ref-for-view-progress-timelines⑦) [(3)](#ref-for-view-progress-timelines⑧) [(4)](#ref-for-view-progress-timelines⑨) [(5)](#ref-for-view-progress-timelines①⓪)
* [3.4. Именованные сроки выполнения вида](#ref-for-view-progress-timelines①①)
* [3.4.3. Вставка временной шкалы прогресса представления: свойство view-timeline-inset](#ref-for-view-progress-timelines①②)
* [4.2. Именованные временные шкалы и поиск](#ref-for-view-progress-timelines①③) [(2)](#ref-for-view-progress-timelines①④)
* [5.1. Модель обработки HTML: цикл событий](#ref-for-view-progress-timelines①⑤) [(2)](#ref-for-view-progress-timelines①⑥)
* [Именованные диапазоны временной шкалы](#ref-for-view-progress-timelines①⑦)

Информация о ссылке 'View progress timelines'.[#view-progress-timelines](#view-progress-timelines)**Ссылка в:**

* [3\. View Progress Timelines](#ref-for-view-progress-timelines)
* [3.1. View Progress Timeline Ranges](#ref-for-view-progress-timelines①) [(2)](#ref-for-view-progress-timelines②)
* [3.2. Вычисление прогресса для временной шкалы прогресса просмотра](#ref-for-view-progress-timelines③) [(2)](#ref-for-view-progress-timelines④)
* [3.3.1. Нотация view()](#ref-for-view-progress-timelines⑤)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-view-progress-timelines⑥) [(2)](#ref-for-view-progress-timelines⑦) [(3)](#ref-for-view-progress-timelines⑧) [(4)](#ref-for-view-progress-timelines⑨) [(5)](#ref-for-view-progress-timelines①⓪)
* [3.4. Именованные сроки выполнения вида](#ref-for-view-progress-timelines①①)
* [3.4.3. Вставка временной шкалы прогресса представления: свойство view-timeline-inset](#ref-for-view-progress-timelines①②)
* [4.2. Именованные временные шкалы и поиск](#ref-for-view-progress-timelines①③) [(2)](#ref-for-view-progress-timelines①④)
* [5.1. Модель обработки HTML: цикл событий](#ref-for-view-progress-timelines①⑤) [(2)](#ref-for-view-progress-timelines①⑥)
* [Именованные диапазоны временной шкалы](#ref-for-view-progress-timelines①⑦)

это сегменты временной шкалы прокрутки, привязанные к позициям прокрутки, в которых любая часть [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента пересекает ближайший скроллпорт его предка (или, точнее, соответствующий [диапазон видимости прогресса просмотра](#view-progress-visibility-range) этого скроллпорта). Самая начальная позиция прокрутки представляет собой 0% прогресса, а самая конечная - 100% прогресса; смотрите [§ 3.2 Вычисление прогресса для временной шкалы прогресса](#view-timeline-progress).

Примечание: Позиции прокрутки 0% и 100% не всегда достижимы, например, если поле расположено у начального края [прокручиваемого прямоугольника переполнения](https://www.w3.org/TR/css-overflow-3/#scrollable-overflow-rectangle), то прокрутка до < 32% прогресса может быть невозможна.

На таймлайны [View progress timelines](#view-progress-timelines) можно ссылаться анонимно, используя [view()](#funcdef-view) [функциональную нотацию](https://www.w3.org/TR/css-values-4/#functional-notation) или по имени (см. [§ 4.2 Named Timeline Scoping and Lookup](#timeline-scoping)) после объявления их с помощью свойств [view-timeline](#propdef-view-timeline) на объекте [view progress](#view-progress-subject). В Web Animations API они могут быть представлены анонимно объектом `[ViewTimeline](#viewtimeline)`.

### 3.1. Диапазоны временных шкал прогресса[](#view-timelines-ranges)

Временные шкалы [View progress timelines](#view-progress-timelines) определяют следующие [named timeline ranges](#named-timeline-range):

обложка

Информация о ссылке 'cover'.[#valdef-animation-timeline-range-cover](#valdef-animation-timeline-range-cover)**Ссылается в:**

* [3.1. Просмотр диапазонов временной шкалы прогресса](#ref-for-valdef-animation-timeline-range-cover) [(2)](#ref-for-valdef-animation-timeline-range-cover①)
* [3.2. Вычисление прогресса для временной шкалы прогресса просмотра](#ref-for-valdef-animation-timeline-range-cover②) [(2)](#ref-for-valdef-animation-timeline-range-cover③) [(3)](#ref-for-valdef-animation-timeline-range-cover④)

Информация о ссылке на 'обложку'.[#valdef-animation-timeline-range-cover](#valdef-animation-timeline-range-cover)**Ссылается в:**

* [3.1. Просмотр диапазонов временной шкалы прогресса](#ref-for-valdef-animation-timeline-range-cover) [(2)](#ref-for-valdef-animation-timeline-range-cover①)
* [3.2. Расчет прогресса для временной шкалы прогресса просмотра](#ref-for-valdef-animation-timeline-range-cover②) [(2)](#ref-for-valdef-animation-timeline-range-cover③) [(3)](#ref-for-valdef-animation-timeline-range-cover④)

Представляет полный диапазон [view progress timeline](#view-progress-timelines):

* 0% прогресса представляет собой самую позднюю позицию, в которой [начало](https://dom.spec.whatwg.org/#concept-range-start) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с [концом](https://dom.spec.whatwg.org/#concept-range-end) края его [диапазона видимости прогресса просмотра](#view-progress-visibility-range).

* 100% прогресс представляет собой самое раннее положение, при котором [конец](https://dom.spec.whatwg.org/#concept-range-end) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного бокса](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с [началом](https://dom.spec.whatwg.org/#concept-range-start) края его [диапазона видимости прогресса просмотра](#view-progress-visibility-range).


contain

Информация о ссылке 'contain'.[#valdef-animation-timeline-range-contain](#valdef-animation-timeline-range-contain)**Ссылка в:**

* [3.1. View Progress Timeline Ranges](#ref-for-valdef-animation-timeline-range-contain) [(2)](#ref-for-valdef-animation-timeline-range-contain①)

Информация о ссылке 'contain'.[#valdef-animation-timeline-range-contain](#valdef-animation-timeline-range-contain)**Referenced in:**

* [3.1. View Progress Timeline Ranges](#ref-for-valdef-animation-timeline-range-contain) [(2)](#ref-for-valdef-animation-timeline-range-contain①)

Представляет диапазон, в котором [основной блок](https://www.w3.org/TR/css-display-3/#principal-box) либо полностью содержится, либо полностью охватывает свой [диапазон видимости прогресса просмотра](#view-progress-visibility-range) в пределах [области прокрутки](https://www.w3.org/TR/css-overflow-3/#scrollport).

* 0% прогресса представляет собой самую раннюю позицию, в которой либо:

  * [начало](https://dom.spec.whatwg.org/#concept-range-start) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с начальным краем его [диапазона видимости прогресса просмотра](#view-progress-visibility-range).

  * [конец](https://dom.spec.whatwg.org/#concept-range-end) [граничного края](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с конечным краем его [диапазона видимости прогресса просмотра](#view-progress-visibility-range).

* 100% прогресс представляет собой последнюю позицию, в которой либо:

  * [начало](https://dom.spec.whatwg.org/#concept-range-start) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с начальным краем его [диапазона видимости прогресса просмотра](#view-progress-visibility-range).

  * [конец](https://dom.spec.whatwg.org/#concept-range-end) [граничного края](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с конечным краем его [диапазона видимости прогресса просмотра](#view-progress-visibility-range).


entry[](#valdef-animation-timeline-range-entry)

Представляет диапазон, в котором [основной бокс](https://www.w3.org/TR/css-display-3/#principal-box) входит в [диапазон видимости прогресса просмотра](#view-progress-visibility-range).

* 0% эквивалентно 0% диапазона [cover](#valdef-animation-timeline-range-cover).

* 100% эквивалентно 0% диапазона [contain](#valdef-animation-timeline-range-contain).


exit[](#valdef-animation-timeline-range-exit)

Представляет диапазон, в котором [основной блок](https://www.w3.org/TR/css-display-3/#principal-box) выходит из [диапазона видимости прогресса просмотра](#view-progress-visibility-range).

* 0% эквивалентно 100% диапазона [contain](#valdef-animation-timeline-range-contain).

* 100% эквивалентно 100% диапазона [cover](#valdef-animation-timeline-range-cover).


entry-crossing[](#valdef-animation-timeline-range-entry-crossing)

Представляет диапазон, в котором [основной блок](https://www.w3.org/TR/css-display-3/#principal-box) пересекает [конец](https://dom.spec.whatwg.org/#concept-range-end) [край границы](https://www.w3.org/TR/css-box-4/#border-edge)

* 0% прогресса представляет самую позднюю позицию, в которой [начало](https://dom.spec.whatwg.org/#concept-range-start) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с [концом](https://dom.spec.whatwg.org/#concept-range-end) края его [диапазона видимости прогресса просмотра](#view-progress-visibility-range).

* 100% прогресс представляет собой самое раннее положение, при котором [конец](https://dom.spec.whatwg.org/#concept-range-end) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с краем его [диапазона видимости прогресса просмотра](#view-progress-visibility-range).


exit-crossing[](#valdef-animation-timeline-range-exit-crossing)

Представляет диапазон, в котором [основной блок](https://www.w3.org/TR/css-display-3/#principal-box) пересекает [начало](https://dom.spec.whatwg.org/#concept-range-start) [край границы](https://www.w3.org/TR/css-box-4/#border-edge)

* 0% прогресса представляет самую позднюю позицию, в которой [начало](https://dom.spec.whatwg.org/#concept-range-start) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с начальным краем его [диапазона видимости прогресса просмотра](#view-progress-visibility-range).

* 100% прогресс представляет собой самое раннее положение, при котором [конец](https://dom.spec.whatwg.org/#concept-range-end) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с [началом](https://dom.spec.whatwg.org/#concept-range-start) края его [диапазона видимости прогресса просмотра](#view-progress-visibility-range).


[](#issue-aab79dad)Вставка диаграмм.

Во всех случаях [режим записи](https://www.w3.org/TR/css-writing-modes-4/#writing-mode), используемый для разрешения [начальной](https://dom.spec.whatwg.org/#concept-range-start) и [конечной](https://dom.spec.whatwg.org/#concept-range-end) сторон, является режимом записи соответствующего [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container). [Трансформации](https://www.w3.org/TR/css-transforms/) игнорируются, но учитывается [относительное](https://www.w3.org/TR/CSS21/visuren.html#x34) и [абсолютное](https://www.w3.org/TR/css-position-3/#absolute-position) позиционирование.

Примечание: Для [sticky-positioned boxes](https://www.w3.org/TR/css-position-3/#sticky-position) условия прогресса 0% и 100% иногда могут быть удовлетворены диапазоном положений прокрутки, а не только одним. Поэтому в каждом диапазоне указывается, какую позицию использовать - самую раннюю или самую позднюю.

[\[CSS-POSITION-3\]](#biblio-css-position-3 "Модуль CSS позиционированного макета 3-го уровня") [\[CSS-TRANSFORMS-1\]](#biblio-css-transforms-1 "Модуль CSS трансформаций 1-го уровня")

### 3.2. Вычисление прогресса для представления Временная шкала прогресса[](#view-timeline-progress)

Прогресс ([текущее время](https://www.w3.org/TR/web-animations-1/#timeline-current-time)) в [временной шкале прогресса представления](#view-progress-timelines) вычисляется как: расстояние ÷ диапазон, где:

* расстояние - это текущее [смещение прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-offset) минус смещение прокрутки, соответствующее началу диапазона [cover](#valdef-animation-timeline-range-cover)

* диапазон - это [смещение прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-offset), соответствующее началу диапазона [cover](#valdef-animation-timeline-range-cover), минус смещение прокрутки, соответствующее концу диапазона cover.


Если позиции 0% и 100% совпадают (т. е. знаменатель в формуле [current time](https://www.w3.org/TR/web-animations-1/#timeline-current-time) равен нулю), то временная шкала является [неактивной](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

В [paged media](https://www.w3.org/TR/mediaqueries-5/#paged-media), [view progress timelines](#view-progress-timelines), которые в противном случае ссылались бы на область просмотра документа, также [неактивны](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

### 3.3. Анонимные временные шкалы прогресса просмотра[](#view-timelines-anonymous)

#### 3.3.1. Нотация [view()](#funcdef-view)[](#view-notation)

Вид()

Информация о ссылке 'view()'.[#funcdef-view](#funcdef-view)**Ссылается в:**

* [3\. View Progress Timelines](#ref-for-funcdef-view)
* [3.3.1. Нотация view()](#ref-for-funcdef-view①) [(2)](#ref-for-funcdef-view②) [(3)](#ref-for-funcdef-view③) [(4)](#ref-for-funcdef-view④) [(5)](#ref-for-funcdef-view⑤)
* [3.4.2. Ось временной шкалы прогресса представления: свойство view-timeline-axis](#ref-for-funcdef-view⑥)

Информация о ссылке 'view()'.[#funcdef-view](#funcdef-view)**Ссылка в:**

* [3\. View Progress Timelines](#ref-for-funcdef-view)
* [3.3.1. Нотация view()](#ref-for-funcdef-view①) [(2)](#ref-for-funcdef-view②) [(3)](#ref-for-funcdef-view③) [(4)](#ref-for-funcdef-view④) [(5)](#ref-for-funcdef-view⑤)
* [3.4.2. Ось временной шкалы представления: свойство view-timeline-axis](#ref-for-funcdef-view⑥)

Функциональная нотация может использоваться как значение [&lt;single-animation-timeline&gt;](https://www.w3.org/TR/css-animations-2/#typedef-single-animation-timeline "Expands to: auto | none") в [animation-timeline](https://www.w3.org/TR/css-animations-2/#propdef-animation-timeline) и задает [view-progress timeline](#view-progress-timelines) по отношению к ближайшему предку [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container). Его синтаксис таков

[&lt;view()&gt;](#funcdef-view) = view( \[ [&lt;axis&gt;](#typedef-axis) [||](https://www.w3.org/TR/css-values-4/#comb-any) [&lt;'view-timeline-inset'&gt;](#propdef-view-timeline-inset)\][?](https://www.w3.org/TR/css-values-4/#mult-opt) )

По умолчанию [view()](#funcdef-view) ссылается на ось [block axis](https://www.w3.org/TR/css-writing-modes-4/#block-axis); как и для [scroll()](#funcdef-scroll), это можно изменить, указав явное значение [&lt;axis&gt;](#typedef-axis).

Необязательное значение [&lt;'view-timeline-inset'&gt;](#propdef-view-timeline-inset) обеспечивает настройку диапазона видимости [view progress visibility range](#view-progress-visibility-range), как определено для view-timeline-inset.

Каждое использование [view()](#funcdef-view) соответствует собственному экземпляру `[ViewTimeline](#viewtimeline)` в Web Animations API, даже если несколько элементов используют view() для ссылки на один и тот же элемент с одинаковыми аргументами.

#### 3.3.2. Интерфейс `[ViewTimeline](#viewtimeline)` Interface[](#viewtimeline-interface)

словарь `ViewTimelineOptions` Информация о ссылке 'ViewTimelineOptions'.[#dictdef-viewtimelineoptions](#dictdef-viewtimelineoptions)**Ссылка в:**.

* [3.3.2. Интерфейс ViewTimeline](#ref-for-dictdef-viewtimelineoptions)

Информация о ссылке 'ViewTimelineOptions'.[#dictdef-viewtimelineoptions](#dictdef-viewtimelineoptions)**Ссылка в:**

* [3.3.2. Интерфейс ViewTimeline](#ref-for-dictdef-viewtimelineoptions)

{
[Element](https://dom.spec.whatwg.org/#element) `subject`[](#dom-viewtimelineoptions-subject)
[ScrollAxis](#enumdef-scrollaxis) `axis`[](#dom-viewtimelineoptions-axis) = "блок";
([DOMString](https://webidl.spec.whatwg.org/#idl-DOMString) или [sequence](https://webidl.spec.whatwg.org/#idl-sequence)<([CSSNumericValue](https://www.w3.org/TR/css-typed-om-1/#cssnumericvalue) или [CSSKeywordValue](https://www.w3.org/TR/css-typed-om-1/#csskeywordvalue))>) `inset`[](#dom-viewtimelineoptions-inset) = "auto";
};

\[[Exposed](https://webidl.spec.whatwg.org/#Exposed)=Window\]
интерфейс `ViewTimeline` Информация о ссылке 'ViewTimeline'.[#viewtimeline](#viewtimeline)**Referenced in:**

* [3\. View Progress Timelines](#ref-for-viewtimeline)
* [3.3.1. Нотация view()](#ref-for-viewtimeline①)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-viewtimeline②) [(2)](#ref-for-viewtimeline③) [(3)](#ref-for-viewtimeline④) [(4)](#ref- for-viewtimeline⑤) [(5)](#ref-for-viewtimeline⑥) [(6)](#ref-for-viewtimeline⑦) [(7)](#ref-for-viewtimeline⑧)

Информация о ссылке 'ViewTimeline'.[#viewtimeline](#viewtimeline)**Ссылается в:**

* [3\. View Progress Timelines](#ref-for-viewtimeline)
* [3.3.1. Нотация view()](#ref-for-viewtimeline①)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-viewtimeline②) [(2)](#ref-for-viewtimeline③) [(3)](#ref-for-viewtimeline④) [(4)](#ref- for-viewtimeline⑤) [(5)](#ref-for-viewtimeline⑥) [(6)](#ref-for-viewtimeline⑦) [(7)](#ref-for-viewtimeline⑧)

  : [ScrollTimeline](#scrolltimeline) {
  [constructor](#dom-viewtimeline-viewtimeline)(optional [ViewTimelineOptions](#dictdef-viewtimelineoptions) `options`[](#dom-viewtimeline-viewtimeline-options-options) = {});
  readonly атрибут [Element](https://dom.spec.whatwg.org/#element) [subject](#dom-viewtimeline-subject);
  readonly attribute [CSSNumericValue](https://www.w3.org/TR/css-typed-om-1/#cssnumericvalue) [startOffset](#dom-viewtimeline-startoffset);
  readonly атрибут [CSSNumericValue](https://www.w3.org/TR/css-typed-om-1/#cssnumericvalue) [endOffset](#dom-viewtimeline-endoffset);
  };

Атрибут `[ViewTimeline](#viewtimeline)` - это `[AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline)`, задающий временную шкалу [прогресса просмотра](#view-progress-timelines). Его можно передать конструктору `[Animation](https://www.w3.org/TR/web-animations-1/#animation)` или методу `[animate()](https://www.w3.org/TR/web-animations-1/#dom-animatable-animate)`, чтобы связать анимацию с временной шкалой прогресса просмотра.

`subject

Информация о ссылке 'subject'.[#dom-viewtimeline-subject](#dom-viewtimeline-subject)**Содержит ссылки в:**.

* [3.3.2. Интерфейс ViewTimeline](#ref-for-dom-viewtimeline-subject) [(2)](#ref-for-dom-viewtimeline-subject①) [(3)](#ref-for-dom-viewtimeline- subject②) [(4)](#ref-for-dom-viewtimeline-subject③) [(5)](#ref-for-dom-viewtimeline-subject④) [(6)](#ref-for-dom-viewtimeline-subject⑤)

Информация о ссылке 'subject'.[#dom-viewtimeline-subject](#dom-viewtimeline-subject)**Ссылается в:**.

* [3.3.2. Интерфейс ViewTimeline](#ref-for-dom-viewtimeline-subject) [(2)](#ref-for-dom-viewtimeline-subject①) [(3)](#ref-for-dom-viewtimeline- subject②) [(4)](#ref-for-dom-viewtimeline-subject③) [(5)](#ref-for-dom-viewtimeline-subject④) [(6)](#ref-for-dom-viewtimeline-subject⑤)

, типа [Element](https://dom.spec.whatwg.org/#element), readonly

Элемент, видимость которого в [основном поле](https://www.w3.org/TR/css-display-3/#principal-box) в [области прокрутки](https://www.w3.org/TR/css-overflow-3/#scrollport) определяет прогресс временной шкалы.

`startOffset`

Информация о ссылке 'startOffset'.[#dom-viewtimeline-startoffset](#dom-viewtimeline-startoffset)**Ссылка в:**.

* [3.3.2. Интерфейс ViewTimeline](#ref-for-dom-viewtimeline-startoffset) [(2)](#ref-for-dom-viewtimeline-startoffset①)

Информация о ссылке 'startOffset'.[#dom-viewtimeline-startoffset](#dom-viewtimeline-startoffset)**Ссылка в:**

* [3.3.2. Интерфейс ViewTimeline](#ref-for-dom-viewtimeline-startoffset) [(2)](#ref-for-dom-viewtimeline-startoffset①)

, типа [CSSNumericValue](https://www.w3.org/TR/css-typed-om-1/#cssnumericvalue), только для чтения

Представляет начальную (0% прогресса) позицию прокрутки [временной шкалы прогресса просмотра](#view-progress-timelines) в виде смещения длины (в [px](https://www.w3.org/TR/css-values-4/#px)) от [начала прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-origin). Null, если временная шкала [неактивна](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

`endOffset`

Информация о ссылке 'endOffset'.[#dom-viewtimeline-endoffset](#dom-viewtimeline-endoffset)**Ссылка в:**.

* [3.3.2. Интерфейс ViewTimeline](#ref-for-dom-viewtimeline-endoffset) [(2)](#ref-for-dom-viewtimeline-endoffset①)

Информация о ссылке 'endOffset'.[#dom-viewtimeline-endoffset](#dom-viewtimeline-endoffset)**Ссылка в:**.

* [3.3.2. Интерфейс ViewTimeline](#ref-for-dom-viewtimeline-endoffset) [(2)](#ref-for-dom-viewtimeline-endoffset①)

, типа [CSSNumericValue](https://www.w3.org/TR/css-typed-om-1/#cssnumericvalue), только для чтения

Представляет конечную (100% прогресса) позицию прокрутки [временной шкалы прогресса просмотра](#view-progress-timelines) в виде смещения длины (в [px](https://www.w3.org/TR/css-values-4/#px)) от [начала прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-origin). Null, если временная шкала [неактивна](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

Примечание: Значения `[startOffset](#dom-viewtimeline-startoffset)` и `[endOffset](#dom-viewtimeline-endoffset)` относятся к [началу прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-origin), а не к [физическому](https://www.w3.org/TR/css-writing-modes-4/#physical) левому верхнему углу. В зависимости от [режима записи](https://www.w3.org/TR/css-writing-modes-4/#writing-mode) [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container), они могут не совпадать со значениями `[scrollLeft](https://www.w3.org/TR/cssom-view-1/#dom-element-scrollleft)` или `[scrollTop](https://www.w3.org/TR/cssom-view-1/#dom-element-scrolltop)`, например, в [горизонтальной оси](https://www.w3.org/TR/css-writing-modes-4/#x-axis) в режиме записи справа налево ([rtl](https://www.w3.org/TR/css-writing-modes-4/#valdef-direction-rtl)).

Наследуемые атрибуты:

`[source](#dom-scrolltimeline-source)` (наследуется от `[ScrollTimeline](#scrolltimeline)`)

Ближайший предок `[subject](#dom-viewtimeline-subject)`, чей [principal box](https://www.w3.org/TR/css-display-3/#principal-box) устанавливает [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container), чья позиция прокрутки управляет ходом временной шкалы.

`[axis](#dom-scrolltimeline-axis)` (наследуется от `[ScrollTimeline](#scrolltimeline)`)

Указывает ось прокрутки, по которой движется прогресс временной шкалы. Смотрите [&lt;axis&gt;](#typedef-axis), выше.

`[CurrentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)` (наследуется от `[AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline)`)

Представляет текущий прогресс [view progress timeline](#view-progress-timelines) в процентах `[CSSUnitValue](https://www.w3.org/TR/css-typed-om-1/#cssunitvalue)`, представляющий прогресс прокрутки его [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container) в данной позиции. Null, если временная шкала [неактивна](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

`ViewTimeline(options)`

Информация о ссылке 'ViewTimeline(options)'.[#dom-viewtimeline-viewtimeline](#dom-viewtimeline-viewtimeline)**Referenced in:**.

* [3.3.2. Интерфейс ViewTimeline](#ref-for-dom-viewtimeline-viewtimeline)

Информация о ссылке 'ViewTimeline(options)'.[#dom-viewtimeline-viewtimeline](#dom-viewtimeline-viewtimeline)**Ссылка в:**

* [3.3.2. Интерфейс ViewTimeline](#ref-for-dom-viewtimeline-viewtimeline)

Создает новый объект `[ViewTimeline](#viewtimeline)`, используя следующую процедуру:

1.  Пусть timeline - это новый объект `[ViewTimeline](#viewtimeline)`.

2.  Установите для свойств `[subject](#dom-viewtimeline-subject)` и `[axis](#dom-scrolltimeline-axis)` timeline соответствующие значения из опций.

3.  Установите для свойства `[source](#dom-scrolltimeline-source)` временной шкалы значение `[subject](#dom-viewtimeline-subject)` ближайшего предка элемента [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container).

4.  Если в качестве вставки указано значение `[DOMString](https://webidl.spec.whatwg.org/#idl-DOMString)`, разберите его как значение [&lt;'view-timeline-inset'&gt;](#propdef-view-timeline-inset); если указана последовательность, первое значение представляет собой начальную вставку, а второе - конечную. Если последовательность имеет только одно значение, оно дублируется. Если она имеет нулевое значение или более двух значений, или если она содержит `[CSSKeywordValue](https://www.w3.org/TR/css-typed-om-1/#csskeywordvalue)`, чье `[value](https://www.w3.org/TR/css-typed-om-1/#dom-csskeywordvalue-value)` не является "auto", выдает ошибку TypeError.

    Эти вставки определяют [диапазон видимости прогресса просмотра](#viewtimeline)` [диапазон видимости прогресса просмотра](#view-progress-visibility-range).


Если `[источник](#dom-scrolltimeline-source)` или `[субъект](#dom-viewtimeline-subject)` элемента `[ViewTimeline](#viewtimeline)` является элементом, [основной блок](https://www.w3.org/TR/css-display-3/#principal-box) которого не существует, или если его ближайший предок [контейнер прокрутки](https://www.w3. org/TR/css-overflow-3/#scroll-container) не имеет [scrollable overflow](https://www.w3.org/TR/css-overflow-3/#scrollable-overflow) (или если такого предка не существует, например, в печатных СМИ), то `[ViewTimeline](#viewtimeline)` является [неактивным](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

Значения `[subject](#dom-viewtimeline-subject)`, `[source](#dom-scrolltimeline-source)` и `[currentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)` вычисляются при запросе или обновлении любого из них.

### 3.4. Именованные временные шкалы прогресса представления[](#view-timelines-named)

[Временные шкалы прогресса представления](#view-progress-timelines) также могут быть определены декларативно и затем ссылаться по имени на элементы в области видимости имени (см. [§ 4.2 Named Timeline Scoping and Lookup](#timeline-scoping)).

Такие именованные временные шкалы прогресса представления

Информация о ссылке 'named view progress timelines'.[#named-view-progress-timelines](#named-view-progress-timelines)**Ссылка в:**

* [3.4.1. Именование временной шкалы прогресса представления: свойство view-timeline-name](#ref-for-named-view-progress-timelines)
* [3.4.2. Ось временной шкалы прогресса представления: свойство view-timeline-axis](#ref-for-named-view-progress-timelines①)
* [Объявление области действия именованной временной шкалы: свойство timeline-scope](#ref-for-named-view-progress-timelines②)

Информация о ссылке 'named view progress timelines'.[#named-view-progress-timelines](#named-view-progress-timelines)**Ссылка в:**

* [3.4.1. Именование временной шкалы прогресса представления: свойство view-timeline-name](#ref-for-named-view-progress-timelines)
* [3.4.2. Ось временной шкалы прогресса представления: свойство view-timeline-axis](#ref-for-named-view-progress-timelines①)
* [Объявление области действия именованной временной шкалы: свойство timeline-scope](#ref-for-named-view-progress-timelines②)

объявлены в [согласованном списке значений](https://www.w3.org/TR/css-values-4/#coordinated-value-list), построенном из свойств view-timeline-*, которые образуют группу свойств [согласованного списка](https://www.w3.org/TR/css-values-4/#coordinating-list-property) с [view-timeline-name](#propdef-view-timeline-name) в качестве базового свойства [согласованного списка](https://www.w3.org/TR/css-values-4/#coordinating-list-base-property). См. [CSS Values 4 § A Coordinating List-Valued Properties](https://www.w3.org/TR/css-values-4/#linked-properties).

#### 3.4.1. Именование временной шкалы прогресса представления: свойство [view-timeline-name](#propdef-view-timeline-name)[](#view-timeline-name)

| | |
| --- | --- |
| Имя: | view-timeline-name<br><br>Информация о ссылке 'view-timeline-name'.[#propdef-view-timeline-name](#propdef-view-timeline-name)**Ссылается в:**<br><br>* [3.4. Именованные временные шкалы прогресса представления](#ref-for-propdef-view-timeline-name)<br>* [3.4.1. Именование временной шкалы прогресса представления: свойство view-timeline-name](#ref-for-propdef-view-timeline-name①)<br>* [3. 4.4. Сокращение временной шкалы просмотра: сокращение view-timeline](#ref-for-propdef-view-timeline-name②) [(2)](#ref-for-propdef-view-timeline-name③)<br>* [4.2. Именованная временная шкала и поиск](#ref-for-propdef-view-timeline-name④)<br><br>Информация о ссылке 'view-timeline-name'. [#propdef-view-timeline-name](#propdef-view-timeline-name)**Ссылка в:**<br><br>* [3.4. Именованные временные шкалы прогресса представления](#ref-for-propdef-view-timeline-name)<br>* [3.4.1. Именование временной шкалы прогресса представления: свойство view-timeline-name](#ref-for-propdef-view-timeline-name①)<br>* [3. 4.4. Сокращение временной шкалы просмотра: сокращение view-timeline](#ref-for-propdef-view-timeline-name②) [(2)](#ref-for-propdef-view-timeline-name③)<br>* [4.2. Именованная временная шкала и поиск](#ref-for-propdef-view-timeline-name④) | [Значение:]()
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | none [\|](https://www.w3.org/TR/css-values-4/#comb-one) [&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)[#](https://www.w3.org/TR/css-values-4/#mult-comma) |
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | none |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | [все элементы](https://www.w3.org/TR/css-pseudo/#generated-content "Включает ::before и ::after псевдоэлементы.") |
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | нет |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | n/a |
| | [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed) | ключевое слово none или список [CSS-идентификаторов](https://www.w3.org/TR/css-values-4/#css-css-identifier) |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | по грамматике |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | не анимируемый |

Определяет имена для [именованных временных шкал прогресса представления](#named-view-progress-timelines), связанных с этим элементом.

#### 3.4.2. Ось временной шкалы прогресса представления: свойство [view-timeline-axis](#propdef-view-timeline-axis)[](#view-timeline-axis)

| | |
| --- | --- |
| Имя: | view-timeline-axis<br><br>Информация о ссылке 'view-timeline-axis'.[#propdef-view-timeline-axis](#propdef-view-timeline-axis)**Ссылка в:**<br><br>* [3.4.2. Ось временной шкалы прогресса представления: свойство view-timeline-axis](#ref-for-propdef-view-timeline-axis)<br>* [3. 4.4. Сокращение временной шкалы представления: сокращение view-timeline](#ref-for-propdef-view-timeline-axis①) [(2)](#ref-for-propdef-view-timeline-axis②)<br><br>Информация о ссылке 'view-timeline-axis'. [#propdef-view-timeline-axis](#propdef-view-timeline-axis)**Ссылка в:**<br><br>* [3.4.2. Ось временной шкалы прогресса представления: свойство view-timeline-axis](#ref-for-propdef-view-timeline-axis)<br>* [3. 4.4. Сокращение временной шкалы представления: сокращение view-timeline](#ref-for-propdef-view-timeline-axis①) [(2)](#ref-for-propdef-view-timeline-axis②)|
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | \[ блок [\|](https://www.w3.org/TR/css-values-4/#comb-one) inline \| x \| y \][#](https://www.w3.org/TR/css-values-4/#mult-comma) |
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | block |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | [все элементы](https://www.w3.org/TR/css-pseudo/#generated-content "Включает ::before и ::after псевдоэлементы.") |
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | нет |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | n/a |
| | [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed)| список указанных ключевых слов |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | по грамматике |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | не анимируется |

Определяет ось любого [named view progress timelines](#named-view-progress-timelines), полученного из [principal box](https://www.w3.org/TR/css-display-3/#principal-box) этого элемента.

Значения определены для [view()](#funcdef-view).

#### 3.4.3. Вставка временной шкалы выполнения представления: свойство [view-timeline-inset](#propdef-view-timeline-inset)[](#view-timeline-inset)

| | |
| --- | --- |
| Имя: | view-timeline-inset<br><br>Информация о ссылке 'view-timeline-inset'.[#propdef-view-timeline-inset](#propdef-view-timeline-inset)**Ссылается в:**<br><br>* [3. 3.1. Нотация view()](#ref-for-propdef-view-timeline-inset) [(2)](#ref-for-propdef-view-timeline-inset①) [(3)](#ref-for-propdef-view-timeline-inset②)<br>* [3.3.2. Интерфейс ViewTimeline](#ref-for-propdef-view-timeline-inset③)<br>* [3.4.3. Вставка временной шкалы прогресса представления: свойство view-timeline-inset](#ref-for-propdef-view-timeline-inset④)<br>* [3. 4.4. Временная шкала просмотра: свойство view-timeline shorthand](#ref-for-propdef-view-timeline-inset⑤) [(2)](#ref-for-propdef-view-timeline-inset⑥)<br><br>Информация о ссылке 'view-timeline-inset'. [#propdef-view-timeline-inset](#propdef-view-timeline-inset)**Ссылка в:**<br><br>* [3.3.1. Нотация view()](#ref-for-propdef-view-timeline-inset) [(2)](#ref-for-propdef-view-timeline-inset①) [(3)](#ref-for-propdef-view-timeline-inset②)<br>* [3.3.2. Интерфейс ViewTimeline](#ref-for-propdef-view-timeline-inset③)<br>* [3. 4.3. Вставка временной шкалы прогресса представления: свойство view-timeline-inset](#ref-for-propdef-view-timeline-inset④)<br>* [3.4.4. Сокращение временной шкалы представления: сокращение view-timeline](#ref-for-propdef-view-timeline-inset⑤) [(2)](#ref-for-propdef-view-timeline-inset⑥)|
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | \[ \[ auto [\|](https://www.w3.org/TR/css-values-4/#comb-one) [&lt;length-percentage&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage) \][{1,2}](https://www.w3.org/TR/css-values-4/#mult-num-range) \][#](https://www.w3.org/TR/css-values-4/#mult-comma) |
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | auto | |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | [все элементы](https://www.w3.org/TR/css-pseudo/#generated-content "Включает ::before и ::after псевдоэлементы.") |
| [Inherited:](https://www.w3.org/TR/css-cascade/#inherited-property) | no |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages)| относительно соответствующего размера соответствующей области прокрутки |
| [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed)| список, состоящий из двух пар значений, представляющих начальную и конечную вставки, каждая из которых является либо ключевым словом [auto](#valdef-view-timeline-inset-auto), либо вычисленным значением [&lt;length-percentage&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage)|
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values)| в соответствии с грамматикой |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | по типу вычисляемого значения |

Задает настройку [scrollport](https://www.w3.org/TR/css-overflow-3/#scrollport) на впуск (положительную) или выпуск (отрицательную) при определении того, находится ли бокс в поле зрения при установке границ соответствующей [view progress timeline](#view-progress-timelines). Первое значение представляет собой [начальную](https://dom.spec.whatwg.org/#concept-range-start) вставку по соответствующей оси; второе значение представляет собой [конечную](https://dom.spec.whatwg.org/#concept-range-end) вставку. Если второе значение опущено, оно устанавливается равным первому. Полученный диапазон области прокрутки является диапазоном видимости прогресса просмотра

Информация о ссылке 'view progress visibility range'.[#view-progress-visibility-range](#view-progress-visibility-range)**Ссылка в:**

* [3\. View Progress Timelines](#ref-for-view-progress-visibility-range)
* [3.1. View Progress Timeline Ranges](#ref-for-view-progress-visibility-range①) [(2)](#ref-for-view-progress-visibility-range②) [(3)](#ref-for-view-progress-visibility- range③) [(4)](#ref-for-view-progress-visibility-range④) [(5)](#ref-for-view-progress-visibility-range⑤) [(6)](#ref-for-view-progress-visibility-range⑥) [(7)](#ref-for-view- progress-visibility-range⑦) [(8)](#ref-for-view-progress-visibility-range⑧) [(9)](#ref-for-view-progress-visibility-range⑨) [(10)](#ref-for-view-progress-visibility- range①⓪) [(11)](#ref-for-view-progress-visibility-range①①) [(12)](#ref-for-view-progress-visibility-range①②) [(13)](#ref-for-view-progress-visibility-range①③)
* [3.3.1. Нотация view()](#ref-for-view-progress-visibility-range①④)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-view-progress-visibility-range①⑤)

Информация о ссылке 'view progress visibility range'.[#view-progress-visibility-range](#view-progress-visibility-range)**Ссылка в:**

* [3\. View Progress Timelines](#ref-for-view-progress-visibility-range)
* [3.1. View Progress Timeline Ranges](#ref-for-view-progress-visibility-range①) [(2)](#ref-for-view-progress-visibility-range②) [(3)](#ref-for-view-progress-visibility- range③) [(4)](#ref-for-view-progress-visibility-range④) [(5)](#ref-for-view-progress-visibility-range⑤) [(6)](#ref-for-view-progress-visibility-range⑥) [(7)](#ref-for-view- progress-visibility-range⑦) [(8)](#ref-for-view-progress-visibility-range⑧) [(9)](#ref-for-view-progress-visibility-range⑨) [(10)](#ref-for-view-progress-visibility- range①⓪) [(11)](#ref-for-view-progress-visibility-range①①) [(12)](#ref-for-view-progress-visibility-range①②) [(13)](#ref-for-view-progress-visibility-range①③)
* [3.3.1. Нотация view()](#ref-for-view-progress-visibility-range①④)
* [3.3.2. Интерфейс ViewTimeline](#ref-for-view-progress-visibility-range①⑤)

.

auto

Информация о ссылке 'auto'.[#valdef-view-timeline-inset-auto](#valdef-view-timeline-inset-auto)**Ссылается в:**.

* [3.4.3. Вставка временной шкалы прогресса представления: свойство view-timeline-inset](#ref-for-valdef-view-timeline-inset-auto)

Информация о ссылке 'auto'.[#valdef-view-timeline-inset-auto](#valdef-view-timeline-inset-auto)**Ссылка в:**

* [3.4.3. Вставка временной шкалы прогресса представления: свойство view-timeline-inset](#ref-for-valdef-view-timeline-inset-auto)

Указывает на использование значения параметра [scroll-padding](https://www.w3.org/TR/css-scroll-snap-1/#propdef-scroll-padding).

[&lt;length-percentage&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage)[](#valdef-view-timeline-inset-length-percentage)

Как и [scroll-padding](https://www.w3.org/TR/css-scroll-snap-1/#propdef-scroll-padding), задает смещение внутрь от соответствующего края области прокрутки.

#### 3.4.4. Временная шкала просмотра: сокращение [view-timeline](#propdef-view-timeline)[](#view-timeline-shorthand)

| | |
| --- | --- |
| Имя: | view-timeline<br><br>Информация о ссылке 'view-timeline'.[#propdef-view-timeline](#propdef-view-timeline)**Ссылается в:**<br><br>* [3\. Временные шкалы прогресса](#ref-for-propdef-view-timeline)<br>* [3.4.4. Сокращение временной шкалы просмотра: сокращение view-timeline](#ref-for-propdef-view-timeline①)<br><br>Информация о ссылке 'view-timeline'. [#propdef-view-timeline](#propdef-view-timeline)**Ссылается в:**<br><br>* [3\. View Progress Timelines](#ref-for-propdef-view-timeline)<br>* [3.4.4. View Timeline Shorthand: the view-timeline shorthand](#ref-for-propdef-view-timeline①)| | [Значение:]()
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | \[ [&lt;'view-timeline-name'&gt;](#propdef-view-timeline-name) [&lt;'view-timeline-axis'&gt;](#propdef-view-timeline-axis)[?](https://www.w3.org/TR/css-values-4/#mult-opt)\][#](https://www.w3.org/TR/css-values-4/#mult-comma) |
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | см. отдельные свойства |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | [всем элементам](https://www.w3.org/TR/css-pseudo/#generated-content "Включает ::before и ::after псевдоэлементы.") |
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | см. отдельные свойства |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | см. отдельные свойства |
| [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed) | см. отдельные свойства |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | см. отдельные свойства |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | согласно грамматике |

Это свойство является [сокращением](https://www.w3.org/TR/css-cascade-5/#shorthand-property) для установки [view-timeline-name](#propdef-view-timeline-name) и [view-timeline-axis](#propdef-view-timeline-axis) в одном объявлении. Он не задает [view-timeline-inset](#propdef-view-timeline-inset).

[](#issue-6b6d7174)Должно ли оно также сбрасывать [view-timeline-inset](#propdef-view-timeline-inset)?

4\. Прикрепление анимации к [Scroll-driven Timelines](#scroll-driven-timelines)[](#scroll-driven-attachment)
------------------------------------------------------------------------------------------------------------

Анимации могут быть прикреплены к [временным шкалам с прокруткой](#scroll-driven-timelines) с помощью свойства [scroll-timeline](#propdef-scroll-timeline) (в CSS) или параметров `[AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline)` (в Web Animations API). Диапазон временной шкалы, к которому привязан их [активный интервал](https://www.w3.org/TR/web-animations-1/#active-interval), также может быть дополнительно ограничен определенным диапазоном временной шкалы (см. раздел [Прикрепление анимаций к диапазонам временной шкалы](#named-range-animation-declaration)).

Задержки, основанные на времени ([animation-delay](https://www.w3.org/TR/css-animations-1/#propdef-animation-delay)), не применяются к [scroll-driven animations](#scroll-driven-animations), которые основаны на расстоянии.

### 4.1. Вычисления по конечной временной шкале[](#finite-attachment)

В отличие от временных шкал, [scroll-driven timelines](#scroll-driven-timelines) конечны, поэтому [scroll-driven animations](#scroll-driven-animations) всегда привязаны к конечному [attachment range](#animation-attachment-range)-который может быть дополнительно ограничен [animation-range](#propdef-animation-range) (см. [Appendix A: Timeline Ranges](#timeline-ranges)). Анимация

итераций ([animation-iteration-count](https://www.w3.org/TR/css-animations-1/#propdef-animation-iteration-count)) устанавливаются в пределах этого конечного диапазона. Если заданная длительность [auto](https://drafts.csswg.org/css-animations-2/#valdef-animation-duration-auto), то для нахождения [используемой](https://www.w3.org/TR/css-cascade-5/#used-value) длительности оставшийся диапазон делится на [количество итераций](https://www.w3.org/TR/web-animations-1/#iteration-count) (animation-iteration-count).

Примечание: Если анимация имеет бесконечный [счетчик итераций](https://www.w3.org/TR/web-animations-1/#iteration-count), каждая [длительность итерации](https://www.w3.org/TR/web-animations-1/#iteration-duration)-и результирующая [активная длительность](https://www.w3.org/TR/web-animations-1/#active-duration)-будет равна нулю.

Анимации, включающие абсолютно позиционированные ключевые кадры (привязанные к определенной точке временной шкалы, например, с помощью [named timeline range keyframe selectors](#named-range-keyframes) в [@keyframes](https://www.w3.org/TR/css-animations-1/#at-ruledef-keyframes)), считаются имеющими [iteration count](https://www.w3.org/TR/web-animations-1/#iteration-count) равным 1 для определения положения этих ключевых кадров относительно 0% и 100%; затем вся анимация масштабируется для соответствия [iteration duration](https://www.w3.org/TR/web-animations-1/#iteration-duration) и повторяется для каждой итерации.

Примечание: неясно, как можно использовать комбинацию абсолютно позиционированных ключевых кадров с количеством итераций больше 1; это, по крайней мере, дает определенное поведение. (Альтернативным, но, возможно, более странным вариантом поведения было бы выведение таких абсолютно позиционированных ключевых кадров "из потока" во время итерации остальных ключевых кадров). Редакторам было бы интересно узнать о реальных случаях использования нескольких итераций.

### 4.2. Именованные временные шкалы и поиск[](#timeline-scoping)

Именованная временная шкала [scroll-progress-timelines](#scroll-progress-timelines) или [view progress timeline](#view-progress-timelines) может быть использована по:

* сам элемент, объявляющий имя

* потомки этого элемента.


Примечание: Свойство [timeline-scope](#propdef-timeline-scope) может быть использовано для объявления имени временной шкалы на предке определяющего элемента, эффективно расширяя его область действия за пределы поддерева этого элемента.

Если несколько элементов объявили одно и то же имя временной шкалы, то соответствующей временной шкалой будет та, которая объявлена на ближайшем по порядку элементе дерева. В случае конфликта имен в одном и том же элементе приоритет имеют имена, объявленные позже в свойстве именования ([scroll-timeline-name](#propdef-scroll-timeline-name), [view-timeline-name](#propdef-view-timeline-name)), а [scroll progress timelines](#scroll-progress-timelines) имеет приоритет над [view progress timelines](#view-progress-timelines).

[](#example-2a5405b2)Используя timeline-scope, элемент может ссылаться на временные шкалы, привязанные к элементам, которые являются родными, двоюродными или даже потомками. Например, следующий пример создает анимацию на элементе, который связан с [временной шкалой прокрутки](#scroll-progress-timelines), определенной последующим братом или сестрой.

<style>
  @keyframes anim {
    from { цвет: красный; }
    to { цвет: зеленый; }
  }

  .root {
    /\* объявляет область видимости временной шкалы 'scroller', чтобы она охватывала всех потомков */
    timeline-scope: scroller;
  }

  .root .animation {
    анимация: anim;
    /\* ссылается на временную шкалу 'scroller' для управления прогрессом 'anim' */
    animation-timeline: scroller;
  }

  .root .animation + .scroller {
    /\* прикрепляет временную шкалу прокрутки к временной шкале с именем 'scroller' */
    scroll-timeline: scroller;
  }
</style>
&hellip;
<section class="root">
  <div class="animation">Анимируемый блок</div>
  <div class="scroller">Прокручиваемый блок</div>
</section>

### 4.3. События анимации[](#events)

[Анимации, управляемые прокруткой](#scroll-driven-animations) отправляют все те же события анимации, что и более типичные анимации, управляемые временем, как описано в [Web Animations § 4.4.18 Animation events](https://www.w3.org/TR/web-animations-1/#animation-events-section), [CSS Animations 1 § 4 Animation Events](https://www.w3.org/TR/css-animations-1/#events), и [CSS Animations 2 § 4.1 Event dispatch](https://www.w3.org/TR/css-animations-2/#event-dispatch).

Примечание: При прокрутке назад событие `animationstart` срабатывает в _конце_ [активного интервала](https://www.w3.org/TR/web-animations-1/#active-interval), а событие `animationend` - в начале активного интервала. Однако, поскольку событие `finish` связано с переходом в [состояние законченной игры] (https://www.w3.org/TR/web-animations-1/#finished-play-state), оно срабатывает только при прокрутке вперед.

5\. Детали расчета кадров[](#frames)
----------------------------------------

### 5.1. Модель обработки HTML: Цикл событий[](#html-processing-model-event-loop)

Возможность прокрутки для управления ходом анимации приводит к появлению циклов компоновки.

Информация о ссылке 'layout cycles'.[#layout-cycles](#layout-cycles)**Ссылка в:**.

* [5.1. Модель обработки HTML: цикл событий](#ref-for-layout-cycles)

Информация о ссылке 'layout cycles'.[#layout-cycles](#layout-cycles)**Ссылка на:**.

* [5.1. Модель обработки HTML: цикл событий](#ref-for-layout-cycles)

где изменение смещения прокрутки приводит к обновлению эффекта анимации, что, в свою очередь, вызывает новое изменение смещения прокрутки.

Чтобы избежать таких циклов [layout cycles](#layout-cycles), анимации с [scroll progress timeline](#scroll-progress-timelines) обновляют свое текущее время один раз на шаге 7.10 цикла событий [HTML Processing Model](https://html.spec.whatwg.org/multipage/webappapis.html#processing-model-8), как шаг 1 [update animations and send events](https://www.w3.org/TR/web-animations-1/#update-animations-and-send-events).

На шаге 7.14.1 [HTML Processing Model](https://html.spec.whatwg.org/multipage/webappapis.html#processing-model-8) все созданные [scroll-progress-timelines](#scroll-progress-timelines) или [view progress timelines](#view-progress-timelines) собираются в stale timelines.

Информация о ссылке 'stale timelines'.[#stale-timelines](#stale-timelines)**Ссылка в:**.

* [5.1. Модель обработки HTML: цикл событий](#ref-for-stale-timelines) [(2)](#ref-for-stale-timelines①) [(3)](#ref-for-stale-timelines②)

Информация о ссылке 'stale timelines'.[#stale-timelines](#stale-timelines)**Ссылка в:**.

* [5.1. Модель обработки HTML: цикл событий](#ref-for-stale-timelines) [(2)](#ref-for-stale-timelines①) [(3)](#ref-for-stale-timelines②)

установить. После шага 7.14, если [именованные диапазоны временных шкал](#named-timeline-range) каких-либо временных шкал изменились, эти временные шкалы добавляются в набор [stale timelines](#stale-timelines). Если есть устаревшие временные линии, они теперь обновляют свое текущее время и связанные с ним диапазоны, набор устаревших временных линий очищается, и мы запускаем дополнительный шаг для пересчета стилей и обновления макета.

Примечание: Мы проверяем изменения макета после отправки любого `[ResizeObserver](https://www.w3.org/TR/resize-observer-1/#resizeobserver)` специально, чтобы учесть программные размеры элементов.

Примечание: Поскольку мы собираем устаревшие временные шкалы только во время первого расчета стиля и макета, это может напрямую вызвать только один дополнительный пересчет стиля. Другие API, требующие еще одного обновления, должны быть проверены на том же этапе и обновлены в то же время.

Примечание: Без этого дополнительного цикла пересчета стиля и макета [изначально несвежие](https://www.w3.org/TR/scroll-animations-1/#initially-stale) временные шкалы останутся несвежими (т. е. не будут иметь текущего времени) до конца кадра, в котором была создана временная шкала. Это означает, что анимация, связанная с такой временной шкалой, не будет создавать никаких эффектов для этого кадра, что может привести к нежелательной начальной "вспышке" в визуализации.

Примечание: Этот раздел не влияет на принудительные расчеты стиля и макета, запускаемые функцией `[getComputedStyle()](https://www.w3.org/TR/cssom-1/#dom-window-getcomputedstyle)` или аналогичными. Другими словами, [изначально несвежие](https://www.w3.org/TR/scroll-animations-1/#initially-stale) таймлайны видны как таковые через эти API.

Если окончательное обновление стиля и макета приведет к изменению времени или области видимости (см. [timeline-scope](#propdef-timeline-scope)) любых [scroll-progress-timelines](#scroll-progress-timelines) или [view progress timelines](#view-progress-timelines), они не будут повторно сэмплированы для отражения нового состояния до следующего обновления рендеринга.

Ничто в этом разделе не требует, чтобы прокрутка блокировалась в макете или скрипте. Если пользовательский агент обычно компонует кадры, в которых произошла прокрутка, но последствия прокрутки не были полностью отражены в макете или сценарии (например, слушатели событий `scroll` еще не запущены), пользовательский агент может также решить не сэмплировать анимацию, управляемую прокруткой, для этого компонуемого кадра. В таких случаях отрисованное смещение прокрутки и состояние анимации, управляемой прокруткой, могут быть несовместимы в скомпонованном кадре.

6\. Соображения конфиденциальности[](#privacy-considerations)
-----------------------------------------------------

Влияние функций данной спецификации на конфиденциальность неизвестно.

7\. Соображения безопасности[](#security-considerations)
-------------------------------------------------------

О влиянии функций данной спецификации на безопасность ничего не известно.

Приложение A: диапазоны временной шкалы[](#timeline-ranges)
-----------------------------------------------

[](#issue-79ed79d9)Этот раздел следует перенести в CSS-ANIMATIONS-2 и WEB-ANIMATIONS-2.

Это приложение вводит понятия [именованных диапазонов временной шкалы](#named-timeline-range) и [диапазонов вложений анимации](#animation-attachment-range) в [CSS Animations](https://www.w3.org/TR/css-animations/) и [Web Animations](https://www.w3.org/TR/web-animations/).

### Именованные диапазоны временной шкалы[](#named-ranges)

Именованный диапазон временной шкалы

Информация о ссылке 'named timeline range'.[#named-timeline-range](#named-timeline-range)**Ссылка в:**

* [3.1. Просмотр диапазонов временной шкалы прогресса](#ref-for-named-timeline-range)
* [5.1. Модель обработки HTML: цикл событий](#ref-for-named-timeline-range①)
* [Appendix A: Timeline Ranges](#ref-for-named-timeline-range②)
* [Именованные диапазоны временной шкалы](#ref-for-named-timeline-range③) [(2)](#ref-for-named-timeline-range④) [(3)](#ref-for-named-timeline-range⑤) [(4)](#ref-for-named-timeline-range⑥) [(5)](#ref-for-named-timeline-range⑦)
* [Named Timeline Range Keyframe Selectors](#ref-for-named-timeline-range⑧) [(2)](#ref-for-named-timeline-range⑨) [(3)](#ref-for-named-timeline- range①⓪) [(4)](#ref-for-named-timeline-range①①) [(5)](#ref-for-named-timeline-range①②) [(6)](#ref-for-named-timeline-range①③)
* [Указание начала временного диапазона анимации: свойство animation-range-start](#ref-for-named-timeline-range①④) [(2)](#ref-for-named-timeline-range①⑤)
* [Указание конца временного диапазона анимации: свойство animation-range-end](#ref-for-named-timeline-range①⑥) [(2)](#ref-for-named-timeline-range①⑦)
* [Отчет о прогрессе диапазона времени: метод getCurrentTime()](#ref-for-named-timeline-range①⑧) [(2)](#ref-for-named-timeline-range①⑨) [(3)](#ref-for-named-timeline-range②⓪)

Информация о ссылке 'named timeline range'.[#named-timeline-range](#named-timeline-range)**Ссылается в:**

* [3.1. Просмотр диапазонов временной шкалы прогресса](#ref-for-named-timeline-range)
* [5.1. Модель обработки HTML: цикл событий](#ref-for-named-timeline-range①)
* [Appendix A: Timeline Ranges](#ref-for-named-timeline-range②)
* [Именованные диапазоны временной шкалы](#ref-for-named-timeline-range③) [(2)](#ref-for-named-timeline-range④) [(3)](#ref-for-named-timeline-range⑤) [(4)](#ref-for-named-timeline-range⑥) [(5)](#ref-for-named-timeline-range⑦)
* [Named Timeline Range Keyframe Selectors](#ref-for-named-timeline-range⑧) [(2)](#ref-for-named-timeline-range⑨) [(3)](#ref-for-named-timeline- range①⓪) [(4)](#ref-for-named-timeline-range①①) [(5)](#ref-for-named-timeline-range①②) [(6)](#ref-for-named-timeline-range①③)
* [Указание начала временного диапазона анимации: свойство animation-range-start](#ref-for-named-timeline-range①④) [(2)](#ref-for-named-timeline-range①⑤)
* [Указание конца временного диапазона анимации: свойство animation-range-end](#ref-for-named-timeline-range①⑥) [(2)](#ref-for-named-timeline-range①⑦)
* [Отчет о прогрессе временного диапазона: метод getCurrentTime()](#ref-for-named-timeline-range①⑧) [(2)](#ref-for-named-timeline-range①⑨) [(3)](#ref-for-named-timeline-range②⓪)

это именованный сегмент анимации [временной шкалы](https://www.w3.org/TR/web-animations-1/#timeline). Начало сегмента представлено как 0 % прогресса по диапазону; конец сегмента представлен как 100 % прогресса по диапазону. Несколько [именованных диапазонов временной шкалы](#named-timeline-range) могут быть связаны с данной временной шкалой, и несколько таких диапазонов могут перекрываться. Например, диапазон contain временной шкалы [view progress timeline](#view-progress-timelines) перекрывается с диапазоном cover. Именованные диапазоны временной шкалы представляются с помощью [&lt;timeline-range-name&gt;](#typedef-timeline-range-name).

Информация о ссылке '&lt;timeline-range-name&gt;'.[#typedef-timeline-range-name](#typedef-timeline-range-name)**Ссылается в:**

* [Именованные диапазоны временной шкалы](#ref-for-typedef-timeline-range-name)
* [Named Timeline Range Keyframe Selectors](#ref-for-typedef-timeline-range-name①) [(2)](#ref-for-typedef-timeline-range-name②)
* [Указание диапазона временной шкалы анимации: сокращение animation-range](#ref-for-typedef-timeline-range-name③) [(2)](#ref-for-typedef-timeline-range-name④)
* [Указание начала временного диапазона анимации: свойство animation-range-start](#ref-for-typedef-timeline-range-name⑤) [(2)](#ref-for-typedef-timeline-range-name⑥)
* [Указание конца временного диапазона анимации: свойство animation-range-end](#ref-for-typedef-timeline-range-name⑦) [(2)](#ref-for-typedef-timeline-range-name⑧)

Информация о ссылке '&lt;timeline-range-name&gt;'.[#typedef-timeline-range-name](#typedef-timeline-range-name)**Ссылается в:**

* [Именованные диапазоны временной шкалы](#ref-for-typedef-timeline-range-name)
* [Named Timeline Range Keyframe Selectors](#ref-for-typedef-timeline-range-name①) [(2)](#ref-for-typedef-timeline-range-name②)
* [Указание диапазона временной шкалы анимации: сокращение animation-range](#ref-for-typedef-timeline-range-name③) [(2)](#ref-for-typedef-timeline-range-name④)
* [Указание начала временного диапазона анимации: свойство animation-range-start](#ref-for-typedef-timeline-range-name⑤) [(2)](#ref-for-typedef-timeline-range-name⑥)
* [Указание конца временного диапазона анимации: свойство animation-range-end](#ref-for-typedef-timeline-range-name⑦) [(2)](#ref-for-typedef-timeline-range-name⑧)

тип значения, который указывает на [CSS-идентификатор](https://www.w3.org/TR/css-values-4/#css-css-identifier), представляющий один из предопределенных именованных диапазонов временной шкалы.

Примечание: В данной спецификации [именованные диапазоны временной шкалы](#named-timeline-range) должны быть определены для существования спецификацией, такой как [\[SCROLL-ANIMATIONS-1\]](#biblio-scroll-animations-1 "Scroll-driven Animations"). На будущем уровне могут появиться API для авторов, которые смогут объявлять свои собственные именованные диапазоны временной шкалы.

### Named Timeline Range Keyframe Selectors[](#named-range-keyframes)

Имена и проценты [Named timeline range](#named-timeline-range) могут быть использованы для прикрепления ключевых кадров к определенным точкам прогресса в пределах именованного диапазона временной шкалы. Правило CSS [@keyframes](https://www.w3.org/TR/css-animations-1/#at-ruledef-keyframes) расширяется таким образом:

[&lt;keyframe-selector&gt;](https://www.w3.org/TR/css-animations-1/#typedef-keyframe-selector) = от [|](https://www.w3.org/TR/css-values-4/#comb-one) до [|](https://www.w3.org/TR/css-values-4/#comb-one) [&lt;percentage \[0,100\]&gt;](https://www.w3.org/TR/css-values-4/#percentage-value) [|](https://www.w3.org/TR/css-values-4/#comb-one) [&lt;timeline-range-name&gt;](#typedef-timeline-range-name) [&lt;percentage&gt;](https://www.w3.org/TR/css-values-4/#percentage-value)

где [&lt;timeline-range-name&gt;](#typedef-timeline-range-name) - это [CSS-идентификатор](https://www.w3.org/TR/css-values-4/#css-css-identifier), который представляет выбранный предопределенный [именованный диапазон временной шкалы](#named-timeline-range), а [&lt;percentage&gt;](https://www.w3.org/TR/css-values-4/#percentage-value) после него представляет собой процентный прогресс между началом и концом этого именованного диапазона временной шкалы.

Ключевые кадры привязываются к указанной точке временной шкалы. Если временная шкала не имеет соответствующего [named timeline range](#named-timeline-range), то любые ключевые кадры, прикрепленные к точкам в этом именованном диапазоне временной шкалы, игнорируются. Возможно, что эти точки привязки находятся за пределами [активного интервала](https://www.w3.org/TR/web-animations-1/#active-interval) анимации; в таких случаях автоматические ключевые кадры от (0%) и [до](https://drafts.csswg.org/css-shapes-2/#valdef-shape-to) (100%) генерируются только для свойств, у которых нет ключевых кадров на или раньше 0% или на или позже 100% (соответственно).

### Прикрепление анимации к диапазонам временной шкалы[](#named-range-animation-declaration)

Набор ключевых кадров анимации может быть привязан к диапазону привязки анимации

Информация о ссылке 'диапазон вложения анимации'.[#animation-attachment-range](#animation-attachment-range)**Ссылка на:**

* [4.1. Расчеты конечной временной шкалы](#ref-for-animation-attachment-range)
* [Appendix A: Timeline Ranges](#ref-for-animation-attachment-range①)
* [Прикрепление анимации к диапазонам временной шкалы](#ref-for-animation-attachment-range②) [(2)](#ref-for-animation-attachment-range③) [(3)](#ref-for-animation-attachment-range④)
* [Указание диапазона временной шкалы анимации: сокращение animation-range](#ref-for-animation-attachment-range⑤)
* [Указание начала диапазона анимации: свойство animation-range-start](#ref-for-animation-attachment-range⑥) [(2)](#ref-for-animation-attachment-range⑦) [(3)](#ref-for-animation-attachment-range⑧) [(4)](#ref-for-animation-attachment-range⑨)
* [Указание конца временного диапазона анимации: свойство animation-range-end](#ref-for-animation-attachment-range①⓪) [(2)](#ref-for-animation-attachment-range①①) [(3)](#ref-for-animation-attachment-range①②) [(4)](#ref-for-animation-attachment-range①③)

Информация о ссылке на 'диапазон привязки анимации'.[#animation-attachment-range](#animation-attachment-range)**Ссылка на:**

* [4.1. Расчеты конечной временной шкалы](#ref-for-animation-attachment-range)
* [Appendix A: Timeline Ranges](#ref-for-animation-attachment-range①)
* [Прикрепление анимации к диапазонам временной шкалы](#ref-for-animation-attachment-range②) [(2)](#ref-for-animation-attachment-range③) [(3)](#ref-for-animation-attachment-range④)
* [Указание диапазона временной шкалы анимации: сокращение animation-range](#ref-for-animation-attachment-range⑤)
* [Указание начала диапазона анимации: свойство animation-range-start](#ref-for-animation-attachment-range⑥) [(2)](#ref-for-animation-attachment-range⑦) [(3)](#ref-for-animation-attachment-range⑧) [(4)](#ref-for-animation-attachment-range⑨)
* [Указание конца временного диапазона анимации: свойство animation-range-end](#ref-for-animation-attachment-range①⓪) [(2)](#ref-for-animation-attachment-range①①) [(3)](#ref-for-animation-attachment-range①②) [(4)](#ref-for-animation-attachment-range①③)

ограничивает [активный интервал](https://www.w3.org/TR/web-animations-1/#active-interval) анимации этим диапазоном временной шкалы, используя свойства [animation-range](#propdef-animation-range). Задержки (см. [animation-delay](https://www.w3.org/TR/css-animations-1/#propdef-animation-delay)) устанавливаются в этом ограниченном диапазоне, что еще больше сокращает время, доступное для [auto](https://drafts.csswg.org/css-animations-2/#valdef-animation-duration-auto) длительности и [infinite](https://www.w3.org/TR/css-animations-1/#valdef-animation-iteration-count-infinite) итераций.

Примечание: [animation-range](#propdef-animation-range) может как расширять диапазон [attachment range](#animation-attachment-range), так и сужать его.

Любые кадры, расположенные за пределами [диапазона вложения](#animation-attachment-range), используются для интерполяции по мере необходимости, но находятся за пределами [активного интервала](https://www.w3.org/TR/web-animations-1/#active-interval) и поэтому исключаются из самой анимации, фактически усекая анимацию в конце диапазона вложения.

начало диапазона┐ ╺┉┉┉ активный интервал┉┉╸ ┌ конец диапазона
┄┄┄┄┄┄┄┄┄┄┄├─────────────╊━━━━━━━━━━━━━━━━━━━╉───────────┤┄┄┄┄┄┄┄┄
╶┄ начальная задержка┄╴ ╶┄ конечная задержка┄╴
╶┄┄┄┄┄ duration┄┄┄┄┄╴

Свойства [animation-range](#propdef-animation-range) являются [только сбрасываемыми подсвойствами](https://www.w3.org/TR/css-cascade-5/#reset-only-sub-property) [animation](https://www.w3.org/TR/css-animations-1/#propdef-animation) [shorthand](https://www.w3.org/TR/css-cascade-5/#shorthand-property).

[](#issue-6cb6bdf3)Определите применение к анимации, управляемой временем.

#### Указание диапазона временной шкалы анимации: сокращение [animation-range](#propdef-animation-range)[](#animation-range)

| | |
| --- | --- |
| Имя: | animation-range<br><br>Информация о ссылке 'animation-range'.[#propdef-animation-range](#propdef-animation-range)**Ссылка в:**<br><br>* [4.1. Вычисления конечной временной шкалы](#ref-for-propdef-animation-range)<br>* [Прикрепление анимаций к диапазонам временной шкалы](#ref-for-propdef-animation-range①) [(2)](#ref-for-propdef-animation-range②) [(3)](#ref-for-propdef-animation-range③)<br>* [Указание диапазона временной шкалы анимации: сокращение animation-range](#ref-for-propdef-animation-range④) [(2)](#ref-for-propdef-animation-range⑤) [(3)](#ref-for-propdef-animation-range⑥)<br><br>Информация о ссылке 'animation-range'. [#propdef-animation-range](#propdef-animation-range)**Ссылка в:**<br><br>* [4.1. Вычисления конечной временной шкалы](#ref-for-propdef-animation-range)<br>* [Прикрепление анимаций к диапазонам временной шкалы](#ref-for-propdef-animation-range①) [(2)](#ref-for-propdef-animation-range②) [(3)](#ref-for-propdef-animation-range③)<br>* [Указание диапазона временной шкалы анимации: сокращение animation-range](#ref-for-propdef-animation-range④) [(2)](#ref-for-propdef-animation-range⑤) [(3)](#ref-for-propdef-animation-range⑥)|
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | \[ [&lt;'animation-range-start'&gt;](#propdef-animation-range-start) [&lt;'animation-range-end'&gt;](#propdef-animation-range-end)[?](https://www.w3.org/TR/css-values-4/#mult-opt)\][#](https://www.w3.org/TR/css-values-4/#mult-comma) |
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | см. отдельные свойства |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | см. отдельные свойства |
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | см. отдельные свойства |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | см. отдельные свойства |
| [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed) | см. отдельные свойства |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | см. отдельные свойства |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values) | согласно грамматике |

Свойство [animation-range](#propdef-animation-range) - это [сокращение](https://www.w3.org/TR/css-cascade-5/#shorthand-property), которое задает [animation-range-start](#propdef-animation-range-start) и [animation-range-end](#propdef-animation-range-end) в одном объявлении, связывая анимацию с указанным [animation attachment range](#animation-attachment-range).

Если [&lt;'animation-range-end'&gt;](#propdef-animation-range-end) опущен, а [&lt;'animation-range-start'&gt;](#propdef-animation-range-start) включает компонент [&lt;timeline-range-name&gt;](#typedef-timeline-range-name), то animation-range-end устанавливается на тот же &lt;timeline-range-name&gt; и 100%. В противном случае для любого опущенного [длинного слова](https://www.w3.org/TR/css-cascade-5/#longhand) устанавливается его [начальное значение](https://www.w3.org/TR/css-cascade-5/#initial-value).

[](#example-7788feda)Следующие наборы объявлений показывают объявление [animation-range](#propdef-animation-range) [сокращенное](https://www.w3.org/TR/css-cascade-5/#shorthand-property), за которым следуют эквивалентные объявления [animation-range-start](#propdef-animation-range-start) и [animation-range-end](#propdef-animation-range-end):

animation-range: entry 10% exit 90%;
animation-range-start: entry 10%;
animation-range-end: exit 90%;

animation-range: entry;
animation-range-start: entry 0%;
animation-range-end: entry 100%;

animation-range: entry exit;
animation-range-start: entry 0%;
animation-range-end: exit 100%;

animation-range: 10%;
animation-range-start: 10%;
animation-range-end: normal;

диапазон анимации: 10% 90%;
animation-range-start: 10%;
animation-range-end: 90%;

animation-range: entry 10% exit;
animation-range-start: entry 10%;
animation-range-end: exit 100%;

animation-range: 10% выход 90%;
animation-range-start: 10%;
animation-range-end: exit 90%;

animation-range: entry 10% 90%;
animation-range-start: entry 10%;
animation-range-end: 90%;

[](#issue-e4fe9011)Как лучше поступить с дефолтом для опущенных значений? [\[Выпуск #8438\]](https://github.com/w3c/csswg-drafts/issues/8438)

#### Указание начала временного диапазона анимации: свойство [animation-range-start](#propdef-animation-range-start)[](#animation-range-start)

| | |
| --- | --- |
| Имя: | animation-range-start<br><br>Информация о ссылке 'animation-range-start'. [#propdef-animation-range-start](#propdef-animation-range-start)**Ссылка в:**<br><br>* [Specifying an Animation's Timeline Range: сокращение animation-range](#ref-for-propdef-animation-range-start) [(2)](#ref-for-propdef-animation-range-start①) [(3)](#ref-for-propdef-animation-range-start②) [(4)](#ref-for-propdef-animation-range-start③)<br>* [Указание начала временного диапазона анимации: свойство animation-range-start](#ref-for-propdef-animation-range-start④)<br><br>Информация о ссылке 'animation-range-start'. [#propdef-animation-range-start](#propdef-animation-range-start)**Ссылка в:**<br><br>* [Specifying an Animation's Timeline Range: сокращение animation-range](#ref-for-propdef-animation-range-start) [(2)](#ref-for-propdef-animation-range-start①) [(3)](#ref-for-propdef-animation-range-start②) [(4)](#ref-for-propdef-animation-range-start③)<br>* [Указание начала временного диапазона анимации: свойство animation-range-start](#ref-for-propdef-animation-range-start④)|
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | \[ normal [\|](https://www.w3.org/TR/css-values-4/#comb-one) [&lt;length-percentage&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage) \| [&lt;timeline-range-name&gt;](#typedef-timeline-range-name) &lt;length-percentage&gt;[?](https://www.w3.org/TR/css-values-4/#mult-opt) \][#](https://www.w3.org/TR/css-values-4/#mult-comma) |
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | normal |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | [все элементы](https://www.w3.org/TR/css-pseudo/#generated-content "Включает ::before и ::after псевдоэлементы.") |
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | нет |
| | [Проценты:](https://www.w3.org/TR/css-values/#percentages)| относительно указанного [именованного временного диапазона](#named-timeline-range), если он был указан, иначе ко всей временной шкале |
| [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed)| список, каждый элемент которого содержит либо ключевое слово [normal](#valdef-animation-range-start-normal), либо диапазон временной шкалы и процент выполнения |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values)| по грамматике |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | не анимируется |

Определяет начало диапазона [привязки](#animation-attachment-range) анимации, соответственно сдвигая [время начала](https://www.w3.org/TR/web-animations-1/#animation-start-time) анимации (т.е. место привязки ключевых кадров, сопоставленных с 0% прогресса, когда количество итераций равно 1).

Значения имеют следующие значения:

normal

Информация о ссылке 'normal'.[#valdef-animation-range-start-normal](#valdef-animation-range-start-normal)**Ссылка в:**

* [Указание начала временного диапазона анимации: свойство animation-range-start](#ref-for-valdef-animation-range-start-normal)

Информация о ссылке 'normal'.[#valdef-animation-range-start-normal](#valdef-animation-range-start-normal)**Ссылка в:**

* [Указание начала временного диапазона анимации: свойство animation-range-start](#ref-for-valdef-animation-range-start-normal)

Началом [диапазона вложений](#animation-attachment-range) анимации является начало связанной с ней [временной шкалы](https://www.w3.org/TR/web-animations-1/#timeline); начало [активного интервала](https://www.w3.org/TR/web-animations-1/#active-interval) анимации определяется обычным образом.

[&lt;length-percentage&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage)[](#valdef-animation-range-start-length-percentage)

Диапазон привязки [анимации](#animation-attachment-range) начинается в указанной точке на [временной шкале](https://www.w3.org/TR/web-animations-1/#timeline), измеряемой от начала временной шкалы.

[&lt;timeline-range-name&gt;](#typedef-timeline-range-name) [&lt;length-percentage&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage)?[](#valdef-animation-range-start-timeline-range-name-length-percentage)

Диапазон [прикрепления анимации](#animation-attachment-range) начинается в указанной точке на [временной шкале](https://www.w3.org/TR/web-animations-1/#timeline), отмеряемой от начала указанного [именованного диапазона временной шкалы](#named-timeline-range). Если параметр [&lt;длина-процент&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage) опущен, то по умолчанию он равен 0%.

#### Указание конца временного диапазона анимации: свойство [animation-range-end](#propdef-animation-range-end)[](#animation-range-end)

| | |
| --- | --- |
| Имя: | animation-range-end<br><br>Информация о ссылке 'animation-range-end'. [#propdef-animation-range-end](#propdef-animation-range-end)**Ссылка в:**<br><br>* [Указание диапазона временной шкалы анимации: сокращение animation-range](#ref-for-propdef-animation-range-end) [(2)](#ref-for-propdef-animation-range-end①) [(3)](#ref-for-propdef-animation-range- end②) [(4)](#ref-for-propdef-animation-range-end③) [(5)](#ref-for-propdef-animation-range-end④)<br>* [Указание конца временного диапазона анимации: свойство animation-range-end](#ref-for-propdef-animation-range-end⑤)<br><br>Информация о ссылке 'animation-range-end'. [#propdef-animation-range-end](#propdef-animation-range-end)**Ссылка в:**<br><br>* [Specifying an Animation's Timeline Range: сокращение animation-range](#ref-for-propdef-animation-range-end) [(2)](#ref-for-propdef-animation-range-end①) [(3)](#ref-for-propdef-animation-range- end②) [(4)](#ref-for-propdef-animation-range-end③) [(5)](#ref-for-propdef-animation-range-end④)<br>* [Указание конца временного диапазона анимации: свойство animation-range-end](#ref-for-propdef-animation-range-end⑤)|
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | \[ normal [\|](https://www.w3.org/TR/css-values-4/#comb-one) [&lt;length-percentage&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage) \| [&lt;timeline-range-name&gt;](#typedef-timeline-range-name) &lt;length-percentage&gt;[?](https://www.w3.org/TR/css-values-4/#mult-opt) \][#](https://www.w3.org/TR/css-values-4/#mult-comma) |
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | normal |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | [все элементы](https://www.w3.org/TR/css-pseudo/#generated-content "Включает ::before и ::after псевдоэлементы.") |
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | нет |
| | [Проценты:](https://www.w3.org/TR/css-values/#percentages)| относительно указанного [именованного диапазона временной шкалы](#named-timeline-range), если он был указан, иначе ко всей временной шкале |
| [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed)| список, каждый элемент которого содержит либо ключевое слово [normal](#valdef-animation-range-end-normal), либо диапазон временной шкалы и процент выполнения |
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values)| в соответствии с грамматикой |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | не анимируемый |

Определяет конец диапазона [вложения](#animation-attachment-range) анимации, потенциально смещая [время окончания](https://www.w3.org/TR/web-animations-1/#end-time) анимации (т.е. когда ключевые кадры, сопоставленные со 100% прогресса, вложены, когда количество итераций равно 1) и/или усекая [активный интервал](https://www.w3.org/TR/web-animations-1/#active-interval) анимации.

Значения имеют следующие значения:

normal

Информация о ссылке 'normal'.[#valdef-animation-range-end-normal](#valdef-animation-range-end-normal)**Ссылка в:**

* [Указание конца временного диапазона анимации: свойство animation-range-end](#ref-for-valdef-animation-range-end-normal)

Информация о ссылке 'normal'.[#valdef-animation-range-end-normal](#valdef-animation-range-end-normal)**Ссылка в:**

* [Указание конца временного диапазона анимации: свойство animation-range-end](#ref-for-valdef-animation-range-end-normal)

Конец [диапазона вложения](#animation-attachment-range) анимации является концом связанной с ней [временной шкалы](https://www.w3.org/TR/web-animations-1/#timeline); конец [активного интервала](https://www.w3.org/TR/web-animations-1/#active-interval) анимации определяется обычным образом.

[&lt;length-percentage&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage)[](#valdef-animation-range-end-length-percentage)

Диапазон привязки [анимации](#animation-attachment-range) заканчивается в указанной точке на [временной шкале](https://www.w3.org/TR/web-animations-1/#timeline), измеряемой от начала временной шкалы.

[&lt;timeline-range-name&gt;](#typedef-timeline-range-name) [&lt;length-percentage&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage)?[](#valdef-animation-range-end-timeline-range-name-length-percentage)

Диапазон [прикрепления анимации](#animation-attachment-range) заканчивается в указанной точке на [временной шкале](https://www.w3.org/TR/web-animations-1/#timeline), отмеренной от начала указанного [именованного диапазона временной шкалы](#named-timeline-range). Если параметр [&lt;длина-процент&gt;](https://www.w3.org/TR/css-values-4/#typedef-length-percentage) опущен, по умолчанию он принимает значение 100 %.

### Отчет о прогрессе диапазона времени: метод getCurrentTime()[](#named-range-get-time)

Прогресс по именованным диапазонам отображается на объекте `[AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline)` методом `[getCurrentTime()](#dom-animationtimeline-getcurrenttime)`:

словарь `AnimationTimeOptions` Информация о ссылке 'AnimationTimeOptions'.[#dictdef-animationtimeoptions](#dictdef-animationtimeoptions)**Ссылается в:**.

* [Reporting Timeline Range Progress: the getCurrentTime() method](#ref-for-dictdef-animationtimeoptions)

Информация о ссылке 'AnimationTimeOptions'.[#dictdef-animationtimeoptions](#dictdef-animationtimeoptions)**Ссылка в:**

* [Reporting Timeline Range Progress: the getCurrentTime() method](#ref-for-dictdef-animationtimeoptions)

{
[DOMString](https://webidl.spec.whatwg.org/#idl-DOMString)? `range` Информация о ссылке 'range'.[#dom-animationtimeoptions-range](#dom-animationtimeoptions-range)**Referenced in:**

* [Reporting Timeline Range Progress: the getCurrentTime() method](#ref-for-dom-animationtimeoptions-range) [(2)](#ref-for-dom-animationtimeoptions-range①) [(3)](#ref-for-dom-animationtimeoptions-range②) Информация о ссылке 'range'.[#dom-animationtimeoptions-range](#dom-animationtimeoptions-range)**Ссылка в:**

* [Отчет о прогрессе диапазона временной шкалы: метод getCurrentTime()](#ref-for-dom-animationtimeoptions-range) [(2)](#ref-for-dom-animationtimeoptions-range①) [(3)](#ref-for-dom-animationtimeoptions-range②) ;
  };

\[[Exposed](https://webidl.spec.whatwg.org/#Exposed)=Window\]
частичный интерфейс [AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline) {
[CSSNumericValue](https://www.w3.org/TR/css-typed-om-1/#cssnumericvalue)? [getCurrentTime](#dom-animationtimeline-getcurrenttime)(optional [AnimationTimeOptions](#dictdef-animationtimeoptions) `options`[](#dom-animationtimeline-getcurrenttime-options-options) = {})
};

`CSSNumericValue? getCurrentTime(optional AnimationCurrentTimeOptions = {})`.

Информация о ссылке 'CSSNumericValue? getCurrentTime(optional AnimationCurrentTimeOptions = {})'.[#dom-animationtimeline-getcurrenttime](#dom-animationtimeline-getcurrenttime)**Referenced in:**

* [Reporting Timeline Range Progress: the getCurrentTime() method](#ref-for-dom-animationtimeline-getcurrenttime) [(2)](#ref-for-dom-animationtimeline-getcurrenttime①)

Информация о ссылке 'CSSNumericValue? getCurrentTime(optional AnimationCurrentTimeOptions = {})'.[#dom-animationtimeline-getcurrenttime](#dom-animationtimeline-getcurrenttime)**Referenced in:**

* [Отчет о прогрессе диапазона временной шкалы: метод getCurrentTime()](#ref-for-dom-animationtimeline-getcurrenttime) [(2)](#ref-for-dom-animationtimeline-getcurrenttime①)

Возвращает представление [текущего времени](https://www.w3.org/TR/web-animations-1/#timeline-current-time) следующим образом:

Если `[диапазон](#dom-animationtimeoptions-range)` не указан:

Возвращает значение `[currentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)` на [this](https://webidl.spec.whatwg.org/#this), но представляет миллисекундные значения как новое `[CSSUnitValue](https://www.w3.org/TR/css-typed-om-1/#cssunitvalue)` в единицах [ms](https://www.w3.org/TR/css-values-4/#ms), а не как double.

Если указан `[диапазон](#dom-animationtimeoptions-range)` и он является действительным [named timeline range](#named-timeline-range) на [this](https://webidl.spec.whatwg.org/#this):

Пусть progress - это текущий прогресс в этом диапазоне, выраженный в процентах.

Создайте [новое значение единицы](https://drafts.css-houdini.org/css-typed-om-1/#create-a-cssunitvalue-from-a-pair) из (progress, "percent") и верните его.

Если начальная и конечная точки [именованного диапазона временной шкалы](#named-timeline-range) совпадают, верните отрицательную бесконечность для значений времени раньше или равных этой точке и положительную бесконечность для значений времени после нее.

Если задан `[диапазон](#dom-animationtimeoptions-range)`, но он не является действительным [именованным диапазоном временной шкалы](#named-timeline-range) на [this](https://webidl.spec.whatwg.org/#this):

Возвращает null.

[](#issue-615b83f7)Этот метод связан с `[currentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)`, но не совсем то же самое; должно ли у него быть другое название? [\[Выпуск #8201\]](https://github.com/w3c/csswg-drafts/issues/8201)

[](#issue-8f9cc3f0)Этот метод возвращает проценты относительно диапазона ScrollTimeline, если указано имя диапазона. Но для временных линий, основанных на времени, если указано имя диапазона, следует ли возвращать процентный прогресс по этому диапазону или временной прогресс по этому диапазону?

Приложение B: Область имен таймлайнов[](#timeline-name-scope)
-------------------------------------------------------

[](#issue-be490712)Этот раздел следует перенести в CSS-ANIMATIONS-2.

В этом приложении представлено свойство [timeline-scope](#propdef-timeline-scope), которое позволяет объявить область действия имени временной шкалы на предке определяющего элемента временной шкалы.

### Объявление области действия именованной временной шкалы: свойство [timeline-scope](#propdef-timeline-scope)[](#timeline-scope)

| | |
| --- | --- |
| Имя: | timeline-scope<br><br>Информация о ссылке 'timeline-scope'.[#propdef-timeline-scope](#propdef-timeline-scope)**Ссылка в:**<br><br>* [4.2. Named Timeline Scoping and Lookup](#ref-for-propdef-timeline-scope)<br>* [5.1. Модель обработки HTML: цикл событий](#ref-for-propdef-timeline-scope①)<br>* [Приложение B: Область имен временной шкалы](#ref-for-propdef-timeline-scope②)<br>* [Объявление области именной временной шкалы: свойство timeline-scope](#ref-for-propdef-timeline-scope③) [(2)](#ref-for-propdef-timeline-scope④)<br>* [8\. Изменения](#ref-for-propdef-timeline-scope⑤)<br><br>Информация о ссылке 'timeline-scope'.[#propdef-timeline-scope](#propdef-timeline-scope)**Ссылка в:**<br><br>* [4.2. Named Timeline Scoping and Lookup](#ref-for-propdef-timeline-scope)<br>* [5.1. Модель обработки HTML: цикл событий](#ref-for-propdef-timeline-scope①)<br>* [Приложение B: Область имен временной шкалы](#ref-for-propdef-timeline-scope②)<br>* [Объявление области именной временной шкалы: свойство timeline-scope](#ref-for-propdef-timeline-scope③) [(2)](#ref-for-propdef-timeline-scope④)<br>* [8\. Изменения](#ref-for-propdef-timeline-scope⑤)|
| [Значение:](https://www.w3.org/TR/css-values/#value-defs) | none [\|](https://www.w3.org/TR/css-values-4/#comb-one) [&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)[#](https://www.w3.org/TR/css-values-4/#mult-comma) |
| [Initial:](https://www.w3.org/TR/css-cascade/#initial-values) | none |
| [Применяется к:](https://www.w3.org/TR/css-cascade/#applies-to) | [все элементы](https://www.w3.org/TR/css-pseudo/#generated-content "Включает ::before и ::after псевдоэлементы.") |
| [Наследуется:](https://www.w3.org/TR/css-cascade/#inherited-property) | нет |
| [Проценты:](https://www.w3.org/TR/css-values/#percentages) | n/a |
| | [Вычисленное значение:](https://www.w3.org/TR/css-cascade/#computed)| ключевое слово [none](#valdef-timeline-scope-none) или список [CSS-идентификаторов](https://www.w3.org/TR/css-values-4/#css-css-identifier)|
| [Канонический порядок:](https://www.w3.org/TR/cssom/#serializing-css-values)| по грамматике |
| [Тип анимации:](https://www.w3.org/TR/web-animations/#animation-type) | не анимируемый |

Это свойство определяет область действия указанных имен временных шкал, которая распространяется на все поддерево этого элемента. Это позволяет именованной временной шкале (например, [named scroll-progress timelines](#named-scroll-progress-timelines) или [named view progress timeline](#named-view-progress-timelines)) ссылаться на элементы вне поддерева определяющего временную шкалу элемента - например, на братьев, сестер, кузенов или предков. Он также блокирует ссылки на временные линии потомков с указанными именами вне этого поддерева, а на временные линии предков с указанными именами - внутри этого поддерева.

[](#issue-73eb8d88)Существует несколько открытых дискуссий по поводу этих блокирующих эффектов. [\[Issue #8915\]](https://github.com/w3c/csswg-drafts/issues/8915)

Значения имеют следующие значения:

none

Информация о ссылке 'none'.[#valdef-timeline-scope-none](#valdef-timeline-scope-none)**Ссылка в:**

* [Объявление области действия именованной временной шкалы: свойство timeline-scope](#ref-for-valdef-timeline-scope-none)

Информация о ссылке 'none'.[#valdef-timeline-scope-none](#valdef-timeline-scope-none)**Ссылка в:**

* [Объявление области действия именованной временной шкалы: свойство timeline-scope](#ref-for-valdef-timeline-scope-none)

Никаких изменений в области видимости имени таймлайна.

[&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)[](#valdef-timeline-scope-dashed-ident)

Объявляет имя соответствующей именованной временной шкалы, определенной потомком, область действия которой еще не объявлена потомком с помощью [timeline-scope](#propdef-timeline-scope), областью действия для этого элемента и его потомков.

Если такой временной шкалы не существует или существует несколько таких шкал, вместо нее объявляется [неактивная временная шкала](https://www.w3.org/TR/web-animations-1/#inactive-timeline) с указанным именем.

Примечание: Это свойство не может повлиять на поиск имени временной шкалы в поддереве элемента-потомка, объявляющего то же имя, или сделать его недействительным. См. раздел [Объявление области действия именованной временной шкалы: свойство timeline-scope](#timeline-scope).

8\. Changes[](#changes)
-----------------------

Изменения, произошедшие с предыдущего ([28 апреля 2023 года](https://www.w3.org/TR/2023/WD-scroll-animations-1-20230428/)) Рабочий проект включает:

* Удалены scroll-timeline-attachment и view-timeline-attachment в пользу [timeline-scope](#propdef-timeline-scope). ([Issue 7759](https://github.com/w3c/csswg-drafts/issues/7759))

* Переключили именованные временные шкалы на использование [&lt;dashed-ident&gt;](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident) вместо [&lt;custom-ident&gt;](https://www.w3.org/TR/css-values-4/#identifier-value), чтобы избежать столкновения имен со стандартными ключевыми словами CSS. ([Issue 8746](https://github.com/w3c/csswg-drafts/issues/8746))


См. также [Предыдущие изменения](https://www.w3.org/TR/2023/WD-scroll-animations-1-20230428/#changes).
