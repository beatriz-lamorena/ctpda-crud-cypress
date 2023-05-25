//Funcion para conectarse a la aplicacion como usuario Administrador JOSE RAMON
function navegarLogin() {
  cy.viewport(1333, 666);
  cy.visit('http://localhost:8080/gestor-pdt/aplicacion/login.jsf');
  cy.wait(2000);
  cy.fixture('datos-login.json').then(datos => {
      cy.log("Usuario: " + datos.username);
      cy.log("Contraseña: " + datos.password);
      const id_usuario = datos.username;
      const password_usuario = datos.password;

      cy.xpath("//input[@id='formLogin:loginUsuario']").type(id_usuario);
      cy.xpath("//input[@id='formLogin:contrasenyaUsuario']").type(password_usuario);
  });

  cy.xpath("//button[@id='formLogin:acceder']/span").click();
  cy.xpath("//div[@id='formLogin:perfilesAsociados']/div[3]/span").click();
  cy.xpath("//li[@id='formLogin:perfilesAsociados_1']").click();
  cy.xpath("//button[@id='formLogin:acceder']/span").click();
  cy.wait(2000);
}

//Editar Usuario JOSE RAMON

describe('editarUsuario', () => {
  it('navegarLogin', () => {
      navegarLogin();
      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
      cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:1:edicionUsuario']/span").first().click();
      cy.xpath("//input[@id='formFormularioUsuarios:nombre']").clear().type(' ');
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click();
      cy.xpath("//div[@id='primefacesmessagedlg']/div/a/span").click();
      cy.xpath("//input[@id='formFormularioUsuarios:nombre']").clear().type('Nuevo nombre');
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click();
      //cy.xpath("//div[@id='primefacesmessagedlg']/div/a/span").first().click();
      //cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click();
      cy.xpath("//div[@id='primefacesmessagedlg']/div/a/span").click();
      cy.xpath("//input[@id='formFormularioUsuarios:email']").clear().type('correo_invalido');
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click();
      cy.xpath("//div[@id='primefacesmessagedlg']/div/a/span").click();
      cy.xpath("//input[@id='formFormularioUsuarios:nombre']").clear().type('Nombre demasiado largo que excede el límite permitido');
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click();
      cy.xpath("//div[@id='primefacesmessagedlg']/div/a/span").click();
      cy.xpath("//input[@id='formFormularioUsuarios:nombre']").clear().type('Nuevo nombre');
      cy.xpath("//input[@id='formFormularioUsuarios:cancelar']/span[2]").first().click();
      cy.xpath("//button[@id='formFormularioUsuarios:j_idt103']/span").click();
  });
    });


//Buscar usuarios JUAN MARTIN CANDELA

describe('buscarUsuarios', () => {

  it('buscarUsuarios', () => {
      navegarLogin();
      
      //Entrar al apartado de Usuarios
      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
      //Buscar sin campos
      cy.xpath("//button[@id='formListadoUsuarios:filtrar']/span[2]").click();
      cy.wait(2000);
      
      //Buscar por nombre Juan
      cy.xpath("//input[@id='formListadoUsuarios:nombre_filtro']").type("Juan");
      cy.xpath("//button[@id='formListadoUsuarios:filtrar']/span[2]").click();
      cy.wait(2000);
      cy.xpath("//input[@id='formListadoUsuarios:nombre_filtro']").clear().type(' {backspace}');
      
      //Buscar por apellido Martin
      cy.xpath("//input[@id='formListadoUsuarios:primerApellido_filtro']").type('Martin');
      cy.xpath("//button[@id='formListadoUsuarios:filtrar']/span[2]").click();
      cy.wait(2000);
      cy.xpath("//input[@id='formListadoUsuarios:primerApellido_filtro']").clear().type(' {backspace}');
      
      //Buscar por identificador
      cy.xpath("//input[@id='formListadoUsuarios:identificador_filtro']").type("JUANMC");
      cy.xpath("//button[@id='formListadoUsuarios:filtrar']/span[2]").click();
      cy.wait(2000);
      
      //Buscar por todos los campos obligatorios
      cy.xpath("//input[@id='formListadoUsuarios:nombre_filtro']").type("Juan");
      cy.xpath("//input[@id='formListadoUsuarios:primerApellido_filtro']").type('Martin');
      cy.xpath("//input[@id='formListadoUsuarios:login_filtro']").type('juan.martin');
      cy.xpath("//button[@id='formListadoUsuarios:filtrar']/span[2]").click();
      cy.wait(2000);
  }); 

});


//Nuevo usuario JUAN MARTIN 
describe('guardarUsuarios', () => {

  it('guardar usuarios', () => {
      navegarLogin();
      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
      cy.xpath("//button[@id='formListadoUsuarios:nuevoUsuario']/span[2]").click();
      cy.xpath("//input[@id='formFormularioUsuarios:nombre']").type("Jose");
      cy.xpath("//input[@id='formFormularioUsuarios:primerApellido']").type("Palos");
      cy.xpath("//input[@id='formFormularioUsuarios:segundoApellido']").type("Guiso");
      cy.xpath("//label[@id='formFormularioUsuarios:comboValorIdentificador_label']").click();
      cy.xpath("//li[@id='formFormularioUsuarios:comboValorIdentificador_4']").click();
      cy.xpath("//input[@id='formFormularioUsuarios:identificador']").type("JOSEEX12");
      cy.xpath("//input[@id='formFormularioUsuarios:email']").type("juan.martin@soltel.es");
      cy.xpath("//input[@id='formFormularioUsuarios:telefono_input']").type("602020220");
      cy.xpath("//input[@id='formFormularioUsuarios:login']").type("jose.palos");
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click();
      
  });
});

//Validaciones de campos PEDRO GARCIA

describe('Comprobación de formulario de creación de nuevo usuario', () => {

  it('Valida los campos requeridos', () => {
      navegarLogin();
      //Valida los campos requeridos
      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
      cy.xpath("//button[@id='formListadoUsuarios:nuevoUsuario']/span[2]").click();
      cy.xpath("//input[@id='formFormularioUsuarios:nombre']").should('have.value', '');
      cy.xpath("//input[@id='formFormularioUsuarios:primerApellido']").should('have.value', '');
      cy.xpath("//input[@id='formFormularioUsuarios:segundoApellido']").should('have.value', '');
      cy.xpath("//label[@id='formFormularioUsuarios:comboValorIdentificador_label']").should('have.value', '');
      cy.xpath("//input[@id='formFormularioUsuarios:identificador']").should('have.value', '');
      cy.xpath("//input[@id='formFormularioUsuarios:email']").should('have.value', '');
      cy.xpath("//input[@id='formFormularioUsuarios:telefono_input']").should('have.value', '');
      cy.xpath("//input[@id='formFormularioUsuarios:login']").should('have.value', '');
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click({ force: true }); //porque realmente queremos que salga true
      cy.xpath("//div[@id='primefacesmessagedlg']/div/a/span").click();
      // de comprobacion de error
      cy.wait(2000)

      //Valida el campo 1 obligatorio
      cy.xpath("//input[@id='formFormularioUsuarios:nombre']").should('have.value', '');
      cy.xpath("//input[@id='formFormularioUsuarios:primerApellido']").type("Juan");
      cy.xpath("//input[@id='formFormularioUsuarios:segundoApellido']").type("Guti");
      cy.xpath("//label[@id='formFormularioUsuarios:comboValorIdentificador_label']").click();
      cy.xpath("//li[@id='formFormularioUsuarios:comboValorIdentificador_4']").click();
      cy.xpath("//input[@id='formFormularioUsuarios:identificador']").type("MANTEC12");
      cy.xpath("//input[@id='formFormularioUsuarios:email']").type("agua.martin@soltel.es");
      cy.xpath("//input[@id='formFormularioUsuarios:telefono_input']").type("612020220");
      cy.xpath("//input[@id='formFormularioUsuarios:login']").type("agua.agua");
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click();
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click({ force: true });
      cy.xpath("//div[@id='primefacesmessagedlg']/div/a/span").click();
      cy.wait(2000)

      //Valida el campo 2 obligatorio
      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
      cy.xpath("//button[@id='formListadoUsuarios:nuevoUsuario']/span[2]").click();
      cy.xpath("//input[@id='formFormularioUsuarios:nombre']").type("Jose");
      cy.xpath("//input[@id='formFormularioUsuarios:primerApellido']").should('have.value', '');
      cy.xpath("//input[@id='formFormularioUsuarios:segundoApellido']").type("Alta");
      cy.xpath("//label[@id='formFormularioUsuarios:comboValorIdentificador_label']").click();
      cy.xpath("//li[@id='formFormularioUsuarios:comboValorIdentificador_4']").click();
      cy.xpath("//input[@id='formFormularioUsuarios:identificador']").type("MANTEC12");
      cy.xpath("//input[@id='formFormularioUsuarios:email']").type("agua.martin@soltel.es");
      cy.xpath("//input[@id='formFormularioUsuarios:telefono_input']").type("612020220");
      cy.xpath("//input[@id='formFormularioUsuarios:login']").type("agua.agua");
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click();
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click({ force: true });
      cy.xpath("//div[@id='primefacesmessagedlg']/div/a/span").click();
      cy.wait(2000)

      //Valida ya existe ese identificador

      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
      cy.xpath("//button[@id='formListadoUsuarios:nuevoUsuario']/span[2]").click();
      cy.xpath("//input[@id='formFormularioUsuarios:nombre']").type("Jose");
      cy.xpath("//input[@id='formFormularioUsuarios:primerApellido']").type("Maria");
      cy.xpath("//input[@id='formFormularioUsuarios:segundoApellido']").type("Alta");
      cy.xpath("//label[@id='formFormularioUsuarios:comboValorIdentificador_label']").click();
      cy.xpath("//li[@id='formFormularioUsuarios:comboValorIdentificador_4']").click();
      cy.xpath("//input[@id='formFormularioUsuarios:identificador']").type("MANTEC12");
      cy.xpath("//input[@id='formFormularioUsuarios:email']").type("agua.martin@soltel.es");
      cy.xpath("//input[@id='formFormularioUsuarios:telefono_input']").type("612020220");
      cy.xpath("//input[@id='formFormularioUsuarios:login']").type("agua.agua");
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click();
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click({ force: true });
      cy.wait(2000)
  });
})



//Detalle usuario PEDRO ROMERO

describe('consultarUsuarios', () => {

  it(' consultarUsuarios', () => {
      navegarLogin();
      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
      cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:2:consultarUsuario']/span").first().click();
      cy.xpath("//fieldset[@id='formFormularioUsuarios:bloqueIdentificacion']/legend").click();

    
  });
});





//Activar / Desactivar usuario ANTONIO - DAVID


// ACTIVAR USUARIO - Antonio Jesús León Fernández

describe('Eliminar Usuario', () => {
  it('Debería activar un usuario correctamente', () => {
      navegarLogin();
      cy.xpath("//div[@id='menuform:menuPuntoMenu']/ul/li[34]/a").click();
      //hacer click para desactivar el checkbox de 'Activo>Sí'
      cy.xpath("//div[@id='formListadoUsuarios:activo_filtro']/div[2]/span").first().click();
      //hacer click en el botón 'Buscar'
      cy.xpath("//button[@id='formListadoUsuarios:filtrar']/span[2]").first().click();
      //hacer click en el botón 'Activar Usuario'
      cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:7:activarUsuario']/span").first().click();
      //hacer click en el boton 'Sí' en la ventana emergente 'Confirmar Operación'
      cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:9:j_idt88']/span").first().click();
  });
});

//DESACTIVAR USUARIO
describe('Eliminar Usuario', () => {
  it('debería desactivar un usuario correctamente', () => {
      navegarLogin();
      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
      //hacer click en el botón 'Eliminar Usuario'
      cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:3:eliminarUsuario']/span").first().click();
      //hacer click en el botón 'Sí' en la ventana emergente 'Confirmar Operación'
      cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:3:j_idt88']/span").first().click();
  });
});


//Asignar / Desasignar perfiles ALVARO Y PABLO

//Asigar perfiles
//Asignar perfiles
describe('asignarPerfiles', ()=> {
  it('Asignación de perfiles', () => {
          navegarLogin();
          //Accede al apartado Usuarios 
          cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
          //Editar Usuario
          cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:2:edicionUsuario']/span").first().click();
          cy.xpath("//button[@id='formFormularioUsuarios:abrirBusquedaPerfiles']/span[2]").click();
          cy.xpath("//button[@id='formFormularioUsuarios:tablaNuevosPerfiles:0:seleccionarPerfil']/span").click();
          cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span").click();
  });
});

//Desasignar perfiles
describe('desasignarPerfiles', ()=> {
  it('should save the usuarios successfully', () => {
          navegarLogin();
          cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
          cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:4:edicionUsuario']/span").first().click();
          cy.xpath("//button[@id='formFormularioUsuarios:tablaUsuarioPerfilAsignado:2:eliminarUsuario']/span").first().click();
          cy.xpath("//button[@id='formFormularioUsuarios:j_idt103']/span").click();
  });
});
