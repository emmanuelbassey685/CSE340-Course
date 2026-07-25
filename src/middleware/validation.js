import { body, validationResult } from "express-validator";

const categoryRules = () => [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required.")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Category name cannot exceed 100 characters.")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Category name must be at least 3 characters long.")

];

const checkCategoryData = async (req, res, next) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const category = {
        ...req.body,
        category_id: req.params.id
    };

    const view = req.originalUrl.includes("/edit-category/")
        ? "edit-category"
        : "new-category";

    return res.render(view, {
        title: view === "edit-category"
            ? "Edit Category"
            : "Create New Category",
        category,
        errors: errors.array()
    });

};

export { categoryRules, checkCategoryData };