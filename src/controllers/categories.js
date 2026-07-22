import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId, updateCategoryAssignments
} from "../models/categories.js";

import { getProjectDetails, getCategoriesByProjectId } from "../models/projects.js";

/**
 * Categories page
 */
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();

    res.render("categories", {
        title: "Service Project Categories",
        categories
    });
};

/**
 * Category Details page
 */
const showCategoryDetailsPage = async (req, res) => {
    const id = req.params.id;
    const category = await getCategoryDetails(id);

    if (!category) {
        return res.status(404).render("error", {
            title: "Category Not Found",
            message: "The requested category could not be found."
        });
    }

    const projects = await getProjectsByCategoryId(id);

    res.render("category", {
        title: category.name,
        category,
        projects
    });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);
    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };