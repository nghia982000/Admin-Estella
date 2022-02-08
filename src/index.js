import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import {Provider} from "react-redux"
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import reducers from "../src/Redux/reducers"
import './i18n'
import sagas from "../src/Redux/sagas"
const sagaMiddleware = createSagaMiddleware()
const store=createStore(reducers(),{},applyMiddleware(sagaMiddleware))
sagaMiddleware.run(sagas)



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
reportWebVitals()
