const request = require("supertest");
const app = require("../src/app");

describe("Expense API", () => {

    test("GET /expenses should return status 200", async () => {
        const response = await request(app).get("/expenses");

        expect(response.statusCode).toBe(200);
    });

    test("POST /expenses should create a new expense", async () => {
        const response = await request(app)
            .post("/expenses")
            .send({
                title: "Test Expense",
                amount: 100,
                category: "Testing",
                date: "2026-07-31"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Test Expense");
    });

});