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

// Comando personalizado en Cypress para encontar fila (Sin terminar) -- Juan Martin
Cypress.Commands.add('encontrarFila', (rutaTabla, buscarEnPrimeraColumna) => {
    let filaPersona = 0;
    cy.xpath(rutaTabla) // Selector de filas de la tabla
    .each(($fila, indice) => {
        cy.wrap($fila)
            .find('tr') // Selector de celdas dentro de la fila
            .each(($celda, indiceCelda) => {
                const textoCelda = $celda.text();

                if (textoCelda.includes(buscarEnPrimeraColumna)) {
                    filaPersona = indiceCelda;
                    return false; // Detener la iteración una vez encontrado el elemento
                }
            });
    })
    .then(() => {
        
    });
});


//Crear/Editar/Consultar persona de tipo Jurídica con los datos obligatorios correspondientes --- JUAN MARTIN (NO TERMINADO)

describe('Crear/Editar/Consultar persona jurísdica', () => {

    it('Editar/Consultar persona jurísdica', () => {

        //Editar persona Jurísdica
        navegarLogin();
        cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a").click();
        cy.wait(1000);

        let filaPersona = 0;
        cy.xpath("//tbody[@id='formBuscador:tablaPersona_data']") // Selector de filas de la tabla
            .each(($fila) => {
                cy.wrap($fila)
                    .find('tr') // Selector de celdas dentro de la fila
                    .each(($celda, indiceCelda) => {
                        const textoCelda = $celda.text();

                        if (textoCelda.includes('Martin S.L')) {
                            filaPersona = indiceCelda;
                            return false; // Detener la iteración una vez encontrado el elemento
                        }
                    });
            })
            .then(() => {
                cy.xpath(`//button[@id='formBuscador:tablaPersona:${filaPersona}:edicionPersona']/span`).first().click();
            });

        /*
        const ruta = "//tbody[@id='formBuscador:tablaPersona_data']"
        const busqueda = "Martin S.L"
        const filaPersona = cy.encontrarFila(ruta, busqueda);
        cy.xpath(`//button[@id='formBuscador:tablaPersona:${filaPersona}:edicionPersona']/span`).first().click();
        */

        cy.wait(1000);
        cy.xpath("//input[@id='formFormulario:nif_cif_pj']").click().type("000000000");
        cy.xpath("//button[@id='formFormulario:guardar']").click();
        //Consultar persona Jurísdica
        cy.xpath("//button[@id='formBuscador:tablaPersona:4:consultaPersona']/span").click();
    })

    it('Crear persona jurísdica', () => {

        navegarLogin();
        cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[13]/a").click();
        cy.xpath("//button[@id='formBuscador:nuevapersona']/span[2]").click();
        cy.xpath("//table[@id='formFormulario:valorTipoPersona']/tbody/tr/td[2]/div/div[2]/span").click();
        cy.xpath("//input[@id='formFormulario:nombre_pj']").type("Martin S.L");
        cy.xpath("//label[@id='formFormulario:comboValorIdentificadorPJ_label']").click();
        cy.xpath("//li[@id='formFormulario:comboValorIdentificadorPJ_4']").click();
        cy.xpath("//input[@id='formFormulario:nif_cif_pj']").type("MARTIN");
        cy.xpath("//button[@id='formFormulario:guardar']").click();

    })

})

//Relacionar representante a personas de tipo jurídica -- Antonio Leon
describe('Relacionar representante a persona tipo jurídicas', () => {
    it('Debería relacionar un representante a una persona tipo jurídica desde el formulario', () => {
        navegarlogin();
        //Editar un usuario creado haciendo click en el boton de 'Editar'
        cy.xpath("//button[@id='formBuscador:tablaPersona:6:edicionPersona']/span").first().click();
        //Verificar que esta marcada la opcion 'Juridica'
        cy.xpath("//table[@id='formFormulario:valorTipoPersona']/tbody/tr/td[2]/div/div[2]/span").first().click();
        //Buscar persona dentro del apartado representantes
        cy.xpath("//button[@id='formFormulario:abrirBusquedaRepresentantes']/span[2]").first().click();
        //Añadir representante
        cy.xpath("//button[@id='formFormulario:tablaNuevosRepresentantes:0:seleccionarRepre']/span").first().click();
        //Guardar la asignación de representante
        cy.xpath("//button[@id='formFormulario:guardar']/span[2]").first().click();
    });
});

//Borrar persona -- Pablo & Alvaro
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
});
