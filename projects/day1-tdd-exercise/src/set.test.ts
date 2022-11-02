import ElementSet from "./set";

describe('Set', () => {
    it('creates a set containing only A given one element "A"', ()=> {

        const mySet = new ElementSet(['A']);

        expect(mySet).toEqual(new ElementSet(['A']));
    })

})