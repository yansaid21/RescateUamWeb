const { ItalicOutlined } = require("@ant-design/icons");

describe("login page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173")})
    //ingresar email
    it("should create a zone", () => {
    cy.get("#email").type("johndoe@autonoma.edu.co").should("have.value", "johndoe@autonoma.edu.co");
    // Ingresar contraseña
    cy.get("#password").type("password123").should("have.value", "password123");
    cy.get(".ant-btn").click();
    cy.get(".icons-container > :nth-child(2)").click();
    cy.get(":nth-child(4) > .section-menu-link > .section-menu-content").click();
    cy.get(".ant-btn").click();
    cy.get(".ant-select-selection-item").click();
    cy.wait(1000);
    cy.get("#addNewZone").click();
    const zoneName = `Zona ${Math.floor(Math.random() * 1000)}`;
    cy.get("#name").type(zoneName).should("have.value", zoneName);
    cy.get("#description").type(`${zoneName} de prueba`).should("have.value", `${zoneName} de prueba`);
    cy.get(".form__buttonzone").click();
    }),
  it ("should not create a zone for especial characters", () => {
    cy.get("#email").type("johndoe@autonoma.edu.co").should("have.value", "johndoe@autonoma.edu.co");
    // Ingresar contraseña
    cy.get("#password").type("password123").should("have.value", "password123");
    cy.get(".ant-btn").click();
    cy.get(".icons-container > :nth-child(2)").click();
    cy.get(":nth-child(4) > .section-menu-link > .section-menu-content").click();
    cy.get(".ant-btn").click();
    cy.get(".ant-select-selection-item").click();
    cy.wait(1000);
    cy.get("#addNewZone").click();
    const zoneName = `Zona ${Math.floor(Math.random() * 1000)}`;
    cy.get("#name").type(zoneName).should("have.value", zoneName);
    cy.get("#description").type(`zona de prueba:${zoneName}`).should("have.value", `zona de prueba:${zoneName}`);
    cy.get(".error__text").should("be.visible").and("contain", "No admite caracteres especiales");
  });
  it ("should not create a zone for desceription empty field", () => {
    cy.get("#email").type("johndoe@autonoma.edu.co").should("have.value", "johndoe@autonoma.edu.co");
    // Ingresar contraseña
    cy.get("#password").type("password123").should("have.value", "password123");
    cy.get(".ant-btn").click();
    cy.get(".icons-container > :nth-child(2)").click();
    cy.get(":nth-child(4) > .section-menu-link > .section-menu-content").click();
    cy.get(".ant-btn").click();
    cy.get(".ant-select-selection-item").click();
    cy.wait(1000);
    cy.get("#addNewZone").click();
    const zoneName = `Zona ${Math.floor(Math.random() * 1000)}`;
    cy.get("#name").type(zoneName).should("have.value", zoneName);
    cy.get(".error__text").should("be.visible").and("contain", "Este campo es requerido");

  });
  it ("should not create a zone for zone name empty field", () => {
    cy.get("#email").type("johndoe@autonoma.edu.co").should("have.value", "johndoe@autonoma.edu.co");
    // Ingresar contraseña
    cy.get("#password").type("password123").should("have.value", "password123");
    cy.get(".ant-btn").click();
    cy.get(".icons-container > :nth-child(2)").click();
    cy.get(":nth-child(4) > .section-menu-link > .section-menu-content").click();
    cy.get(".ant-btn").click();
    cy.get(".ant-select-selection-item").click();
    cy.wait(1000);
    cy.get("#addNewZone").click();
    const zoneName = `Zona ${Math.floor(Math.random() * 1000)}`;
    cy.get("#description").type(`${zoneName} de prueba`).should("have.value", `${zoneName} de prueba`);
    cy.get(".error__text").should("be.visible").and("contain", "Este campo es requerido");

  });
  it ("should not create a zone for zone name empty fields", () => {
    cy.get("#email").type("johndoe@autonoma.edu.co").should("have.value", "johndoe@autonoma.edu.co");
    // Ingresar contraseña
    cy.get("#password").type("password123").should("have.value", "password123");
    cy.get(".ant-btn").click();
    cy.get(".icons-container > :nth-child(2)").click();
    cy.get(":nth-child(4) > .section-menu-link > .section-menu-content").click();
    cy.get(".ant-btn").click();
    cy.get(".ant-select-selection-item").click();
    cy.wait(1000);
    cy.get("#addNewZone").click();
    cy.get(".form__buttonzone").click();
    cy.get(".error__text").should("be.visible").and("contain", "Este campo es requerido");

  });
})