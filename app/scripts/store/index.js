import { persistStore } from 'redux-persist';

let configStore;

/* istanbul ignore else  */
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  configStore = require('./configureStore.prod').default;
}
else {
  configStore = require('./configureStore.dev').default;
}

const store = configStore();

/* istanbul ignore if  */
if (process.env.NODE_ENV !== 'test') {
  persistStore(store, {
    whitelist: ['app']
  });
}

export default store;
