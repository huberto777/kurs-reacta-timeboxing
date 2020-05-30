import { createStore } from "redux";
import { timeboxesReducer, getAllTimeboxes, getTimeboxById } from "../reducers";
import { addTimebox, removeTimebox } from "../actions";

let store = null;
describe('timeboxes state changes', () => {
    beforeEach(() => {
        store = createStore(timeboxesReducer);
    });
    test('initially timeboxes are empty', () => {
        const timeboxes = getAllTimeboxes(store.getState());

        expect(timeboxes).toEqual([]);
    });

    test('addTimebox action inserts a new timebox', () => {
        const newTimebox = { id: "I am a new timebox" };
        store.dispatch(addTimebox(newTimebox));

        const timeboxes = getAllTimeboxes(store.getState());
        expect(timeboxes).toEqual([newTimebox]);
    })

    test('removeTimebox action removes a timebox', () => {
        const aTimebox = { id: "I am a timebox" };
        const anotherTimebox = { id: "I am another timebox" };
        const evenAnotherTimebox = { id: "I am even another timebox" };
        store.dispatch(addTimebox(aTimebox));
        store.dispatch(addTimebox(anotherTimebox));
        store.dispatch(addTimebox(evenAnotherTimebox));

        store.dispatch(removeTimebox(aTimebox));

        expect(getTimeboxById(store.getState(), "I am a timebox")).toBe(undefined);
        expect(getTimeboxById(store.getState(), "I am another timebox")).toBe(anotherTimebox);
    })
});