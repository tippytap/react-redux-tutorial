import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('Application Logic', () => {

    describe('setEntries', () =>
        {
            it('adds the entries to the state', () =>
                {
                    const state = Map();
                    const entries = List.of('Homer', 'Marge');
                    const nextState = setEntries(state, entries);
                    expect(nextState).to.equal(Map({
                        entries: List.of('Homer', 'Marge')
                    }));
                }
            );
            it('Converts to immutable', () =>{
                const state = Map();
                const entries = ['Homer', 'Marge'];
                const nextState = setEntries(state, entries);
                expect(nextState).to.equal(Map({
                    entries: List.of('Homer', 'Marge')
                }));
            });
        }
    );


    describe('Next', () => {
        it('takes two entries to be voted on', () => {
            const state = Map({
                entries: List.of('Homer', 'Marge', 'Bart')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Homer', 'Marge')
                }),
                entries: List.of('Bart')
            }));
        });
        it('puts the winner back in the entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Homer', 'Marge'),
                    tally: Map({
                        'Homer': 4,
                        'Marge': 2
                    })
                }),
                entries: List.of('Bart', 'Lisa', 'Maggie')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Bart', 'Lisa'),
                }),
                entries: List.of('Maggie', 'Homer')
            }));
        });
        it('puts both from tied back into entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Homer', 'Marge'),
                    tally: Map({
                        'Homer': 3,
                        'Marge': 3
                    })
                }),
                entries: List.of('Bart', 'Lisa', 'Maggie')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Bart', 'Lisa')
                }),
                entries: List.of('Maggie', 'Homer', 'Marge')
            }));
        });
        it('declares winner when one entry left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Homer', 'Marge'),
                    tally: Map({
                        'Homer': 4,
                        'Marge': 2
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'Homer'
            }));
        });
    });


    describe('Vote', () => {
        it('creates a tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Homer', 'Marge')
                }),
                entries: List()
            });
            const nextState = vote(state, 'Homer');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Homer', 'Marge'),
                    tally: Map({
                        'Homer': 1
                    })
                }),
                entries: List()
            }));
        });
        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Homer', 'Marge'),
                    tally: Map({
                        'Homer': 3,
                        'Marge': 2
                    })
                }),
                entries: List()
            });
            const nextState = vote(state, 'Homer');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Homer', 'Marge'),
                    tally: Map({
                        'Homer': 4,
                        'Marge': 2
                    })
                }),
                entries: List()
            }));
        });
    });
});
