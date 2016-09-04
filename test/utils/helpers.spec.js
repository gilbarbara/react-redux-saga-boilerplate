import expect from 'expect';
import * as helpers from 'utils/helpers';

describe('helpers', () => {
  context('shouldComponentUpdate', () => {
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

  context('createRequestTypes', () => {
    it('should return a proper object', () => {
      expect(helpers.createRequestTypes('REQUEST')
      ).toEqual({
        FAILURE: 'REQUEST_FAILURE',
        REQUEST: 'REQUEST_REQUEST',
        SUCCESS: 'REQUEST_SUCCESS'
      });
    });
  });

  context('param', () => {
    it('should convert an object to querystring', () => {
      expect(helpers.param({ a: 1, b: { d: 3 }, c: ['a', 'b'] })).toEqual('a=1&b%5Bd%5D=3&c%5B0%5D=a&c%5B1%5D=b');
    });
  });

  context('deparam', () => {
    it('should convert querystring to object', () => {
      expect(helpers.deparam('a=1&b%5Bd%5D=3&c%5B0%5D=a&c%5B1%5D=b')).toEqual({ a: '1', b: { d: '3' }, c: ['a', 'b'] });
    });

    it('should handle wrong params', () => {
      expect(helpers.deparam([])).toEqual({});
    });
  });

  context('datasetToObject', () => {
    const el = document.createElement('div');
    el.setAttribute('data-rule', 'yes');
    el.setAttribute('data-minute-maid', 'no');

    it('should convert DOMElement data to object', () => {
      expect(helpers.datasetToObject(el)).toEqual({ minuteMaid: 'no', rule: 'yes' });
    });
  });
});
