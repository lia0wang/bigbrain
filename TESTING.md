## EditQuestion Test

The `EditQuestion` test is designed to test the functionality of editing a question in a quiz game. Specifically, it covers the "Painful Path" :') scenario. This includes providing invalid data, submitting forms with missing or incorrect data, or trying to execute actions that are not allowed in a given state.

### Test Process

1. The test generates a random email address using the `getRandEmail` function, which creates a unique email address for each test run.
2. The test visits the registration page, enters the random email, user name, and password, and clicks the registration button.
3. The test creates a new game by clicking the "Create Game" button, typing a game name, and saving the game.
4. The test adds two new questions to the game by clicking the "Edit Game" button, clicking the "Add Question" button twice, and saving the game.
5. The test modifies the question by clicking the "Edit Question" button, changing the question title, adding six new answers, selecting three correct answers, deleting three incorrect answers, changing the question type to multi, setting the question time to 30 seconds, and setting the question points to 200.
6. The test saves the modified question and goes back to the game display.
7. The test clicks the first question in the list to check if the changes made to the question have been saved correctly.

### Rationale

The goal of this test is to ensure that the application's functionality to edit questions works as expected and provides an optimal user experience. By covering a wide range of possible scenarios and user inputs, the test ensures that the application's behavior is consistent and predictable under all possible conditions.
