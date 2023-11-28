describe("Characters functional tests", () => {
    it("Should return rick character", async () => {
        const { body, status } = await global.testRequest.get("/character/");
        expect(status).toBe(200);
        expect(body).toEqual({
            character: "rick",
        });
    });
});
