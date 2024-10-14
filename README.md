# AWS Serverless Lambda App with Authentication and User CRUD

This project is an AWS Serverless application built with Lambda functions and API Gateway, featuring user authentication and CRUD operations using DynamoDB. It includes JWT-based authentication, separate handlers for different operations, and uses the Serverless Framework for deployment.

## Features

- User authentication (register and login)
- User CRUD operations
- JWT-based authentication
- DynamoDB integration using AWS SDK v3
- Serverless Framework for easy deployment
- Environment variable management using AWS SSM Parameter Store

## Project Structure

```
.
├── src/
│   ├── config/
│   │   └── dynamodb.js
│   ├── handlers/
│   │   ├── auth.js
│   │   └── user.js
│   ├── middleware/
│   │   └── auth.js
│   └── models/
│       └── User.js
├── serverless.yml
├── package.json
└── README.md
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your AWS credentials
4. Create a JWT secret in AWS SSM Parameter Store:
   ```
   aws ssm put-parameter --name /jwt-secret --value "your-jwt-secret" --type SecureString
   ```
5. Deploy the application: `npm run deploy`
6. For local development: `npm start`

## API Endpoints

- POST /auth/register - Register a new user
- POST /auth/login - Login and receive a JWT token
- GET /users - Get all users (requires authentication)
- GET /users/{id} - Get a specific user (requires authentication)
- PUT /users/{id} - Update a user (requires authentication)
- DELETE /users/{id} - Delete a user (requires authentication)

## Contributing

Please feel free to submit issues, fork the repository and send pull requests!

## License

This project is licensed under the MIT License.