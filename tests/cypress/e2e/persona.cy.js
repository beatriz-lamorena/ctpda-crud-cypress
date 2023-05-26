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

//RELACIONAR PERSONA, DE CUALQUIER TIPO, CON EXPEDIENTES
describe('Relacionar persona, de cualquier tipo, con expedientes', () => {
    it('debería de relacionar las personas según sus expedientes', () =>{
        navegarLogin();
        cy.xpath("//div[@id='menuForm:menuPuntoMenu']/ul/li[4]/a/span").first().click();
        cy.xpath("//input[@id='formListadoExpedientes:numeroExpediente_filtro']").first().click();
        cy.xpath("//input[@id='formListadoExpedientes:numeroExpediente_filtro']").type('PS-2023/005');
        cy.xpath("//input[@id='formListadoExpedientes:persona_filtro']").first().click();
        cy.xpath("//input[@id='formListadoExpedientes:persona_filtro']").type('DAVID SL');
        cy.xpath("//input[@id='formListadoExpedientes:ident_persona_filtro']").first().click();
        cy.xpath("//input[@id='formListadoExpedientes:ident_persona_filtro']").type('DAVID');
        cy.xpath("//button[@id='formListadoExpedientes:nuevoExpediente']/span[2]").first().click();
        cy.wait(2000);
        cy.xpath("//label[@id='formDialogExpedientes:comboTipoExpediente_label']").first().click();
        cy.xpath("//li[@id='formDialogExpedientes:comboTipoExpediente_1']").first().click();
        cy.xpath("//button[@id='formDialogExpedientes:validarTipExp']/span[2]").first().click();
});
});