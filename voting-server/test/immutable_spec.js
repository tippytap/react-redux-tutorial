import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
    describe('a number', () => {
        function increment(currentState){
            return currentState + 1;
        }
        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });
});

describe('A List from Immutable', () => {
    function addName(currentState, name){
        return currentState.push(name);
    }

    it('is immutable', () => {
        let state = List.of('Homer', 'Marge');
        let nextState = addName(state, 'Bart');

        expect(nextState).to.equal(List.of(
            'Homer',
            'Marge',
            'Bart'
        ));
        expect(state).to.equal(List.of(
            'Homer',
            'Marge'
        ));
    });
});

describe('A tree', () => {
    function addName(currentState, name){
        return currentState.update('names', names => names.push(name));
        /*return currentState.set(
            'names',
            currentState.get('names').push(name)
        );*/
    }
    it('is immutable', () => {
        let state = Map({
            names: List.of('Homer', 'Marge')
        });
        let nextState = addName(state, 'Bart');

        expect(nextState).to.equal(Map({
            names: List.of(
                'Homer',
                'Marge',
                'Bart'
            )
        }));
        expect(state).to.equal(Map({
            names: List.of(
                'Homer',
                'Marge'
            )
        }));
    });
});
