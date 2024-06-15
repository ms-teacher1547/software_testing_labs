import { describe, expect, it } from "vitest";
import { calculatePercentageDiscount, calculateMoneyOff } from "../../js/promotions/promotions";

describe("Testing calculatePercentageDiscount", () =>{
    it("Shoud apply the percentage discount when cuurent price is equal to minimum spend", () =>{
        const percentage = 10;
        const minimumSpend = 60;
        const currentPrice = 60;
        // discount = 90
        const resultatAttendu = 54;
        const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });


    it("Should apply the precentage discount correctly when curent price meets minimum spend", () => {
        const precentage = 10;
        const minimumSpend = 50;
        const currentPrice = 60;
        // discount = 100 - 10 = 90
        const resultatAttendu = 54; // 60 * 0.9 = 54
        const result = calculatePercentageDiscount(precentage, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should not apply the discount when preice is below minimum spend", () => {
        const percentage = 10;
        const minimumSpend = 50;
        const currentPrice = 40;
        // discount = 90 
        const resultatAttendu = 40;
        const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should return the same price for 0% percenetage", () => {
        const percentage = 0;
        const minimumSpend = 50;
        const currentPrice = 60;
        // discount = 100 - 0 = 100
        const resultatAttendu = 60 // 60 * (1) = 60
        const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Shoud return 0 for 100% percentage", () => {
        const percenetage = 100;
        const minimumSpend = 50;
        const currentPrice = 60;
        // discount = 100 - 100 = 0
        const resultatAttendu = 0 // 60 * (0/100) = 0
        const result = calculatePercentageDiscount(percenetage, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it('should handle invalid percentage gracefully', () => {
        const percenetage = - 10;
        const minimumSpend = 50;
        const currentPrice = 60;

        expect(() => calculatePercentageDiscount(percenetage, minimumSpend, currentPrice)).toThrow("Percentage cannot be negative");
    });

    it("Should handle the percentage greater than 100 gracefully", () =>{
        const percenetage = 110;
        const minimumSpend = 50;
        const currentPrice = 60;
    
        expect(() => calculatePercentageDiscount(percenetage, minimumSpend, currentPrice)).toThrow("Percentage cannot be greater than 100")
    
    });   
})

describe("Testing calculateMoneyOff function", () => {
    it("Should apply the discount when current price is equal to minimum spend", () => {
        const discount = 10;
        const minimumSpend = 60;
        const currentPrice = 60;

        const resultatAttendu = 50; // 60 - 10 = 50
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should apply discount when current price is greater than minimum spend", () => {
        const discount = 10;
        const minimumSpend = 50;
        const currentPrice = 70;
        const resultatAttendu = 60; // 70 - 10 = 60
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should not apply the discount when current price is less than minimum spend", () => {
        const discount = 10;
        const minimumSpend = 50;
        const currentPrice = 40;
        const resultatAttendu = 40; // Not applied because 50 > 40
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should handle discount greater than current price", () => {
        const discount = 70;
        const minimumSpend = 50;
        const currentPrice = 60;
        const resultatAttendu = -10; // 60 - 70;
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should return the same price when discount is zero", () => {
        const discount = 0;
        const minimumSpend = 50;
        const currentPrice = 60;
        const resultatAttendu = 60; // 60 - 0 = 60
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should handle zero current price", () => {
        const discount = 10;
        const minimumSpend = 50;
        const currentPrice = 0;
        const resultatAttendu = 0; // No discount applied
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should handle zero minimum spend", () => {
        const discount = 10;
        const minimumSpend = 0;
        const  currentPrice = 60;
        const resultatAttendu = 50; // 60 - 10 = 50
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

});