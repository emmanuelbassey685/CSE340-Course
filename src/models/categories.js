import pool from './db.js';

export async function getALLCategories() {
    const sql = `
        SELECT category_id, category_name
        FROM categories
        ORDER BY category_name;
        `;

        const result = await pool.query(sql);
        return result.rows;
}
