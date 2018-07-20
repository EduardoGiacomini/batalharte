import { createStore } from 'redux';
// Import dos reducers
import reducers from '../reducers/reducers';

// configuração devtools para acompanhamento do estado do redux
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();

// Conectando o store com os reducers
const store = createStore(reducers, devTools);

export default store;
