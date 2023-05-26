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
