# sundry

Все просмотреть можно [тут](http://proj30js.surge.sh/)

1. В самом неачале проекта создал файл package.json -> npm init
2. Далее устанавливаем в проект webpck -> npm install webpack --save-dev
3. Прописываем в package.json script для запуска webpack и сборки bundle.js файла -> "webpack": "webpack ./app.js ./public/js/bundle.js"
4. Для того чтобы подключить в файл какую-либо библиотек нужно указать -> var jQuery = require('jQuery');
5. Для работы с плагином surge необходимо поставить его локально в проект и важно установить его глобально на компъютер.

[Surge](https://www.npmjs.com/package/surge)

[Surge - start](https://surge.sh/help/getting-started-with-surge)
 
_Основные команды:_

* surge --help - surge помощь 
* surge list - просмотр всех проектов
* surge teardown domainThatNeedToDelete - удаление домена domainThatNeedToDelete
6. Для вставки изображения в template нужно вствлять его таким образом:    

```
    <audio controls>
        <source src="<%=require('../../audio/do.wav')%>">
    </audio>
    
    <img src="<%=require('../../images/dog.jpg')%>" alt="">
```