// ADD ROLES //done
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
  
  
  
  
  
  
  return {
    fname: employee.first_name,
    name: employee.first_name + " " + employee.last_name,
    value: {
      id: employee.id,
      name: employee.first_name + " " + employee.last_name,
    },