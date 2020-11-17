import React,{Component} from 'react';
import './App.css';
import Home from './home';
import Map from './map';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Map}/>
      <Route path="/home" component={Home}/>
    </div>
  );
}
export default App;
