# Design Philosophy & Project Structure

Hello! Since we are building this app for everyone (including kids!), we want to keep things **simple**, **clean**, and **friendly**.

## 🎨 Design Rules
1.  **Big Buttons**: Easier to click.
2.  **Soft Colors**: Blue, Green, Yellow – no scary colors.
3.  **Cards > Tables**: Tables are boring. Cards are like flashcards!
4.  **Icons**: Pictures help us understand faster than words.

---

## 🏗️ Folder Structure (The School Map)

Think of our code like a school building.

### 🖥️ Frontend (`frontend/src/app`) - The Rooms
*   `app/page.tsx`: **Reception**. The first place you see.
*   `app/login/page.tsx`: **Gate**. Show your ID to enter.
*   `app/student/`: **Student's Classroom**. Only students go here.
*   `app/teacher/`: **Teacher's Lounge**. Only teachers go here.
*   `app/admin/`: **Principal's Office**. Only the boss goes here.

### 🧠 Backend (`backend/`) - The Brain
*   `server.js`: **The Principal**. Controls everything.
*   `routes/` (`roads`): Paths to get data.
*   `controllers/` (`workers`): They do the actual work when you ask for something.
*   `models/` (`notebooks`): Where we write down data (like Student Name, Marks).

---

## 📖 Story Time: How APIs Work

Imagine a student named **Alex**. Alex wants to see his marks.

1.  **Request (Asking)**: 
    *   Alex presses the "My Results" button.
    *   The App asks the Backend: *"Please give me Alex's marks."*
2.  **Security (The Guard)**:
    *   The Guard (Middleware) checks Alex's ID card (Token).
    *   Guard says: *"Okay, this is really Alex. You may pass."*
3.  **Database (The Library)**:
    *   The Backend goes to the big Library (Database).
    *   It opens the "Results Notebook" (Model).
    *   It finds the page for Alex.
4.  **Response (The Answer)**:
    *   The Backend writes the marks on a piece of paper (JSON).
    *   It gives it to the App.
    *   The App shows a big, colorful card with "A+"!

---
*Built with ❤️ for Happy School App.*
