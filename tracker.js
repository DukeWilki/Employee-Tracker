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
  database: "employee_trackerDB",
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
            viewAll();
          break;

        case "View employees by department":
            v=byDepartment();
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

    function viewAll() {
        // inquirer
        //   .prompt([
        //     {
        //       name: "start",
        //       type: "input",
        //       message: "Enter starting position: ",
        //       validate: function(value) {
        //         if (isNaN(value) === false) {
        //           return true;
        //         }
        //         return false;
        //       }
        //     },
        //     {
        //       name: "end",
        //       type: "input",
        //       message: "Enter ending position: ",
        //       validate: function(value) {
        //         if (isNaN(value) === false) {
        //           return true;
        //         }
        //         return false;
        //       }
        //     }
        //   ])
        //   .then(function(answer) {
            var query = "SELECT first_name, last_name, role_id, roles.title AS 'role', departments.name AS 'department' FROM employees INNER JOIN roles ON role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id"
            connection.query(query, function(err, res) {
              for (var i = 0; i < res.length; i++) {
                console.log(
                  "Staff Member: " +
                    res[i].first_name +
                    " " +
                    res[i].last_name +
                    " || Team: " +
                    res[i].department +
                    " || Role: " +
                    res[i].role
                );
              }
              runSearch();
            });
        //   });
      }


      function byDepartment() {
        inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Which department?",
            choices: [
              "Management",
              "Human Resources",
              "Development",
              "Sales",
            ],
        })
          .then(function(answer) {
            var query = "SELECT first_name, last_name, role_id, roles.title AS 'role', salary FROM employees INNER JOIN roles ON role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id WHERE departments.name = 'Development'"
            connection.query(query, function(err, res) {
              for (var i = 0; i < res.length; i++) {
                console.log(
                  "Staff Member: " +
                    res[i].first_name +
                    " " +
                    res[i].last_name +
                    " || Role: " +
                    res[i].role
                );
              }
              runSearch();
            });
          });
        }