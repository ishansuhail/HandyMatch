# Coding Standards for HandyMatch

This document outlines all the various coding standards used for differnet parts of the HandyMatch project. These standards are in place to ensure readabiltiy and maintainability of our code.

## General Practices

- **Naming Conventions**:
  - **Variables and Functions**: Variables and functions are as descriptive as possible.
  - **Constants**: Constants are in uppercase letters with underscores separating the words. 

- **Code Structure**:
  - **Modularity**: Each page of our website is modular as it is broken down into several components which are rendered on top of each other.

- **Documentation**:
  - **Comments**: Comments explain some confusing parts of the code. 
  - **README**: README offers setup instructions and a comprehensive overview of the project. 

## JavaScript Standards

- **Syntax and Formatting**:
  - **Indentation**: Consistent indentation (2 or 4 spaces) throughout the codebase.
  - **Semicolons**: Consistently included or excluded semicolons at the end of statements. 
  - **Braces**: Placed opening braces on the same line as the statement (like a function or a loop) and closing braces on a new line.

- **Variable Declaration**:
  - **`const` and `let`**: Preferred `const` for variables that do not change and `let` for variables that may change. Avoided using `var`.

- **Arrow Functions**:
  - Used arrow functions (`() => {}`) for anonymous functions, especially when dealing with callbacks.

- **Error Handling**:
  - Implemented proper error handling using `try...catch` blocks or promise `.catch()` methods to manage exceptions and errors gracefully.

## HTML and CSS Standards

- **HTML Structure**:
  - Used semantic HTML5 elements (e.`<header>`, `<nav>`, `<main>`, `<footer>`) to enhance readability and accessibility.

- **CSS Organization**:
  - **Selectors**: Used class selectors for styling and avoided using IDs for styling purposes.
  - **Naming**: Followed a consistent naming convention for classes to maintain clarity (Upper camel case).
  - **Framework**: Used bootstrap styling framework for most CSS styling on components.

- **Responsive Design**:
  - Ensured the application is responsive and functions well across different devices and screen sizes.
