import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('Reducer', () => {
    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Homer']};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Homer']
        }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Homer', 'Marge']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Homer', 'Marge']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Homer', 'Marge']
            },
            entries: []            
        });
        const action = {type: 'VOTE', entry: 'Homer'};
        const nextState = reducer(initialState, action);
        
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Homer', 'Marge'],
                tally: {Homer: 1}
            },
            entries: []
        }));
    });

    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['Homer']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Homer']
        }));
    });
});
