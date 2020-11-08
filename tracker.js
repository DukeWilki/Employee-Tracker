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
            byDepartment();
          break;

        case "View employees by manager":
            byManager();
          break;

        case "Add employee":
            addEmployee();
          break;

        case "Remove employee":
            removeEmployee();
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

    // VEIW ALL EMPLOYEES
    function viewAll() {
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
      }

    // VIEW ALL EMPLOYEES IN A DEPARTMENT
      function byDepartment() {
            var query = "SELECT * FROM departments"
            connection.query(query, function(err, res) {
                console.log(res);
                const deptOptions = res.map(function(department) {
                    return {
                    name: department.name,
                    value: department.id
                    }
                })
        inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Which department?",
            choices: deptOptions
            })
            .then(function(answer) {
                console.log(answer);
            var query = "SELECT first_name, last_name, role_id, roles.title AS 'role', salary FROM employees INNER JOIN roles ON role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id WHERE departments.id = ?"
            connection.query(query, [answer.action], function(err, res) {
              for (var i = 0; i < res.length; i++) {
                console.log(
                  "Staff Member: " +
                    res[i].first_name +
                    " " +
                    res[i].last_name +
                    " || Role: " +
                    res[i].role +
                    " || Salary: $" +
                    res[i].salary
                );
              }
              runSearch();
            });
          });
        // }
        })
    }


      // VIEW ALL EMPLOYEES BY MANAGER
      function byManager() {
        var query = "SELECT id, first_name, last_name FROM employees WHERE ismanager = true"
        connection.query(query, function(err, res) {
            console.log(res);
            const mgrOptions = res.map(function(employee) {
                return {
                // fname: employee.first_name,
                name: employee.first_name + " " + employee.last_name,
                value: {id: employee.id, name: employee.first_name + " " + employee.last_name}
                }
            })
    // inquirer
    // .prompt({
    //     name: "manager",
    //     type: "list",
    //     message: "Which department?",
    //     choices: deptOptions
    //     })
    //     .then(function(answer) {
    //         console.log(answer);
    //     var query = "SELECT first_name, last_name, role_id, roles.title AS 'role', salary FROM employees INNER JOIN roles ON role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id WHERE departments.id = ?"
    //     connection.query(query, [answer.action], function(err, res) {
    //       for (var i = 0; i < res.length; i++) {
    //         console.log(
    //           "Staff Member: " +
    //             res[i].first_name +
    //             " " +
    //             res[i].last_name +
    //             " || Role: " +
    //             res[i].role +
    //             " || Salary: $" +
    //             res[i].salary
    //         );
    //       }
    //       runSearch();
    //     });
    //   });
    // }
    })
}

        
        // function addEmployee() {
        //     inquirer
        //     .prompt([
        //         {
        //           type: "input",
        //           name: "first_name",
        //           message: "Enter their first name?"
        //         },
        //         {
        //           type: "input",
        //           name: "last_name",
        //           message: "Enter their last name?"
        //         },
        //         {
        //           type: "input",
        //           name: "role",
        //           message: "What is their role?"
        //         },
        //         {
        //           type: "input",
        //           name: "manager",
        //           message: "Who is their manager?"
        //         }
        //       ])
        //       .then(function(answer) {
        //         var query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Carol','Danvers', 3, 1)"
        //         connection.query(query, function(err, res) {
        //           for (var i = 0; i < res.length; i++) {
        //             console.log(
        //               "Staff Member: " +
        //                 res[i].first_name +
        //                 " " +
        //                 res[i].last_name +
        //                 " || Role: " +
        //                 res[i].role
        //             );
        //           }
        //           runSearch();
        //         });
        //       });
        //     }




        function removeEmployee() {
            var query = "SELECT id, first_name, last_name FROM employees"
            connection.query(query, function(err, res) {
                console.log(res);
                const empOptions = res.map(function(employee) {
                    return {
                    // fname: employee.first_name,
                    name: employee.first_name + " " + employee.last_name,
                    value: {id: employee.id, name: employee.first_name + " " + employee.last_name}
                    }
                })

            inquirer
            .prompt({
                name: "remove",
                type: "list",
                message: "Which employee?",
                choices: empOptions
                })

            
            .then(function(answer) {
                console.log(answer);
            var query = "DELETE FROM employees WHERE id = ?"
            console.log(query);
            connection.query(query, [answer.remove.id], function(err, res) {
                console.log(err)
            //   for (var i = 0; i < res.length; i++) {
                console.log(
                    answer.remove.name +
                    " is no longer with us."
                );
            //   }
              runSearch();
            });
          });
        })
        // }
        // })
            
        
    //   function removeEmployee() {
    //     inquirer
    //     .prompt([
    //         name: "remove",
    //         type: "list",
    //         message: "Who would you like to remove?",
    //         choices: [
    //           "Peter Quill",
    //           "Clint Barton",
    //           "Bucky Barnes"
    //         ],
    //       ])
    //       .then(function(answer) {
    //         var query = "DELETE FROM employees WHERE first_name='Clint AND first_name='Barton'"
    //         connection.query(query, function(err, res) {
    //           for (var i = 0; i < res.length; i++) {
    //             console.log(
    //               "Staff Member: " +
    //                 res[i].first_name +
    //                 " " +
    //                 res[i].last_name +
    //                 " || Role: " +
    //                 res[i].role
    //             );
    //           }
    //           runSearch();
    //         });
    //       });
        }


