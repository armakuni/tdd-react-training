import ElementSet from "./set";

describe('Set', () => {
    it('creates an empty set given no arugments', ()=> {

        const mySet = new ElementSet();

        expect(mySet.elements).toEqual([]);
    })

})