# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# User Management Frontend

This is the frontend application for the User Management system, built with React and Vite. It provides an interface to perform CRUD operations on user data.

## Features

- **Add User:** Add new users to the system.
- **Edit User:** Update existing user information.
- **Delete User:** Remove users from the system.
- **Retrieve User:** View user details.

## Tech Stack

- **Frontend:** React
- **Build Tool:** Vite

## Installation

Follow these steps to set up the frontend locally.

### Navigate to Frontend Directory

```bash
git clone <repository-url>
cd user-management-fe
npm install 
```
### Setup ENV
 - ***Rename:*** .env.example file to .env

### Start
```bash
npm run dev 
```

## Usage
Open the Application:
Open your web browser and go to http://localhost:5173.

## Perform CRUD Operations:

- **Add User:** Click on the "Add User" from sidebar navigation.
- **Edit User:** Click on the "Edit" icon in user list table.
- **Delete User:** Click on the "Delete" icon in user list table.
- **Retrieve User:** Click on a All Users from  sidebar navigation;


### Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes and commit them (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature-name).
Open a pull request.

### License
This project is licensed under the MIT License.
