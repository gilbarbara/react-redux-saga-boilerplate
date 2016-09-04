import { persistStore } from 'redux-persist';

let configStore;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  configStore = require('./configureStore.prod').default;
}
else {
  configStore = require('./configureStore.dev').default;
}

const store = configStore();

if (process.env.NODE_ENV !== 'test') {
  persistStore(store, {
    whitelist: ['app']
  });
}

export default store;
