import { persistStore } from 'redux-persist';

let configStore;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  configStore = require('./configureStore.prod').default;
}
else {
  configStore = require('./configureStore.dev').default;
}

const store = configStore();

export const persistor = persistStore(store, {
  whitelist: ['app', 'playlists', 'spotify', 'user']
});

export default store;
