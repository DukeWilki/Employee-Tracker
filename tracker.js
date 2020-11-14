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
        "View employees by role",
        "Add employee",
        "Remove employee",
        "View departments",
        "Add new department",
        "View roles",
        "Add new role",
        "Update employee role",
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

        case "Update employee role":
          updateRole();
          break;
      }
    });
}

// VEIW ALL EMPLOYEES
function viewAll() {
  var query =
    "SELECT first_name, last_name, role_id, roles.title AS 'role', departments.name AS 'department' FROM employees INNER JOIN roles ON role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id";
  connection.query(query, function (err, res) {
    if (err) {
      console.log(err);
      }
      console.log("-----------RESULTS-----------");
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

// VIEW ALL EMPLOYEES IN A DEPARTMENT
function byDepartment() {
  var query = "SELECT * FROM departments";
  connection.query(query, function (err, res) {
    if (err) {
      console.log("There seems to be an issue, check your connection");
      }
    const deptOptions = res.map(function (department) {
      return {
        name: department.name,
        value: department.id,
      };
    });
    inquirer
      .prompt({
        name: "department",
        type: "list",
        message: "Which department?",
        choices: deptOptions,
      })
      .then(function (answer) {
        var query =
          "SELECT first_name, last_name, role_id, roles.title AS 'role', salary FROM employees INNER JOIN roles ON role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id WHERE departments.id = ?";
        connection.query(query, [answer.action], function (err, res) {
          if (err) {
            console.log("We're having trouble finding the department list. Check your connection with the database and try again");
            }
            console.log("-----------RESULTS-----------");
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
  });
}

// VIEW ALL EMPLOYEES BY ROLE 
function byRole() {
  var query = "SELECT * FROM roles";
  connection.query(query, function (err, res) {
    if (err) {
      console.log("We're having trouble finding the role list. Check your connection with the database and try again");
      }
    const roleOptions = res.map(function (role) {
      return {
        name: role.title,
        value: role.id,
      };
    });
    inquirer
      .prompt({
        name: "role",
        type: "list",
        message: "Which role?",
        choices: roleOptions,
      })
      .then(function (answer) {
        var query =
          "SELECT first_name, last_name, role_id, roles.title AS 'role' FROM employees INNER JOIN roles ON role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id WHERE roles.id = ?";
        connection.query(query, [answer.role], function (err, res) {
          if (err) {
            console.log(err);
            }
            console.log("-----------RESULTS-----------");
          for (var i = 0; i < res.length; i++) {
            console.log(
              res[i].role + ": " + res[i].first_name + " " + res[i].last_name
            );
          }
          console.log("-----------------------------");
          runSearch();
        });

      });
  });
}

// ADD EMPLOYEE
function addEmployee() {
  var mgrQuery =
    "SELECT * FROM employees INNER JOIN roles ON role_id=roles.id WHERE ismanager=true";
  connection.query(mgrQuery, function (err, res) {
    if (err) {
      console.log("We're having trouble finding the manager list. Check your connection with the database and try again");
      }
    const mgrOptions = res.map(function (mgr) {
      return {
        name: mgr.first_name + " " + mgr.last_name + " - " + mgr.title,
        value: mgr.id,
      };
    });

    var roleQuery = "SELECT * FROM roles";
    connection.query(roleQuery, function (err, res) {
      if (err) {
        console.log("We're having trouble finding the role list. Check your connection with the database and try again");
        }
      const roleOptions = res.map(function (role) {
        return {
          name: role.title,
          value: role.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "input",
            name: "fname",
            message: "What is their first name?",
            validate: function (answer) {
              const pass = answer.match(/^[a-zA-Z\s]+$/i);
              if (pass) {
                return true;
              }
              return "First name cannot be blank and must contain letters and spaces only.";
            },
          },
          {
            type: "input",
            name: "lname",
            message: "What is their last name?",
            validate: function (answer) {
              const pass = answer.match(/^[a-zA-Z\s]+$/i);
              if (pass) {
                return true;
              }
              return "Last name cannot be blank and must contain letters and spaces only.";
            },
          },
          {
            type: "confirm",
            name: "ismanager",
            message: "Are they a Manager?",
          },
          {
            type: "list",
            name: "role",
            message: "What is their role?",
            choices: roleOptions,
          },
          {
            type: "list",
            name: "mgr",
            message: "Who is their direct manager?",
            choices: mgrOptions,
          },
        ])

        .then(function (answer) {
          var query =
            "INSERT INTO employees (first_name, last_name, role_id, manager_id, ismanager) VALUES (?, ?, ?, ?, ?)";
            connection.query(
            query,
            [
              answer.fname,
              answer.lname,
              answer.role,
              answer.mgr,
              answer.ismanager,
            ],
            function (err, res) {
              if (err) {
                console.log(err);
                }
              console.log("-----------RESULT------------");
              console.log(
                answer.fname +
                  " " +
                  answer.lname +
                  " has been added to your database."
              );
              runSearch();
            }
          );
        });
    });
  });
}

// REMOVE EMPLOYEE 
function removeEmployee() {
  var query = "SELECT id, first_name, last_name FROM employees";
  connection.query(query, function (err, res) {
    if (err) {
      console.log("We're having trouble finding the employee list. Check your connection with the database and try again");
      }
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
        var query = "DELETE FROM employees WHERE id = ?";
        connection.query(query, [answer.remove.id], function (err, res) {
          if (err) {
            console.log("-----------WARNING-----------");
            console.log(answer.remove.name + " manages a team. Reassign each direct report using 'Update employee role' option and try again");
            console.log("Could not remove " + answer.remove.name + " from the database");
            } else
            console.log("-----------RESULT------------");
          console.log(answer.remove.name + " is no longer with us.");
          runSearch();
        });
      });
  });
}

// VIEW DEPARTMENTS
function viewDepartments() {
  var query = "SELECT * FROM departments";
  connection.query(query, function (err, res) {
    if (err) {
      console.log("We're having trouble finding the department list. Check your connection with the database and try again");
      }
      console.log("-----------RESULTS-----------");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].name);

    }
    runSearch();
  });
}

// ADD DEPARTMENTS
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "dept_name",
      message: "What is the new department called?",
      validate: function (answer) {
        const pass = answer.match(/^[a-zA-Z\s]+$/i);
        if (pass) {
          return true;
        }
        return "Department cannot be blank and must contain letters and spaces only.";
      },
    })

    .then(function (answer) {
      var query = "INSERT INTO departments (name) VALUES (?)";
      connection.query(query, [answer.dept_name], function (err, res) {
        if (err) {
          console.log(err);
          }
          console.log("-----------RESULT------------");
        console.log(answer.dept_name + " department has been added to the database.");
        runSearch();
      });
    });
}

// VIEW ROLES
function viewRoles() {
  var query = "SELECT id, title, salary FROM roles";
  connection.query(query, function (err, res) {
    if (err) {
      console.log("We're having trouble finding the role list. Check your connection with the database and try again");
      }
      console.log("-----------RESULTS-----------");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].title + ": $" + res[i].salary);
    }
    runSearch();
  });
}

// ADD ROLES
function addRole() {
  var query = "SELECT * FROM departments";
  connection.query(query, function (err, res) {
    if (err) {
      console.log("We're having trouble finding the department list. Check your connection with the database and try again");
      }
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
          message: "What is the new job title?",
          validate: function (answer) {
            const pass = answer.match(/^[a-zA-Z\s]+$/i);
            if (pass) {
              return true;
            }
            return "Job title cannot be blank and must contain letters and spaces only.";
          },
        },
        {
          type: "input",
          name: "salary",
          message: "What is the the annual salary?",
          validate: function (answer) {
            const pass = answer.match(/^\d+$/i);
            if (pass) {
              return true;
            }
            return "Salary cannot be blank and must contain numeric charachters only.";
          },
        },
        {
          type: "list",
          name: "dept",
          message: "In which department is this role?",
          choices: deptOptions,
        },
      ])

      .then(function (answer) {
        var query =
          "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
        connection.query(
          query,
          [answer.title, answer.salary, answer.dept],
          function (err, res) {
            if (err) {
              console.log(err);
              }
              console.log("-----------RESULT------------");
            console.log(
              answer.title +
                " has been added at a salary of $" +
                answer.salary +
                "."
            );
            runSearch();
          }
        );
      });
  });
}

// UPDATE ROLE
function updateRole() {
  var employeeQuery = 
  "SELECT employees.id, first_name, last_name, role_id, roles.title AS 'role' FROM employees INNER JOIN roles ON role_id = roles.id";
  connection.query(employeeQuery, function (err, res) {
    if (err) {
      console.log("We're having trouble finding the employee list. Check your connection with the database and try again");
      }
    const empOptions = res.map(function (employee) {
      return {
        fname: employee.first_name,
        name: employee.first_name + " " + employee.last_name + " " + employee.role,
        value: {
          id: employee.id,
          name: employee.first_name + " " + employee.last_name,
        },
      };
    });

  var roleQuery =
  "SELECT * FROM roles";
connection.query(roleQuery, function (err, res) {
  if (err) {
    console.log("We're having trouble finding the role list. Check your connection with the database and try again");
    }
  const roleOptions = res.map(function (role) {
    return {
      name: role.title,
      value: role.id,
    };
  });

  var mgrQuery =
  "SELECT * FROM employees INNER JOIN roles ON role_id=roles.id WHERE ismanager=true";
connection.query(mgrQuery, function (err, res) {
  if (err) {
    console.log("We're having trouble finding the manager list. Check your connection with the database and try again");
    }
  const mgrOptions = res.map(function (mgr) {
    return {
      name: mgr.first_name + " " + mgr.last_name + " - " + mgr.title,
      value: mgr.id,
    };
  });

    inquirer
      .prompt([{
        name: "employee",
        type: "list",
        message: "Which employee?",
        choices: empOptions,
      },
        {
          type: "list",
          name: "role",
          message: "What is the emploee's new role?",
          choices: roleOptions,
        },
        {
          type: "list",
          name: "mmanager",
          message: "What is the emploee's new manager?",
          choices: mgrOptions,
        },
      ])

      .then(function (answer) {
        console.log(answer);
        var query = 
        "UPDATE employees SET role_id = ?, manager_id= ? WHERE employees.id = ?"
        console.log(query);
        connection.query(query, [answer.role, answer.manager, answer.employee.id], function (err, res) {
          if (err) {
          console.log(err);
          }
          console.log("-----------RESULT------------");
          console.log(answer.employee.name + "'s details have now been changed.");
          runSearch();
        });
      });
    })
  });
});
}
