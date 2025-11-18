# HealthFirst: AI-Powered Healthcare Chatbot

## Description
HealthFirst is an AI-driven healthcare chatbot designed to provide users with basic medical recommendations using advanced natural language processing. This project is part of my learning journey to master LangChain and LangGraph, integrating key concepts to create an intelligent virtual assistant for health-related queries.

The chatbot is powered by the GROQ-API, enabling real-time responses from a robust language model. Users can receive general health recommendations, and if a query appears critical or beyond the chatbot's scope, it will advise the user to consult a medical professional.

HealthFirst leverages a Flask backend to manage API routes and communication with the AI model. MongoDB is used as the database to store user interactions and chat history. The ReactJS front-end provides an interactive and user-friendly experience, ensuring seamless communication between the user and the chatbot.
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Installation
Steps to install and set up the project locally.
```bash
# Example:
git clone https://github.com/coderkun12/HealthFirst.git
cd yourproject
pip install -r requirements.txt
```

## Usage
Instructions on how to use the project.
```bash
# Backend Terminal:
python main.py

# Frontend Terminal:
node -v # To install react-JS
npx create-react-app my-app
cd my-app
npm install
npm start # To run the front-end
```

## Features
- AI-driven chatbot providing basic health recommendations

- GROQ-API integration for real-time LLM-powered responses

- Automated detection of critical queries with doctor consultation suggestions

- User-friendly interface designed with ReactJS

- Persistent chat history storage using MongoDB

- Flask-based API handling requests and responses

- Modular architecture for scalability and future improvements  

## Technologies Used
- LangChain / LangGraph - AI and conversational agent framework

- GROQ-API - LLM powering real-time responses

- Python - Core programming language for backend logic

- Flask - Web framework for handling API requests

- MongoDB - Database for storing chat history and user interactions

- ReactJS - Frontend framework for an interactive UI

- JavaScript / HTML / CSS - Additional front-end development tools

This project serves as a foundation for building intelligent healthcare assistants and can be expanded with additional features like personalized recommendations, multi-language support, and integration with electronic health records (EHR) in the future.

