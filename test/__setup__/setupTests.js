import { createSerializer } from 'enzyme-to-json';
import 'jest-localstorage-mock';
import 'jest-enzyme';
import 'jest-extended';
import 'jest-chain';
import 'jest-styled-components';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
