import {describe, expect, it} from "vitest"
import {max, fizzBuzz, add, subtract, multiply, divide, isEqual} from '../intro'

describe("Testing max function", () => {
    it("Should return a if a > b", () => {
        // Arrange
        let a = 2;
        let b = 1;
        let resultatAttendu = 2;
        // Act
        let result = max(a,b);
        // Assert
        expect(result).toBe(resultatAttendu)
    });
    it("Should return b if b > a", () =>{
        expect(max(2,3)).toBe(3)
    });
    it("Should return a if a = b", () => {
        expect(max(1,1)).toBe(1)
    });
})


describe("Testing fizzBuzz function", () => {
  it("Should return 'FizzBuzz' if the number is divisible by both 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("Should return 'Fizz' if the number is divisible by 3", () => {
    expect(fizzBuzz(9)).toBe("Fizz");
  });

  it("Should return 'Buzz' if the number is divisible by 5", () => {
    expect(fizzBuzz(25)).toBe("Buzz");
  });

  it("Should return the number itself if it's not divisible by 3 or 5", () => {
    expect(fizzBuzz(7)).toBe("7");
  });
})

describe("Testing add function", () => {
    it("Should return the sum of two positive numbers", () => {
        expect(add(2,3)).toBe(5);
    });
    it("Should return the sum of two negative numbers", () => {
        expect(add(-1,-3)).toBe(-4);
    });
    it("Should return the sum of a positive and negative number", () => {
        expect(add(3,-1)).toBe(2);
    });
    it("Should return 0 if both numbers are 0", () => {
        expect(add(0,0)).toBe(0);
    });
    it("Should return the correct sum if one number is 0", () => {
        expect(add(6,0)).toBe(6);
        expect(add(-3,0)).toBe(-3);
    });
})

describe("Testing subtract function", () => {
    it("Should return the subtract of the positive numbers", () => {
        expect(subtract(3,2)).toBe(1);
    });
    it("Should return the subtract of two negative numbers", () => {
        expect(subtract(-3,-2)).toBe(-1);
    });
    it("Should return the subtract of a positive and negative number", () => {
        expect(subtract(5,-2)).toBe(7);
    });
    it("Should return 0 if both numbers are 0", () => {
        expect(subtract(0,0)).toBe(0);
    });
    it("Should return the correct subtract if one number is 0", () => {
        expect(subtract(0,2)).toBe(-2);
        expect(subtract(2,0)).toBe(2);
    });
});

describe("Testing multiply function", () => {
    it("Should return a positive product if the two numbers are posivite or negative", () => {
        expect(multiply(2,3)).toBe(6);
        expect(multiply(-2,-3)).toBe(6);
    });
    it("Should return 0 if one of the number is 0", () => {
        expect(multiply(2, 0)).toBe(0);
        expect(multiply(-3, 0)).toBeFalsy(0);
    });
    it("Should return a negative product if one of the numbers is negative", () => {
        expect(multiply(2, -7)).toBe(-14);
        expect(multiply(-3, 4)).toBe(-12);
    });
})

describe("Testing divide function", () => {
    it("Should return the result of dividing two positive numbers", () => {
        expect(divide(1, 2)).toBe(0.5);
    });
    it("Should return the result of dividing a negative number by a positive number", () => {
        expect(divide(-6, 3)).toBe(-2);
    });
    it("Should return the result of dividing a positive number by a negative number", () => {
        expect(divide(4, -2)).toBe(-2);
    });
    it("Should return the result of dividing two negative numbers", () => {
        expect(divide(-9, -3)).toBe(3);
    });
    it("Should throw an error when dividing by zero", () => {
        expect(() => {
            divide(2, 0);
        }).toThrowError('Division par zéro');
    });
});

describe("Testing isEqual function", () => {
    it("Should return true when comparing two equal numbers", () => {
        expect(isEqual(3, 3)).toBe(true);
        expect(isEqual(-3, -3)).toBe(true);
    });
    it("Should return false when comparing two different numbers", () => {
        expect(isEqual(2, 1)).toBe(false);
    });
    it("Should return true when comparing two equal strings", () => {
        expect(isEqual("hello", "hello")).toBe(true);
    });
    it("Should return false when comparing two different strings", () => {
        expect(isEqual("hello", "bonjour")).toBe(false);
    });
    it("Should return true when comparing two equal boolean values", () => {
        expect(isEqual(true, true)).toBe(true);
        expect(isEqual(false, false)).toBe(true);
    });
    it("Should return false when comparing two different boolean values", () => {
        expect(isEqual(true, false)).toBe(false);
        expect(isEqual(false, true)).toBe(false);
    });
    it("Should return false when comparing two equal objects", () => {
        const obj1 = {name: "Mahamat", age: 25};
        const obj2 = {name: "Mahamat", age: 25};
        // ici on fait la comparaison stricte (===), cela signifie que les objets sont consideres comme egaux uniquement s'ils pointent vers la meme reference en memoire.
        expect(isEqual(obj1, obj2)).toBe(false);
    });
    it("Should return false when comparing two different objects", () => {
        const obj1 = {name: "Mahamat", age: 25};
        const obj2 = {name: "Saleh", age: 25};
        expect(isEqual(obj1, obj2)).toBe(false);
    });
    
});
