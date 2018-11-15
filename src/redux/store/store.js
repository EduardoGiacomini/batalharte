import { createStore } from 'redux';
import reducers from '../reducers';

// Conect store with reducers
const store = createStore(reducers);

export default store;
