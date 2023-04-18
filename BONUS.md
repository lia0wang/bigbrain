- Used Typescript instead of Javascript to write the code, the code is more readable and maintainable.

- In the admin session page, when the quiz is not started, a list of users is displayed in the page like Kahoot, so the admin and users can see the users who joined the game. And the start button is disabled until there is at least one player joined the session just like Kahoot.

- User can download a example.json file from the game editing and create page, so user can update/create the game by simply follow the example.json's format and editing the content, then upload the json file to the game editing/creating page. This makes the game editing/creating process more convenient.

- Not only  when a new game is created, also in the editing page user can upload a json file to update the game. This makes the game editing process more convenient. This is harder to achieve than the simply create a new game from a JSON file, because it needs to select and replace specific data fields and put in the request body.
-
- Frontend will validate the JSON file before sending the request to the backend, so the backend will not receive any invalid JSON file. The validation will return an error message and locate the question id or answer id that is invalid. This makes it more convenient for the user to find the error in the JSON file.

- Quiz admin page can refresh the page without losing the state and session, or return to home page by clicking the logo and come back to the quiz by clicking the session ID and "GO TO SESSION ADMIN PAGE", this also will return to the same stage of the quiz (waiting lobby, the current quiz etc.)

- The admin is also able to stop a session on dashboard page, and the session will be stopped immediately and the users will be redirected to the home page, this makes the management of the session more convenient, and with the ability to return to the session admin page correctly, the admin can run and manage multiple sessions at the same time easily.

- On player session page, single and multiple choice questions will have different UI effect, the answer button will response differently when the user when use clicks it. On single choice question, the answer button will be highlighted when the user clicks it, and the any other button that selected will be unselected. On multiple choice question, the answer button will be highlighted when the user clicks it, and the button will be unselected when the user clicks it again. This makes the user experience more intuitive and convenient.
-
