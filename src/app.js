const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection')
const bodyParser = require ('body-parser');
const mysql = require ('mysql');
//RUTA DE MI FORMULARIO DE EMPLEADO
const empleadoRoutes=require('./routes/empleados')
const clienteRoutes=require('./routes/clientes')
const proveedorRoutes=require('./routes/proveedores')
const productoRoutes=require('./routes/productos')

const app = express();
app.set('port',4000);

// Configurar la carpeta estática
app.use(express.static('static')); // Reemplaza 'static' con el nombre de tu carpeta estática

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

//LAS VISTAS VAN ANTES DE LA CONEXION
app.set('views', __dirname+'/views')
app.engine('hbs',engine({
    extname:'.hbs',
}));
app.set('view engine','hbs');

app.use(myconnection(mysql,{
    host:'localhost',
    user:'root',
    password:'admin',
    port:3306,
    database:'crudnodejs'
},'single'));

app.listen(app.get('port'), () => {
    console.log('Conexion Satisfactoria', app.get('port'))
}); //carga el puerto

//RUTAS
app.use('/',empleadoRoutes);

app.use('/',clienteRoutes);

app.use('/',proveedorRoutes);

app.use('/',productoRoutes);

app.get('/',(req,res) => {
    res.render('menu');
});