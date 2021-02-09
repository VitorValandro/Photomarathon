const request = require("supertest");
const app = require("../src/app");

/*
Esse teste tem a seguinte ordem de execução:

Cria um tema ->
-> Cria um subtema ->
-> Deleta o subtema ->
-> Deleta o tema

Compondo toda a funcionalidade da rota /themes (sem os GET's).
*/

describe("Testando a rota de Temas", () => {
  let themeId;
  let subthemeId;

  test("CREATE Theme - Deve responder com as propriedades do tema cadastrado", async () => {
    const response = await request(app)
      .post("/themes")
      .send({
        "title": "Tema (teste automatizado)",
        "year": 1314
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    themeId = response.body.id;
  });

  test("CREATE Subtheme - Deve responder com as propriedades do subtema cadastrado", async () => {
    const response = await request(app)
      .post(`/themes/${themeId}/subthemes`)
      .send({
        "title": "Subtema (teste automatizado)",
        "number": 99
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    subthemeId = response.body.id;
  });
/* 
  test("CREATE Photo - Deve responder com as propriedades da foto cadastrada", async () => {
    const response = await request(app)
      .post(`/teams/${teamId}/photos`)
      .send({
        "name": "Photo (teste automatizado)",
        "themeId": themeId,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    photoId = response.body.id;
  });

  test("DELETE Photo - Deve responder com uma mensagem de sucesso", async () => {
    const response = await request(app)
      .delete(`/teams/${teamId}/photos/${photoId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  }) */

  test("DELETE Subtheme - Deve responder com uma mensagem de sucesso", async () => {
    const response = await request(app)
      .delete(`/themes/subthemes/${subthemeId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  test("DELETE Theme - Deve responder com uma mensagem de sucesso", async () => {
    const response = await request(app)
      .delete(`/themes/${themeId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
});
