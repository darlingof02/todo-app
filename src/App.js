import './App.css';
import React, { Component } from 'react';
import { FirstComponent } from './components/FirstComponent';
import CounterButton from './components/counter/Counter';
import Counter from './components/counter/Counter'
import TodoApp from './components/todo/TodoApp';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      {/* <Counter/> */}
      <TodoApp/>
    </div>
  );
}



class LearningComponents extends Component {
  render() {
    return (
      <div className="App">
        my Hello world
        <FirstComponent/>
        <ThirdComponent/>
      </div>
    );
  }
}

//Class Component


function ThirdComponent() {
  return (
    <div className = "thirdComponent">
      My ThirdComponent
    </div>
  );
}



export default App;
