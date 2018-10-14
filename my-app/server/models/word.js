import mongoose from 'mongoose'; //npm install mongoose --save

const Schema = mongoose.Schema;

//Создадим схему данных
const WordSchema = new Schema({
    title : { type: String },
    text  : { type: String }
});

//Создадим модель и передадим туда схему
const Word = mongoose.model('Word', WordSchema);