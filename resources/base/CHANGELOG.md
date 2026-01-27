Changelog
=========

2.2.0
-----

Добавлена новая типографика: 
- Promo 56/56 Wide
- Promo 56/56 Upp Wide
- Promo 36/36 Wide
- Promo 36/36 Upp Wide
- P4 14/20 Bold Upp Wide

Добавлен градиент: Premium

Добавлен новый токен цвета: Text Inactive Tab-Bar`

Обновлены цвета для доступности:
- Text Negative
- Control Inactive Tab-Bar
- Control Stroke
- Icon Secondary


2.1.0
-----

Добавлены новые токены с цветами:
- Control Stroke
- Text Visited Link

Обновлены цвета во всех темах:
- Text Secondary Link
- Text Inverted
- Control Inactive Tabbar
- Icon Primary

Только в светлой теме:
- Text Primary Link
- Text Negative

Только в тёмной теме:
- Text Primary Link Inverted

#### Исправлено

- Цветовые токены выгружаются в js/json без значения альфа-канала  


2.0.0
-----

Мажорное изменение связанное с типографикой для Веб-платформы и реорганизацией файлов.

### Типографика

С этим релизом выходит третья версия типографики: расширение доступных вариантов в токенах и добавление новых файлов шрифтов для новых начертаний.

В этой версии будут доступны следующие варианты:

- Promo1 Short Wide, Promo1 Long Wide
- Promo2 Short Wide, Promo2 Long Wide
- H1 Wide, H1 Comp
- H2 Wide, H2 Comp
- H3 Wide, H3 Comp, H3 Text
- H4 Wide, H4 Comp, H4 Text
- P1 Regular Comp, P1 Regular Text
- P2 Regular Comp, P2 Regular Text
- P3 Bold Comp, P3 Medium Comp, P3 Medium Text, P3 Regular Comp, P3 Regular Text
- P4 Bold Comp, P4 Medium Comp, P4 Regular Comp, P4 Regular Text, P4 Medium Upp Comp, P4 Medium Upp Text
- C1 Bold Upp Wide, C1 Bold Comp, C1 Medium Comp, C1 Regular Comp, C1 Medium Upp Comp
- C2 Bold Upp Wide

Для некоторых начертаний будут доступны новые токены описывающие межбуквенное расстояние и поведение заглавных букв.

Изменение НЕ обратно совместимое.
Вот список начертаний во второй версии и какими они стали в третьей версии:

- `v2` -> `v3`
- Promo Short Wide -> Promo2 Short Wide
- Promo Long Wide -> Promo2 Long Wide
- H1 Wide -> H2 Wide
- H2 Wide -> H3 Wide
- H2 Comp -> H3 Comp
- H3 Wide -> H4 Wide
- H3 Comp -> H4 Comp
- P1 Regular Comp -> P2 Regular Comp
- P1 Regular Text -> P2 Regular Text
- P2 Bold Comp -> P3 Bold Comp
- P2 Medium Comp -> P3 Medium Comp
- P2 Regular Comp -> P3 Regular Comp
- P2 Regular Text -> P3 Regular Text
- P3 Bold Comp -> P4 Bold Comp
- P3 Medium Comp -> P4 Medium Comp
- P3 Regular Comp -> P4 Regular Comp
- P3 Regular Text -> P4 Regular Text
- Caption Bold Comp -> C1 Bold Comp
- Caption Medium Comp -> C1 Medium Comp
- Caption Regular Comp -> C1 Regular Comp


Для поддержки обратной совместимости с предыдущими версиями была реорганизована работа с типографикой.
Теперь можно явно выбрать какую версию типографики использовать.
Были добавлены файлы с токенами для конкретных версий типографики.
А в некоторых случаях в имена токенов явно добавлены версии типографики.

История версий типографики:
- `v1` типографика на основе MTS Sans, до 16.09.2022
- `v2` типографика на основе MTS Compact, MTS Text, MTS Wide
- `v3` (актуальная) расширенная типографика v2.

Все токены типографики выгружаются в следующую структуру на примере `build/web/scss-mixins`:
- `typography.scss` -- содержит токены с актуальной типографикой. Имена токенов не содержат версий типографики.
- `typography-v1.scss`, `typography-v2.scss`, `typography-v3.scss` -- содержат токены с типографикой указанной в имени файла версией. Имена токенов содержат версию типографики.
- `typography-v1-short.scss`, `typography-v2-short.scss`, `typography-v3-short.scss` -- аналогично, но имена токенов не содержат версию типографики.
- могут содержаться другие файлы связанные с типографикой. С их спецификой лучше ознакомится просматривая их.

Сами токены могут как содержать, так и не содержать версию типографики в имени.
Например `--typography-v3-promo1-short-wide-font-family` и `--typography-promo1-short-wide-font-family`.


#### Шрифты

Для работы типографики нужно использовать шрифты, для этого теперь есть отдельные css-файлы которые соответствуют определенной версии:

- `build/styles/fonts-v1.css`
- `build/styles/fonts-v2.css`
- `build/styles/fonts-v3.css`

При этом если одновременно требуются шрифты `v2` и `v3` то надо подключать только `build/styles/fonts-v3.css`.
Описания шрифтов более не входят в `build/styles/main.css`.


#### Стили

Если требуются css-классы для типографики они вынесены в:

- `build/styles/typography-v1.css`
- `build/styles/typography-v2.css`
- `build/styles/typography-v3.css`

Эти классы более не входят в `build/styles/main.css`.


### Реорганизация

1. Удален путь `build/web/static` и все файлы находящиеся там.
   В качестве замены можно использовать аналогичные файлы из соседних экспортов.

2. Файлы ранее находящиеся по пути `build/web/scss/mixins` перенесены в `build/web/scss-mixins`.

3. Удалены файлы:
    - `build/web/css/tokens.css`
    - `build/web/scss/mixins/tokens.scss`
    - `build/web/js/tokens.js`
    - `build/web/json/tokens.json`

   Вместо больших файлов со всеми токенами предлагается использовать композицию из более маленьких файлов в которых токены собраны по группам.
   Это даст большую гибкость.
   Например, вместо `build/web/scss/mixins/tokens.scss` нужно использовать `build/web/scss-mixins/colors.scss`, `build/web/scss-mixins/fonts.scss`, `build/web/scss-mixins/grid.scss`, `build/web/scss-mixins/shadows.scss`, `build/web/scss-mixins/sizes.scss` и конкретную версию типографики, например, `build/web/scss-mixins/typography-v3.scss`


#### Стили

Файл `build/styles/main.css` более не содержит описания шрифтов и классов типографики.
Они вынесены в соответствующие отдельные файлы:

- `build/styles/fonts-v1.css`
- `build/styles/fonts-v2.css`
- `build/styles/fonts-v3.css`
- `build/styles/typography-v1.css`
- `build/styles/typography-v2.css`
- `build/styles/typography-v3.css`


1.17.0
------

- Добавлен новый цвет альтернативного основного фона
- Новые файлы экспорта токенов веб-платформы


1.16.0
------

#### Исправлено

- Проблемы с отображением wide-шрифтов в Window. Обновление файлов шрифтов.


1.15.0
------

Новый бренд-цвет

- Обновлён цвет логотипа
- Обновлён цвет выбранного, активного контрола
- Обновлён цвет активного пункта в таббаре


1.14.0
------

- Добавлен цвет основных ссылок на инвертированном бэкграунде

#### Исправлено

- Отсутствуют некоторые акцентные цвета в тёмной теме
- Отсутствуют некоторые фоновые цвета в тёмной теме
- Неправильный цвет интерактивных иконок в светлой теме


1.13.0
------

- Добавлены новые акцентные цвета
- Добавлены новые фоновые цвета


1.12.0
------

#### Исправлено

- Неправильное вертикальное позиционирование в Window. Обновление файлов шрифтов.


1.11.0
------

- Значения размерных токенов конвертированы из `px` в `rem`
- Новая типографика


1.10.0 (16.03.2022)
------------------

#### Исправлено
- Удалены `margin` и `max-width` свойства у стилей типографики


1.9.0 (30.08.2021)
------------------

#### Добавлено
- (Favicons) Фавиконки
- (Grid) Вертикальные отступы для ячеек сетки в многострочном режиме


1.8.0 (20.07.2021)
------------------

#### Исправлено
- Минорные исправления


1.7.0 (07.07.2021)
------------------

#### Добавлено
- Новый вид выгрузки css-переменных в виде sass-mixin


1.6.0 (28.04.2021)
------------------

#### Added
- Utility css-classes


1.5.0 (22.03.2021)
------------------

#### Added

- (Grid) Add offsets, hidden classes.

#### Fixed

- (Grid) Adjust columns count for Tablet and Mobile grids.
- (Grid) Remove css-grid usage.
- (Grid) Remove breakpoints "max-width".
- (Grid) Minor bugfixes.


1.4.0 (22.03.2021)
------------------

#### Maintenance

- NPM-registry preparation

#### Added

- (Style) Add "min" breakpoint cell classes


1.3.0 (17.02.2021)
------------------

#### Maintenance

- Package rename


1.2.0 (19.01.2021)
------------------

#### Added

- (Tokens) Hovered stroke for radio and checkbox


1.1.0 (03.12.2020)
------------------

#### Added

- (Style) Add CSS custom properties (variables) for paragraph icons


1.0.0 (03.11.2020)
------------------

#### Added

- Initial release
