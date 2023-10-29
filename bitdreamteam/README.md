# Project Overview

## Introduction

Welcome to our hackathon project! Our web application is built using a modern tech stack that includes ASP.NET Core for the backend, while the frontend is crafted with Tailwind CSS and plain HTML and JavaScript. We leverage MongoDB Atlas for our database and Azure Blob Storage for storing images. This documentation provides an overview of our project's architecture, design decisions, and important details that are useful for developers and stakeholders alike.

## Tech Stack

1. **Backend**: ASP.NET Core
2. **Frontend**: Tailwind CSS, HTML, JavaScript
3. **Database**: MongoDB Atlas
4. **Image Storage**: Azure Blob Storage

## Database Structure

We employ two main collections (or tables) in our MongoDB Atlas database:

- **Users**: This table captures user-related data.
- **WebApps**: This table contains information about various web applications, including their images which are stored in Azure Blob Storage.

## Data Abstraction

In order to provide a seamless interface with the underlying databases, we've implemented contexts for both our main database and our blob storage. These contexts help in abstracting away the complexities and provide an intuitive interface for our API controllers to interact with the data layers.

## API Controllers

We have a variety of API controllers designed to handle specific functionalities:

- **Auth Controller**: Responsible for authentication operations.
- **Users Controller**: Handles operations related to user data.
- **Kubernetes Controller**: Manages Kubernetes-related functionalities.
- (Note: Add other controllers here if needed)

## Security and Authentication

Security is paramount in our application:

- We use JWT authentication to verify and authenticate users.
- Claims-based authorization is used to ensure that users have the correct permissions for their actions.
- Passwords are hashed before they are stored in the database to provide an added layer of security.

## Important Note on Secrets Management

While we've implemented several security measures, please be aware that, currently, passwords and connection strings are stored without proper secrets management. This is a known limitation and should be addressed in future iterations for enhanced security.

---

We hope this documentation provides a clear understanding of our project. For any further queries or concerns, please reach out to the development team.
