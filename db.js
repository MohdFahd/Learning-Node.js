const mysql = require("mysql");

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL: " + err.stack);
        return;
      }
      console.log("Connected to MySQL as ID " + this.connection.threadId);
    });
  }

  end() {
    this.connection.end((err) => {
      if (err) {
        console.error("Error closing MySQL connection: " + err.stack);
        return;
      }
      console.log("MySQL connection closed.");
    });
  }

  // Select operation
  select(query, callback) {
    this.connection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing select query: " + err.stack);
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  // Insert operation
  insert(query, values, callback) {
    this.connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error executing insert query: " + err.stack);
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  // Update operation
  update(query, values, callback) {
    this.connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error executing update query: " + err.stack);
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  // Delete operation
  delete(query, callback) {
    this.connection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing delete query: " + err.stack);
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }
}
// Usage example:
const db = new Database({
  host: "localhost",
  user: "root",
  password: "",
  database: "node",
});
module.exports = {
  Database: Database,
};
// db.connect();

// Example select query
// db.select("SELECT * FROM table_name", (err, results) => {
//   if (err) {
//     console.error("Error selecting data: " + err);
//     return;
//   }
//   console.log("Selected data:", results);
// });

// Example insert query
// db.insert("INSERT INTO table_name (column1, column2) VALUES (?, ?)", [value1, value2], (err, results) => {
//   if (err) {
//     console.error("Error inserting data: " + err);
//     return;
//   }
//   console.log("Inserted data:", results);
// });

// Example update query
// db.update("UPDATE table_name SET column1 = ? WHERE id = ?", [newValue, id], (err, results) => {
//   if (err) {
//     console.error("Error updating data: " + err);
//     return;
//   }
//   console.log("Updated data:", results);
// });

// Example delete query
// db.delete("DELETE FROM table_name WHERE id = ?", [id], (err, results) => {
//   if (err) {
//     console.error("Error deleting data: " + err);
//     return;
//   }
//   console.log("Deleted data:", results);
// });

// Close the connection when done
// db.end();
