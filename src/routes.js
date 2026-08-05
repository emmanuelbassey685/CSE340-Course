import express from "express";
import { testErrorPage } from "./controllers/errors.js";
import { showHomePage } from "./controllers/index.js";
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, 
    processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, 
    processEditCategoryForm } from "./controllers/categories.js";
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, 
    projectValidation, showEditProjectForm, processEditProjectForm } from "./controllers/projects.js";
import { showOrganizationDetailsPage, showOrganizationsPage, showNewOrganizationForm, processNewOrganizationForm, 
    organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { categoryRules, checkCategoryData } from "./middleware/validation.js";
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout,
    requireLogin, showDashboard, requireRole, usersPage } from "./controllers/users.js";
import { volunteerForProject, removeVolunteerFromProject } from "./controllers/volunteers.js";

const router = express.Router();
console.log("✅ src/routes.js loaded");

router.get("/", showHomePage);

router.get("/organizations", showOrganizationsPage);

router.get("/organization/:id", showOrganizationDetailsPage);

router.get("/projects", showProjectsPage);

router.get("/project/:id", showProjectDetailsPage);

router.get("/categories", showCategoriesPage);

router.get("/category/:id", showCategoryDetailsPage);

router.get("/test-error", testErrorPage);

// Route for new organization page
router.get('/new-organization', requireRole("admin"), showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', requireRole("admin"), organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id',  requireLogin, requireRole("admin"), showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', requireRole("admin"), organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', requireRole("admin"), showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', requireRole("admin"), projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole("admin"), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole("admin"), processAssignCategoriesForm);

// Edit Project Route handler
router.get('/edit-project/:id', requireRole("admin"), showEditProjectForm);
router.post('/edit-project/:id', requireRole("admin"), projectValidation, processEditProjectForm);

// New Category
router.get("/new-category", requireRole("admin"), showNewCategoryForm );
router.post('/new-category', requireRole("admin"), categoryRules(), checkCategoryData, processNewCategoryForm);

//Edit Category
router.get('/edit-category/:id', requireRole("admin"), showEditCategoryForm);
router.post('/edit-category/:id', requireRole("admin"), categoryRules(), checkCategoryData, processEditCategoryForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

// Admin-only users page
router.get("/users", requireLogin, requireRole("admin"), usersPage);

// Volunteer Routes
router.post("/project/:id/volunteer", requireLogin, volunteerForProject);
router.post("/project/:id/remove-volunteer", requireLogin, removeVolunteerFromProject);

export default router;