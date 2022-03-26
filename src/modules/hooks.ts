/* eslint-disable import/prefer-default-export */
import { shallowEqual, useSelector } from 'react-redux';

import { RootState } from 'types';

export function useShallowEqualSelector<TReturn>(selector: (state: RootState) => TReturn) {
  return useSelector(selector, shallowEqual);
}
