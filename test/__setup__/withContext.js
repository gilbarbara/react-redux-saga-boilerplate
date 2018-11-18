/* eslint-disable react/destructuring-assignment, prefer-destructuring */
import PropTypes from 'prop-types';

// shallow() with React Intl context
global.shallowWithContext = (node, { context, ...options } = {}, { mockDispatch, actions } = {}) => {
  let store;

  if ((context && !context.store) || !context) {
    store = require.requireActual('store').store;

    if (actions) {
      actions.map(d => store.dispatch(d));
    }

    if (mockDispatch) {
      const storeDispatch = store.dispatch;
      mockDispatch.dispatch = (action) => mockDispatch(action, storeDispatch);

      store.dispatch = (action) => mockDispatch(action, storeDispatch);
    }
  }

  return shallow(node, {
    ...options,
    context: {
      store,
      ...context,
    },
  });
};

// mount() with React Intl context
global.mountWithContext = (node, { context, childContextTypes, ...options } = {}, { mockDispatch, actions } = {}) => {
  let store;

  if ((context && !context.store) || !context) {
    store = require.requireActual('store').store;

    if (actions) {
      actions.map(d => store.dispatch(d));
    }

    if (mockDispatch) {
      const storeDispatch = store.dispatch;
      mockDispatch.dispatch = (action) => mockDispatch(action, storeDispatch);

      store.dispatch = (action) => mockDispatch(action, storeDispatch);
    }
  }

  return mount(node, {
    ...options,
    context: {
      store,
      ...context,
    },
    childContextTypes: {
      ...childContextTypes,
      store: PropTypes.object,
    },
  });
};

global.setMockDispatch = () => jest.fn((action, dispatch) => {
  const fn = dispatch || this.dispatch;

  return fn(action);
});
