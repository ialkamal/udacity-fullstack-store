"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../data/models/orders");
describe("Order Models", () => {
    const userId = 1; // Using seeded user
    it("DB currentOrderByUser method", async () => {
        expect(orders_1.currentOrderByUser).toBeDefined();
        const currentOrder = await (0, orders_1.currentOrderByUser)(userId);
        expect(currentOrder).toBeDefined();
        // Check if order has expected structure
        if (Object.keys(currentOrder).length > 0) {
            expect(currentOrder).toEqual(jasmine.objectContaining({
                id: jasmine.any(Number),
                user_id: userId,
                active_status: true,
                products: jasmine.any(Array),
            }));
        }
    });
    it("DB completedOrdersByUser method", async () => {
        expect(orders_1.completedOrdersByUser).toBeDefined();
        const completedOrders = await (0, orders_1.completedOrdersByUser)(userId);
        expect(Array.isArray(completedOrders)).toBeTrue();
        // Check if completed orders have expected structure
        if (completedOrders.length > 0) {
            expect(completedOrders[0]).toEqual(jasmine.objectContaining({
                id: jasmine.any(Number),
                user_id: userId,
                active_status: false,
                products: jasmine.any(Array),
            }));
        }
    });
});
