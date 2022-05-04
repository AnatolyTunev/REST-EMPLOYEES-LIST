const express = require("express");
const fs = require("fs");
    
const app = express();
const jsonParser = express.json();
  
app.use(express.static(__dirname + "/public"));
  
const filePath = "emplist.json";
app.get("/api/employees", function(req, res){
       
    const content = fs.readFileSync(filePath,"utf8");
    const employees = JSON.parse(content);
    res.send(employees);
});
// получение одного сотрудника по pernr
app.get("/api/employees/:pernr", function(req, res){
       
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
app.post("/api/employees/", jsonParser, function (req, res) {
      
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
   
app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});