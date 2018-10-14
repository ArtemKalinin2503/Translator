import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'; //Подключаем React-Redux
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom'; //Подключаем Ройтинг
import createStore from './store'; //Подключаем хранилище
//Экспортируем компоненты из папки components
import Home from './components/home';
import CardRussiaEnglish from './components/CardRussiaEnglish';
import CardEnglishRussia from './components/CardEnglishRussia';
import {thunkAction} from './components/CardEnglishRussia';

//Вызовим store
const store = createStore;

//Основной компонент 
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          Header
        </header>
        <nav>
            <Link to="/">Главная</Link>
            <Link to="/CardRussiaEnglish">Карточки Русский/Английский</Link>
            <Link to="/CardEnglishRussia">Карточки Английский/Русский</Link>
        </nav>
        <div>
          <Route path="/" exact component={Home}></Route>
          <Route path="/CardRussiaEnglish" component={CardRussiaEnglish}></Route> 
          <Route path="/CardEnglishRussia" component={CardEnglishRussia}></Route>     
        </div>
        <footer className="header">
          Footer
        </footer>
      </div>
    );
  }
};

//Необходимо если нужно обращать к store
const mapStateToProps= (state,ownProps={})=>({
  word: state.reducer.word,
  erorr: state.reducer.erorr,
  isFetching: state.reducer.isFetching,
  isFetched: state.reducer.isFetched
});

//Необходимо если нужно обращать к store
const mapDispatchToProps = {
  getApi: thunkAction //Специальное состояние и action (из библеотеки "redux-thunk") 
};

//Необходимо если нужно обращать к store (делаем connect)
const EnhancedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <EnhancedApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

