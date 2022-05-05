const express = require("express");

const app = express();
const jsonParser = express.json();

const port = process.env.PORT || 3000;
const emplistRouter = require("./emplistr");


app.get('/', (req, res) => {
  res.json({'message': 'ok'});
});

app.get("/api/employees", function(req, res){
       
    const content1 = '[{"pernr":"100","nachn":"Иван","vorna":"Федотов","birthdate":"13.03.1990"}';
    const content2 = ',{"pernr":"200","nachn":"Игорь","vorna":"Семенов","birthdate":"01.01.1971"}';
    const content3 = ',{"pernr":"300","nachn":"Федор","vorna":"Федотов","birthdate":"13.03.1990"}';
    const content4 = ',{"pernr":"400","nachn":"Семен","vorna":"Семенов","birthdate":"01.01.1971"}';
    const content5 = ',{"pernr":"500","nachn":"Павел","vorna":"Павлов","birthdate":"21.01.1972"}';
    const content6 = ',{"pernr":"600","nachn":"Светлана","vorna":"Светличная","birthdate":"08.03.1989"}]';
    const content = content1 + content2 + content3 + content4 + content5 + content6;
    const employees = JSON.parse(content);
    res.send(employees);
});

//app.use('/api/employees', emplistRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
