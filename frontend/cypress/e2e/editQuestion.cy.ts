describe('editQuestion', () => {
    const getRandEmail = () => {
      const rand = Math.floor(Math.random() * 10000000000);
      return `${rand}@test.com`;
    };
  
    it('Painful Path', () => {
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
      
      cy.get('ul > :nth-child(1) > .flex > .bg-blue-500').click(); // click edit question
      
      cy.get('#mui-1').clear(); // clear question title
      cy.get('#mui-1').type('Test Question'); // type question title
      
      cy.get('.bg-green-500').click(); // click add answer
      cy.get('.bg-green-500').click(); // click add answer
      cy.get('.bg-green-500').click(); // click add answer
      cy.get('.bg-green-500').click(); // click add answer
      cy.get('.bg-green-500').click(); // click add answer
      cy.get('.bg-green-500').click(); // click add answer
      
      cy.get(':nth-child(1) > .flex > .MuiInputBase-root > .MuiInputBase-input').type('Test Answer 1'); // type answer 1
      cy.get(':nth-child(2) > .flex > .MuiInputBase-root > .MuiInputBase-input').type('Test Answer 2'); // type answer 2
      cy.get(':nth-child(3) > .flex > .MuiInputBase-root > .MuiInputBase-input').type('Test Answer 3'); // type answer 3
      cy.get(':nth-child(4) > .flex > .MuiInputBase-root > .MuiInputBase-input').type('Test Answer 4'); // type answer 4
      cy.get(':nth-child(5) > .flex > .MuiInputBase-root > .MuiInputBase-input').type('Test Answer 5'); // type answer 5
      cy.get(':nth-child(6) > .flex > .MuiInputBase-root > .MuiInputBase-input').type('Test Answer 6'); // type answer 6
      
      cy.get(':nth-child(1) > .flex > .MuiButtonBase-root > .PrivateSwitchBase-input').click(); // click correct answer 1
      cy.get(':nth-child(3) > .flex > .MuiButtonBase-root > .PrivateSwitchBase-input').click(); // click correct answer 2
      cy.get(':nth-child(5) > .flex > .MuiButtonBase-root > .PrivateSwitchBase-input').click(); // click correct answer 3
      
      cy.get(':nth-child(1) > .flex > [data-testid="DeleteOutlineIcon"]').click(); // click delete answer
      cy.get(':nth-child(2) > .flex > [data-testid="DeleteOutlineIcon"]').click(); // click delete answer
      cy.get(':nth-child(3) > .flex > [data-testid="DeleteOutlineIcon"]').click(); // click delete answer
      
      cy.get('.MuiInputBase-root > #single').click(); // open question type dropdown
      cy.get('[data-value="multi"]').click(); // select multi question type
      
      cy.get('.MuiInputBase-root > #\\35 ').click(); // open question time dropdown
      cy.get('[data-value="30"]').click(); // select 30 seconds
      
      cy.get('.MuiInputBase-root > #\\31 00').click(); // open question points dropdown
      cy.get('[data-value="200"]').click(); // select 200 points
      
      cy.get('.justify-evenly > .bg-blue-500').click() // click save question
      
      cy.go('back'); // go back to game display

      cy.get('ul > :nth-child(1) > .flex > .bg-blue-500').click(); // go back to check if question was saved
    })
  })
  