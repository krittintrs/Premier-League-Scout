// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// Define your reducers here
const exampleReducer = (state = {}, action) => {
  // Your reducer logic here
  return state;
};

// Combine your reducers
const rootReducer = combineReducers({
  exampleReducer,
  // Add other reducers here
});

// Create the Redux store
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
