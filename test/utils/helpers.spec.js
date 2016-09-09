import * as helpers from 'utils/helpers';

describe('helpers/shouldComponentUpdate', () => {
  const instance = {
    props: { a: 1 },
    state: { b: 2 },
    context: { c: 3 }
  };

  it('should prevent update', () => {
    expect(helpers.shouldComponentUpdate(instance, { a: 1 }, { b: 2 }, { c: 3 })).toBe(false);
  });

  it('should allow update', () => {
    expect(helpers.shouldComponentUpdate(instance, { a: 1 }, { b: 3 })).toBe(true);
  });
});

describe('helpers/createRequestTypes', () => {
  it('should return a proper object', () => {
    expect(helpers.createRequestTypes('REQUEST')
    ).toEqual({
      FAILURE: 'REQUEST_FAILURE',
      REQUEST: 'REQUEST_REQUEST',
      SUCCESS: 'REQUEST_SUCCESS'
    });
  });
});

describe('helpers/datasetToObject', () => {
  const el = document.createElement('div');
  el.setAttribute('data-rule', 'yes');
  el.setAttribute('data-minute-maid', 'no');

  it('should convert DOMElement data to object', () => {
    expect(helpers.datasetToObject(el)).toEqual({ minuteMaid: 'no', rule: 'yes' });
  });
});
