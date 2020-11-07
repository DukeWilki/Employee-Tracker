var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Queenw00d.",
  database: "top_songsDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

    console.log("App listening");


    function runSearch() {
        inquirer
          .prompt({
            name: "action",
            type: "list",
            message: "This is a test, select 'exit'",
            choices: [
              "exit"
            ]
          })
          .then(function(answer) {
            switch (answer.action) {
            case "exit":
              connection.end();
              break;
            }
          });
        }
