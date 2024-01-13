import { Request, Response } from 'express';
import * as mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'search-ts',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const query = async (sql: string, values?: any[]) => {
    const conn = await pool.getConnection();

    try {
        const [rows] = await conn.query(sql, values);
        return rows;
    } catch (err) {
        conn.release();
    }
};

export const searchUsers = async(req: Request, res: Response) => {
    try {
        const { username } = req.query;

        const sql = /* sql */`
            select * from users where username like ?
        `;

        const users = await query(sql, [username]);

        if (!users) {
            return res.status(404).send({
                error: 'No user with that name found'
            })
        }

        return res.status(200).send({
            message: 'successfully retrieved users with that name',
            data: users
        });
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            error: 'Internale server error'
        })
    }
}

export const searchCategory = async (req: Request, res: Response) => {
    try {
        const { category_name } = req.query;
        
        const sql = /* sql */`
            select * from category where category name like ?
        `;

        const categories = await query(sql, [category_name]);

        if (!categories) {
            return 
        }
    } catch (error) {
        console.error(error);
    }
}