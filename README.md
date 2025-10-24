***** i have uploaded the file of how the app is running of live demo, because there is an issue in deploying the project,please kindly look for the file in this github repo
please consider this**** 
https://github.com/udaykarthikeya2131/Contact_app/blob/main/Contact%20List%20App%20-%20Google%20Chrome%202025-10-24%2023-44-03.mp4      ----> link (we can download the video here)

#  Contact App

A simple **React** application for managing contacts.  
This app allows users to view, search, and add new contacts.  
It demonstrates integration between a React frontend and an Express API backend.

---

##  Features
- View all contact names from the API.
- Search for a contact by name to view details (phone number and email).
- Add a new contact dynamically — it appears instantly in the list.
- Displays "No contact found" for unknown names.
- Responsive and clean UI built with React.

---

##  Design Choices & Assumptions
- Contacts are stored in a mock API (simulating a backend using Express).
- Data is held in memory for demonstration — restarting the server resets it.
- When searching, the UI shows only the matched contact details.
- The contact number is **hidden by default** and shown only when searched.



## Tech Stack
**Frontend:**
- React (via `create-react-app`)
- HTML5, CSS3

**Backend:**
- Express.js for REST API handling
- Body-parser and CORS for JSON parsing and local API communication

---
setup the front end:
- Open **VS Code**
- Go to **File → Open Folder →** select your project folder.

 Install Dependencies
In the VS Code terminal, run:
```bash
npm install
npm start
this starts running the front end
Open http://localhost:3000 in your browser.

You’ll see a list of contact names.

Type a name in the search bar to reveal contact details.

Add a new contact using the form — it appears instantly in the list.

