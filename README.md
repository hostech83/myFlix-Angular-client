🎬 myFlix Angular Client
This project is a single-page application (SPA) built with Angular. It allows users to browse movies, view detailed information about each movie, manage their favorite movies, and update their user profile.

🚀 Project Structure
myFlix-Angular-client/
├── .angular/ # Angular build cache (auto-generated)
├── node_modules/ # Node.js packages
├── public/ # Public assets (if used)
├── src/
│ ├── app/
│ │ ├── director-dialog/ # Component to display director information
│ │ ├── genre-dialog/ # Component to display genre information
│ │ ├── menu-bar/ # Top navigation bar component
│ │ ├── movie-card/ # Individual movie card component
│ │ ├── movie-details/ # Movie detailed view
│ │ ├── movie-list/ # Movie list view
│ │ ├── user-login-form/ # Login form component
│ │ ├── user-profile/ # Profile management component
│ │ ├── user-registration-form/# Registration form component
│ │ ├── welcome-page/ # Welcome page component
│ │ ├── app-routing.module.ts # Defines application routes
│ │ ├── app.component.ts # Root component
│ │ ├── app.module.ts # Root module
│ │ ├── app.config.ts # Optional app-specific config
│ │ ├── app.routes.ts # Optional separate routes config
│ │ ├── fetch-api-data.service.ts # Service for API communication
│ │ ├── fetch-api-data.service.spec.ts # (Optional) Service test file
│ ├── index.html # Main HTML file
│ ├── main.ts # Main entry point
│ ├── styles.scss # Global stylesheet
├── angular.json # Angular CLI configuration
├── package.json # Project metadata & dependencies
├── tsconfig.json # TypeScript configuration
├── README.md # This file
📦 Installation
Clone the repo:

bash
Copy
Edit
git clone https://github.com/your-username/myFlix-Angular-client.git
cd myFlix-Angular-client
Install dependencies:

bash
Copy
Edit
npm install
Run the app locally:

bash
Copy
Edit
npm start
This will compile and serve your Angular app at:
http://localhost:4200/

✨ Features
User registration and authentication

Browse a list of movies

View detailed information about movies (director, genre, description)

Add or remove movies from favorites

Update personal user information

Delete user account

Responsive layout for different screen sizes

🛠 Technologies Used
Angular 16+

TypeScript

SCSS (for styling)

Angular Router

Angular Material (if installed)

API Communication via fetch-api-data.service.ts
HOUSSNI M
