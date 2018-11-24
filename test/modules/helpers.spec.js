import { datasetToObject } from 'modules/helpers';

describe('helpers', () => {
  describe('datasetToObject', () => {
    const el = document.createElement('div');
    el.setAttribute('data-rule', 'yes');
    el.setAttribute('data-minute-maid', 'no');

    it('should convert DOMElement data to object', () => {
      expect(datasetToObject(el)).toMatchSnapshot();
    });
  });
});
