import db from "./db.js";

/**
 * Get all service projects
 */
const getAllProjects = async () => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date,
            sp.organization_id,
            o.name AS organization_name
        FROM service_project sp
        JOIN organization o
            ON sp.organization_id = o.organization_id
        ORDER BY o.name, sp.project_date;
    `;

    const result = await db.query(query);
    return result.rows;
};

/**
 * Get projects for one organization
 */
const getProjectsByOrganizationId = async (organizationId) => {

    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY project_date;
    `;

    const result = await db.query(query,[organizationId]);

    return result.rows;
};

/**
 * Get the next upcoming projects
 */
const getUpcomingProjects = async (numberOfProjects) => {

    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date,
            sp.organization_id,
            o.name AS organization_name
        FROM service_project sp
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_date >= CURRENT_DATE
        ORDER BY sp.project_date
        LIMIT $1;
    `;

    const result = await db.query(query,[numberOfProjects]);

    return result.rows;
};

/**
 * Get one project
 */
const getProjectDetails = async (projectId) => {

    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date,
            sp.organization_id,
            o.name AS organization_name
        FROM service_project sp
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1;
    `;

    const result = await db.query(query,[projectId]);

    return result.rows[0];
};

/**
 * Get all categories for one project
 */
const getCategoriesByProjectId = async (projectId) => {

    const query = `
        SELECT
            c.category_id,
            c.name
        FROM category c
        JOIN service_project_category spc
            ON c.category_id = spc.category_id
        WHERE spc.project_id = $1
        ORDER BY c.name;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

export {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    getCategoriesByProjectId
};