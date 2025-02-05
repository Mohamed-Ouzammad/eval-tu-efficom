const { isEven, calculateTotalPrice, sendNotification, processPurchase, generatePassword } = require("./../src/function.js");

//mock pour tester sendnotif
console.log = jest.fn();

describe("isEven", () => {
    test("Should return true for an even number", () => {
        expect(isEven(2)).toBe(true);
        expect(isEven(0)).toBe(true);
    });

    test("Should return false for an odd number", () => {
        expect(isEven(1)).toBe(false);
        expect(isEven(-3)).toBe(false);
    });

    test("Should raise an error if the input is not a number", () => {
        expect(() => isEven("a")).toThrow("Input must be a number");
        expect(() => isEven(null)).toThrow("Input must be a number");
    });
});

describe("calculateTotalPrice", () => {
    test("Should return the full price with tax", () => {
        expect(calculateTotalPrice([10, 20], 0.2)).toBe(36);
    });

    test("Should return 0 if the cart is empty", () => {
        expect(calculateTotalPrice([], 0.2)).toBe(0);
    });

    test("Should throw an error if the cart is not an array", () => {
        expect(() => calculateTotalPrice("not an array", 0.2)).toThrow("Prices must be an array");
    });

    test("Should throw an error if the tax rate is not a number", () => {
        expect(() => calculateTotalPrice([10, 20], "tax")).toThrow("Tax rate must be a number");
    });

    test("Should throw an error if a cart price is negative or is not a number", () => {
        expect(() => calculateTotalPrice([10, -5], 0.2)).toThrow("Each price must be a non-negative number");
        expect(() => calculateTotalPrice([10, "prix"], 0.2)).toThrow("Each price must be a non-negative number");
    });
});

describe("sendNotification", () => {
    test("Should display the correct message in the console", () => {
        sendNotification("Test message");
        expect(console.log).toHaveBeenCalledWith("Notification envoyée : Test message");
    });
});

describe("processPurchase", () => {
    test("Should calculate the total price and send a notification", () => {
        const cart = [10, 20];
        const taxRate = 0.2;
        const total = processPurchase(cart, taxRate);

        expect(total).toBe(36);

        expect(console.log).toHaveBeenCalledWith("Notification envoyée : Votre total est de 36.00 €");
    });
});

describe("generatePassword", () => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    test("Should generate a password with the correct length and default complexity", () => {
        const password = generatePassword(7);
        expect(password).toHaveLength(7);
        expect(password.split('').some(c => lowercaseChars.includes(c))).toBe(true);
        expect(password.split('').some(c => uppercaseChars.includes(c))).toBe(true);
        expect(password.split('').some(c => specialChars.includes(c))).toBe(true);
        expect(password.split('').some(c => numberChars.includes(c))).toBe(true);
    });

    test("Should throw an error if the length is less than 6", () => {
        expect(() => generatePassword(5)).toThrow("Length must be a number greater than or equal to 6");
    });

    test("Should throw an error if the length is not a number", () => {
        expect(() => generatePassword("abc")).toThrow("Length must be a number greater than or equal to 6");
    });
});