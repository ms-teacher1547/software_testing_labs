import { describe, expect, it } from "vitest";
import { calculatePercentageDiscount } from "../../js/promotions/promotions";

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
        const result = calculatePercentageDiscount(percenetage, minimumSpend, currentPrice);

        expect(() => calculatePercentageDiscount(percenetage, minimumSpend, currentPrice)).toThrow("Percentage cannot be negative");
    });
})