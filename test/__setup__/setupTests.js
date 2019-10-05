import 'jest-localstorage-mock';
import 'jest-enzyme';
import 'jest-extended';
import 'jest-chain';
import 'jest-styled-components';
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
