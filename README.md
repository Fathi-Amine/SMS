# SMS - Project README

## Table of Contents

### Introduction

### Project Overview

### Functional Description

### Technologies Used

### Setup and Usage

### Frontend Setup

### Backend Setup

### Running the Application
### Note

## Introduction

SMS is an online platform designed to manage a school staff and academic programs and needs. 

## Project Overview

Presentation General
SMS is an online platform that allows users to manage schools .

## Target Audience

The website is intended for anyone looking to manage schools.

## Technologies Used

Backend: ExapessJS
Containerization: Docker
CI/CD: GitLab CI
Frontend: React.js
Database: MongoDB
Testing: Jest
Styling: Tailwind CSS

## Setup and Usage

### Frontend Setup

Navigate to the frontend directory.
Install dependencies by running npm install.
Start the development server by running npm run dev.

### Backend Setup

Navigate to the backend directory.
Install dependencies by running npm install.
Run `npm generateKeyPairs` on the root directory of backend
create .env file and profile your secret keys
Start the development server by running npm run server.

### Running the Application

Frontend: Open http://localhost:5000 in your web browser.
Backend: The backend server will run on http://localhost:3000 by default.

# Note

The frontend is using vite and a proxy to communicate wit the backend make sure to change the target value in the proxy object before dockerizing
