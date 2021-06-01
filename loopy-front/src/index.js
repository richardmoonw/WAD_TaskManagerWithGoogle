import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/LoginComponent/Login';
import Tasks from './components/TasksComponent/Tasks';
import Projects from './components/ProjectsComponent/Projects';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route exact component={ (props) => <Projects userId={props.location.state.userId} /> } path="/projects">
        </Route>
        <Route path="/projects/:id/tasks">
          <Tasks/>
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
