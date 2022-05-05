const express = require('express');
const router = express.Router();
const fs = require("fs");
const filePath = "emplist.json";
const jsonParser = express.json();


/* GET employees list. */

router.get("/api/employees", function(req, res){
       
    const content = fs.readFileSync(filePath,"utf8");
    const employees = JSON.parse(content);
    res.send(employees);
});
// получение одного сотрудника по pernr
router.get("/api/employees/:pernr", function(req, res){
       
    const pernr = req.params.pernr; // получаем pernr
    const content = fs.readFileSync(filePath, "utf8");
    const employees = JSON.parse(content);
    let employee = null;
    var pos_eq = pernr.indexOf("=") + 1;
    var id = pernr.substring(pos_eq);
    // находим в массиве пользователя по pern
    for(var i=0; i<employees.length; i++){
        if(employees[i].pernr==id){
            employee = employees[i];
            break;
        }
    }
    // отправляем пользователя
    if(employee){
        res.send(employee);
    }
    else{
        res.status(404).send();
    }
});
// получение отправленных данных
router.post("/api/employees/", jsonParser, function (req, res) {
      
    if(!req.body) return res.sendStatus(400);
    
    const employeePernr = req.body.pernr;  
    const employeeNachn = req.body.nachn;
    const employeeVorna = req.body.vorna;
    const employeeBirth = req.body.birthdate;
    let employee = {pernr: employeePernr, nachn: employeeNachn, vorna: employeeVorna, birthdate: employeeBirth};
      
    let data = fs.readFileSync(filePath, "utf8");
    let employees = JSON.parse(data);
      
    // добавляем сотрудника в массив
    employees.push(employee);
    data = JSON.stringify(employees);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("emplist.json", data);
    res.send(employees);
});

module.exports = router;