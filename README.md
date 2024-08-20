# Multi-Level Comment System

## Overview

The Multi-Level Comment System is a Node.js and Express.js application designed to manage comments and replies on posts. It supports user authentication, comment creation, reply management, and comment expansion with pagination. The application is dockerized and can be deployed to a hosting service.

## Features

- **User Authentication:** Secure registration and login using JWT.
- **Create Comments:** Add comments to posts.
- **Reply to Comments:** Respond to existing comments.
- **Retrieve Comments:** Fetch comments with sorting and filtering options.
- **Expand Comments:** View replies to a comment with pagination.
- **Rate Limiting:** Prevent abuse of comment and reply endpoints.

## Technologies

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Rate Limiting:** Express-rate-limit
- **Docker:** Containerization
- **Testing:** Mocha, Chai
- **Environment Management:** dotenv

## Getting Started

### Prerequisites

- Node.js and npm
- Docker and Docker Compose (optional)
- MongoDB instance (local or Docker)

### Installation

1. **Clone the Repository:**

    ```bash
    git clone <your-repository-url>
    cd multi-level-comment-system
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables:**

    Create a `.env` file in the root directory with the following content:

    ```bash
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/comment-system
    JWT_SECRET=your_jwt_secret_key
    ```

4. **Run MongoDB (if not using Docker):**

    You can use Docker Compose to start MongoDB:

    ```bash
    docker-compose up
    ```

5. **Start the Application:**

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:5000`.

## API Endpoints

### User Authentication

- **Register User:**
    - **URL:** `/api/auth/register`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "password123"
        }
        ```

- **Login User:**
    - **URL:** `/api/auth/login`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "email": "testuser@example.com",
            "password": "password123"
        }
        ```

### Comment Management

- **Create Comment:**
    - **URL:** `/api/posts/:postId/comments`
    - **Method:** `POST`
    - **Headers:** `Authorization: Bearer <your-jwt-token>`
    - **Body:**
        ```json
        {
            "text": "This is a comment."
        }
        ```

- **Reply to Comment:**
    - **URL:** `/api/posts/:postId/comments/:commentId/reply`
    - **Method:** `POST`
    - **Headers:** `Authorization: Bearer <your-jwt-token>`
    - **Body:**
        ```json
        {
            "text": "This is a reply to the comment."
        }
        ```

- **Retrieve Comments:**
    - **URL:** `/api/posts/:postId/comments`
    - **Method:** `GET`
    - **Query Parameters:** `sortBy`, `sortOrder`
    - **Response:**
        ```json
        [
            {
                "id": 1,
                "text": "This is a comment.",
                "createdAt": "2024-08-20T12:00:00Z",
                "postId": 1,
                "parentCommentId": null,
                "replies": [
                    {
                        "id": 2,
                        "text": "This is a reply.",
                        "createdAt": "2024-08-20T12:05:00Z"
                    }
                ],
                "totalReplies": 1
            }
        ]
        ```

- **Expand Comment:**
    - **URL:** `/api/posts/:postId/comments/:commentId/expand`
    - **Method:** `GET`
    - **Query Parameters:** `page`, `pageSize`
    - **Response:**
        ```json
        {
            "comment": {
                "id": 1,
                "text": "This is the parent comment.",
                "createdAt": "2024-08-20T12:00:00Z",
                "postId": 1,
                "parentCommentId": null,
                "replies": [
                    {
                        "id": 2,
                        "text": "This is a reply.",
                        "createdAt": "2024-08-20T12:05:00Z"
                    }
                ],
                "totalReplies": 5
            }
        }
        ```

## Running Tests

To run integration tests:

```bash
npm test
```
## Build Docker Image

1. Open your terminal or command line interface.
2. Navigate to the root directory of your project where the `Dockerfile` is located.
3. Execute the following command to build the Docker image:

    ```bash
    docker build -t multi-level-comment-system .
    ```

## Run Docker Container

1. Once the Docker image is built, run the following command to start a container:

    ```bash
    docker run -p 5000:5000 multi-level-comment-system
    ```

    This will map port 5000 of your local machine to port 5000 in the Docker container.

## Deployment

Deploy your Dockerized application to your preferred hosting service. Options include:

- **AWS**
- **Heroku**
- **DigitalOcean**

Ensure that you configure environment variables in your hosting service similarly to those defined in the `.env` file.

## Documentation

For detailed API documentation, please refer to the [API Documentation](#).

## Contact

For any questions or support, please contact [faisalpinitod@gmail.com](mailto:your-email@example.com).
