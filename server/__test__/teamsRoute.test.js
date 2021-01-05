const request = require("supertest");
const app = require("../src/app");

/*
Esse teste tem a seguinte ordem de execução:

Cria um Time -> Cria um membro -> Deleta o membro -> Deleta o time

Compondo toda a funcionalidade da rota /teams (sem os GET's).
*/

describe("Testando a rota de Times", () => {

  let teamId;
  let memberId;
  test("CREATE Team - Deve responder com as propriedades do time cadastrado", async () => {
    const response = await request(app)
      .post("/teams")
      .send({
          "name": "Time (teste automatizado)",
          "email": "testando@gmail.com",
          "password": "1234"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    teamId = response.body.id;
  });

  test("CREATE Member - Deve responder com as propriedades do membro cadastrado", async () => {
    const response = await request(app)
      .post(`/teams/${teamId}/members`)
      .send({
        "name": "Membro (teste automatizado)",
        "registration": "40028922",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    memberId = response.body.id;
  });

  /* test("CREATE Photo - Deve responder com as propriedades da foto cadastrada", async () => {
    const response = await request(app)
      .post(`/teams/${teamId}/photos`)
      .send({
        "name": "Photo (teste automatizado)",
        "registration": "40028922",
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

  test("DELETE Member - Deve responder com uma mensagem de sucesso", async () => {
    const response = await request(app)
      .delete(`/teams/${teamId}/members/${memberId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  })

  test("DELETE Team - Deve responder com uma mensagem de sucesso", async () => {
    const response = await request(app)
      .delete(`/teams/${teamId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  })
});