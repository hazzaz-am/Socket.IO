# Socket.IO Chat Application

This is a simple real-time chat application built using Socket.IO. The project is created for the purpose of learning and practicing with Socket.IO.

## Project Structure

The project is divided into two main parts:

-   `client/`: Contains the frontend of the application, which is a simple web page that connects to the Socket.IO server.
-   `server/`: Contains the backend of the application, which is a Node.js server that uses Socket.IO to manage chat rooms and broadcast messages.

## Technologies Used

-   [Socket.IO](https://socket.io/)
-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/) (for the server)
-   HTML, CSS, and JavaScript (for the client)

## How to Run

### Prerequisites

-   Node.js and npm installed on your machine.

### Server

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm start
    ```

The server will be running at `http://localhost:3000`.

### Client

1.  Open the `client/index.html` file in your web browser.
2.  Enter a username and a room name.
3.  Start chatting!

## Features

-   Real-time messaging
-   Multiple chat rooms
-   User-friendly interface
