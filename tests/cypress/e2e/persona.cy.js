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
    cy.xpath("//button[@id='formLogin:acceder']/span").click({ force: true });
    cy.wait(2000);
}
 

//Crear/Editar/Consultar persona de tipo Jurídica con los datos obligatorios correspondientes --- PEDRO GARCIA Y PEDRO ROMERO

import { v4 as identificador_nuevo } from 'uuid';

describe('Editar/Consultar persona jurídica', () => {
  it('Crear persona jurídica', () => {
    navegarLogin();

    cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a").click();
    cy.wait(400);

    // Click en el botón "Nueva persona"
    cy.xpath("//button[@id='formBuscador:nuevapersona']/span[2]").click();
    cy.xpath("//table[@id='formFormulario:valorTipoPersona']/tbody/tr/td[2]/div/div[2]/span").click();
    const nombrePersona = "Pedror S.L";
    cy.xpath("//input[@id='formFormulario:nombre_pj']")
      .type(nombrePersona);
    cy.xpath("//label[@id='formFormulario:comboValorIdentificadorPJ_label']").click();
    cy.xpath("//li[@id='formFormulario:comboValorIdentificadorPJ_4']").click({ force: true });
    const identificador = identificador_nuevo();
    cy.xpath("//input[@id='formFormulario:nif_cif_pj']").type(identificador);
    cy.xpath("//button[@id='formFormulario:guardar']").click();

    cy.wait(4000);

    // Verificar mensaje de éxito
    cy.xpath("//div[@id='formFormulario:messagesFormulario']/div/ul/li/span[2]")
      .invoke('text')
      .then((mensaje) => {
        const mensajeEsperado = `Persona  ${nombrePersona} guardada correctamente`;
        expect(mensaje.trim()).to.include(mensajeEsperado);
        cy.log(mensajeEsperado);
      });
  });

  it('Consultar la persona jurísdica', () => {
      

      //Consultar persona Jurísdica
      navegarLogin();
      cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a").click();
      cy.xpath('//*[@id="formBuscador:tablaPersona:3:consultaPersona"]').click();
      cy.wait(400)

  })

  it('Editar la persona jurídica', () => {
    //Editar persona Jurídica
    navegarLogin();
    cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a").click();
    cy.xpath('//*[@id="formBuscador:tablaPersona:3:edicionPersona"]/span[contains(@class, "ui-button-icon-left")]').click({force:true});
    cy.wait(400);
    // Utiliza XPath para seleccionar y limpiar los campos de entrada
    const nombrePersona = "Pao S.L";
    cy.xpath("//input[@id='formFormulario:nombre_pj']")
      .then(($input) => {
        $input.val(''); // Limpia el valor del campo directamente
        return $input;
      })
      .type("Pao S.L");
  
    cy.xpath("//label[@id='formFormulario:comboValorIdentificadorPJ_label']").click();
  
    cy.xpath("//li[@id='formFormulario:comboValorIdentificadorPJ_4']").click({ force: true });
    cy.wait(400)
    cy.xpath("//input[@id='formFormulario:nif_cif_pj']")
      .then(($input) => {
        $input.val(''); // Limpia el valor del campo directamente
        return $input;
      })
      .type("FX");

    cy.xpath("//button[@id='formFormulario:guardar']").click();
      cy.wait(400);
    cy.xpath("//div[@id='formFormulario:messagesFormulario']/div/ul/li/span[2]")      
    .invoke('text')
    .then((mensaje) => {
      const mensajeEsperado = `Persona  ${nombrePersona}`;
      expect(mensaje.trim()).to.include(mensajeEsperado);
      cy.log(mensajeEsperado);
    });
  });
    
  })  
  
//Crear/Editar/Consultar persona de tipo Física con los datos obligatorios correspondientes --- PEDRO GARCIA Y PEDRO ROMERO 

    describe ('Crear persona fisica', () => {

        it('Crear persona fisica', () => {
            navegarLogin();
          
            // Hacer clic en el elemento de menú en la posición 13
            cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a").click();
          
            // Hacer clic en el botón "Nueva persona"
            cy.xpath("//button[@id='formBuscador:nuevapersona']/span[2]").click();
          
            // Hacer clic en la opción "Física"
            cy.xpath("//label[contains(.,'FÃ­sica')]").click();
            const nombrePersona = "Emilio";
            // Ingresar el nombre "Roberto"
            cy.xpath("//input[@id='formFormulario:nombre']")
              .type(nombrePersona);

            const primer_apellido = "Rodriguez";
          
            // Ingresar el primer apellido "Rodriguez"
            cy.xpath("//input[@id='formFormulario:primer_apellido']")
              .type(primer_apellido);
          
            // Hacer clic en la etiqueta del comboValorIdentificador
            cy.xpath("//label[@id='formFormulario:comboValorIdentificador_label']")
              .click();
          
            // Hacer clic en la opción de identificador específica en el menú desplegable
            cy.xpath("//li[@id='formFormulario:comboValorIdentificador_4']")
              .click({ force: true });

            cy.wait(400);
          
            // Obtener el identificador generado
            const identificador = identificador_nuevo();
          
            // Ingresar el identificador en el campo correspondiente
            cy.xpath("//input[@id='formFormulario:nif_cif']")
              .type(identificador);
          
            // Hacer clic en la etiqueta del comboValorSexo
            cy.xpath("//label[@id='formFormulario:comboValorSexo_label']")
              .click();
          
            // Hacer clic en la opción de sexo específica en el menú desplegable
            cy.xpath("//li[@id='formFormulario:comboValorSexo_1']")
              .click();
          
            // Hacer clic en el botón "Guardar"
            cy.xpath("//button[@id='formFormulario:guardar']/span[2]")
              .click();

              cy.xpath("//div[@id='formFormulario:messagesFormulario']/div/ul/li/span[2]")
              .invoke('text')
              .then((mensaje) => {
                  const mensajeEsperado = `Persona  ${primer_apellido}, ${nombrePersona} guardada correctamente` ;
                  expect(mensaje.trim()).to.include(mensajeEsperado);
                  cy.log(mensajeEsperado);
          });
          
          });
          
      it('Consultar la persona física', () => { 
        

      //Consultar persona física Jose Ramón
        navegarLogin();
        cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a").click();
        cy.xpath('//*[@id="formBuscador:tablaPersona:2:consultaPersona"]').click();
        cy.wait(4000)

    }) 

    it('Editar la persona fisica', () => {
        //Editar persona física
        navegarLogin();
        cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a").click();
        cy.xpath('//*[@id="formBuscador:tablaPersona:2:edicionPersona"]/span[contains(@class, "ui-button-icon-left")]')
          .click(); 
      
        // Utiliza XPath para seleccionar y limpiar los campos de entrada

        const nombrePersona = "Beatriz";
        cy.xpath("//input[@id='formFormulario:nombre']")
          .then(($input) => {
            $input.val(''); // Limpia el valor del campo directamente
            return $input;
          })
          .type(nombrePersona);
          cy.wait(1000);
          
          const primer_apellido = "Lamorena";
          cy.xpath("//input[@id='formFormulario:primer_apellido']")
          .then(($input) => {
            $input.val(''); // Limpia el valor del campo directamente
            return $input;
          })
          .type(primer_apellido);

        cy.xpath("//label[@id='formFormulario:comboValorIdentificador_label']")
          .click();
      
        cy.xpath("//li[@id='formFormulario:comboValorIdentificador_4']")
          .click();

          cy.wait(1000);
      
          cy.xpath("//input[@id='formFormulario:nif_cif']")
          .then(($input) => {
            $input.val(''); // Limpia el valor del campo directamente
            return $input;
          })
          .type("AS");
      
        cy.xpath("//label[@id='formFormulario:comboValorSexo_label']").click();
        cy.xpath("//li[@id='formFormulario:comboValorSexo_2']").click();
        cy.xpath("//button[@id='formFormulario:guardar']/span[2]").click();
      
        cy.wait(4000);
        

        cy.xpath("//div[@id='formFormulario:messagesFormulario']/div/ul/li/span[2]")
        .invoke('text')
        .then((mensaje) => {
            const mensajeEsperado = `Persona  ${primer_apellido}, ${nombrePersona} actualizada correctamente` ;
            expect(mensaje.trim()).to.include(mensajeEsperado);
            cy.log(mensajeEsperado);
    });

      });
      
    })
    

    //Relacionar representante a personas de tipo jurídica -- Antonio Leon- Pedro Romero
    describe('Relacionar representante a persona tipo jurídicas', () => {
        it('Debería relacionar un representante a una persona tipo jurídica desde el formulario', () => {
            navegarLogin();
            cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a/span").click({ force: true })
            //Editar un usuario creado haciendo click en el boton de 'Editar'
            cy.xpath("//button[@id='formBuscador:tablaPersona:0:edicionPersona']/span").first().click({ force: true });
            cy.wait(400);
            //Verificar que esta marcada la opcion 'Juridica'
            cy.xpath("//button[@id='formFormulario:abrirBusquedaRepresentantes']/span[2]").first().click({force: true});
            //Buscar persona dentro del apartado representantes
            cy.xpath("//button[@id='formFormulario:abrirBusquedaRepresentantes']/span[2]").first().click({force:true});
            cy.wait(400);
            //Añadir representante
            cy.xpath("//button[@id='formFormulario:tablaNuevosRepresentantes:9:seleccionarRepre']/span").first().click({force : true});
            cy.wait(800);
            //Guardar la asignación de representante
            cy.xpath("//button[@id='formFormulario:guardar']/span[2]").first().click();
            cy.xpath("//div[@id='formFormulario:messagesFormularioListadoPersonasRepresentantes']/div/ul/li");
            cy.wait(4000);

            
            cy.xpath("//div[@id='formFormulario:messagesFormulario']/div/ul/li/span[2]")
            .invoke('text')
            .then((mensaje) => {
                const mensajeEsperado = `Persona  Representante actualizada correctamente` ;
                expect(mensaje.trim()).to.include(mensajeEsperado);
                cy.log(mensajeEsperado);
        });
            
        });

        it('Borra Relacion representante y persona tipo juridica', ()=>{
            navegarLogin();
            cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a/span").click({ force: true })
            //Editar un usuario creado haciendo click en el boton de 'Editar'
            cy.xpath("//button[@id='formBuscador:tablaPersona:0:edicionPersona']/span").first().click({ force: true });
            cy.wait(400);
            cy.xpath("//button[@id='formFormulario:tablaPersonasRepresentantes:0:eliminarPersonaExp']/span").first().click({force:true});
            cy.wait(600);
            cy.xpath("//button[@id='formFormulario:j_idt189']/span").first().click({force:true});
            cy.wait(400);
            cy.xpath("//button[@id='formFormulario:j_idt172']/span").first().click({force:true});
            cy.wait(400);
        
        });
    }); 
    
    //Borrar persona -- Pablo & Alvaro-Pedro Romero
    describe('borrarPersona', () => {
        it('borrar persona', () => {
            navegarLogin();
            //accedemos al apartado o menú de Personas
            cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a").click();
            //Hacer click al botón de borrar persona (x)
            cy.xpath("//button[@id='formBuscador:tablaPersona:2:deleteButton']/span").first().click();
            //Confirmar borrado de la persona
            cy.xpath("//button[@id='formBuscador:tablaPersona:4:j_idt85']/span").click({ force: true });
            cy.wait(600);
            // Verificar mensaje de éxito
            cy.xpath("//div[@id='formBuscador:messagesListado']/div/ul/li/span[2]")
            .invoke('text')
            .then((mensaje) => {
            cy.log(mensaje.trim());
          });
    
        
        });
    });
    
    //RELACIONAR PERSONA, DE CUALQUIER TIPO, CON EXPEDIENTES -- David Dorante Lucas
    describe('Relacionar persona, de cualquier tipo, con expedientes', () => {
        it('debería de relacionar las personas según sus expedientes', () =>{
            navegarLogin();
            //Accedemos al apartado o menú de Generar Expedientes
            cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[4]/a/span").first().click();
            //Clickeamos en el apartado número expediente
            cy.xpath("//input[@id='formListadoExpedientes:numeroExpediente_filtro']").first().click();
            //Rellenamos el campo número expediente
            cy.xpath("//input[@id='formListadoExpedientes:numeroExpediente_filtro']").type('PS-2023/005');
            //Hacemos click en el campo persona
            cy.xpath("//input[@id='formListadoExpedientes:persona_filtro']").first().click();
            //Rellenamos el campo persona
            cy.xpath("//input[@id='formListadoExpedientes:persona_filtro']").type('DAVID SL');
            //Hacemos click en el campo NIF/CIF de la persona
            cy.xpath("//input[@id='formListadoExpedientes:ident_persona_filtro']").first().click();
            //Rellenamos el campo NIF/CIF de la persona
            cy.xpath("//input[@id='formListadoExpedientes:ident_persona_filtro']").type('DAVID');
            //Hacemos click en el botón Nuevo Expediente
            cy.xpath("//button[@id='formListadoExpedientes:nuevoExpediente']/span[2]").first().click();
            cy.wait(2000);
            //Hacemos click sobre la barra Seleccione el tipo de expediente
            cy.xpath("//label[@id='formDialogExpedientes:comboTipoExpediente_label']").first().click();
            //Seleccionamos el tipo de expediente
            cy.xpath("//li[@id='formDialogExpedientes:comboTipoExpediente_1']").first().click();
            //Hacemos click en el botón guardar
            cy.xpath("//button[@id='formDialogExpedientes:validarTipExp']/span[2]").first().click();
        });
    
    }) 

