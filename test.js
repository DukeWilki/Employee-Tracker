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
          console.log(answer.remove.name + " is no longer with us.");
          runSearch();
        });
      });
  });
}