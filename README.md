# ChatGPT Muscle Outputter

This is a simple Node server that uses the OpenAI API to output a list of muscles that a given exercise works out.

## Requirements

- Node.js
- Yarn (or npm)
- An OpenAI API key

## Installation

1. Clone the repository
2. Run `yarn install` (or `npm install`) to install the dependencies
3. Set the `OPENAI_API_KEY` environment variable to your OpenAI API key
4. Run `yarn start` (or `npm start`) to start the server

## Usage

Send a GET request to `http://localhost:3000/muscles/:exercise`, replacing `:exercise` with the name of the exercise you want to query.

For example, to query the muscles worked out by a bicep curl, send a GET request to `http://localhost:3000/muscles/bicep%20curl`.

## License

This project is licensed under the [ISC License](LICENSE).
