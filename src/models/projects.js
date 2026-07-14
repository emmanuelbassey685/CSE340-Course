import pool from './db.js';

const getAllProjects = async () => {

    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date,
            o.organization_name
        FROM service_project sp
        JOIN organization o ON sp.organization_id = o.organization_id
        ORDER BY o.organization_name, sp.project_date;
    `;

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error in getAllProjects', error);
        return [];
    }
}

export {getAllProjects}

