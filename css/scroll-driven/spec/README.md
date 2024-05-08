# Анимация, управляемая прокруткой

## 1. Введение

Эта спецификация определяет механизмы для управления ходом анимации на основе хода прокрутки контейнера прокрутки. Эти анимации, управляемые прокруткой, используют временную шкалу, основанную на позиции прокрутки, а не на часовом времени. Этот модуль предоставляет как императивный API, основанный на Web Animations API, так и декларативный API, основанный на CSS Animations. [[WEB-ANIMATIONS-1]](https://www.w3.org/TR/scroll-animations-1/#biblio-web-animations-1)

Существует два типа временных шкал, управляемых прокруткой:

- [Scroll Progress Timelines](https://www.w3.org/TR/scroll-animations-1/#scroll-timelines), которые связаны с прогрессом прокрутки определенного [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container)
- [View Progress Timelines](https://www.w3.org/TR/scroll-animations-1/#view-timelines), которые связаны с прогрессом просмотра конкретного [box](https://www.w3.org/TR/css-display-3/#box) через [scrollport](https://www.w3.org/TR/css-overflow-3/#scrollport).

ПРИМЕЧАНИЕ: Анимации, управляемые прокруткой*, прогресс которых связан с позицией прокрутки, отличаются от анимаций, управляемых прокруткой*, которые запускаются позицией прокрутки, но прогресс которых определяется временем.

### 1.1. Связь с другими спецификациями

Web Animations [[WEB-ANIMATIONS-1]](https://www.w3.org/TR/scroll-animations-1/#biblio-web-animations-1) определяет абстрактную концептуальную модель для анимаций на Web-платформе, элементы модели включают [анимации](https://www.w3.org/TR/web-animations-1/#concept-animation) и их [временные линии](https://www.w3.org/TR/web-animations-1/#timeline), а также связанные с ними интерфейсы программирования. Эта спецификация расширяет модель Web Animations, определяя [управляемые прокруткой временные линии](https://www.w3.org/TR/scroll-animations-1/#scroll-driven-timelines) и позволяя им управлять прогрессом в анимации для создания [управляемых прокруткой анимаций](https://www.w3.org/TR/scroll-animations-1/#scroll-driven-animations).

Эта спецификация представляет как программные интерфейсы для взаимодействия с этими концепциями, так и свойства CSS, которые применяют эти концепции к CSS-анимациям [[CSS-ANIMATIONS-1]](https://www.w3.org/TR/scroll-animations-1/#biblio-css-animations-1). В той мере, в какой поведение этих свойств CSS описывается в терминах интерфейсов программирования, [User Agents](https://infra.spec.whatwg.org/#user-agent), не поддерживающие сценарии, могут соответствовать данной спецификации, реализуя свойства CSS так, чтобы они вели себя так, как если бы основные интерфейсы программирования были на месте.

Как и большинство других операций в CSS, кроме [селектора](https://www.w3.org/TR/CSS21/syndata.html#x15), функции данной спецификации работают над [уплощенным деревом элементов](https://drafts.csswg.org/css-scoping-1/#flat-tree).

### 1.2. Взаимосвязь с асинхронной прокруткой

Некоторые агенты пользователя поддерживают асинхронную прокрутку относительно макета или сценария. Данная спецификация предназначена для совместимости с такой архитектурой.

В частности, эта спецификация позволяет выразить эффекты, управляемые прокруткой, таким образом, что не требуется запускать сценарий каждый раз, когда эффект сэмплируется. Пользовательским агентам, поддерживающим асинхронную прокрутку, разрешается (но не требуется) сэмплировать такие эффекты также асинхронно.

### 1.3. Определения значений

Данная спецификация следует [соглашениям об определении свойств CSS](https://www.w3.org/TR/CSS2/about.html#property-defs) из [[CSS2]](https://www.w3.org/TR/scroll-animations-1/#biblio-css2), используя [синтаксис определения значений](https://www.w3.org/TR/css-values-3/#value-defs) из [[CSS-VALUES-3]](https://www.w3.org/TR/scroll-animations-1/#biblio-css-values-3). Типы значений, не определенные в данной спецификации, определены в CSS Values & Units [CSS-VALUES-3]. Комбинация с другими модулями CSS может расширить определения этих типов значений.

В дополнение к значениям свойств, перечисленным в их определениях, все свойства, определенные в данной спецификации, также принимают [общие ключевые слова CSS](https://www.w3.org/TR/css-values-4/#css-wide-keywords) в качестве значения свойства. Для удобства чтения они не повторяются в явном виде.

## 2. Временные шкалы прокрутки

Временные шкалы прокрутки - это временные шкалы, связанные с прогрессом в позиции прокрутки [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container) вдоль определенной оси. Самая начальная позиция прокрутки представляет собой 0% прогресса, а самая конечная - 100%.

На [Scroll progress timeline](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines) можно ссылаться в [animation-timeline](https://www.w3.org/TR/css-animations-2/#propdef-animation-timeline) анонимно, используя [scroll()](https://www.w3.org/TR/scroll-animations-1/#funcdef-scroll) [функциональную нотацию](https://www.w3.org/TR/css-values-4/#functional-notation) или по имени (см. [§ 4.2 Named Timeline Scoping and Lookup](https://www.w3.org/TR/scroll-animations-1/#timeline-scoping)) после объявления их с помощью свойств [scroll-timeline](https://www.w3.org/TR/scroll-animations-1/#propdef-scroll-timeline). В Web Animations API они могут быть представлены анонимно объектом `[ScrollTimeline](https://www.w3.org/TR/scroll-animations-1/#scrolltimeline)`.

### 2.1. Вычисление прогресса для временной шкалы прокрутки

Прогресс ([текущее время](https://www.w3.org/TR/web-animations-1/#timeline-current-time)) для [временной шкалы прокрутки](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines) вычисляется как: [смещение прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-offset) ÷ ([прокручиваемое переполнение](https://www.w3.org/TR/css-overflow-3/#scrollable-overflow) размер - [контейнер прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container) размер)

Если позиция 0% и позиция 100% совпадают (т.е. знаменатель в формуле [current time](https://www.w3.org/TR/web-animations-1/#timeline-current-time) равен нулю), то временная шкала является [неактивной](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

В [страничных медиа](https://www.w3.org/TR/mediaqueries-5/#paged-media), [временные шкалы прокрутки](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines), которые в противном случае ссылались бы на область просмотра документа, также [неактивны](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

### 2.2. Анонимные временные шкалы прокрутки

### **2.2.1. Нотация [scroll()](https://www.w3.org/TR/scroll-animations-1/#funcdef-scroll)**.

Функциональная нотация scroll() может использоваться в качестве значения [<single-animation-timeline>](https://www.w3.org/TR/css-animations-2/#typedef-single-animation-timeline) в [animation-timeline](https://www.w3.org/TR/css-animations-2/#propdef-animation-timeline) и задает [scroll progress timeline](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines). Его синтаксис таков

```
<scroll()> = scroll( [<scroller>||<axis> ]?)
<axis> = block| inline| x| y
<scroller> = root| nearest| self

```

По умолчанию [scroll()](https://www.w3.org/TR/scroll-animations-1/#funcdef-scroll) ссылается на [block axis](https://www.w3.org/TR/css-writing-modes-4/#block-axis) ближайшего предка [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container). Его аргументы изменяют этот поиск следующим образом:

**block**Указывает на использование меры прогресса вдоль оси [block axis](https://www.w3.org/TR/css-writing-modes-4/#block-axis) контейнера [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container). (По умолчанию.)**inline**Указывает на использование меры прогресса вдоль [оси inline](https://www.w3.org/TR/css-writing-modes-4/#inline-axis) [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container).**x**Указывает на использование меры прогресса вдоль [горизонтальной оси](https://www.w3.org/TR/css-writing-modes-4/#x-axis) [контейнера прокрутки](https://www. w3.org/TR/css-overflow-3/#scroll-container).**y**Указывает использовать меру прогресса вдоль [вертикальной оси](https://www.w3.org/TR/css-writing-modes-4/#y-axis) [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container).**nearest**Указывает использовать ближайшего предка [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container). (По умолчанию.)**root**Указывает на использование области просмотра документа в качестве [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container).**self**Указывает на использование собственного [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента в качестве [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container). Если основной блок не является контейнером прокрутки, то [временная шкала прокрутки](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines) будет [неактивной](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

ПРИМЕЧАНИЕ: Прогресс указывается относительно [начала прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-origin), которое может меняться в зависимости от [режима записи](https://www.w3.org/TR/css-writing-modes-4/#writing-mode), даже если указаны [x](https://www.w3.org/TR/scroll-animations-1/#valdef-scroll-x) или [y](https://www.w3.org/TR/scroll-animations-1/#valdef-scroll-y).

Ссылки на [корневой элемент](https://www.w3.org/TR/css-display-3/#root-element) распространяются на область просмотра документа (которая функционирует как его [контейнер прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container)).

Каждое использование [scroll()](https://www.w3.org/TR/scroll-animations-1/#funcdef-scroll) соответствует собственному экземпляру `[ScrollTimeline](https://www.w3.org/TR/scroll-animations-1/#scrolltimeline)` в Web Animations API, даже если несколько элементов используют scroll() для ссылки на один и тот же [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container) с одинаковыми аргументами.

### **2.2.2. Интерфейс `[ScrollTimeline](https://www.w3.org/TR/scroll-animations-1/#scrolltimeline)`.

```
enumScrollAxis {
"block",
"inline",
"x",
"y"
};

dictionaryScrollTimelineOptions {
Element?source;
ScrollAxisaxis = "block";
};

[Exposed=Window]
interfaceScrollTimeline :AnimationTimeline {
constructor(optionalScrollTimelineOptionsoptions = {});
  readonly attributeElement?source;
  readonly attributeScrollAxisaxis;
};

```

`[ScrollTimeline](https://www.w3.org/TR/scroll-animations-1/#scrolltimeline)` - это `[AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline)`, который представляет собой [временную шкалу прокрутки](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines). Его можно передать в конструктор `[Animation](https://www.w3.org/TR/web-animations-1/#animation)` или в метод `[animate()](https://www.w3.org/TR/web-animations-1/#dom-animatable-animate)`, чтобы связать анимацию с временной шкалой прокрутки.

**`source`, of type [Element](https://dom.spec.whatwg.org/#element), readonly, nullable**Элемент [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container), чья позиция прокрутки управляет прогрессом временной шкалы.**`axis`, of type [ScrollAxis](https://www.w3.org/TR/scroll-animations-1/#enumdef-scrollaxis), readonly**Ось прокрутки, управляющая прогрессом временной шкалы. См. определения значений для [<axis>](https://www.w3.org/TR/scroll-animations-1/#typedef-axis), выше.

Наследуемые атрибуты:

**`[currentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)` (наследуется от `[AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline)`)**Представляет прогресс прокрутки [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container) в процентах CSSUnitValue, с 0%, представляющим его самую начальную позицию прокрутки (в [режиме записи](https://www.w3.org/TR/css-writing-modes-4/#writing-mode) контейнера прокрутки). Null, если временная шкала [неактивна](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

Хотя 0% обычно представляет собой начальную позицию прокрутки [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container), это может быть не так в зависимости от его [распределения содержимого](https://www.w3.org/TR/css-align-3/#content-distribute). См. [CSS Box Alignment 3 § 5.3 Overflow and Scroll Positions](https://www.w3.org/TR/css-align-3/#overflow-scroll-position). Это то, чего мы хотим?

Добавьте примечание о том, может ли `[currentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)` быть отрицательным или > 100%.

**`ScrollTimeline(options)`**Создает новый объект `[ScrollTimeline](https://www.w3.org/TR/scroll-animations-1/#scrolltimeline)` с помощью следующей процедуры:
1. Пусть timeline - это новый объект `[ScrollTimeline](https://www.w3.org/TR/scroll-animations-1/#scrolltimeline)`.
2. Установите `[источник](https://www.w3.org/TR/scroll-animations-1/#dom-scrolltimeline-source)` timeline в:**Если член `source` опций присутствует и не равен null,**Член `source` опций.**В противном случае,**Элемент `[scrollingElement](https://www.w3.org/TR/cssom-view-1/#dom-document-scrollingelement)` из `[Document](https://dom.spec.whatwg.org/#document)` [связанный](https://html.spec.whatwg.org/multipage/window-object.html#concept-document-window) с `[Window](https://html.spec.whatwg.org/multipage/nav-history-apis.html#window)`, который является [текущим глобальным объектом](https://html.spec.whatwg.org/multipage/webappapis.html#current-global-object).
3. Установите свойство `[axis](https://www.w3.org/TR/scroll-animations-1/#dom-scrolltimeline-axis)` временной шкалы на соответствующее значение из опций.

Если `[источник](https://www.w3.org/TR/scroll-animations-1/#dom-scrolltimeline-source)` `[ScrollTimeline](https://www.w3.org/TR/scroll-animations-1/#scrolltimeline)` является элементом, чей [основной блок](https://www.w3.org/TR/css-display-3/#principal-box) не существует или не является [контейнером прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container), или если нет [прокручиваемого переполнения](https://www.w3.org/TR/css-overflow-3/#scrollable-overflow), то `[ScrollTimeline](https://www.w3.org/TR/scroll-animations-1/#scrolltimeline)` является [неактивным](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

Длительность `[ScrollTimeline](https://www.w3.org/TR/scroll-animations-1/#scrolltimeline)` равна 100%.

Значения `[source](https://www.w3.org/TR/scroll-animations-1/#dom-scrolltimeline-source)` и `[currentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)` вычисляются при запросе или обновлении одного из них.

### 2.3. Именованные временные шкалы прогресса прокрутки

[Временные шкалы прокрутки](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines) также могут быть определены на самом [контейнере прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container), а затем ссылаться по имени на элементы в области видимости имени (см. [§ 4.2 Named Timeline Scoping and Lookup](https://www.w3.org/TR/scroll-animations-1/#timeline-scoping)).

Такие именованные временные шкалы прокрутки объявляются в [скоординированном списке значений](https://www.w3.org/TR/css-values-4/#coordinated-value-list), построенном из [длинных слов](https://www.w3.org/TR/css-cascade-5/#longhand) [сокращенного свойства](https://www.w3.org/TR/scroll-animations-1/#propdef-scroll-timeline) [scroll-timeline](https://www.w3.org/TR/css-cascade-5/#shorthand-property), которые образуют [группу свойств скоординированного списка](https://www.w3.org/TR/css-values-4/#coordinating-list-property) с [scroll-timeline-name](https://www.w3.org/TR/scroll-animations-1/#propdef-scroll-timeline-name) в качестве [базового свойства скоординированного списка](https://www.w3.org/TR/css-values-4/#coordinating-list-base-property). См. [CSS Values 4 § A Coordinating List-Valued Properties](https://www.w3.org/TR/css-values-4/#linked-properties).

### **2.3.1. Именование временной шкалы прокрутки: свойство [scroll-timeline-name](https://www.w3.org/TR/scroll-animations-1/#propdef-scroll-timeline-name)

| Имя: | scroll-timeline-name |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | none https://www.w3.org/TR/css-values-4/#comb-one https://www.w3.org/TR/css-values-4/#typedef-dashed-identhttps://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | none |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-pseudo/#generated-content |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | n/a |
| https://www.w3.org/TR/css-cascade/#computed | ключевое слово none или список https://www.w3.org/TR/css-values-4/#css-css-identifier |
| https://www.w3.org/TR/cssom/#serializing-css-values | по грамматике |
| https://www.w3.org/TR/web-animations/#animation-type | не анимируется |

Определяет имена для [именованных временных линий прокрутки](https://www.w3.org/TR/scroll-animations-1/#named-scroll-progress-timelines), связанных с этим элементом.

### **2.3.2. Ось временной шкалы прокрутки: свойство [scroll-timeline-axis](https://www.w3.org/TR/scroll-animations-1/#propdef-scroll-timeline-axis)

| Имя: | scroll-timeline-axis |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | [ блок https://www.w3.org/TR/css-values-4/#comb-one inline | x | y ]https://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | block |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-pseudo/#generated-content |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | n/a |
| https://www.w3.org/TR/css-cascade/#computed | список указанных ключевых слов |
| https://www.w3.org/TR/cssom/#serializing-css-values | на грамматику |
| https://www.w3.org/TR/web-animations/#animation-type | не анимируется |

Указывает ось любой [именованной временной шкалы прокрутки](https://www.w3.org/TR/scroll-animations-1/#named-scroll-progress-timelines), исходящей из этого [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container). Если этот бокс не является контейнером прокрутки, то соответствующая именованная временная шкала прокрутки будет [неактивной](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

Значения соответствуют определению для [scroll()](https://www.w3.org/TR/scroll-animations-1/#funcdef-scroll).

### **2.3.3. Сокращение временной шкалы прокрутки: сокращение [scroll-timeline](https://www.w3.org/TR/scroll-animations-1/#propdef-scroll-timeline)**.

| Имя: | scroll-timeline |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | [ https://www.w3.org/TR/scroll-animations-1/#propdef-scroll-timeline-name https://www.w3.org/TR/scroll-animations-1/#propdef-scroll-timeline-axishttps://www.w3.org/TR/css-values-4/#mult-opt ]https://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | см. отдельные свойства |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-pseudo/#generated-content |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | см. отдельные объекты |
| https://www.w3.org/TR/css-cascade/#computed | см. индивидуальные свойства |
| https://www.w3.org/TR/web-animations/#animation-type | не анимируемый |
| https://www.w3.org/TR/cssom/#serializing-css-values | по грамматике |

Это свойство является [сокращением](https://www.w3.org/TR/css-cascade-5/#shorthand-property) для установки [scroll-timeline-name](https://www.w3.org/TR/scroll-animations-1/#propdef-scroll-timeline-name) и [scroll-timeline-axis](https://www.w3.org/TR/scroll-animations-1/#propdef-scroll-timeline-axis) в одном объявлении.

## 3. Просмотр временной шкалы выполнения

Часто требуется, чтобы анимация начиналась и заканчивалась в течение того отрезка времени [scroll progress timeline](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines), когда определенный бокс (объект прокрутки) находится в поле зрения [scrollport](https://www.w3.org/TR/css-overflow-3/#scrollport). Временные шкалы прокрутки - это сегменты временной шкалы прокрутки, которые привязаны к позициям прокрутки, в которых любая часть [основного бокса](https://www.w3.org/TR/css-display-3/#principal-box) элемента субъекта пересекает ближайший предшествующий экран прокрутки (точнее, соответствующий [диапазон видимости прокрутки](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range) этого экрана прокрутки). Самая начальная позиция прокрутки представляет собой 0% прогресса, а самая конечная - 100% прогресса; смотрите [§ 3.2 Вычисление прогресса для временной шкалы прогресса](https://www.w3.org/TR/scroll-animations-1/#view-timeline-progress).

ПРИМЕЧАНИЕ: Позиции прокрутки 0% и 100% не всегда достижимы, например, если поле расположено у начального края [прямоугольника переполнения с возможностью прокрутки](https://www.w3.org/TR/css-overflow-3/#scrollable-overflow-rectangle), прокрутка до < 32% прогресса может оказаться невозможной.

На временные шкалы [View progress timeline](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines) можно ссылаться анонимно, используя [view()](https://www.w3.org/TR/scroll-animations-1/#funcdef-view) [функциональную нотацию](https://www.w3.org/TR/css-values-4/#functional-notation) или по имени (см. [§ 4.2 Named Timeline Scoping and Lookup](https://www.w3.org/TR/scroll-animations-1/#timeline-scoping)) после объявления их с помощью свойств [view-timeline](https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline) на объекте [view progress](https://www.w3.org/TR/scroll-animations-1/#view-progress-subject). В Web Animations API они могут быть представлены анонимно объектом `[ViewTimeline](https://www.w3.org/TR/scroll-animations-1/#viewtimeline)`.

### 3.1. Диапазоны временной шкалы прогресса

[Временные шкалы прогресса](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines) определяют следующие [именованные диапазоны временных шкал](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range):

**cover**Представляет собой полный диапазон временной шкалы [view progress timeline](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines):
- 0% прогресса представляет собой самую позднюю позицию, в которой [начало](https://dom.spec.whatwg.org/#concept-range-start) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с [концом](https://dom.spec.whatwg.org/#concept-range-end) края его [диапазона видимости прогресса просмотра](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range).
- 100% прогресс представляет собой самое раннее положение, в котором [конец](https://dom.spec.whatwg.org/#concept-range-end) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с [началом](https://dom.spec.whatwg.org/#concept-range-start) края его [диапазона видимости](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range).**contain**Представляет собой диапазон, в котором [основное поле](https://www.w3.org/TR/css-display-3/#principal-box) либо полностью содержится, либо полностью покрывает его [диапазон видимости](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range) в пределах [экрана прокрутки](https://www.w3.org/TR/css-overflow-3/#scrollport).
- Прогресс 0% представляет собой самое раннее положение, в котором либо:
  ◦ [начало](https://dom.spec.whatwg.org/#concept-range-start) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с начальным краем его [диапазона видимости прогресса просмотра](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range).
  ◦ [конец](https://dom.spec.whatwg.org/#concept-range-end) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с конечным краем его [диапазона видимости прогресса просмотра](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range).
- Прогресс 100 % представляет собой последнюю позицию, в которой либо:
  ◦ [начало](https://dom.spec.whatwg.org/#concept-range-start) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с начальным краем его [диапазона видимости прогресса просмотра](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range).
  ◦ [конец](https://dom.spec.whatwg.org/#concept-range-end) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного бокса](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с конечным краем его [диапазона видимости](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range).**вступление**Представляет собой диапазон, в котором [основной бокс](https://www.w3.org/TR/css-display-3/#principal-box) входит в [диапазон видимости](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range).
- 0% эквивалентно 0% диапазона [cover](https://www.w3.org/TR/scroll-animations-1/#valdef-animation-timeline-range-cover).
- 100% эквивалентно 0% диапазона [contain](https://www.w3.org/TR/scroll-animations-1/#valdef-animation-timeline-range-contain).**exit**Представляет диапазон, в котором [основной бокс](https://www.w3.org/TR/css-display-3/#principal-box) выходит из [диапазона видимости](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range).
- 0% эквивалентно 100% диапазона [contain](https://www.w3.org/TR/scroll-animations-1/#valdef-animation-timeline-range-contain).
- 100% эквивалентно 100% диапазона [cover](https://www.w3.org/TR/scroll-animations-1/#valdef-animation-timeline-range-cover).**Вход-пересечение**Представляет собой диапазон, в котором [основное поле](https://www.w3.org/TR/css-display-3/#principal-box) пересекает [конец](https://dom.spec.whatwg.org/#concept-range-end) [край границы](https://www.w3.org/TR/css-box-4/#border-edge).
- 0% прогресса представляет собой самую позднюю позицию, в которой [начало](https://dom.spec.whatwg.org/#concept-range-start) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с [концом](https://dom.spec.whatwg.org/#concept-range-end) края его [диапазона видимости прогресса](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range).
- 100% прогресс представляет собой самую раннюю позицию, в которой [конец](https://dom.spec.whatwg.org/#concept-range-end) [граничного края](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с конечным краем его [диапазона видимости прогресса просмотра](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range).**пересечение выхода**Представляет собой диапазон, в котором [основное поле](https://www.w3.org/TR/css-display-3/#principal-box) пересекает [начало](https://dom.spec.whatwg.org/#concept-range-start) [граничного края](https://www.w3.org/TR/css-box-4/#border-edge).
- 0% прогресса представляет собой самую позднюю позицию, в которой [начало](https://dom.spec.whatwg.org/#concept-range-start) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с начальным краем его [диапазона видимости прогресса](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range).
- 100-процентный прогресс представляет собой самое раннее положение, при котором [конец](https://dom.spec.whatwg.org/#concept-range-end) [край границы](https://www.w3.org/TR/css-box-4/#border-edge) [основного поля](https://www.w3.org/TR/css-display-3/#principal-box) элемента совпадает с [началом](https://dom.spec.whatwg.org/#concept-range-start) края его [диапазона видимости прогресса просмотра](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range).

Вставка диаграмм.

Во всех случаях [режим записи](https://www.w3.org/TR/css-writing-modes-4/#writing-mode), используемый для разрешения [начальной](https://dom.spec.whatwg.org/#concept-range-start) и [конечной](https://dom.spec.whatwg.org/#concept-range-end) сторон, является режимом записи соответствующего [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container). [Трансформации](https://www.w3.org/TR/css-transforms/) игнорируются, но учитывается [относительное](https://www.w3.org/TR/CSS21/visuren.html#x34) и [абсолютное](https://www.w3.org/TR/css-position-3/#absolute-position) позиционирование.

ПРИМЕЧАНИЕ: Для [липких полей](https://www.w3.org/TR/css-position-3/#sticky-position) условия прогресса 0% и 100% иногда могут быть удовлетворены диапазоном положений прокрутки, а не только одним. Поэтому в каждом диапазоне указывается, какую позицию следует использовать - самую раннюю или самую позднюю.

[[CSS-POSITION-3]](https://www.w3.org/TR/scroll-animations-1/#biblio-css-position-3) [[CSS-TRANSFORMS-1]](https://www.w3.org/TR/scroll-animations-1/#biblio-css-transforms-1)

### 3.2. Вычисление прогресса для временной шкалы прогресса представления

Прогресс ([текущее время](https://www.w3.org/TR/web-animations-1/#timeline-current-time)) на временной шкале [view progress timeline](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines) вычисляется как: расстояние ÷ диапазон, где:

- расстояние - это текущее [смещение прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-offset) минус смещение прокрутки, соответствующее началу диапазона [обложки](https://www.w3.org/TR/scroll-animations-1/#valdef-animation-timeline-range-cover)
- диапазон - это [смещение прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-offset), соответствующее началу диапазона [обложки](https://www.w3.org/TR/scroll-animations-1/#valdef-animation-timeline-range-cover), минус смещение прокрутки, соответствующее концу диапазона обложки.

Если позиции 0% и 100% совпадают (т.е. знаменатель в формуле [текущее время](https://www.w3.org/TR/web-animations-1/#timeline-current-time) равен нулю), то временная шкала является [неактивной](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

В [paged media](https://www.w3.org/TR/mediaqueries-5/#paged-media), [view progress timelines](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines), которые в противном случае ссылались бы на область просмотра документа, также [неактивны](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

### 3.3. Анонимные временные шкалы прогресса просмотра

### **3.3.1. Нотация [view()](https://www.w3.org/TR/scroll-animations-1/#funcdef-view)**.

Функциональная нотация view() может использоваться в качестве значения [<single-animation-timeline>](https://www.w3.org/TR/css-animations-2/#typedef-single-animation-timeline) в [animation-timeline](https://www.w3.org/TR/css-animations-2/#propdef-animation-timeline) и задает [view progress timeline](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines) по отношению к ближайшему предку [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container). Его синтаксис таков

```
<view()> = view( [<axis>||<'view-timeline-inset'> ]?)

```

По умолчанию [view()](https://www.w3.org/TR/scroll-animations-1/#funcdef-view) ссылается на [ось блока](https://www.w3.org/TR/css-writing-modes-4/#block-axis); как и для [scroll()](https://www.w3.org/TR/scroll-animations-1/#funcdef-scroll), это можно изменить, указав явное значение [<axis>](https://www.w3.org/TR/scroll-animations-1/#typedef-axis).

Необязательное значение [<'view-timeline-inset'>](https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline-inset) обеспечивает настройку диапазона видимости [view progress visibility range](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range), как определено для view-timeline-inset.

Каждое использование [view()](https://www.w3.org/TR/scroll-animations-1/#funcdef-view) соответствует собственному экземпляру `[ViewTimeline](https://www.w3.org/TR/scroll-animations-1/#viewtimeline)` в Web Animations API, даже если несколько элементов используют view() для ссылки на один и тот же элемент с одинаковыми аргументами.

### **3.3.2. Интерфейс `[ViewTimeline](https://www.w3.org/TR/scroll-animations-1/#viewtimeline)`.

```
dictionaryViewTimelineOptions {
Elementsubject;
ScrollAxisaxis = "block";
  (DOMString orsequence<(CSSNumericValue orCSSKeywordValue)>)inset = "auto";
};

[Exposed=Window]
interfaceViewTimeline :ScrollTimeline {
constructor(optionalViewTimelineOptionsoptions = {});
  readonly attributeElementsubject;
  readonly attributeCSSNumericValuestartOffset;
  readonly attributeCSSNumericValueendOffset;
};

```

`[ViewTimeline](https://www.w3.org/TR/scroll-animations-1/#viewtimeline)` - это `[AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline)`, который определяет [временную шкалу прогресса представления](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines). Его можно передать конструктору `[Animation](https://www.w3.org/TR/web-animations-1/#animation)` или методу `[animate()](https://www.w3.org/TR/web-animations-1/#dom-animatable-animate)`, чтобы связать анимацию с временной шкалой прогресса просмотра.

**`subject`, of type [Element](https://dom.spec.whatwg.org/#element), readonly**Элемент, видимость которого [principal box](https://www.w3.org/TR/css-display-3/#principal-box) в [scrollport](https://www.w3.org/TR/css-overflow-3/#scrollport) определяет прогресс временной шкалы.**`startOffset`, of type [CSSNumericValue](https://www.w3.org/TR/css-typed-om-1/#cssnumericvalue), readonly**Представляет начальную (0% прогресса) позицию прокрутки [view progress timeline](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines) в виде смещения по длине (в [px](https://www.w3.org/TR/css-values-4/#px)) от [scroll origin](https://www.w3.org/TR/css-overflow-3/#scroll-origin). Null, если временная шкала [неактивна](https://www.w3.org/TR/web-animations-1/#inactive-timeline).**`endOffset`, of type [CSSNumericValue](https://www.w3.org/TR/css-typed-om-1/#cssnumericvalue), readonly**Представляет собой конечную (100% прогресса) позицию прокрутки [view progress timeline](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines) в виде смещения по длине (в [px](https://www.w3.org/TR/css-values-4/#px)) от [scroll origin](https://www.w3.org/TR/css-overflow-3/#scroll-origin). Null, если временная шкала [неактивна](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

ПРИМЕЧАНИЕ: Значения `[startOffset](https://www.w3.org/TR/scroll-animations-1/#dom-viewtimeline-startoffset)` и `[endOffset](https://www.w3.org/TR/scroll-animations-1/#dom-viewtimeline-endoffset)` относятся к [началу прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-origin), а не к [физическому](https://www.w3.org/TR/css-writing-modes-4/#physical) левому верхнему углу. В зависимости от [режима записи](https://www.w3.org/TR/css-writing-modes-4/#writing-mode) [контейнера прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container), они могут не совпадать со значениями `[scrollLeft](https://www.w3.org/TR/cssom-view-1/#dom-element-scrollleft)` или `[scrollTop](https://www.w3.org/TR/cssom-view-1/#dom-element-scrolltop)`, например, на [горизонтальной оси](https://www.w3.org/TR/css-writing-modes-4/#x-axis) в режиме записи справа налево ([rtl](https://www.w3.org/TR/css-writing-modes-4/#valdef-direction-rtl)).

Наследуемые атрибуты:

**`[source](https://www.w3.org/TR/scroll-animations-1/#dom-scrolltimeline-source)` (наследуется от `[ScrollTimeline](https://www.w3.org/TR/scroll-animations-1/#scrolltimeline)`)**Кратчайший предок `[subject](https://www.w3.org/TR/scroll-animations-1/#dom-viewtimeline-subject)`, чей [principal box](https://www.w3.org/TR/css-display-3/#principal-box) устанавливает [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container), чья позиция прокрутки управляет ходом временной шкалы.**`[axis](https://www.w3.org/TR/scroll-animations-1/#dom-scrolltimeline-axis)` (наследуется от `[ScrollTimeline](https://www.w3.org/TR/scroll-animations-1/#scrolltimeline)`)**Указывает ось прокрутки, которая управляет ходом временной шкалы. См. [<axis>](https://www.w3.org/TR/scroll-animations-1/#typedef-axis), выше.**`[currentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)` (наследуется от `[AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline)`)**Представляет текущий прогресс [view progress timeline](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines) в процентах `[CSSUnitValue](https://www.w3.org/TR/css-typed-om-1/#cssunitvalue)`, представляющий прогресс прокрутки [scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container) в данной позиции. Null, если временная шкала [неактивна](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

**`ViewTimeline(options)`**Создает новый объект `[ViewTimeline](https://www.w3.org/TR/scroll-animations-1/#viewtimeline)`, используя следующую процедуру:
1. Пусть timeline - это новый объект `[ViewTimeline](https://www.w3.org/TR/scroll-animations-1/#viewtimeline)`.
2. Установите для свойств `[subject](https://www.w3.org/TR/scroll-animations-1/#dom-viewtimeline-subject)` и `[axis](https://www.w3.org/TR/scroll-animations-1/#dom-scrolltimeline-axis)` timeline соответствующие значения из опций.
3. Установите `[источник](https://www.w3.org/TR/scroll-animations-1/#dom-scrolltimeline-source)` временной шкалы на ближайшего предка элемента `[предмет](https://www.w3.org/TR/scroll-animations-1/#dom-viewtimeline-subject)` [контейнер прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container).
4. Если в качестве вставки указано значение `[DOMString](https://webidl.spec.whatwg.org/#idl-DOMString)`, разберите его как значение [<'view-timeline-inset'>](https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline-inset); если указана последовательность, первое значение представляет собой начальную вставку, а второе - конечную. Если последовательность имеет только одно значение, оно дублируется. Если она имеет нулевое значение или более двух значений, или если она содержит `[CSSKeywordValue](https://www.w3.org/TR/css-typed-om-1/#csskeywordvalue)`, чье `[value](https://www.w3.org/TR/css-typed-om-1/#dom-csskeywordvalue-value)` не является "auto", выдает ошибку TypeError.
   Эти вставки определяют диапазон видимости `[ViewTimeline](https://www.w3.org/TR/scroll-animations-1/#viewtimeline)` [view progress visibility range](https://www.w3.org/TR/scroll-animations-1/#view-progress-visibility-range).

Если `[источник](https://www.w3.org/TR/scroll-animations-1/#dom-scrolltimeline-source)` или `[тема](https://www.w3.org/TR/scroll-animations-1/#dom-viewtimeline-subject)` элемента `[ViewTimeline](https://www.w3.org/TR/scroll-animations-1/#viewtimeline)` является элементом, [основной блок](https://www.w3.org/TR/css-display-3/#principal-box) которого не существует, или если его ближайший предок [контейнер прокрутки](https://www.w3.org/TR/css-overflow-3/#scroll-container) не имеет [прокручиваемого переполнения](https://www.w3.org/TR/css-overflow-3/#scrollable-overflow) (или если такого предка нет, например, в печатных СМИ), то `[ViewTimeline](https://www.w3.org/TR/scroll-animations-1/#viewtimeline)` является [неактивным](https://www.w3.org/TR/web-animations-1/#inactive-timeline).

Значения `[subject](https://www.w3.org/TR/scroll-animations-1/#dom-viewtimeline-subject)`, `[source](https://www.w3.org/TR/scroll-animations-1/#dom-scrolltimeline-source)` и `[currentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)` вычисляются при запросе или обновлении любого из них.

### 3.4. Именованные временные шкалы прогресса представления

[Временные шкалы прогресса представления](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines) также могут быть определены декларативно и затем ссылаться по имени на элементы в области видимости этого имени (см. [§ 4.2 Named Timeline Scoping and Lookup](https://www.w3.org/TR/scroll-animations-1/#timeline-scoping)).

Такие именованные временные шкалы выполнения вида объявляются в [согласованном списке значений](https://www.w3.org/TR/css-values-4/#coordinated-value-list), построенном из свойств view-timeline-*, которые образуют группу свойств [согласованного списка](https://www.w3.org/TR/css-values-4/#coordinating-list-property) с [view-timeline-name](https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline-name) в качестве базового свойства [согласованного списка](https://www.w3.org/TR/css-values-4/#coordinating-list-base-property). См. [CSS Values 4 § A Coordinating List-Valued Properties](https://www.w3.org/TR/css-values-4/#linked-properties).

### **3.4.1. Именование временной шкалы прогресса представления: свойство [view-timeline-name](https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline-name)

| Имя: | view-timeline-name |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | none https://www.w3.org/TR/css-values-4/#comb-one https://www.w3.org/TR/css-values-4/#typedef-dashed-identhttps://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | none |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-pseudo/#generated-content |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | n/a |
| https://www.w3.org/TR/css-cascade/#computed | ключевое слово none или список https://www.w3.org/TR/css-values-4/#css-css-identifier |
| https://www.w3.org/TR/cssom/#serializing-css-values | по грамматике |
| https://www.w3.org/TR/web-animations/#animation-type | не анимируется |

Определяет имена для [именованных временных шкал прогресса просмотра](https://www.w3.org/TR/scroll-animations-1/#named-view-progress-timelines), связанных с этим элементом.

### **3.4.2. Ось временной шкалы прогресса представления: свойство [view-timeline-axis](https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline-axis)

| Имя: | view-timeline-axis |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | [ блок https://www.w3.org/TR/css-values-4/#comb-one inline | x | y ]https://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | block |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-pseudo/#generated-content |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | n/a |
| https://www.w3.org/TR/css-cascade/#computed | список указанных ключевых слов |
| https://www.w3.org/TR/cssom/#serializing-css-values | на грамматику |
| https://www.w3.org/TR/web-animations/#animation-type | не анимируется |

Определяет ось любого [именованного графика выполнения вида](https://www.w3.org/TR/scroll-animations-1/#named-view-progress-timelines), полученного из [основного блока](https://www.w3.org/TR/css-display-3/#principal-box) этого элемента.

Значения соответствуют определению для [view()](https://www.w3.org/TR/scroll-animations-1/#funcdef-view).

### **3.4.3. Вставка временной шкалы просмотра: свойство [view-timeline-inset](https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline-inset)

| Имя: | view-timeline-inset |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | [ [ auto https://www.w3.org/TR/css-values-4/#comb-one https://www.w3.org/TR/css-values-4/#typedef-length-percentage ]https://www.w3.org/TR/css-values-4/#mult-num-range ]https://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | auto |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-pseudo/#generated-content |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | относительно соответствующего размера соответствующей области прокрутки |
| https://www.w3.org/TR/css-cascade/#computed | список, состоящий из двух пар значений, представляющих начальную и конечную вставки, каждая из которых представляет собой либо ключевое слово https://www.w3.org/TR/scroll-animations-1/#valdef-view-timeline-inset-auto, либо вычисленное значение https://www.w3.org/TR/css-values-4/#typedef-length-percentage |
| https://www.w3.org/TR/cssom/#serializing-css-values | по грамматике |
| https://www.w3.org/TR/web-animations/#animation-type | по типу вычисляемого значения |

Определяет начальную (положительную) или конечную (отрицательную) настройку [scrollport](https://www.w3.org/TR/css-overflow-3/#scrollport) при определении того, находится ли окно в поле зрения при установке границ соответствующего [view progress timeline](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines). Первое значение представляет собой [начальную](https://dom.spec.whatwg.org/#concept-range-start) вставку по соответствующей оси; второе значение представляет собой [конечную](https://dom.spec.whatwg.org/#concept-range-end) вставку. Если второе значение опущено, оно устанавливается равным первому. Результирующий диапазон области прокрутки - это диапазон видимости прогресса просмотра.

**auto**Указывает на использование значения [scroll-padding](https://www.w3.org/TR/css-scroll-snap-1/#propdef-scroll-padding).**[<length-percentage>](https://www.w3.org/TR/css-values-4/#typedef-length-percentage)**Как и [scroll-padding](https://www.w3.org/TR/css-scroll-snap-1/#propdef-scroll-padding), задает смещение внутрь от соответствующего края области прокрутки.

### **3.4.4. Сокращение временной шкалы просмотра: сокращение [view-timeline](https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline)**.

| Имя: | view-timeline |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | [ https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline-name https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline-axishttps://www.w3.org/TR/css-values-4/#mult-opt ]https://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | см. отдельные свойства |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-pseudo/#generated-content |
| https://www.w3.org/TR/css-cascade/#inherited-property | смотреть отдельные свойства |
| https://www.w3.org/TR/css-values/#percentages | смотрите индивидуальные свойства |
| https://www.w3.org/TR/css-cascade/#computed | смотрите индивидуальные свойства |
| https://www.w3.org/TR/web-animations/#animation-type | см. индивидуальные свойства |
| https://www.w3.org/TR/cssom/#serializing-css-values | по грамматике |

Это свойство является [сокращением](https://www.w3.org/TR/css-cascade-5/#shorthand-property) для установки [view-timeline-name](https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline-name) и [view-timeline-axis](https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline-axis) в одном объявлении. Он не устанавливает [view-timeline-inset](https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline-inset).

Должен ли он также сбрасывать [view-timeline-inset](https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline-inset)?

## 4. Прикрепление анимации к [Scroll-driven Timelines](https://www.w3.org/TR/scroll-animations-1/#scroll-driven-timelines)

Анимации могут быть прикреплены к [временным шкалам с прокруткой](https://www.w3.org/TR/scroll-animations-1/#scroll-driven-timelines) с помощью свойства [scroll-timeline](https://www.w3.org/TR/scroll-animations-1/#propdef-scroll-timeline) (в CSS) или параметров `[AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline)` (в Web Animations API). Диапазон временной шкалы, к которому привязан их [активный интервал](https://www.w3.org/TR/web-animations-1/#active-interval), также может быть дополнительно ограничен определенным диапазоном временной шкалы (см. [Прикрепление анимаций к диапазонам временной шкалы](https://www.w3.org/TR/scroll-animations-1/#named-range-animation-declaration)).

Задержки, основанные на времени ([animation-delay](https://www.w3.org/TR/css-animations-1/#propdef-animation-delay)), не применяются к [scroll-driven animations](https://www.w3.org/TR/scroll-animations-1/#scroll-driven-animations), которые основаны на расстоянии.

### 4.1. Вычисления на конечной временной шкале

В отличие от временных шкал, [scroll-driven timelines](https://www.w3.org/TR/scroll-animations-1/#scroll-driven-timelines) конечны, поэтому [scroll-driven animations](https://www.w3.org/TR/scroll-animations-1/#scroll-driven-animations) всегда привязаны к конечному [attachment range](https://www.w3.org/TR/scroll-animations-1/#animation-attachment-range)-который может быть дополнительно ограничен [animation-range](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range) (см. [Appendix A: Timeline Ranges](https://www.w3.org/TR/scroll-animations-1/#timeline-ranges)). Анимация

итераций (

[animation-iteration-count](https://www.w3.org/TR/css-animations-1/#propdef-animation-iteration-count)

) устанавливаются в пределах этого конечного диапазона. Если указанная длительность

[auto](https://drafts.csswg.org/css-animations-2/#valdef-animation-duration-auto)

, то оставшийся диапазон делится на его

[счетчик итераций](https://www.w3.org/TR/web-animations-1/#iteration-count)

(animation-iteration-count), чтобы найти

[used](https://www.w3.org/TR/css-cascade-5/#used-value)

продолжительность.

ПРИМЕЧАНИЕ: Если анимация имеет бесконечный [счетчик итераций](https://www.w3.org/TR/web-animations-1/#iteration-count), каждая [длительность итерации](https://www.w3.org/TR/web-animations-1/#iteration-duration)- и результирующая [активная длительность](https://www.w3.org/TR/web-animations-1/#active-duration)- будут равны нулю.

Анимации, включающие абсолютно позиционированные ключевые кадры (привязанные к определенной точке временной шкалы, например, с помощью [named timeline range keyframe selectors](https://www.w3.org/TR/scroll-animations-1/#named-range-keyframes) в [@keyframes](https://www.w3.org/TR/css-animations-1/#at-ruledef-keyframes)), считаются имеющими [iteration count](https://www.w3.org/TR/web-animations-1/#iteration-count) равным 1 для определения положения этих ключевых кадров относительно 0% и 100%; затем вся анимация масштабируется для соответствия [iteration duration](https://www.w3.org/TR/web-animations-1/#iteration-duration) и повторяется для каждой итерации.

ПРИМЕЧАНИЕ: Неясно, как можно использовать комбинацию абсолютно позиционированных ключевых кадров с количеством итераций больше 1; это, по крайней мере, дает определенное поведение. (Альтернативным, но, возможно, более странным вариантом поведения было бы выведение таких абсолютно позиционированных ключевых кадров "из потока" во время итерации остальных ключевых кадров). Редакторам было бы интересно узнать о реальных случаях использования нескольких итераций.

### 4.2. Именованные временные шкалы и поиск

На именованную временную шкалу [scroll progress timeline](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines) или [view progress timeline](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines) можно ссылаться по:

- сам элемент, объявляющий имя
- потомки этого элемента.

ПРИМЕЧАНИЕ: Свойство [timeline-scope](https://www.w3.org/TR/scroll-animations-1/#propdef-timeline-scope) может быть использовано для объявления имени временной шкалы на предке определяющего элемента, эффективно расширяя ее область действия за пределы поддерева этого элемента.

Если несколько элементов объявили одно и то же имя временной шкалы, то соответствующей временной шкалой будет та, которая объявлена на ближайшем по порядку элементе дерева. В случае конфликта имен в одном и том же элементе приоритет имеют имена, объявленные позже в свойстве именования ([scroll-timeline-name](https://www.w3.org/TR/scroll-animations-1/#propdef-scroll-timeline-name), [view-timeline-name](https://www.w3.org/TR/scroll-animations-1/#propdef-view-timeline-name)), а [scroll progress timelines](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines) имеет приоритет над [view progress timelines](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines).

Используя timeline-scope, элемент может ссылаться на временные шкалы, связанные с элементами, которые являются родными, двоюродными или даже потомками. Например, ниже создается анимация на элементе, который связан с временной шкалой [scroll progress timeline](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines), определенной последующим братом или сестрой.

`<style>
@keyframes anim {
from { цвет: красный; }
to { цвет: зеленый; }
}

.root {
/* Определяет область видимости временной шкалы 'scroller', чтобы она охватывала всех потомков */
timeline-scope: scroller;
}

.root .animation {
анимация: anim;
/* ссылается на временную шкалу 'scroller' для управления прогрессом 'anim' */
animation-timeline: scroller;
}

.root .animation + .scroller {
/* присоединяет временную шкалу прогресса прокрутки к временной шкале с именем 'scroller' */
scroll-timeline: scroller;
}
</style>
&hellip;
<section class="root">
  <div class="animation">Анимирующий блок</div>
  <div class="scroller">Прокручиваемый блок</div>
</section>`

### 4.3. События анимации

[Анимации с прокруткой](https://www.w3.org/TR/scroll-animations-1/#scroll-driven-animations) вызывают все те же события анимации, что и более типичные анимации, управляемые временем, как описано в [Web Animations § 4.4.18 Animation events](https://www.w3.org/TR/web-animations-1/#animation-events-section), [CSS Animations 1 § 4 Animation Events](https://www.w3.org/TR/css-animations-1/#events), и [CSS Animations 2 § 4.1 Event dispatch](https://www.w3.org/TR/css-animations-2/#event-dispatch).

ПРИМЕЧАНИЕ: При прокрутке назад событие `animationstart` срабатывает в *конце* [активного интервала](https://www.w3.org/TR/web-animations-1/#active-interval), а событие `animationend` - в начале активного интервала. Однако, поскольку событие `finish` связано с входом в [состояние законченной игры](https://www.w3.org/TR/web-animations-1/#finished-play-state), оно срабатывает только при прокрутке вперед.

## 5. Детали расчета кадров

### 5.1. Модель обработки HTML: цикл событий

Способность прокрутки управлять ходом анимации приводит к возникновению циклов компоновки, когда изменение смещения прокрутки приводит к обновлению эффекта анимации, что, в свою очередь, вызывает новое изменение смещения прокрутки.

Чтобы избежать таких [циклов компоновки](https://www.w3.org/TR/scroll-animations-1/#layout-cycles), анимации с [временной шкалой прокрутки](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines) обновляют свое текущее время один раз на шаге 7.10 цикла событий [Модель обработки HTML](https://html.spec.whatwg.org/multipage/webappapis.html#processing-model-8), как шаг 1 [обновления анимации и отправки событий](https://www.w3.org/TR/web-animations-1/#update-animations-and-send-events).

На шаге 7.14.1 [Модели обработки HTML](https://html.spec.whatwg.org/multipage/webappapis.html#processing-model-8) все созданные [временные шкалы прокрутки](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines) или [временные шкалы просмотра](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines) собираются в набор устаревших временных шкал. После шага 7.14, если [именованные диапазоны временных шкал](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range) каких-либо временных шкал изменились, эти шкалы добавляются в набор [неактуальных временных шкал](https://www.w3.org/TR/scroll-animations-1/#stale-timelines). Если есть устаревшие временные линии, они обновляют свое текущее время и связанные с ним диапазоны, набор устаревших временных линий очищается, и мы запускаем дополнительный шаг для пересчета стилей и обновления макета.

ПРИМЕЧАНИЕ: Мы проверяем изменения макета после отправки любого `[ResizeObserver](https://www.w3.org/TR/resize-observer-1/#resizeobserver)` специально, чтобы учесть программные размеры элементов.

ПРИМЕЧАНИЕ: Поскольку мы собираем устаревшие временные шкалы только во время первого расчета стиля и макета, это может напрямую вызвать только один дополнительный пересчет стиля. Другие API, требующие еще одного обновления, должны быть проверены на том же этапе и обновлены в то же время.

ПРИМЕЧАНИЕ: Без этого дополнительного раунда пересчета стиля и макета [изначально несвежие](https://www.w3.org/TR/scroll-animations-1/#initially-stale) временные шкалы останутся несвежими (т. е. не будут иметь текущего времени) до конца кадра, в котором была создана временная шкала. Это означает, что анимация, связанная с такой временной шкалой, не будет создавать никаких эффектов для этого кадра, что может привести к нежелательной начальной "вспышке" в визуализации.

ПРИМЕЧАНИЕ: Этот раздел не влияет на принудительные вычисления стиля и макета, запускаемые функцией `[getComputedStyle()](https://www.w3.org/TR/cssom-1/#dom-window-getcomputedstyle)` или аналогичными. Другими словами, [изначально несвежие](https://www.w3.org/TR/scroll-animations-1/#initially-stale) таймлайны видны как таковые через эти API.

Если окончательное обновление стиля и макета приведет к изменению времени или области видимости (см. [timeline-scope](https://www.w3.org/TR/scroll-animations-1/#propdef-timeline-scope)) любых [scroll progress timelines](https://www.w3.org/TR/scroll-animations-1/#scroll-progress-timelines) или [view progress timelines](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines), они не будут повторно сэмплированы для отражения нового состояния до следующего обновления рендеринга.

Ничто в этом разделе не требует, чтобы прокрутка блокировалась макетом или сценарием. Если пользовательский агент обычно компонует кадры, в которых произошла прокрутка, но последствия прокрутки не были полностью отражены в макете или сценарии (например, слушатели событий `scroll` еще не запущены), пользовательский агент может также решить не сэмплировать анимацию, управляемую прокруткой, для этого компонуемого кадра. В таких случаях отрисованное смещение прокрутки и состояние анимации, управляемой прокруткой, могут быть несовместимы в скомпонованном кадре.

## 6. Соображения конфиденциальности

О влиянии функций данной спецификации на конфиденциальность ничего не известно.

## 7. Соображения безопасности

О влиянии функций данной спецификации на безопасность ничего не известно.

## Приложение A: Временные рамки

Этот раздел следует перенести в CSS-ANIMATIONS-2 и WEB-ANIMATIONS-2.

Это приложение вводит понятия [именованных диапазонов временной шкалы](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range) и [диапазонов вложений анимации](https://www.w3.org/TR/scroll-animations-1/#animation-attachment-range) в [CSS-анимации](https://www.w3.org/TR/css-animations/) и [Web-анимации](https://www.w3.org/TR/web-animations/).

### Именованные диапазоны временной шкалы

Именованный диапазон временной шкалы - это именованный сегмент анимации [timeline](https://www.w3.org/TR/web-animations-1/#timeline). Начало сегмента представлено как 0 % прогресса по диапазону; конец сегмента представлен как 100 % прогресса по диапазону. Несколько [именованных диапазонов временной шкалы](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range) могут быть связаны с данной временной шкалой, и несколько таких диапазонов могут накладываться друг на друга. Например, диапазон contain временной шкалы [view progress timeline](https://www.w3.org/TR/scroll-animations-1/#view-progress-timelines) перекрывается с диапазоном cover. Именованные диапазоны временной шкалы представлены типом значения [<имя временной шкалы>](https://www.w3.org/TR/scroll-animations-1/#typedef-timeline-range-name), который указывает на [CSS-идентификатор](https://www.w3.org/TR/css-values-4/#css-css-identifier), представляющий один из предопределенных именованных диапазонов временной шкалы.

ПРИМЕЧАНИЕ: В данной спецификации [именованные диапазоны временной шкалы](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range) должны быть определены для существования спецификацией, такой как [[SCROLL-ANIMATIONS-1]](https://www.w3.org/TR/scroll-animations-1/#biblio-scroll-animations-1). На будущем уровне могут появиться API для авторов, которые смогут объявлять свои собственные именованные диапазоны временной шкалы.

### Named Timeline Range Keyframe Selectors

Имена и проценты [Named timeline range](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range) могут использоваться для прикрепления ключевых кадров к определенным точкам выполнения в пределах именованного диапазона временной шкалы. Правило CSS [@keyframes](https://www.w3.org/TR/css-animations-1/#at-ruledef-keyframes) расширяется таким образом:

```
<keyframe-selector> = from| to|<percentage [0,100]>|<timeline-range-name><percentage>
```

где [<имя временного диапазона>](https://www.w3.org/TR/scroll-animations-1/#typedef-timeline-range-name) - это [CSS-идентификатор](https://www.w3.org/TR/css-values-4/#css-css-identifier), который представляет выбранный предопределенный [именованный временной диапазон](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range), а [<процент>](https://www.w3.org/TR/css-values-4/#percentage-value) после него представляет собой процентный прогресс между началом и концом этого именованного временного диапазона.

Ключевые кадры привязываются к указанной точке временной шкалы. Если временная шкала не имеет соответствующего [named timeline range](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range), то любые ключевые кадры, прикрепленные к точкам в этом именованном диапазоне временной шкалы, игнорируются. Возможно, что эти точки привязки находятся за пределами [активного интервала](https://www.w3.org/TR/web-animations-1/#active-interval) анимации; в этом случае автоматические ключевые кадры [от] (0%) и [до](https://drafts.csswg.org/css-shapes-2/#valdef-shape-to) (100%) генерируются только для свойств, у которых нет ключевых кадров на или раньше 0% или на или позже 100% (соответственно).

### Прикрепление анимации к диапазонам временной шкалы

Набор ключевых кадров анимации может быть привязан к диапазону привязки анимации, ограничивая [активный интервал](https://www.w3.org/TR/web-animations-1/#active-interval) анимации этим диапазоном временной шкалы с помощью свойства [animation-range](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range). Задержки (см. [animation-delay](https://www.w3.org/TR/css-animations-1/#propdef-animation-delay)) устанавливаются в этом ограниченном диапазоне, что еще больше сокращает время, доступное для [auto](https://drafts.csswg.org/css-animations-2/#valdef-animation-duration-auto) длительности и [infinite](https://www.w3.org/TR/css-animations-1/#valdef-animation-iteration-count-infinite) итераций.

ПРИМЕЧАНИЕ: [animation-range](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range) может как расширять диапазон [attachment range](https://www.w3.org/TR/scroll-animations-1/#animation-attachment-range), так и сужать его.

Любые кадры, расположенные за пределами [диапазона вложения](https://www.w3.org/TR/scroll-animations-1/#animation-attachment-range), используются для интерполяции по мере необходимости, но находятся за пределами [активного интервала](https://www.w3.org/TR/web-animations-1/#active-interval) и поэтому исключаются из самой анимации, эффективно обрезая анимацию в конце диапазона вложения.

```
range start┐ ╺┉┉┉active interval┉┉┉╸ ┌range end
┄┄┄┄┄┄┄┄┄┄┄├─────────────╊━━━━━━━━━━━━━━━━━━━╉───────────┤┄┄┄┄┄┄┄┄
           ╶┄ начальная задержка┄╴ ╶┄ конечная задержка┄╴
                         ╶┄┄┄┄┄ duration┄┄┄┄┄╴

```

Свойства [animation-range](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range) являются [только сбрасываемыми подсвойствами](https://www.w3.org/TR/css-cascade-5/#reset-only-sub-property) свойства [animation](https://www.w3.org/TR/css-animations-1/#propdef-animation) [shorthand](https://www.w3.org/TR/css-cascade-5/#shorthand-property).

Определите применение к анимации, управляемой временем.

### **Определение диапазона временной шкалы анимации: сокращение [animation-range](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range)

| Имя: | animation-range |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | [ https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range-start https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range-endhttps://www.w3.org/TR/css-values-4/#mult-opt ]https://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | см. отдельные свойства |
| https://www.w3.org/TR/css-cascade/#applies-to | см. отдельные свойства |
| https://www.w3.org/TR/css-cascade/#inherited-property | посмотреть индивидуальные свойства |
| https://www.w3.org/TR/css-values/#percentages | смотрите индивидуальные свойства |
| https://www.w3.org/TR/css-cascade/#computed | смотрите индивидуальные свойства |
| https://www.w3.org/TR/web-animations/#animation-type | см. индивидуальные свойства |
| https://www.w3.org/TR/cssom/#serializing-css-values | на грамматику |

Свойство [animation-range](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range) - это [сокращение](https://www.w3.org/TR/css-cascade-5/#shorthand-property), которое задает [animation-range-start](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range-start) и [animation-range-end](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range-end) в одном объявлении, связывая анимацию с указанным [animation attachment range](https://www.w3.org/TR/scroll-animations-1/#animation-attachment-range).

Если [<'animation-range-end'>](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range-end) опущен и [<'animation-range-start'>](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range-start) включает компонент [<timeline-range-name>](https://www.w3.org/TR/scroll-animations-1/#typedef-timeline-range-name), то animation-range-end устанавливается на тот же <timeline-range-name> и 100%. В противном случае для любого опущенного [длинного диапазона](https://www.w3.org/TR/css-cascade-5/#longhand) устанавливается его [начальное значение](https://www.w3.org/TR/css-cascade-5/#initial-value).

Следующие наборы объявлений показывают объявление [animation-range](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range) [shorthand](https://www.w3.org/TR/css-cascade-5/#shorthand-property), за которым следуют эквивалентные объявления [animation-range-start](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range-start) и [animation-range-end](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range-end):

`animation-range: entry 10% exit 90%;
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
animation-range-end: 90%;`

Как лучше всего поступить с дефолтом для опущенных значений? [[Проблема #8438]] (https://github.com/w3c/csswg-drafts/issues/8438)

### **Указание начала временного диапазона анимации: свойство [animation-range-start](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range-start)

| Имя: | animation-range-start |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | [ normal https://www.w3.org/TR/css-values-4/#comb-one https://www.w3.org/TR/css-values-4/#typedef-length-percentage | https://www.w3.org/TR/scroll-animations-1/#typedef-timeline-range-name <length-percentage>https://www.w3.org/TR/css-values-4/#mult-opt ]https://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | normal |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-pseudo/#generated-content |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | относительно указанного https://www.w3.org/TR/scroll-animations-1/#named-timeline-range, если он был указан, иначе ко всей временной шкале |
| https://www.w3.org/TR/css-cascade/#computed | список, каждый элемент - либо ключевое слово https://www.w3.org/TR/scroll-animations-1/#valdef-animation-range-start-normal, либо временной диапазон и процент выполнения |
| https://www.w3.org/TR/cssom/#serializing-css-values | на грамматику |
| https://www.w3.org/TR/web-animations/#animation-type | не анимируется |

Определяет начало [диапазона привязки](https://www.w3.org/TR/scroll-animations-1/#animation-attachment-range) анимации, соответственно сдвигая [время начала](https://www.w3.org/TR/web-animations-1/#animation-start-time) анимации (т.е. место привязки ключевых кадров, сопоставленных с 0% прогресса, когда количество итераций равно 1).

Значения имеют следующие значения:

**нормальный**Началом [диапазона прикрепления анимации](https://www.w3.org/TR/scroll-animations-1/#animation-attachment-range) является начало связанной с ним [временной шкалы](https://www.w3.org/TR/web-animations-1/#timeline); начало [активного интервала](https://www.w3.org/TR/web-animations-1/#active-interval) анимации определяется как обычно.**[<длительность-процент>](https://www.w3.org/TR/css-values-4/#typedef-length-percentage)**Начало [диапазона прикрепления анимации](https://www.w3.org/TR/scroll-animations-1/#animation-attachment-range) начинается в указанной точке [временной шкалы](https://www. w3.org/TR/web-animations-1/#timeline), отмеряя от начала временной шкалы.**[<имя диапазона временной шкалы>](https://www.w3.org/TR/scroll-animations-1/#typedef-timeline-range-name) [<длина-процент>](https://www.w3.org/TR/css-values-4/#typedef-length-percentage)?** [Диапазон вложения анимации](https://www.w3.org/TR/scroll-animations-1/#animation-attachment-range) начинается в указанной точке на [временной шкале](https://www.w3.org/TR/web-animations-1/#timeline), отмеряя от начала указанного [именованного диапазона временной шкалы](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range). Если параметр [<длительность-процент>](https://www.w3.org/TR/css-values-4/#typedef-length-percentage) опущен, то по умолчанию он равен 0%.

### **Указание конца временного диапазона анимации: свойство [animation-range-end](https://www.w3.org/TR/scroll-animations-1/#propdef-animation-range-end)**.

| Имя: | animation-range-end |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | [ normal https://www.w3.org/TR/css-values-4/#comb-one https://www.w3.org/TR/css-values-4/#typedef-length-percentage | https://www.w3.org/TR/scroll-animations-1/#typedef-timeline-range-name <length-percentage>https://www.w3.org/TR/css-values-4/#mult-opt ]https://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | normal |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-pseudo/#generated-content |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | относительно указанного https://www.w3.org/TR/scroll-animations-1/#named-timeline-range, если он был указан, иначе ко всей временной шкале |
| https://www.w3.org/TR/css-cascade/#computed | список, каждый элемент - либо ключевое слово https://www.w3.org/TR/scroll-animations-1/#valdef-animation-range-end-normal, либо временной диапазон и процент выполнения |
| https://www.w3.org/TR/cssom/#serializing-css-values | на грамматику |
| https://www.w3.org/TR/web-animations/#animation-type | не анимируется |

Указывает конец [диапазона вложения](https://www.w3.org/TR/scroll-animations-1/#animation-attachment-range) анимации, потенциально смещая [время окончания](https://www.w3.org/TR/web-animations-1/#end-time) анимации (т.е. когда ключевые кадры, сопоставленные со 100% прогресса, вложены, когда количество итераций равно 1) и/или усекая [активный интервал](https://www.w3.org/TR/web-animations-1/#active-interval) анимации.

Значения имеют следующие значения:

**normal**Конец [диапазона прикрепления анимации](https://www.w3.org/TR/scroll-animations-1/#animation-attachment-range) является концом связанной с ним [временной шкалы](https://www.w3.org/TR/web-animations-1/#timeline); конец [активного интервала](https://www.w3.org/TR/web-animations-1/#active-interval) анимации определяется как обычно.**[<длина-процент>](https://www.w3.org/TR/css-values-4/#typedef-length-percentage)**Конец [диапазона прикрепления анимации](https://www.w3.org/TR/scroll-animations-1/#animation-attachment-range) заканчивается в указанной точке [временной шкалы](https://www. w3.org/TR/web-animations-1/#timeline), отмеряя от начала временной шкалы.**[<имя диапазона временной шкалы>](https://www.w3.org/TR/scroll-animations-1/#typedef-timeline-range-name) [<длина-процент>](https://www.w3.org/TR/css-values-4/#typedef-length-percentage)?** [Диапазон вложений анимации](https://www.w3.org/TR/scroll-animations-1/#animation-attachment-range) заканчивается в указанной точке на [временной шкале](https://www.w3.org/TR/web-animations-1/#timeline), отмеряя от начала указанного [именованного диапазона временной шкалы](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range). Если параметр [<длительность-процент>](https://www.w3.org/TR/css-values-4/#typedef-length-percentage) опущен, по умолчанию он принимает значение 100 %.

### Отчет о прогрессе диапазона временной шкалы: метод getCurrentTime()

Прогресс по именованным диапазонам отображается на объекте `[AnimationTimeline](https://www.w3.org/TR/web-animations-1/#animationtimeline)` методом `[getCurrentTime()](https://www.w3.org/TR/scroll-animations-1/#dom-animationtimeline-getcurrenttime)`:

```
dictionaryAnimationTimeOptions {
DOMString?range;
};

[Exposed=Window]
partial interfaceAnimationTimeline {
CSSNumericValue?getCurrentTime(optionalAnimationTimeOptionsoptions = {});
};

```

**``CSSNumericValue? getCurrentTime(optionalAnimationCurrentTimeOptions = {})`**Возвращает представление [текущего времени](https://www.w3.org/TR/web-animations-1/#timeline-current-time) следующим образом:**Если `[range](https://www.w3.org/TR/scroll-animations-1/#dom-animationtimeoptions-range)` не предоставлен:**Возвращает значение `[currentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)` на [this](https://webidl.spec.whatwg.org/#this), но представляя миллисекундные значения как новое `[CSSUnitValue](https://www. w3.org/TR/css-typed-om-1/#cssunitvalue)` в единицах [ms](https://www.w3.org/TR/css-values-4/#ms), а не как double.**Если указан `[диапазон](https://www.w3.org/TR/scroll-animations-1/#dom-animationtimeoptions-range)` и это действительный [именованный диапазон временной шкалы](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range) на [this](https://webidl.spec.whatwg.org/#this):**Пусть прогресс - это текущий прогресс в этом диапазоне, выраженный в процентах.
Создайте [новое значение единицы](https://drafts.css-houdini.org/css-typed-om-1/#create-a-cssunitvalue-from-a-pair) из (progress, "percent") и верните его.
Если начальная и конечная точки [именованного временного диапазона](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range) совпадают, верните отрицательную бесконечность для значений времени раньше или равных этой точке, и положительную бесконечность для значений времени после нее.**Если `[диапазон](https://www.w3.org/TR/scroll-animations-1/#dom-animationtimeoptions-range)` указан, но не является действительным [именованным временным диапазоном](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range) на [this](https://webidl.spec.whatwg.org/#this):**Возвращает null.

Этот метод связан с `[currentTime](https://www.w3.org/TR/web-animations-1/#dom-animationtimeline-currenttime)`, но не совсем то же самое; должно ли у него быть другое название? [[Проблема #8201]](https://github.com/w3c/csswg-drafts/issues/8201)

Этот метод возвращает проценты относительно диапазона ScrollTimeline, если указано имя диапазона. Но для временных линий, основанных на времени, если указано имя диапазона, он должен возвращать процентный прогресс по этому диапазону или временной прогресс по этому диапазону?

## Приложение B: Область применения имени временной шкалы

Этот раздел следует перенести в CSS-ANIMATIONS-2.

В этом приложении представлено свойство [timeline-scope](https://www.w3.org/TR/scroll-animations-1/#propdef-timeline-scope), которое позволяет объявить область действия имени временной шкалы на предке определяющего элемента временной шкалы.

### Объявление области действия именованной временной шкалы: свойство [timeline-scope](https://www.w3.org/TR/scroll-animations-1/#propdef-timeline-scope)

| Имя: | timeline-scope |
| --- | --- |
| https://www.w3.org/TR/css-values/#value-defs | none https://www.w3.org/TR/css-values-4/#comb-one https://www.w3.org/TR/css-values-4/#typedef-dashed-identhttps://www.w3.org/TR/css-values-4/#mult-comma |
| https://www.w3.org/TR/css-cascade/#initial-values | none |
| https://www.w3.org/TR/css-cascade/#applies-to | https://www.w3.org/TR/css-pseudo/#generated-content |
| https://www.w3.org/TR/css-cascade/#inherited-property | нет |
| https://www.w3.org/TR/css-values/#percentages | n/a |
| https://www.w3.org/TR/css-cascade/#computed | ключевое слово https://www.w3.org/TR/scroll-animations-1/#valdef-timeline-scope-none или список https://www.w3.org/TR/css-values-4/#css-css-identifier |
| https://www.w3.org/TR/cssom/#serializing-css-values | по грамматике |
| https://www.w3.org/TR/web-animations/#animation-type | not animatable |

Это свойство объявляет область действия указанных имен временных шкал, распространяющуюся на поддерево этого элемента. Это позволяет именованной временной шкале (например, [named scroll progress timeline](https://www.w3.org/TR/scroll-animations-1/#named-scroll-progress-timelines) или [named view progress timeline](https://www.w3.org/TR/scroll-animations-1/#named-view-progress-timelines)) ссылаться на элементы вне поддерева определяющего временную шкалу элемента - например, на братьев, сестер, кузенов или предков. Он также блокирует ссылки на временные линии потомков с указанными именами вне этого поддерева, а на временные линии предков с указанными именами - внутри этого поддерева.

Существует открытая дискуссия по поводу этих блокирующих эффектов. [[Проблема #8915]](https://github.com/w3c/csswg-drafts/issues/8915)

Значения имеют следующие значения:

**none**Не изменяет область видимости имени временной шкалы.**[<dashed-ident>](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident)** Объявляет имя соответствующей именованной временной шкалы, определенной потомком, область видимости которой еще не объявлена потомком с помощью [timeline-scope](https://www.w3.org/TR/scroll-animations-1/#propdef-timeline-scope)-областью видимости для этого элемента и его потомков.
Если такой временной шкалы не существует или существует более одной такой шкалы, вместо нее объявляется [неактивная временная шкала](https://www.w3.org/TR/web-animations-1/#inactive-timeline) с указанным именем.

ПРИМЕЧАНИЕ: Это свойство не может повлиять на поиск имени временной шкалы в поддереве элемента-потомка, объявляющего то же имя, или сделать его недействительным. См. раздел [Объявление области действия именованной временной шкалы: свойство timeline-scope](https://www.w3.org/TR/scroll-animations-1/#timeline-scope).

## 8. Изменения

Изменения, произошедшие с предыдущего ([28 апреля 2023 года](https://www.w3.org/TR/2023/WD-scroll-animations-1-20230428/)) Рабочий проект включает:

- Удалены scroll-timeline-attachment и view-timeline-attachment в пользу [timeline-scope](https://www.w3.org/TR/scroll-animations-1/#propdef-timeline-scope). ([Issue 7759](https://github.com/w3c/csswg-drafts/issues/7759))
- Переключили именованные временные шкалы на использование [<dashed-ident>](https://www.w3.org/TR/css-values-4/#typedef-dashed-ident) вместо [<custom-ident>](https://www.w3.org/TR/css-values-4/#identifier-value), чтобы избежать столкновений имен со стандартными ключевыми словами CSS. ([Issue 8746](https://github.com/w3c/csswg-drafts/issues/8746))

См. также [Предыдущие изменения](https://www.w3.org/TR/2023/WD-scroll-animations-1-20230428/#changes).
