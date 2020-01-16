# Задание 3. Найдите ошибки


## Задание

**Дан исходный код приложения, в котором есть ошибки. Одни ошибки — стилистические, а другие не позволят даже запустить приложение. Вам нужно найти все ошибки и исправить их.**

Тестовое приложение — это плагин VS Code для удобного прототипирования интерфейсов с помощью дизайн-системы из первого задания. Вы можете описать в файле `.json` блоки, из которых состоит интерфейс. Плагин добавляет превью (1) и линтер (2) для структуры блоков.

## Выполнение задания

##### 1. Устанавливаем зависимости с помощью `npm i` и пробуем запустить приложение нажатием `F5`

После запуска открывается новое окно VS Code, однако скрипт server.ts показывает две проблемы:
*
    ```
    Argument of type '(params: InitializeParams) => { capabilities: { textDocumentSync: string; }; }' is not assignable to parameter of type 'RequestHandler<InitializeParams, InitializeResult, InitializeError>'.
    Type '{ capabilities: { textDocumentSync: string; }; }' is not assignable to type 'HandlerResult<InitializeResult, InitializeError>'.
        Type '{ capabilities: { textDocumentSync: string; }; }' is not assignable to type 'InitializeResult'.
            Types of property 'capabilities' are incompatible.
                Type '{ textDocumentSync: string; }' is not assignable to type 'ServerCapabilities'.
                    Type '{ textDocumentSync: string; }' is not assignable to type '_ServerCapabilities'.
                        Types of property 'textDocumentSync' are incompatible.
                            Type 'string' is not assignable to type '0 | TextDocumentSyncOptions | 1 | 2 | undefined'.
    ```

* `Property 'loc' does not exist on type 'AstIdentifier'.`

Первая проблема происходит на этапе инициализации сервера. Читаем сообщение об ошибке, обращаем внимание на строки `Type '{ textDocumentSync: string; }' is not assignable to type 'ServerCapabilities'.` и `Type 'string' is not assignable to type '0 | TextDocumentSyncOptions | 1 | 2 | undefined'`. Отсюда следует, что параметру `textDocumentSync` нельзя присвоить строку. Если навести на него мышку, всплывёт подсказка с документацией, где описано, что это за параметр и какие данные можно ему присвоить. Видим, что `textDocumentSync` определяет, как синхронизуются текстовые документы и является либо объектом `TextDocumentSyncOptions`, либо числом `TextDocumentSyncKind`. Попробуем воспользоваться вторым вариантом, он проще. Открываем документацию `TextDocumentSyncKind`, там описано три типа синхронизации: `None`, `Full` и `Incremental`. Им соответствуют числа от 0 до 2. Судя по описанию, нам подходит `Full`, поскольку изначально мы пытались присвоить textDocumentSync строку 'always'.

Вторая ошибка связана с тем, что `property.key` не содержит свойства `loc`. `property` соответствует интерфейсу `AstProperty` модуля `json-to-ast`. Откроем данный модуль, чтобы посмотреть, какие свойства есть у `AstProperty`. Видим, что надо указавать `property.loc`, вместо `property.key.loc`. Исправляем ошибку.



### Превью интерфейса

- Превью интерфейса доступно для всех файлов `.json`.
- Превью открывается в отдельной вкладке:
  - при выполнении команды `Example: Show preview` через палитру команд;
  - при нажатии кнопки сверху от редактора (см. скриншот);
  - при нажатии горячих клавиш **⌘⇧V** (для macOS) или **Ctrl+Shift+V** (для Windows).
- Вкладка превью должна открываться рядом с текущим редактором.
- Если превью уже открыто, то должна открываться уже открытая вкладка, новая открываться не должна.
- Когда пользователь изменяет в редакторе структуру блоков, превью должно обновляться
- Сейчас превью отображает структуру блоков в виде прямоугольников. Реализуйте отображение превью с помощью вёрстки и JS из первого задания.

### Линтер структуры блоков

- Линтер применяется для всех файлов `.json`.
- Линтер подсвечивает ошибочное место в файле и отображает сообщение при наведении мыши.
- Линтер отображает сообщения на панели `Problems` (**⌘⇧M** для macOS или **Ctrl+Shift+M** для Windows), сообщения группируются по файлам, при клике происходит переход к ошибочному месту.
- Сейчас плагин использует линтер-заглушку, проверяющий всего два правила: 1) «запрещены названия полей в верхнем регистре»; 2) «в каждом объекте должно быть поле `block`». Подключите в проект линтер из второго задания.

### Настройки

Плагин добавляет в настройки VS Code новый раздел `Example` с параметрами:

- `example.enable` — использовать линтер;
- `example.severity.uppercaseNamesIsForbidden` — тип сообщения для правила «Запрещены названия полей в верхнем регистре»;
- `example.severity.blockNameIsRequired` — тип сообщения для правила «В каждом объекте должно быть поле `block`».

Типы сообщений: `Error`, `Warning`, `Information`, `Hint`.

При изменении конфигурации новые настройки должны применяться к работе линтера.
