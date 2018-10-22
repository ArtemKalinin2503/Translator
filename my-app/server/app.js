//sudo npm install babel@5 -g (установим babel)
import express from 'express'; //npm install express
import bodyParser from 'body-parser'; //npm install body-parser (для преобразования данных в json)
import * as db from './utils/DataBaseUtils.js' //Все что описанно в данном файле мы ипортируем и записываем в переменную db

//Установим соединение с БД (метод setUpConnection мы описали в DataBaseUtils.js)
db.setUpConnection();

//Для запуска exspress
const app = express();

//Указываем чтобы данные которые мы получим нужно преобразовать в json
app.use( bodyParser.json() );

//Запрос get будет брать данные из БД word
app.get('/word', (req,res) => {
    db.listWord().then(data => res.send(data)); //Запрос listWord (описаный в DataBaseUtils.js) - будет выводить все поля из БД (мы его описали в DataBaseUtils.js)
});

//Запрос post будет добавлять данные из БД word
app.post('/word', (req,res) => {
    console.log('!!!!!!!');
    db.createWord(req.body).then(data => res.send(data)); //Запрос createWord (описаный в DataBaseUtils.js) - будет создавать тело запроса и записывать результат
    //Создадим запись в Бд word
    db.createWord({title:'test', text: 'test'});
    console.log('First entry');
    //Создадим запись в Бд word
    db.createWord({title:'test2', text: 'test2'});
    console.log('Two entry');
    db.createWord({title:'test3', text: 'test3'});
    console.log('Three entry');
});

//Запрос delete будет удалять данные из БД word
app.delete('/words/:id', (req,res) => {
    db.deleteWord(req.params.id).then(data => res.send(data)); //Запрос deleteWord (описаный в DataBaseUtils.js) - будет удалять записи из БД
});

//babel-node ./app.js (команда для запуска сервера)
const server = app.listen(3030, () => {
    console.log('Server is up and running on port 3030');
});