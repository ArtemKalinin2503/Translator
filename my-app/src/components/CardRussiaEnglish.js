import React, { Component } from 'react';

//Компонент "Карточки с Русского на Английский"
class CardRussiaEnglish extends Component {
    //Функция которая отработает при клике на кнопку submitForm
    handleValueMainInp = event => {
      // const valueInp = event.target.getinputValue;
      // this.setState({[getinputValue]:valueInp});
 
    };
    render() {
      return (
        <div className="wrapper-mainInp">
          <input name="mainInp" type="text" className="mainInp"/>
          <button className="submitForm" onClick={this.handleValueMainInp}>Проверить</button>
        </div>
      )
    }
  };

  export default CardRussiaEnglish;
  