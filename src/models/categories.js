import pool from "./db.js";   // or "../db.js" depending on your project

export async function getAllCategories() {
    const sql = `
        SELECT category_id, category_name
        FROM categories
        ORDER BY category_name;
    `;

    const result = await pool.query(sql);
    return result.rows;
}
