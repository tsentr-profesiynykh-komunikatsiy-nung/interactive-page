# Center for Professional Communications IFNTUNG — Interactive Web Page

This project is an interactive web page for the Center for Professional Communications at Ivano-Frankivsk National Technical University of Oil and Gas. The site allows users to browse faculties, departments, and available practice and employment opportunities, all stored in the `data.json` file.

## Project Structure

- `index.html` — main HTML page
- `web.css` — page styles
- `script.js` — page logic and interactivity
- `data.json` — all faculties, departments, companies, and positions (edit separately)
- `static/` — images (e.g., logo)

## How to Run Locally

1. Install [Node.js](https://nodejs.org/) (if not already installed).
2. Open a terminal in the project root folder.
3. Start a local server with:

   ```sh
   npx serve .
   ```

4. Open your browser and go to the address shown by the command (usually http://localhost:3000).
5. All data will be loaded automatically from `data.json`.

## Deploy to GitHub Pages

- Just add/update files in your repository and enable GitHub Pages in the repository settings.
- All data from `data.json` will work in the production version as well.

## Editing Data

- To change faculties, departments, companies, or positions — edit the `data.json` file in the project root.

---

**Author:** Center for Professional Communications IFNTUNG
