import mongoose from 'mongoose'; //npm install mongoose --save
import '../models/word'; //импортируем схему

//Передадим схему из models/word.js
const Word = mongoose.model('Word');

//Подключим БД
export function setUpConnection() { //word - это имя БД (порт 27017 - это порт для запуска mongodb по-умолчанию)
    mongoose.connect('mongodb://localhost/word', {useNewUrlParser:true},  function (err) {
        if (err) throw err;
        console.log('Successfully connected!!!!!');
    }); 
}

//Напишем запрос к БД
export function listWord() {
    return Word.find(); //Метод find() - выведит все поля (данные из БД)
}

//Создадим запрос который создаст запись в БД (обращаемся к нашим созданым полям описанные в models/word.js)
export function createWord(data) {
    const word = new Word({
        title: data.title,
        text:  data.text
    });

    return word.save(); //Сохраним данные в БД
}

//Запрос который будет удалять данные из БД
export function deleteWord(id) {
    return Word.findById(id).remove(); //С помощью метода findById будем находить записи по id и удвлять их из БД
}