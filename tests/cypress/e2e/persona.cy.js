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




//Crear/Editar/Consultar persona de tipo Jurídica con los datos obligatorios correspondientes --- PEDRO GARCIA Y PEDRO ROMERO

 describe('Editar/Consultar persona jurísdica', () => {


        it('Crear persona juridica' , () => {
        navegarLogin();
        cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a").click();
        cy.xpath("//button[@id='formBuscador:nuevapersona']/span[2]").click();
        cy.xpath("//table[@id='formFormulario:valorTipoPersona']/tbody/tr/td[2]/div/div[2]/span").click();
        cy.xpath("//input[@id='formFormulario:nombre_pj']").type("Pedror S.L");
        cy.xpath("//label[@id='formFormulario:comboValorIdentificadorPJ_label']").click();
        cy.xpath("//li[@id='formFormulario:comboValorIdentificadorPJ_3']").click();
        cy.xpath("//input[@id='formFormulario:nif_cif_pj']").type("MG");
        cy.xpath("//button[@id='formFormulario:guardar']").click();
    
    })


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
        cy.xpath('//*[@id="formBuscador:tablaPersona:3:edicionPersona"]/span[contains(@class, "ui-button-icon-left")]')
          .click();
      
        // Utiliza XPath para seleccionar y limpiar los campos de entrada
        cy.xpath("//input[@id='formFormulario:nombre_pj']")
          .then(($input) => {
            $input.val(''); // Limpia el valor del campo directamente
            return $input;
          })
          .type("Antonia Garcia S.L");
      
        cy.xpath("//label[@id='formFormulario:comboValorIdentificadorPJ_label']")
          .click();
      
        cy.xpath("//li[@id='formFormulario:comboValorIdentificadorPJ_4']")
          .click();
      
        cy.xpath("//input[@id='formFormulario:nif_cif_pj']")
          .then(($input) => {
            $input.val(''); // Limpia el valor del campo directamente
            return $input;
          })
          .type("PG");
      
        cy.xpath("//button[@id='formFormulario:guardar']")
          .click();
      
        cy.wait(400);
      });
      
    }) 

//Crear/Editar/Consultar persona de tipo Física con los datos obligatorios correspondientes --- PEDRO GARCIA Y PEDRO ROMERO 

    describe ('Crear persona fisica', () => {

        it('Crear persona fisica' , () => {
        navegarLogin();
        cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a").click();
        cy.xpath("//button[@id='formBuscador:nuevapersona']/span[2]").click();
        cy.xpath("//label[contains(.,'FÃ­sica')]").click();
        cy.xpath("//input[@id='formFormulario:nombre']").type("Roberto");
        cy.xpath("//input[@id='formFormulario:primer_apellido']").type("Rodriguez")
        cy.xpath("//label[@id='formFormulario:comboValorIdentificador_label']").click();
        cy.xpath("//li[@id='formFormulario:comboValorIdentificador_4']").click();
        cy.xpath("//input[@id='formFormulario:nif_cif']").type("RP");
        cy.xpath("//label[@id='formFormulario:comboValorSexo_label']").click();
        cy.xpath("//li[@id='formFormulario:comboValorSexo_1']").click();
        cy.xpath("//button[@id='formFormulario:guardar']/span[2]").click();
    
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
        cy.xpath("//input[@id='formFormulario:nombre']")
          .then(($input) => {
            $input.val(''); // Limpia el valor del campo directamente
            return $input;
          })
          .type("Beatriz");
          

          cy.xpath("//input[@id='formFormulario:primer_apellido']")
          .then(($input) => {
            $input.val(''); // Limpia el valor del campo directamente
            return $input;
          })
          .type("Lamorena");

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
          .type("LM");
      
        cy.xpath("//label[@id='formFormulario:comboValorSexo_label']").click();
        cy.xpath("//li[@id='formFormulario:comboValorSexo_2']").click();
        cy.xpath("//button[@id='formFormulario:guardar']/span[2]").click();
      
        cy.wait(4000)
      });
      
    })
    

    //Relacionar representante a personas de tipo jurídica -- Codigo: Antonio Leon ; Assertions: Juan Martín
    describe('Relacionar representante a persona tipo jurídicas', () => {
        it('Debería relacionar un representante a una persona tipo jurídica desde el formulario', () => {
            navegarLogin();
            //Entrar en el apartado de personas y validarlo - Juan Martin
            cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a").should('have.text','Personas').click();
            //Editar un usuario creado haciendo click en el boton de 'Editar'
            cy.xpath("//button[@id='formBuscador:tablaPersona:6:edicionPersona']/span").should('have.class','pi-pencil').first().click(); //Assertion: JM
            //Verificar que esta marcada la opcion 'Juridica'
            cy.xpath("//table[@id='formFormulario:valorTipoPersona']/tbody/tr/td[2]/div/div[2]").first().click().should('have.class', 'ui-state-active'); //Assertion: JM
            //Buscar persona dentro del apartado representantes
            cy.wait(2000);
            cy.xpath("//button[@id='formFormulario:abrirBusquedaRepresentantes']/span[2]").should('be.visible').and('have.text', 'Buscar persona').first().click(); //Assertion: JM
            //Añadir representante
            cy.wait(2000);
            cy.xpath("//button[@id='formFormulario:tablaNuevosRepresentantes:0:seleccionarRepre']/span").should('be.visible').and('have.class', 'pi-plus-circle').first().click(); //Assertion: JM
            //Guardar la asignación de representante
            cy.wait(2000);
            cy.xpath("//button[@id='formFormulario:guardar']/span[2]").should('have.text', 'Guardar').first().click(); //Assertion: JM
        });
    });
    
    /*//Borrar persona -- Pablo & Alvaro
    describe('borrarPersona', () => {
        it('borrar persona', () => {
            navegarLogin();
            //accedemos al apartado o menú de Personas
            cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a").click();
            //Hacer click al botón de borrar persona (x)
            cy.xpath("//button[@id='formBuscador:tablaPersona:2:deleteButton']/span").first().click();
            //Confirmar borrado de la persona
            cy.xpath("//button[@id='formBuscador:tablaPersona:4:j_idt85']/span").click();
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
    
    }) */

