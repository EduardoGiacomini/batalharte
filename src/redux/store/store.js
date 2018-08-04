import { createStore } from 'redux';
import reducers from '../reducers';

// Configuration devtools
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();

// Conect store with reducers
const store = createStore(reducers, devTools);

export default store;
