import db from "./db.js";

/**
 * Get all categories
 */
const getAllCategories = async () => {
    const query = `
        SELECT
            category_id,
            name,
            description
        FROM category
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
};

/**
 * Get one category
 */
const getCategoryDetails = async (categoryId) => {

    const query = `
        SELECT
            category_id,
            name,
            description
        FROM category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows[0];
};

/**
 * Get all projects for one category
 */
const getProjectsByCategoryId = async (categoryId) => {

    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.project_date
        FROM service_project sp
        JOIN service_project_category spc
            ON sp.project_id = spc.project_id
        WHERE spc.category_id = $1
        ORDER BY sp.project_date;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO service_project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM service_project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

export {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId, updateCategoryAssignments
};