import { setTimeboxes } from "../actions";
test('setTimeboxes emits TIMEBOXES_SET action', () => {
    expect(setTimeboxes([])).toEqual(
        { type: "TIMEBOXES_SET", timeboxes: [] }
    )
});