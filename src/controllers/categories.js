import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId
} from "../models/categories.js";

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

export {
    showCategoriesPage,
    showCategoryDetailsPage
};