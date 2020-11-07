var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: ".",
  database: "top_songsDB",
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

console.log("App listening");

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View employees by department",
        "View employees by manager",
        "Add employee",
        "Remove employee",
        "Add employee role",
        "Add employee manager",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          connection.end();
          break;

        case "View employees by department":
          connection.end();
          break;

        case "View employees by manager":
          connection.end();
          break;

        case "Add employee":
          connection.end();
          break;

        case "Remove employee":
          connection.end();
          break;

        case "Update employee role":
          connection.end();
          break;

        case "Update employee manager":
          connection.end();
          break;
      }
    });
}
