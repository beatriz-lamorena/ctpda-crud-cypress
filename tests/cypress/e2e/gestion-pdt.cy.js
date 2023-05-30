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
  cy.wait(2000);
}

//Editar Usuario PEDRO GARCIA Y PEDRO ROMERO

describe('editarUsuario', () => {
  it('navegarLogin', () => {
    navegarLogin();
    cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
    cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:1:edicionUsuario']/span")
      .first()
      .click();
    cy.xpath("//input[@id='formFormularioUsuarios:nombre']")
      .clear()
      .type(' ');
    cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]")
      .click()
    .then(($element) => {
      expect($element).to.be.visible;
      cy.log('Debe rellenar los campos obligatorios');
    });
    cy.wait(2000); // Esperar 2 segundos adicionales antes de verificar el mensaje
    cy.xpath("//div[@id='primefacesmessagedlg']/div/a/span").click();
    cy.xpath("//input[@id='formFormularioUsuarios:nombre']")
      .clear()
      .type('Nuevo nombre');
    cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]")
      .click();
    cy.wait(4000);
    // Verificar el mensaje de confirmación
    cy.xpath("//div[@id='formFormularioUsuarios:messagesFormulario']/div/ul/li/span[2]")
    .then(($element) => {
      expect($element).to.be.visible;
      cy.log('El usuario ha sido editado correctamente');
    });
      cy.wait(400);
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

import { v4 as codigo_nuevo } from 'uuid';

describe('guardarUsuarios', () => {

  it('guardar usuarios', () => {
      navegarLogin();
      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
      cy.xpath("//button[@id='formListadoUsuarios:nuevoUsuario']/span[2]").click();
      cy.xpath("//input[@id='formFormularioUsuarios:nombre']").type("Ana");
      cy.xpath("//input[@id='formFormularioUsuarios:primerApellido']").type("Romero");
      cy.xpath("//input[@id='formFormularioUsuarios:segundoApellido']").type("Barbeito");
      cy.xpath("//label[@id='formFormularioUsuarios:comboValorIdentificador_label']").click();
      cy.xpath("//li[@id='formFormularioUsuarios:comboValorIdentificador_4']").click();
      // Generar un identificador único
      const identificador = codigo_nuevo();

      // Resto del código...
      cy.xpath("//input[@id='formFormularioUsuarios:identificador']")
      .type(identificador);
      cy.xpath("//input[@id='formFormularioUsuarios:email']").type("ana.romero@soltel.es");
      cy.xpath("//input[@id='formFormularioUsuarios:telefono_input']").type("612020220");
      cy.xpath("//input[@id='formFormularioUsuarios:login']").type("ana.romero");
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click();
      cy.wait(400);
      cy.xpath("//div[@id='formFormularioUsuarios:messagesFormulario']/div/ul/li/span[2]")
      .then(($element) => {
        expect($element).to.be.visible;
        cy.log('Usuario nuevo creado y guardado correctamente');
      });
      cy.wait(400);

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
      cy.xpath("//div[@id='primefacesmessagedlg']/div[2]/span[2]")
      .then(($element) => {
        expect($element).to.be.visible;
        cy.log('No ha rellenado ningun campo');
      });
      // de comprobacion de error
      cy.wait(4000)

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
      cy.xpath("//div[@id='primefacesmessagedlg']/div[2]/span[2]")
      .then(($element) => {
        expect($element).to.be.visible;
        cy.log('Rellena el campo obligatorio');
      });
      // de comprobacion de error
      cy.wait(4000)

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
      cy.xpath("//div[@id='primefacesmessagedlg']/div[2]/span[2]")
      .then(($element) => {
        expect($element).to.be.visible;
        cy.log('Rellena el campo obligatorio');
      });
      // de comprobacion de error
      cy.wait(4000)

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
      cy.xpath("//div[@id='primefacesmessagedlg']/div/a/span").click();
      cy.xpath("//div[@id='primefacesmessagedlg']/div[2]/span[2]")
      .then(($element) => {
        expect($element).to.be.visible;
        cy.log('El identificador ya existe');
      });
      // de comprobacion de error
      cy.wait(4000)

      //Valida no marca tipo identificador

      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
      cy.xpath("//button[@id='formListadoUsuarios:nuevoUsuario']/span[2]").click();
      cy.xpath("//input[@id='formFormularioUsuarios:nombre']").type("Jose");
      cy.xpath("//input[@id='formFormularioUsuarios:primerApellido']").type("Maria");
      cy.xpath("//input[@id='formFormularioUsuarios:segundoApellido']").type("Alta");
      cy.xpath("//label[@id='formFormularioUsuarios:comboValorIdentificador_label']").click();
      cy.xpath("//li[@id='formFormularioUsuarios:comboValorIdentificador_0']").click();
      cy.xpath("//input[@id='formFormularioUsuarios:identificador']").type("MANTEC12");
      cy.xpath("//input[@id='formFormularioUsuarios:email']").type("agua.martin@soltel.es");
      cy.xpath("//input[@id='formFormularioUsuarios:telefono_input']").type("612020220");
      cy.xpath("//input[@id='formFormularioUsuarios:login']").type("agua.agua");
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click();
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click({ force: true });
      cy.xpath("//div[@id='primefacesmessagedlg']/div/a/span").click();
      cy.xpath("//div[@id='primefacesmessagedlg']/div[2]/span[2]")
      .then(($element) => {
        expect($element).to.be.visible;
        cy.log('No ha marcado tipo identificador');
      });
      // de comprobacion de error
      cy.wait(4000)

      //Valida identificador

      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
      cy.xpath("//button[@id='formListadoUsuarios:nuevoUsuario']/span[2]").click();
      cy.xpath("//input[@id='formFormularioUsuarios:nombre']").type("Jose");
      cy.xpath("//input[@id='formFormularioUsuarios:primerApellido']").type("Maria");
      cy.xpath("//input[@id='formFormularioUsuarios:segundoApellido']").type("Alta");
      cy.xpath("//label[@id='formFormularioUsuarios:comboValorIdentificador_label']").click();
      cy.xpath("//li[@id='formFormularioUsuarios:comboValorIdentificador_4']").click();
      cy.xpath("//input[@id='formFormularioUsuarios:identificador']");
      cy.xpath("//input[@id='formFormularioUsuarios:email']").type("agua.martin@soltel.es");
      cy.xpath("//input[@id='formFormularioUsuarios:telefono_input']").type("612020220");
      cy.xpath("//input[@id='formFormularioUsuarios:login']").type("agua.agua");
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click();
      cy.xpath("//button[@id='formFormularioUsuarios:guardar']/span[2]").click({ force: true });
      cy.xpath("//div[@id='primefacesmessagedlg']/div/a/span").click();
      cy.xpath("//div[@id='primefacesmessagedlg']/div[2]/span[2]")
      .then(($element) => {
        expect($element).to.be.visible;
        cy.log('No ha marcado identificador');
      });
      // de comprobacion de error
      cy.wait(4000)

  });
}) 



//Detalle usuario PEDRO ROMERO

describe('consultarUsuarios', () => {

  it(' consultarUsuarios', () => {
      navegarLogin();
      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
      cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:2:consultarUsuario']/span").first().click();
      cy.xpath("//fieldset[@id='formFormularioUsuarios:bloqueIdentificacion']/legend").click()
            .then(($element) => {
        expect($element).to.be.visible;
        cy.log('Consulta hecha');
      });

    
  });
});




//Activar / Desactivar usuario PEDRO ROMERO Y PEDRO GARCIA

//DESACTIVAR USUARIO
describe('Eliminar Usuario', () => {
  it('debería desactivar un usuario correctamente', () => {
    navegarLogin();
      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
      //Hacemos click en el checkbox de activo, para eliminar cuando usuario esté activo
      cy.xpath("//div[@id='formListadoUsuarios:activo_filtro']/div[2]/span").click();
    //Pulsamos botón desactivar
    cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:8:eliminarUsuario']/span").first().click();
    //Hacemos click sobre Sí
    cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:8:j_idt88']/span").first().click({force: true})
    cy.xpath("//div[@id='formListadoUsuarios:messagesListado']/div/ul/li/span[2]")
    .then(($element) => {
      expect($element).to.be.visible;
      cy.log('Usuario desactivado');
    });
    cy.wait(4000)
  });
});

// ACTIVAR USUARIO -- ANTONIO LEON
describe('Activar Usuario', () => {
  it('Debería activar un usuario correctamente', () => {
    navegarLogin();
    cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
    cy.xpath("//div[@id='formListadoUsuarios:activo_filtro']/div[2]/span").click();
    cy.xpath("//button[@id='formListadoUsuarios:filtrar']/span[2]").click();
    cy.wait(400);
    cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:8:activarUsuario']/span").first().click();
    cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:9:j_idt88']/span").first().click();
    cy.xpath("//div[@id='formListadoUsuarios:messagesListado']/div/ul/li/span[2]")
    .then(($element) => {
      expect($element).to.be.visible;
      cy.log('Usuario activado');
    });
      cy.wait(400);

  });
}); 


//Asignar / Desasignar perfiles PEDRO ROMERO Y PEDRO GARCIA

//Asignar perfiles
describe('asignarPerfiles', ()=> {
  it('Asignar perfil', () => {
          navegarLogin();
          //Accede al apartado Usuarios 
          cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click();
          //Editar Usuario
          cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:3:edicionUsuario']/span[2]").first().click({ force: true });
          cy.xpath("//button[@id='formFormularioUsuarios:abrirBusquedaPerfiles']/span[2]").first().click({ force: true });
          cy.xpath("//button[@id='formFormularioUsuarios:tablaNuevosPerfiles:0:seleccionarPerfil']/span").first().click({ force: true });
          cy.xpath("//div[@id='formFormularioUsuarios:messagesFormulario']/div").click()    .then(($element) => {
            expect($element).to.be.visible;
            cy.log('Asignado correctamente');
          });
          cy.wait(5000)
  });
});

//Desasignar perfiles
describe('desasignarPerfiles', ()=> {
  it('Desasignar perfil', () => {
          navegarLogin();
          cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[34]/a").click({ force: true });
          cy.xpath("//button[@id='formListadoUsuarios:tablaUsuario:3:edicionUsuario']/span[2]").first().click({ force: true });
          cy.xpath("//button[@id='formFormularioUsuarios:tablaUsuarioPerfilAsignado:0:eliminarUsuario']/span").first().click();
          cy.wait(400);      
          cy.xpath("//button[@id='formFormularioUsuarios:j_idt103']/span").click({ force: true });
          cy.xpath("//div[@id='formFormularioUsuarios:messagesFormulario']/div").click()    .then(($element) => {
            expect($element).to.be.visible;
            cy.log('Asignado correctamente');
          });
          cy.wait(400)
  });
});

