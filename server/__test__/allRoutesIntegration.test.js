const request = require("supertest");
const app = require("../src/app");

/*
Esse teste tem a seguinte ordem de execução:

Cria um time -> 
-> Cria um membro ->
-> Cria um tema ->
-> Cria um subtema -> 
-> Cria uma foto ->
-> Deleta a foto ->
-> Deleta o subtema -> 
-> Deleta o tema->
-> Deleta o membro ->
Deleta o time

Compondo toda a funcionalidade da rota /themes (sem os GET's).
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

  describe("Testando a rota de Temas", () => {
    let themeId;
    let subthemeId;

    test("CREATE Theme - Deve responder com as propriedades do tema cadastrado", async () => {
      const response = await request(app)
        .post("/themes")
        .send({
          "title": "Tema (teste automatizado)",
          "year": 2020
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
          "number": 2
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id');
      subthemeId = response.body.id;
    });

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
    })

    test("DELETE Subtheme - Deve responder com uma mensagem de sucesso", async () => {
      const response = await request(app)
        .delete(`/themes/${themeId}/subthemes/${subthemeId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message');
    })

    test("DELETE Theme - Deve responder com uma mensagem de sucesso", async () => {
      const response = await request(app)
        .delete(`/themes/${themeId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message');
    })
  });
  

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