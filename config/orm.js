// Import MySQL connection.
var connection = require("./connection.js");

// Helper function for SQL syntax.

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    //  push the Key/Value as a string ant arr
    for (var key in ob) {
        arr.push(key + "=" + ob[key]); 
        }
    

    // translate array of strings to a single comma-separeted string
    return arr.toString();
}
// Object for all our SQL statement functions.
var orm = {
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // vals is a array of values that we want to save to cols
    // cols are the colums we want to insert the values into
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO" + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
        
    },
    // objColVals would be the columns and values that you want to update
    // example of objColVals would be {name: ben, working: true}
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + tabel;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }

};
// Export the orm object for the model burger.js
module.exports = orm;

