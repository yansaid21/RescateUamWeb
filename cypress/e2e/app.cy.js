
describe("App", () => {
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

describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/register");
  });

  it ("should have a logo", () => {
    cy.get(".register__logo").should("be.visible")
  })

  it("should have the correct page heading", () => {
    cy.get(".register__title").should("contain", "Regístrate en Rescate UAM");
  });  

  it("should display validation errors for empty fields", () => {
    cy.get(".register__button").click();

    cy.get("#email + .register__error").should("contain", "Este campo es requerido");
    cy.get("#name + .register__error").should("contain", "Este campo es requerido");
    cy.get("#lastname + .register__error").should("contain", "Este campo es requerido");
    cy.get("#id + .register__error").should("contain", "Este campo es requerido");
    cy.get(".register__error").should("contain", "Debes aceptar los términos y condiciones");
    
    cy.get(".register__error").should("be.visible").and("contain", "Este campo es requerido");
  });

  it("should show error for invalid email domain", () => {
    cy.get("#email").type("usuario@gmail.com");
    cy.get(".register__button").click();
    cy.get("#email + .register__error").should("contain", "Correo inválido, debe ser dominio @autonoma");
  });

  it("should show error for mismatched passwords", () => {
    cy.get("#password").type("password123").should("have.value", "password123");
    cy.get("#repassword").type("password456").should("have.value", "password456");
    cy.get(".register__button").click();
    cy.get(".register__error").should("contain", "Las contraseñas no coinciden");
  });

  it("should show error for invalid name or lastname", () => {
    cy.get("#name").type("Nombre123").should("have.value", "Nombre123");
    cy.get("#lastname").click(); // Cambia el foco para disparar la validación
    cy.get("#name + .register__error").should("contain", "El nombre solo contiene letras")

    cy.get("#lastname").type("Apellido456").should("have.value", "Apellido456");
    cy.get("#name").click(); // Cambia el foco para disparar la validación
    cy.get("#lastname + .register__error").should("contain", "El apellido solo contiene letras");
  });

  it("should show error for invalid ID", () => {
    cy.get("#id").type("abc123");
    cy.get("#name").click();
    cy.get("#id + .register__error").should("contain", "La identificación es con números");
  });

  it("should allow user to navigate to the login page", () => {
    // Hacer clic en el enlace de registro
    cy.get(".register__text").click();

    // Verificar que el usuario haya sido redirigido a la página de registro
    cy.url().should("eq", "http://localhost:5173/");
    // Ahora ejecutamos las pruebas específicas del componente `register`
  });

  it("should submit the form successfully", () => {
    // Llenar el formulario correctamente
    cy.get("#email").type("usuario@autonoma.edu.co");
    cy.get("#name").type("Nombre");
    cy.get("#lastname").type("Apellido");
    cy.get("#password").type("password1234");
    cy.get("#repassword").type("password1234");
    //cada que se haga esta prueba hay que cambiar el número del id
    cy.get("#id").type("112255661");
    cy.get("input[name='terms']").check();

    // Enviar el formulario
    cy.get(".register__button").click();

    // Verificar redirección y mensaje de éxito
    cy.url().should("eq", "http://localhost:5173/");
    cy.get(".ant-message-success").should("contain", "Registro exitoso");
  });
});
