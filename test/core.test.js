import { describe, expect, it, beforeEach } from "vitest";
import { getCoupons, calculateDiscount, isPriceInRange, isValidUsername, fetchData, Stack, createProduct, isStrongPassword } from "../core";

describe("Testing getCoupons function", () => {
  it("Should return an array of coupons", () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons).toHaveLength(2);
  });

  it("Each coupon should have a code and a discount", () => {
    const coupons = getCoupons();
    coupons.forEach(coupon => {
      expect(coupon).toHaveProperty('code');
      expect(coupon).toHaveProperty('discount');
    });
  });

  it("Should return the correct coupons with their codes and discounts", () => {
    const coupons = getCoupons();
    expect(coupons[0]).toEqual({ code: 'SAVE20NOW', discount: 0.2 });
    expect(coupons[1]).toEqual({ code: 'DISCOUNT50OFF', discount: 0.5 });
  });
});

describe("Testing calculateDiscount function", () => {
    it("Should calculate the discount correctly for valid inputs and discount codes", () => {
        expect(calculateDiscount(100, 'SAVE10')).toBe(90);
        expect(calculateDiscount(200, 'SAVE20')).toBe(160);
    });
    it("Should return 'Invalid price' for invalid price inputs", () => {
        expect(calculateDiscount('abc', 'SAVE10')).toBe('Invalid price');
        expect(calculateDiscount(-50, 'SAVE20')).toBe('Invalid price');
    });
    it("Should return 'Invalid discount code' for invalid discount codes", () => {
        expect(calculateDiscount(100, 123)).toBe('Invalid discount code');
        expect(calculateDiscount(100, null)).toBe('Invalid discount code');
    });
})

describe("Testing isPriceInRange function", () => {
    it("Should return true when the price is within the range", () => {
        expect(isPriceInRange(10, 0, 20)).toBe(true);
        expect(isPriceInRange(15, 10, 20)).toBe(true);
        expect(isPriceInRange(20, 0, 20)).toBe(true);
    });
    it("Should return false when the price is outside the range", () => {
        expect(isPriceInRange(5, 10, 10)).toBe(false);
        expect(isPriceInRange(15, 5, 10)).toBe(false);
    });
    it("Should return true when the price is at the lower bound of the range", () => {
        expect(isPriceInRange(10, 10, 20)).toBe(true);
    });
    it("Should return true when the price is at the upper bound of the range", () => {
        expect(isPriceInRange(3, 1, 3)).toBe(true);
    });
})

describe("Testing isValidUsername function", () => {
    it("Should return true when username lenght is within the valid range", () => {
        expect(isValidUsername("mahamat_saleh")).toBe(true);
        expect(isValidUsername("ms_teach1547")).toBe(true);
        expect(isValidUsername("teacher1547")).toBe(true);
    });
    it("Should return false when username lenght is less than minimum length", () => {
        expect(isValidUsername("Issa")).toBe(false);
        expect(isValidUsername("")).toBe(false);
    });
    it("Shoud return false when username length is greater than the maximum lenght", () => {
        expect(isValidUsername("mahamat_saleh_mahamat")).toBe(false);
        expect(isValidUsername("this_is_a_long_username")).toBe(false);
    });
    it("Should return true when username lenght is equal to the minimum lenght", () => {
        expect(isValidUsername("saleh")).toBe(true);
    });
    it("Should return true when username lenght is equal to the maximum lenght", () => {
        expect(isValidUsername("mahamat_saleh_m")).toBe(true);
    });
})

/*describe("Testing fetchData function", () => {
    it("", () => {
        expect(fetchData)
    });
})

describe("", () => {
    it("", () => {

    });
})*/



describe("Testing fetchData function", () => {
  it("Should resolve with the correct data array", async () => {
    const data = await fetchData();
    expect(data).toEqual([1, 2, 3]);
  });

  it("Should resolve with an array of numbers", async () => {
    const data = await fetchData();
    expect(data).toBeInstanceOf(Array);
    data.forEach(item => {
      expect(typeof item).toBe("number");
    });
  });

  it("Should resolve after a delay", async () => {
    const startTime = Date.now();
    await fetchData();
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    // Assuming a delay of 1000 milliseconds
    //expect(elapsedTime).toBeGreaterThan(1);
    expect(elapsedTime).toBeLessThan(1100);
  });
});

describe("Testing Stack class", () => {
  let stack;

  // Setup: Creer une nouvelle instance de Stack avant que chaque test 
  beforeEach(() => {
    stack = new Stack();
  });

  it("Should push items onto the stack", () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
  });

  it("Should pop items from the stack", () => {
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2)
    expect(stack.size()).toBe(1);
  });

  it("Should peek the top items of the stack", () => {
    stack.push(1);
    stack.push(2);
    expect(stack.peek()).toBe(2);
    expect(stack.size()).toBe(2);
  });

  it("Should clear the stack", () => {
    stack.push(1);
    stack.push(2);
    stack.clear();
    expect(stack.size()).toBe(0);
    expect(stack.isEmpty()).toBe(true);
  });

  it("Should throw an error when popping or peeking an empty stack ", () => {
    
    expect(() =>{
      stack.pop();
    }).toThrowError('Stack is empty');

    expect(() => {
      stack.peek();
    }).toThrowError('Stack is empty')
  });
})


describe("Testing createProduct function", () => {
  it("Should return success message when product is created successfully", () => {
    const product = { name: "Product A", price: 10 };
    const result = createProduct(product);
    expect(result).toEqual({ success: true, message: 'Product was successfully published' });
  });

  it("Should return error message when product name is missing", () => {
    const product = { price: 10 };
    const result = createProduct(product);
    expect(result).toEqual({
      success: false,
      error: { code: 'invalid_name', message: 'Name is missing' },
    });
  });

  /*it("Should return error message when product price is missing", () => {
    const product = { name: "Product A" };
    const result = createProduct(product);
    expect(result).toEqual({
      success: false,
      error: { code: 'invalid_price', message: 'Price is missing' },
    });
  });*/

  it("Should return error message when product price is negative", () => {
    const product = { name: "Product A", price: -10 };
    const result = createProduct(product);
    expect(result).toEqual({
      success: false,
      error: { code: 'invalid_price', message: 'Price is missing' },
    });
  });

  it("Should return error message when product price is zero", () => {
    const product = { name: "Product A", price: 0 };
    const result = createProduct(product);
    expect(result).toEqual({
      success: false,
      error: { code: 'invalid_price', message: 'Price is missing' },
    });
  });
});



describe("Testing isStrongPassword function", () => {
  it("Should return true for a strong password", () => {
    expect(isStrongPassword("StrongP@ssword123")).toBe(true);
    expect(isStrongPassword("Abcd1234")).toBe(true);
  });

  it("Should return false if password length is less than 8 characters", () => {
    expect(isStrongPassword("Weak")).toBe(false);
    expect(isStrongPassword("1234567")).toBe(false);
  });

  it("Should return false if password does not contain at least one uppercase letter", () => {
    expect(isStrongPassword("weakpassword123")).toBe(false);
    expect(isStrongPassword("12345678")).toBe(false);
  });

  it("Should return false if password does not contain at least one lowercase letter", () => {
    expect(isStrongPassword("WEAKPASSWORD123")).toBe(false);
    expect(isStrongPassword("12345678")).toBe(false);
  });

  it("Should return false if password does not contain at least one digit", () => {
    expect(isStrongPassword("WeakPassword")).toBe(false);
    expect(isStrongPassword("Abcdefgh")).toBe(false);
  });
});

