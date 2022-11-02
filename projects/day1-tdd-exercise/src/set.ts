export default class ElementSet<T> {
    complement(): any {
        throw new Error("Method not implemented.");
    }
     
    private elements: T[] = [] 
    
    constructor(list: T[]) {
        list.forEach(newElement => {
            if (this.elements.includes(newElement) === false) {
                this.elements.push(newElement);
            }
        });
    }
    
    union(otherSet: ElementSet<T>) {
        return new ElementSet(this.elements.concat(otherSet.elements));
    }
    
    contains(element: T): boolean {
        return this.elements.includes(element)
    }

    intersect(otherSet: ElementSet<T>): ElementSet<T> {
        return new ElementSet(
            otherSet.elements.filter(e => this.elements.includes(e))
        )
    }

    difference(otherSet: ElementSet<T>): ElementSet<T>  {
        // return new ElementSet(
        //     this.elements.filter(e => !otherSet.elements.includes(e))
        // )

        const u = this.union(otherSet);
        const i = this.intersect(otherSet);

        return new ElementSet(
            u.elements.filter(e => !i.contains(e))
        )
    }    

    length(): number {
        return this.elements.length;
    }
    
};
