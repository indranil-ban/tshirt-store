import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch, BrowserRouter as Router} from 'react-router-dom'
import user from "./user"
import visit from "./visit"
import notfound from "./notfound"


import './index.css';
import App from './App';

const routing = (
  <Router>
    <div>
      <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/user">user</Link></li>
        <li><Link to="/visit">visit</Link></li>
      </ul>
    </div>
    <Switch>
      <Route exact path ="/" component={App}/>
      <Route exact path ="/user" component={user}/>
      <Route exact path ="/visit" component={visit}/>
      <Route  component={notfound} />
    </Switch>
  </Router>
)





ReactDOM.render(routing, document.getElementById('root'));



