import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'src', 'views')
]);

/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
});

app.get('/projects', async (req, res) => {
  try {
        const projects = await getAllProjects();
        console.log('Projects:', projects);
        res.render('projects', { title: "Service Projects", projects: projects});

    } catch (err) {
        console.error("Route Error:", err);
        res.render('projects', { title: 'Service Projects', projects: [] });
    }
});

// Categories route: retrieves categories from the database and renders the EJS view
app.get("/categories", async (req, res) => {
    try {
        const categories = await getAllCategories();
        console.log("Categories:", categories);
        res.render("categories", { title: 'Categories', categories });
 
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
});


app.listen(PORT, async () => {

  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit with a failure code
  }
});
