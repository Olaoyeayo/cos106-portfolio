# Student Portfolio & Academic Management Website

**COS 106 – Introduction to Web Technologies · Practical Term Project**

| | |
|---|---|
| **Student** | Ayomide Olaoye |
| **Matric No.** | 2025/C/CYB/1355 |
| **Department** | Cybersecurity |
| **Email** | a.olaoye4090@miva.edu.ng |
| **Institution** | MIVA Open University |

A responsive, multi-page personal portfolio and academic planner built with plain **HTML, CSS and JavaScript**.

## Pages

| Page | File | Highlights |
|---|---|---|
| Home | `index.html` | Name and photo, time-based welcome message, short bio, intro video |
| About Me | `about.html` | Education table, career goals, animated skill bars, courses, hobbies |
| Projects | `projects.html` | Four projects with screenshots, descriptions, links and category filter |
| Academic Planner | `planner.html` | Add tasks, mark them completed, delete them, filter, progress bar |
| Contact | `contact.html` | Form with JavaScript validation (no empty fields, valid email, digits-only phone) |

## How the requirements are met

**HTML:** semantic elements (`header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `footer`), forms, a table, images, hyperlinks, ordered/unordered lists, and multimedia (`<video>` on the homepage).

**CSS:** one external stylesheet (`css/style.css`), a responsive layout with media queries, Flexbox and CSS Grid, a styled navigation bar with a mobile hamburger menu, transitions and keyframe animations, and a consistent navy and teal colour scheme defined with CSS variables.

**JavaScript:**
- `js/main.js`: event handling for the menu and project filters, DOM manipulation, scroll animations, dynamic greeting
- `js/planner.js`: an array of task objects; functions to add, toggle, delete and render tasks; `localStorage` so tasks persist
- `js/contact.js`: form validation with regular expressions and live error messages

## Folder structure

```
cos106-portfolio/
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── css/style.css
├── js/main.js
├── js/planner.js
├── js/contact.js
├── images/
└── media/intro.mp4
```

## Running locally

Open `index.html` in any modern browser. No build step or installation is needed.
