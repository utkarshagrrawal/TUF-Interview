const { dbConnection } = require("../utility/DatabaseUtility");


const submitCodeLogic = async (body) => {
    const { username, language, stdin, code } = body;

    var result;

    try {
        result = await new Promise((resolve, reject) => {
            dbConnection.query('INSERT INTO Submissions (username, language, stdin, code) VALUES (?, ?, ?, ?)', [username, language, stdin, code], (err, result) => {
                if (err) {
                    reject({ error: err });
                }
                resolve({ success: true });
            })
        })
    } catch (err) {
        result = { error: err }
    }

    return result;
}


const fetchSubmissionsLogic = async () => {
    var result;

    try {
        result = await new Promise((resolve, reject) => {
            dbConnection.query('SELECT * FROM Submissions', (err, rows) => {
                if (err) {
                    reject({ error: err });
                }
                resolve({ submissions: rows });
            })
        })
    } catch (err) {
        result = { error: err }
    }

    return result;
}

module.exports = {
    submitCodeLogic,
    fetchSubmissionsLogic
}