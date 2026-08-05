import db from "./db.js";

/**
 * Add a volunteer to a project
 */
const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteer_projects (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id)
        DO NOTHING;
    `;

    await db.query(query, [userId, projectId]);
};

/**
 * Remove a volunteer from a project
 */
const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM volunteer_projects
        WHERE user_id = $1
        AND project_id = $2;
    `;

    await db.query(query, [userId, projectId]);
};

/**
 * Check if a user is volunteering for a project
 */
const isVolunteer = async (userId, projectId) => {
    const query = `
        SELECT volunteer_id
        FROM volunteer_projects
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows.length > 0;
};

/**
 * Get all volunteer projects for one user
 */
const getVolunteerProjects = async (userId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date,
            o.name AS organization_name
        FROM volunteer_projects vp
        JOIN service_project sp
            ON vp.project_id = sp.project_id
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE vp.user_id = $1
        ORDER BY sp.project_date;
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};

export { addVolunteer, removeVolunteer, isVolunteer, getVolunteerProjects };