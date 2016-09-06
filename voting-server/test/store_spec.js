import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('Store', () => {
    it('is a Redux store that uses the correct reducer', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map());

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: ['Homer', 'Marge']
        });
        expect(store.getState()).to.equal(fromJS({
            entries: ['Homer', 'Marge']
        }));
    });
});
