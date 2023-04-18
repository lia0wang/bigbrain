describe('admin', () => {
  const getRandEmail = () => {
    const rand = Math.floor(Math.random() * 10000000000);
    return `${rand}@test.com`;
  };

  it('Happy Path', () => {
    cy.viewport(1920, 1080);
    const randEmail = getRandEmail();
    const userName = 'Test User';
    const password = 'test123';

    cy.visit('localhost:3000/register');
    cy.get('#name').type(userName);
    cy.get('#email').type(randEmail);
    cy.get('#password').type(password);
    cy.get('.MuiButton-root').click();

    cy.get('.md\\:order-2 > :nth-child(1)').click() // click create game
    cy.get('.p-2').type('Test Game'); // type game name
    cy.get('form > .flex > .bg-blue-500').click(); // click save game

    cy.get('.MuiCardActions-root > :nth-child(1)').click() // click edit game
    cy.get(':nth-child(2) > .flex > .bg-blue-500').click(); // click add question
    cy.get(':nth-child(2) > .flex > .bg-blue-500').click(); // click add question
    cy.get('.bg-green-500').click(); // click save game

    // go back to previous page
    cy.go('back');

    cy.get('.MuiCardActions-root > :nth-child(3)').click(); // click start game
    cy.get('.bg-yellow-500').click(); // click go to admin

    cy.get('.MuiButtonBase-root').click(); // click start quiz

    cy.get('.MuiButton-containedPrimary').click(); // go to next question
    cy.get('.MuiButton-containedError').click(); // stop quiz

    cy.get('.bg-white > .flex > .bg-blue-500').click(); // click view results

    cy.get('.MuiTabs-flexContainer > :nth-child(2)').click(); // click the next tab
    cy.get('.MuiTabs-flexContainer > :nth-child(3)').click(); // click the next tab
    cy.get('.MuiTabs-flexContainer > :nth-child(4)').click(); // click the next tab

    cy.get('.bg-blue-500').click(); // click logout button

    cy.get('#email').type(randEmail); // login again with same user
    cy.get('#password').type(password);

    cy.get('.mt-\\[10\\%\\] > .MuiButton-root').click(); // click login button
  })
})
