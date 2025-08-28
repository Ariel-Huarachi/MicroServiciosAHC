const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { resultado: null, a: '', b: '', operacion: 'sumar' });
});


app.post('/calcular', (req, res) => {
  const { a, b, operacion } = req.body;
  const x = parseFloat(a);
  const y = parseFloat(b);
  let resultado = 'Operación inválida';

  if (!isNaN(x) && !isNaN(y)) {
    switch (operacion) {
      case 'sumar': resultado = x + y; break;
      case 'restar': resultado = x - y; break;
      case 'multiplicar': resultado = x * y; break;
      case 'dividir': resultado = y !== 0 ? x / y : 'División por cero'; break;
    }
  } else {
    resultado = 'Entradas inválidas';
  }

  res.render('index', { resultado, a, b, operacion });
});

app.post('/calcular', (req, res) => {
  const { a, b, operacion } = req.body;
  const x = parseFloat(a);
  const y = parseFloat(b);
  let resultado = 'Operación inválida';

  if (!isNaN(x) && !isNaN(y)) {
    switch (operacion) {
      case 'sumar': resultado = x + y; break;
      case 'restar': resultado = x - y; break;
      case 'multiplicar': resultado = x * y; break;
      case 'dividir': resultado = y !== 0 ? x / y : 'División por cero'; break;
    }
  } else {
    resultado = 'Entradas inválidas';
  }

  res.render('index', { resultado, a, b, operacion });
});


app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
