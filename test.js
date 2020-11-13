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
  
  
  
  
  
  
  