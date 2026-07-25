import { getAllCategories, getCategoryDetails, getProjectsByCategoryId, 
    updateCategoryAssignments, createCategory, updateCategory } from "../models/categories.js";
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

/**
 * Display New Category Form
 */
const showNewCategoryForm = async (req, res) => {

    res.render("new-category", {
        title: "Create New Category",
        category: {},
        errors: []
    });

};

/**
 * Process New Category
 */
const processNewCategoryForm = async (req, res) => {
    const { name } = req.body;

    try {await createCategory(name);
        req.flash("success", "Category created successfully.");
        res.redirect("/categories");

    } catch (error) {

        console.error(error);

        res.render("new-category", {
            title: "Create New Category",
            category: req.body,
            errors: [{ msg: "Unable to create category." }]
        });
    }
};

/**
 * Display Edit Category Form
 */
const showEditCategoryForm = async (req, res) => {

    const categoryId = req.params.id;
    const category = await getCategoryDetails(categoryId);
    
    if (!category) {
        return res.status(404).render("error", {
            title: "Category Not Found",
            message: "The requested category could not be found."
        });
    }

    res.render("edit-category", {
        title: "Edit Category",
        category,
        errors: []
    });
};

/**
 * Process Edit Category
 */
const processEditCategoryForm = async (req, res) => {

    const categoryId = req.params.id;
    const { name } = req.body;

    try { await updateCategory(categoryId, name);
        req.flash("success", "Category updated successfully.");
        res.redirect("/categories");

    } catch (error) {

        console.error(error);

        res.render("edit-category", {
            title: "Edit Category",
            category: {
                category_id: categoryId,
                name
            },
            errors: [{ msg: "Unable to update category." }]
        });

    }

};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, 
    showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm
};