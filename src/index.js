import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";

import './index.css';
import './datepicker.css';
import Login from './components/Login';
import Overview from './containers/Overview';

import Navigation from './components/Nav/Navigation';
import * as serviceWorker from './serviceWorker';

class App extends Component {
    render() {
        return (
            <BrowserRouter basename="/dataentry">
                <div>
                    <Navigation />
                    <Route exact path="/" component={Overview} />

                    <Route path="/login" component={Login} />
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
