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
router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Edit Project Route handler
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// New Category
router.get("/new-category", showNewCategoryForm );
router.post('/new-category', categoryRules(), checkCategoryData, processNewCategoryForm);

//Edit Category
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryRules(), checkCategoryData, processEditCategoryForm);

export default router;