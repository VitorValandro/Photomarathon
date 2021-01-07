const request = require("supertest");
const app = require("../src/app");

/*
Esse teste tem a seguinte ordem de execução:

Cria um time ->
-> Tenta listar os times sem autenticação ->
-> Lista os times com a autenticação ->
-> Tenta criar um membro sem autenticação ->
-> Cria um membro com a autenticação ->
-> Tenta listar os membros sem autenicação ->
-> Lista os membros com a autenticação ->
-> Tenta deletar um membro sem autenticação ->
-> Deleta o membro com a autenticação ->
-> Deleta o time

Compondo toda a funcionalidade da rota /teams (sem os GET's).
*/

describe("Testando a rota de Times", () => {

  let teamId;
  let memberId;
  let loginToken;
  
  test("CREATE Team - Deve responder com as propriedades do time cadastrado", async () => {
    let randomMail = Math.random().toString(36).substring(7);
    const response = await request(app)
      .post("/teams")
      .send({
        "name": "Time (teste automatizado)",
        "email": `${randomMail}@gmail.com`,
        "password": "1234"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.team).toHaveProperty('id');
    teamId = response.body.team.id;
    loginToken = response.body.token;
    console.log(loginToken);  
  });

  test("GET Teams (auth route without JWT) - Deve responder com permissão negada", async () => {
    const response = await request(app)
      .get("/teams")
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  test("GET Teams (auth route with JWT) - Deve responder com um array de times", async() => {
    const response = await request(app)
      .get("/teams")
      .set({ "Authorization": `Bearer ${loginToken}` })
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty('id');
  });

  test("CREATE Member (auth route without JWT) - Deve responder com uma permissão negada", async () => {
    const response = await request(app)
      .post(`/teams/${teamId}/members`)
      .send({
        "name": "Membro (teste automatizado)",
        "registration": "40028922",
      });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  test("CREATE Member (auth route with JWT) - Deve responder com as propriedades do membro", async () => {
    const response = await request(app)
      .post(`/teams/${teamId}/members`)
      .send({
        "name": "Membro (teste automatizado)",
        "registration": "40028922",
      })
      .set({ "Authorization": `Bearer ${loginToken}` })
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    memberId = response.body.id;
  });

  test("GET Member (auth route without JWT) - Deve responder com permissão negada", async () => {
    const response = await request(app)
      .get(`/teams/${teamId}/members`)
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  test("GET Member (auth route with JWT) - Deve responder com um array de membros", async () => {
    const response = await request(app)
      .get(`/teams/${teamId}/members`)
      .set({ "Authorization": `Bearer ${loginToken}` })
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty('id');
  });

  test("DELETE Member (auth route without JWT) - Deve responder com uma permissão negada", async () => {
    const response = await request(app)
      .delete(`/teams/${teamId}/members/${memberId}`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  test("DELETE Member (auth route with JWT) - Deve responder com uma mensagem de sucesso", async () => {
    const response = await request(app)
      .delete(`/teams/${teamId}/members/${memberId}`)
      .set({ "Authorization": `Bearer ${loginToken}` })
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  test("DELETE Team - Deve responder com uma mensagem de sucesso", async () => {
    const response = await request(app)
      .delete(`/teams/${teamId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

});