import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import stores from './store';
import './index.css';
import App from './App'
// import App from './Appp';
// import App from './Demo1';
import * as serviceWorker from './serviceWorker';

const Root = () => (
  <Fragment>
    <Provider {...stores}>
      <App />
    </Provider>
  </Fragment>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
