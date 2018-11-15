import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translatedAction } from '../reducers';
import axios from 'axios'; //npm install axios

//Данный компонент будет получать и выводить слова на английском языке   
class WordTranslate extends Component {
    //Данный компонент сработает до render основного компонентп
    componentDidMount() {
        this.props.getDataWord(); //Вызываем наш thank thunkWordAction (который записали в getDataWord)
    }
    render() {
        let wordResult = this.props.translatedWord; //Запишем данное состояние в переменную
        return (
            <div>
                <p>Перевидете данное слово:</p>
                {wordResult.toString()} {/*Выведим данные из состояния translatedWord и преобразуем в строку*/}
            </div>
        )
    };
};
//Данный экшен (танк) будет получать данные из dataJson.json (обязательно храним файл dataJson.json в папке public) 
function thunkWordAction() {
    return (dispatch) => {
        axios.get('http://localhost:3000/data/dataJson.json') //axiso это замена fetch 
        .then((translatedWord) => {
            dispatch(translatedAction(translatedWord.data[0].WordEnglishArray[1])); //Передадим полученные данные в состояние translatedWord (используя axios данные всегда приходят в data)
        },  //translatedAction это наш action который возьмет состояние translatedWord и запишет в него данные 
        (errorResponse) => {
            console.log(errorResponse)
        })
    }
};  
//Обязательно опишем все стостояния 
const mapStateToProps= (state,ownProps={})=>({
    word: state.reducer.word,
    translatedWord: state.reducer.translatedWord,
    erorr: state.reducer.erorr,
    isFetching: state.reducer.isFetching,
    isFetched: state.reducer.isFetched
});
//Запишем созданный action thunkWordAction
const mapDispatchToProps = {
    getDataWord: thunkWordAction 
};
//Обвернем все в connect для связи с хронилищем 
const EnhancedWordTranslate = connect (
    mapStateToProps,
    mapDispatchToProps
)(WordTranslate);

export default EnhancedWordTranslate;