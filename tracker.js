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
        "View all employees", //done
        "View employees by department", //done
        "View employees by role", //done
        "View employees by manager", // (BONUS)
        "Add employee",
        "Remove employee", // (BONUS) done
        "View departments", // done
        "Add new department",
        "View roles", // done
        "Add new role",
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

        case "View employees by role":
          byRole();
          break;

        case "View employees by manager": // (BONUS)
          byManager();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "Remove employee":
          removeEmployee();
          break;

        case "View departments":
          viewDepartments();
          break;

        case "Add new department":
          addDepartment();
          break;

        case "View roles":
          viewRoles();
          break;

        case "Add new role":
          addRole();
          break;

      }
    });
}

// VEIW ALL EMPLOYEES //done
function viewAll() {
  var query =
    "SELECT first_name, last_name, role_id, roles.title AS 'role', departments.name AS 'department' FROM employees INNER JOIN roles ON role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].first_name +
          " " +
          res[i].last_name +
          " - " +
          res[i].role +
          " - " +
          res[i].department
      );
    }
    runSearch();
  });
}

// VIEW ALL EMPLOYEES IN A DEPARTMENT //done
function byDepartment() {
  var query = "SELECT * FROM departments";
  connection.query(query, function (err, res) {
    // console.log(res);
    const deptOptions = res.map(function (department) {
      return {
        name: department.name,
        value: department.id,
      };
    });
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Which department?",
        choices: deptOptions,
      })
      .then(function (answer) {
        // console.log(answer);
        var query =
          "SELECT first_name, last_name, role_id, roles.title AS 'role', salary FROM employees INNER JOIN roles ON role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id WHERE departments.id = ?";
        connection.query(query, [answer.action], function (err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log(
              res[i].role +
                ": " +
                res[i].first_name +
                " " +
                res[i].last_name +
                " || Salary: $" +
                res[i].salary
            );
          }
          runSearch();
        });
      });
    // }
  });
}

// VIEW ALL EMPLOYEES BY ROLE  //done
function byRole() {
  var query = "SELECT * FROM roles";
  connection.query(query, function (err, res) {
    // console.log(res);
    const roleOptions = res.map(function (role) {
      return {
        name: role.title,
        value: role.id,
      };
    });
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Which role?",
        choices: roleOptions,
      })
      .then(function (answer) {
        // console.log(answer);
        var query =
          "SELECT first_name, last_name, role_id, roles.title AS 'role' FROM employees INNER JOIN roles ON role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id WHERE roles.id = ?";
        connection.query(query, [answer.action], function (err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log(
              res[i].role +
                ": " +
                res[i].first_name +
                " " +
                res[i].last_name
            );
          }
          runSearch();
        });
      });
    // }
  });
}

// VIEW ALL EMPLOYEES BY MANAGER   NB RESULTS ONLY SHOW MANAGER, NOT THEIR REPORTS
function byManager() {
  var query =
    "SELECT id, first_name, last_name FROM employees WHERE ismanager = true";
  connection.query(query, function (err, res) {
    console.log(res);
    const mgrOptions = res.map(function (employee) {
      return {
        // fname: employee.first_name,
        name: employee.first_name + " " + employee.last_name,
        value: {
          id: employee.id,
          name: employee.first_name + " " + employee.last_name,
        },
      };
    });
    inquirer
      .prompt({
        name: "manager",
        type: "list",
        message: "Which manager's direct reports would you like to see?",
        choices: mgrOptions,
      })
      .then(function (answer) {
        console.log(answer);
        var query =
          "SELECT first_name, last_name FROM employees WHERE manager_id = ?";
        connection.query(query, [answer.manager], function (err, res) {
          //   for (var i = 0; i < res.length; i++) {
          console.log(
            "Staff Member: " + answer.manager.name
            // " " +
            // res[i].last_name +
            // " || Role: " +
            // res[i].role
          );
          //   }
          runSearch();
        });
      });
    // }
  });
}

// ADD EMPLOYEE 
function addEmployee() {
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
    }

// REMOVE EMPLOYEE  //done
function removeEmployee() {
  var query = "SELECT id, first_name, last_name FROM employees";
  connection.query(query, function (err, res) {
    console.log(res);
    const empOptions = res.map(function (employee) {
      return {
        fname: employee.first_name,
        name: employee.first_name + " " + employee.last_name,
        value: {
          id: employee.id,
          name: employee.first_name + " " + employee.last_name,
        },
      };
    });

    inquirer
      .prompt({
        name: "remove",
        type: "list",
        message: "Which employee?",
        choices: empOptions,
      })

      .then(function (answer) {
        console.log(answer);
        var query = "DELETE FROM employees WHERE id = ?";
        console.log(query);
        connection.query(query, [answer.remove.id], function (err, res) {
          console.log(err);
          //   for (var i = 0; i < res.length; i++) {
          console.log(answer.remove.name + " is no longer with us.");
          //   }
          runSearch();
        });
      });
  });
}

// VIEW DEPARTMENTS //done
function viewDepartments() {
  var query = "SELECT * FROM departments";
  connection.query(query, function (err, res) {
    console.log(res);
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].name);
    }
    runSearch();
  });
}

// ADD DEPARTMENTS //done
function addDepartment() {
      inquirer
      .prompt({
            type: "input",
            name: "dept_name",
            message: "What is the new department called?"
          })

        .then(function (answer) {
          console.log(answer);
          var query = "INSERT INTO departments (name) VALUES (?)";
          console.log(query);
          connection.query(query, [answer.dept_name], function (err, res) {
          console.log(err);
          console.log(answer.dept_name + " has been added.");
          runSearch();
        })
      })
}


// {
  //     inquirer
  //     .prompt([
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
      // }

// VIEW ROLES //done
function addRole() {
  var query = "SELECT * FROM departments";
  connection.query(query, function (err, res) {
    // console.log(res);
    const deptOptions = res.map(function (department) {
      return {
        name: department.name,
        value: department.id,
      };
    });
  inquirer
  .prompt([
        {
        type: "input",
        name: "title",
        message: "What is the new job title?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the the annual salary?"
      },
      {
        type: "list",
        name: "dept",
        message: "In which department is this role?",
        choices: deptOptions,
      }
    ])

    .then(function (answer) {
      console.log(answer);
      var query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
      console.log(query);
      connection.query(query, [answer.title, answer.salary, answer.dept], function (err, res) {
      console.log(err);
      console.log(answer.title + " has been added to the x department at a salary of $" + answer.salary + ".");
      runSearch();
    })
  })
});
}


// UPDATE ROLE
function updateRole() {
  var query = "SELECT id, first_name, last_name FROM employees";
  connection.query(query, function (err, res) {
    console.log(res);
    const empOptions = res.map(function (employee) {
      return {
        // fname: employee.first_name,
        name: employee.first_name + " " + employee.last_name,
        value: {
          id: employee.id,
          name: employee.first_name + " " + employee.last_name,
        },
      };
    });

    inquirer.prompt({
      name: "upemprole",
      type: "list",
      message: "Which employee?",
      choices: empOptions,
    });
    // .prompt({
    //     name: "uprole",
    //     type: "list",
    //     message: "To which role?",
    //     choices: roleOptions
    //     })

    //     .then(function(answer) {
    //         console.log(answer);
    //     var query = "DELETE FROM employees WHERE id = ?"
    //     console.log(query);
    //     connection.query(query, [answer.remove.id], function(err, res) {
    //         console.log(err)
    //     //   for (var i = 0; i < res.length; i++) {
    //         console.log(
    //             answer.remove.name +
    //             " is no longer with us."
    //         );
    //     //   }
    //       runSearch();
    //     });
    //   });
  });
}
