function index(req,res) {
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('SELECT * FROM empleados', (err, rows) => {
            if (err) {
                console.error('Error al obtener los empleados:', err);
                return res.redirect('/error-page');
            }
            res.render('empleados/index', { empleados: rows });
        });
    });
}


function create(req,res) {
    res.render('empleados/create')
}

function save(req,res) {
    const data= req.body;

    req.getConnection((err,conn)=>{
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('INSERT INTO empleados SET ?', [data], (err, result) => {
            if (err) {
                console.error('Error al crear el empleado:', err);
                return res.redirect('/error-page');
            }
            console.log('Empleado creado exitosamente');
            return res.redirect('/empleados');
        });
    });
}

function edit(req, res) {
    const empleadoId = req.params.id;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('SELECT * FROM empleados WHERE id = ?', [empleadoId], (err, rows) => {
            if (err) {
                console.error('Error al obtener el empleado:', err);
                return res.redirect('/error-page');
            }
            res.render('empleados/edit', { empleado: rows[0] });
        });
    });
}

function update(req, res) {
    const empleadoId = req.params.id;
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).send('Error de conexión a la base de datos');
        }


        delete data.id;

        conn.query('UPDATE empleados SET ? WHERE id = ?', [data, empleadoId], (err, result) => {
            if (err) {
                console.error('Error al actualizar el empleado:', err);
                return res.status(500).send('Error al actualizar el empleado');
            }
            console.log('Empleado actualizado exitosamente');
            return res.redirect('/empleados'); 
        });
    });
}

function remove(req, res) {
    const empleadoId = req.params.id;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('DELETE FROM empleados WHERE id = ?', [empleadoId], (err, result) => {
            if (err) {
                console.error('Error al eliminar el empleado:', err);
                return res.redirect('/error-page');
            }
            console.log('Empleado eliminado exitosamente');
            return res.redirect('/empleados');
        });
    });
}

module.exports={
    index:index,
    create:create,
    save:save,
    edit: edit,
    update: update,
    delete: remove,
}