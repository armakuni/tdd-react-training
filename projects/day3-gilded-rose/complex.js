import tscomplex from 'ts-complex';

const path = './app/GildedRose.ts'; // Finding maintainability of this file
const maintainability = tscomplex.calculateMaintainability(path);
console.log(maintainability);

const complexity = tscomplex.calculateCyclomaticComplexity(path);
console.log(complexity);

const halstead = tscomplex.calculateHalstead(path);
console.log(halstead);