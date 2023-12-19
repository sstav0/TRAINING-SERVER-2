const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "shopping",
    waitForConnections: true, // Wait for a free database connection
    connectionLimit: 10, // Maximum number of simultaneous connections
    queueLimit: 0, // Maximum number of connections in waiting queue (with still some wait time)
});

class Model {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async save(payload) {
        const keys = Object.keys(payload).join(", ");
        const values = Object.values(payload);
        try {
            await connection.query(`INSERT INTO ${this.tableName} (${keys}) VALUES (?);`, [values]);
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement :', error);
            throw error;
        }
    }
    
    async delete(id, idcolumn) {
        try {
            await connection.query(`DELETE FROM ${this.tableName} WHERE ${idcolumn} = ?;`, [id]);
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
            throw error;
        }
    }

    async update(payload, wherecolum, wherevalue) {
        const keys = Object.keys(payload).join(" = ?, ") + " = ?";
        const values = Object.values(payload);
        //console.log(`UPDATE ${this.tableName} SET ${keys} WHERE ${wherecolum} = ?;`, [...values, wherevalue]);
        try {
            await connection.query(`UPDATE ${this.tableName} SET ${keys} WHERE ${wherecolum} = ?;`, [...values, wherevalue]);
        } catch (error) {
            console.error('Erreur lors de la mise à jour :', error);
            throw error;
        }
    }

    async loadMany(condition) {
        try {
            const [rows] = await connection.query(`SELECT * FROM ${this.tableName} ${condition};`);
            return rows;
        } catch (error) {
            console.error('Erreur lors du chargement :', error);
            throw error;
        }
    }

	async loadSpecific(condition){
		let List = []
		try {
			const[rows] = await connection.query(`SELECT ${condition} FROM ${this.tableName};`)
			rows.forEach(function(row) {
				List.push(row.username); // Ajouter chaque username à la liste
			});
		} catch(error) {
            console.error('Erreur lors du chargement spécifique :', error);
            throw error;
		}
		return List;
	}

    async searchValue(column, field, value){
        try {
            const query = `SELECT ?? FROM ?? WHERE ?? = ?;`;
            const [rows] = await connection.query(query, [column, this.tableName, field, value]);
            if (rows.length > 0) {
                let ans = [];
                for(const element of rows){
                    ans.push(element[column]);
                }
                return ans;
            } else {
                console.log(`No value found for ${field}='${value}'`);
                return null; // or undefined, or however you wish to indicate "not found"
            }
        } catch(error) {
            console.error('Erreur lors de la recherche :', error);
            throw error;
        }
    }   
}

module.exports = Model;
