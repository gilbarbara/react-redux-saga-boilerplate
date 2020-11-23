declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    HIDE_LOGS: boolean;
    store: any;
  }

  const VERSION: string;
}

export {};
