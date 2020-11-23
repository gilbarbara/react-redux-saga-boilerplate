import { Reducer } from 'redux';
import { format } from 'date-fns';
import produce from 'immer';
import is from 'is-lite';

import {
  ActionCreator,
  ActionsMapReducer,
  GenericFunction,
  LoggerOptions,
  PlainObject,
  SortFunction,
  StoreAction,
} from 'types';

/**
 * Create an action
 */
export function createAction<T extends GenericFunction>(
  type: string,
  payloadCreator: T,
): ActionCreator<Parameters<T>, ReturnType<T>> {
  if (!payloadCreator) {
    throw new TypeError('Expected a function');
  }

  return (...args: any[]) => ({
    type,
    payload: payloadCreator(...args),
  });
}

/**
 * Create a reducer
 */
export function createReducer<State>(
  actionsMap: ActionsMapReducer<State>,
  defaultState: State,
): Reducer<State, StoreAction> {
  return (state = defaultState, action: StoreAction) =>
    produce(state, (draft: State) => {
      const fn = actionsMap[action.type];

      if (fn) {
        return fn(draft, action);
      }

      return draft;
    });
}

/**
 * Async Sleep
 */
export function sleep(seconds = 1) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

/**
 * Get unix timestamp in seconds
 */
export function getUnixtime(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Check if cache is valid
 */
export function hasValidCache(lastUpdated: number, max = 10): boolean {
  if (!navigator.onLine) {
    return true;
  }

  return lastUpdated + max * 60 > getUnixtime();
}

export function keyMirror<T extends PlainObject>(input: T): { [K in keyof T]: K } {
  if (!is.plainObject(input)) {
    throw new TypeError('Expected an object');
  }

  const output: any = {};

  for (const key in input) {
    /* istanbul ignore else */
    if (!Object.prototype.hasOwnProperty.call(output, key)) {
      output[key] = key;
    }
  }

  return output;
}

/**
 * Log grouped messages to the console
 */
export function logger(
  type: string,
  title: string,
  data: unknown,
  options: LoggerOptions = {},
): void {
  /* eslint-disable no-console */
  const { collapsed = true, hideTimestamp = false, skip = false, typeColor = 'gray' } = options;
  const groupMethod = collapsed ? console.groupCollapsed : console.group;

  /* istanbul ignore else */
  if (process.env.NODE_ENV === 'development') {
    const parts = [`%c ${type}`];
    const styles = [`color: ${typeColor}; font-weight: lighter;`, 'color: inherit;'];
    const time = format(new Date(), 'HH:mm:ss');

    if (!hideTimestamp) {
      styles.push('color: gray; font-weight: lighter;');
    }

    parts.push(`%c${title}`);

    if (!hideTimestamp) {
      parts.push(`%c@ ${time}`);
    }

    /* istanbul ignore else */
    if (!skip && !window.HIDE_LOGS) {
      groupMethod(parts.join(' '), ...styles);
      console.log(data);
      console.groupEnd();
    }
  }
  /* eslint-enable no-console */
}

/**
 * Sort an array with localeCompare
 */
export function sortByLocaleCompare(
  key?: string,
  options: Intl.CollatorOptions & { descending?: boolean } = {},
): SortFunction {
  const { descending, ...compareOptions } = options;

  if (key) {
    if (descending) {
      return <T extends PlainObject>(left: T, right: T) =>
        right[key].toLowerCase().localeCompare(left[key].toLowerCase(), undefined, compareOptions);
    }

    return <T extends PlainObject>(left: T, right: T) =>
      left[key].toLowerCase().localeCompare(right[key].toLowerCase(), undefined, compareOptions);
  }

  if (descending) {
    return <T extends string>(left: T, right: T) =>
      right.toLowerCase().localeCompare(left.toLowerCase(), undefined, compareOptions);
  }

  return <T extends string>(left: T, right: T) =>
    left.toLowerCase().localeCompare(right.toLowerCase(), undefined, compareOptions);
}
