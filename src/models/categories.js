import pool from './db.js';

// Change getALLCategories to getAllCategories
export async function getAllCategories() {
    const sql = `
        SELECT category_id, category_name
        FROM categories
        ORDER BY category_name;
        `;

        const result = await pool.query(sql);
        return result.rows;
}