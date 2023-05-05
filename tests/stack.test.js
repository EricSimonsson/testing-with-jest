const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
    stack.pop(); // var tvungen att lägga till detta då det sparades för samtliga test
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
    stack.pop(); // var tvungen att lägga till detta då det sparades för samtliga test och förstörde därför sista testet
    stack.pop(); // var tvungen att lägga till detta då det sparades för samtliga test och förstörde därför sista testet
    stack.pop(); // var tvungen att lägga till detta då det sparades för samtliga test och förstörde därför sista testet
});


test('to make sure the pop removes the top item from stack', () => {
    //stack.push("hallå där"); //fel ordning
    //stack.push("inte detta"); //fel ordning
    stack.push("inte detta"); //Nu är det rätt ordning
    stack.push("hallå där"); //Nu är det rätt ordning
    expect(stack.pop()).toBe("hallå där"); // Inte längre fel
    stack.pop(); // var tvungen att lägga till detta då det sparades för samtliga test och förstörde därför sista testet
});

test('to make sure the pop removes every item from the stack and then removes undefined', () => {
    //stack.push("oj ett för mycket"); //Medvetet fel lägger till ett förmycket i stacken
    stack.push("inte detta");
    stack.push("hallå där");
    expect(stack.pop()).toBe("hallå där");
    expect(stack.pop()).toBe("inte detta");
    expect(stack.pop()).toBeUndefined(); // Inte längre fel då jag kommenterat bort det extra item som lades till.
});
