import { describe, it, expect, vi, beforeEach } from "vitest";
import exchangeRateProvider from "../../js/promotions/exchange/exchangeRateProvider";
import getExchangeRate from "../../js/promotions/exchange/exchange";

// Mocking the exchangeRateProvider
vi.mock("../../../js/promotions/exchange/exchangeRateProvider", () => {
    return {
        default: {
            callExchangeRateProvider: vi.fn()
        }
    };
});


describe("exchangeRateProvider", () => {
    it("Should return the correct rate for USD", () => {
        const exchangeRate = exchangeRateProvider.callExchangeRateProvider("USD");
        expect(exchangeRate).toBe(1.25);
    })

    it("Should return the correct exchange rate for EUR", () => {
        const exchangeRate = exchangeRateProvider.callExchangeRateProvider("EUR");
        expect(exchangeRate).toBe(1.18);
    });

    it("Should return the correct exchange rate for NZD", () => {
        const exchangeRate = exchangeRateProvider.callExchangeRateProvider("NZD");
        expect(exchangeRate).toBe(1.93);
    });

    it("Should throw an error for an unsupported currency", () => {
        expect(() => exchangeRateProvider.callExchangeRateProvider("FCFA")).toThrowError("Currency not supported");
    });
 });
