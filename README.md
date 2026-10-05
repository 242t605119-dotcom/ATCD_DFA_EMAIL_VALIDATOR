# DFA Student Login Authentication

## Project Overview

DFA Student Login Authentication is a web-based mini project developed for the **Automata Theory & Compiler Design (ATCD)** subject.

The project demonstrates how a **Deterministic Finite Automaton (DFA)** can be applied to a real-world authentication system. It validates a student's email and password character by character and visually represents the state transitions of the DFA.

## Objective

The main objective of this project is to understand and demonstrate the practical use of DFA concepts in input validation and authentication.

The project helps to understand:

- States and transitions
- Initial state
- Accepting state
- Rejected or dead state
- Character-by-character input processing
- Email validation using DFA
- Password validation using DFA

## Features

- Student Login interface
- Email validation
- Password validation
- DFA-based authentication logic
- Dynamic DFA state visualization
- Character-by-character state transitions
- Accepting and rejected states
- Login validation result
- Navigation between project sections
- Responsive user interface

## Technologies Used

- HTML
- CSS
- JavaScript
- SVG

## DFA Authentication

The project uses DFA concepts to process the login credentials.

### Email Validation

The email must:

- Contain a valid local part
- Contain only one `@`
- End with `@ashokacollege.in`
- Not contain whitespace

Example of a valid email:

`242t605119@ashokacollege.in`

### Password Validation

The password is validated using a predefined DFA pattern.

Valid password:

`askw@1234`

Each character moves the DFA from one state to the next state. If an incorrect character is entered, the input is rejected.

## Authentication Flow

Student Input

↓

Email Validation

↓

Password Validation

↓

DFA State Transitions

↓

Accept / Reject

## DFA Visualization

The project dynamically displays the DFA using SVG.

For example, a password is processed as:

`Start → q0 → q1 → q2 → q3 → q4 → q5 → q6 → q7 → q8 → q9`

Each transition represents one character of the input.

The final accepting state is represented using a double circle.

## Project Modules

### 1. Student Login Module

Provides the interface for entering the student's email and password.

### 2. Email DFA Module

Processes the entered email and checks whether it satisfies the required email pattern.

### 3. Password DFA Module

Processes the password character by character and verifies the predefined password pattern.

### 4. DFA Visualization Module

Displays states and transitions dynamically so that the authentication process can be understood visually.

### 5. Authentication Result Module

Displays whether the entered credentials are valid or invalid.

## Project Structure

```text
DFA-Student-Login-Authentication/
│
├── index.html
├── style.css
├── script.js
└── README.md

## Academic details ##

**Student:** T. Nandhini  
**Subject:** Automata Theory & Compiler Design  
**Project:** DFA Student Login Authentication  
**College:** Ashoka Women's Engineering College  
**Academic Year:** 2026

## Author

**T. Nandhini**

Computer Science and Engineering (CSE)  
Ashoka Women's Engineering College

## Conclusion

This project demonstrates how the theoretical concept of **Deterministic Finite Automata** can be implemented in a practical web application.

It provides a simple way to understand how input characters are processed through states and how an accepting state determines whether the input is valid.
