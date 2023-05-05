const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});


test('to make sure the pop removes the top item from stack', () => {
    stack.push("hallå där"); //fel ordning
    stack.push("inte detta"); //fel ordning
    expect(stack.pop()).toBe("hallå där"); //Medvetet fel då push är fel ordning
});

test('to make sure the pop removes every item from the stack and then removes undefined', () => {
    stack.push("oj ett för mycket"); //Medvetet fel lägger till ett förmycket i stacken
    stack.push("inte detta");
    stack.push("hallå där");
    expect(stack.pop()).toBe("hallå där");
    expect(stack.pop()).toBe("inte detta"); 
    expect(stack.pop()).toBeUndefined(); //FEL! Eftersom det inte blir undefined då det finns flera items i stacken
});
