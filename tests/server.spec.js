const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    test("Obteniendo un código status 200", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
    });

    test("Obteniendo un array", async () => {
        const { body } = await request(server).get("/cafes").send();
        const cafe = body;
        expect(cafe).toBeInstanceOf(Array);
    });

    test("Obteniendo un objeto", async () => {
        const { body } = await request(server).get("/cafes").send();
        const cafe = body;
        const result = cafe.find((element) => typeof element === "object");
        expect(result).toBeInstanceOf(Object);
    });

    test("Obteniendo status 404 cuando se intenta eliminar un id que no existe", async () => {
        const jwt = "token";
        const idDeProductoAEliminar = 5;
        const coffee = await request(server)
            .delete(`/cafes/${idDeProductoAEliminar}`)
            .set("Authorization", jwt)
            .send();
        const status = coffee.statusCode;
        expect(status).toBe(404);
    });

    test("Al agregar un producto debe devolver un código status 201", async () => {
        const cafe = { id: 6, nombre: "Cafe Helado" };
        const response = await request(server).post("/cafes").send(cafe);
        const status = response.statusCode;
        expect(status).toBe(201);
    });

    test("Si el id no existe, devuelve un código status 400", async () => {
        const id = 2;
        const cafe = { id, nombre: "Largo" };
        const response = await request(server).put("/cafes/1").send(cafe);
        const status = response.statusCode;
        expect(status).toBe(400);
    });
});
