import { act as Act } from 'react-dom/test-utils';

declare global {
  namespace NodeJS {
    interface Global {
      act: Act;
    }
  }

  const act = Act;
}

export {};
