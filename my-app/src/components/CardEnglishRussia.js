import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchTranslateRequestCreator, fetchSuccessCreator, fetchErrorCreator} from '../reducers'; 
import WordTranslate from './WordTranslate';

//Компонент "Карточки с Английского на Русский"
class CardEnglishRussia extends Component {
  //Функция для записи в состояние inputValue значение input
  handleOnChange = event => {
    const valueInp = event.target.value; //Получаем значение input
    this.props.getApi(valueInp); //Обратимся к свойству getApi и передадим в него значение valueInp
  };
  render() {
    return (
      <div className="wrapper-mainInp">
        <input 
          name="mainInp" 
          type="text" 
          className="mainInp" 
          onChange={this.handleOnChange}/>
        <button className="submitForm">Проверить</button>
        <div>
          <div>
            <WordTranslate />
          </div>
          <p>{this.props.word.text !== undefined ? this.props.word.text.join(""): ""}</p> {/*С помощью метода join преобразуем данные и выведим**/}
        </div>
      </div>
    )
  }
};

//"redux-thunk" - это билиотека которая позволяет создать action который будет получать данные и прокидывать их дальше
//Создаем сетевой запрос inputValue (components/CardEnglishRussia.js) это состояние в которое приходит value из input его подставляем в fetch запрос 
export function thunkAction(inputValue) {
  return (dispatch) => {
      dispatch(fetchTranslateRequestCreator());
      fetch (
          `https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-ru&key=trnsl.1.1.20180907T144309Z.95930146ceaf9ce8.52fc8b45a5e3933a3e6cf7c0225487831950a513&text=${inputValue}`
      )
          .then(response => response.json()) //Распарсим данные которые пришли в json 
          .then(word => {
              dispatch(fetchSuccessCreator(word)); //Ответ от сервера переадаим в состояние word
          })
          .catch(erorr => {
              dispatch(fetchErrorCreator(erorr));
          });
  }
};

 
//Connect нужен обязательно чтобы работать со store (reducer это имя созданного reducer в reducers/index.js)
const mapStateToProps= (state,ownProps={})=>({
      word: state.reducer.word,
      erorr: state.reducer.erorr,
      isFetching: state.reducer.isFetching,
      isFetched: state.reducer.isFetched
});

//Нужен обязательно чтобы работать со store
const mapDispatchToProps = {
  getApi: thunkAction //Передадим в состояние getApi функцию thunkAction (reducers/index.js) которая получает сетевой запрос
};

//Нужен обязательно чтобы работать со store
const EnhancedCard = connect (
  mapStateToProps,
  mapDispatchToProps
)(CardEnglishRussia);

export default EnhancedCard;

