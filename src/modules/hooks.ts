import { shallowEqual, useSelector } from 'react-redux';

import { StoreState } from 'types';

export function useShallowEqualSelector<TReturn>(selector: (state: StoreState) => TReturn) {
  return useSelector(selector, shallowEqual);
}
