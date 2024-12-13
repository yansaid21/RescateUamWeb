
describe("login page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173")})
  it ("should have a title", () => {
    cy.title().should("eq", "Rescate UAM")
  })
  it ("should have a logo", () => {
    cy.get(".content__logo").should("be.visible")
  })
  it("should allow user to log in and check password visibility", () => {
    // Ingresar email
    cy.get("#email").type("johndoe@autonoma.edu.co").should("have.value", "johndoe@autonoma.edu.co");

    // Ingresar contraseña
    cy.get("#password").type("password123").should("have.value", "password123");

    // Verificar que la contraseña esté oculta por defecto
    cy.get("#password").should("have.attr", "type", "password");

    // Mostrar la contraseña al hacer clic en el botón de ojo
    cy.get(".ant-input-suffix").click();
    cy.get("#password").should("have.attr", "type", "text");

    // Ocultar la contraseña nuevamente
    cy.get(".ant-input-suffix").click();
    cy.get("#password").should("have.attr", "type", "password");
    // Hacer clic en el botón de inicio de sesión
    cy.get(".ant-btn").click();

    // Verificar que el usuario haya iniciado sesión correctamente
    cy.url().should("include", "/admin");
  });
  it("should deny access if the email does not have @autonoma.edu.co domain", () => {
    // Ingresar email con dominio incorrecto
    cy.get("#email").type("johndoe@gmail.com").should("have.value", "johndoe@gmail.com");

    // Ingresar contraseña
    cy.get("#password").type("password123").should("have.value", "password123");

    // Hacer clic en el botón de inicio de sesión
    cy.get(".ant-btn").click();

    // Verificar que el usuario no haya iniciado sesión y se muestre un mensaje de error
    cy.url().should("not.include", "/admin");
    cy.get(".content__error").should("be.visible").and("contain", "Correo inválido, debe ser dominio @autonoma");
  });
  it("should deny access if there is not password", () => {
    // Ingresar email con dominio incorrecto
    cy.get("#email").type("johndoe@autonoma.edu.co").should("have.value", "johndoe@autonoma.edu.co");

    cy.get(".ant-btn").click();

    // Verificar que el usuario no haya iniciado sesión y se muestre un mensaje de error
    cy.url().should("not.include", "/admin");
    cy.get(".content__error").should("be.visible").and("contain", "Este campo es requerido");
  });

  it("should allow user to navigate to the registration page", () => {
    // Hacer clic en el enlace de registro
    cy.get(".content__text").click();

    // Verificar que el usuario haya sido redirigido a la página de registro
    cy.url().should("include", "/register");
    // Ahora ejecutamos las pruebas específicas del componente `register`
  });
})
