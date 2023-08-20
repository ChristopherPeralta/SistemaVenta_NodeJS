function index(req,res) {
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('SELECT * FROM proveedores', (err, rows) => {
            if (err) {
                console.error('Error al obtener los proveedores:', err);
                return res.redirect('/error-page');
            }
            res.render('proveedores/index', { proveedores: rows });
        });
    });
}


function create(req,res) {
    res.render('proveedores/create')
}

function save(req,res) {
    const data= req.body;

    req.getConnection((err,conn)=>{
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('INSERT INTO proveedores SET ?', [data], (err, result) => {
            if (err) {
                console.error('Error al crear el proveedor:', err);
                return res.redirect('/error-page');
            }
            console.log('Proveedor creado exitosamente');
            return res.redirect('/proveedores');
        });
    });
}

function edit(req, res) {
    const proveedorId = req.params.id;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('SELECT * FROM proveedores WHERE id = ?', [proveedorId], (err, rows) => {
            if (err) {
                console.error('Error al obtener el proveedor:', err);
                return res.redirect('/error-page');
            }
            res.render('proveedores/edit', { proveedor: rows[0] });
        });
    });
}

function update(req, res) {
    const proveedorId = req.params.id;
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).send('Error de conexión a la base de datos');
        }

     
        delete data.id;

        conn.query('UPDATE proveedores SET ? WHERE id = ?', [data, proveedorId], (err, result) => {
            if (err) {
                console.error('Error al actualizar el proveedor:', err);
                return res.status(500).send('Error al actualizar el proveedor');
            }
            console.log('Proveedor actualizado exitosamente');
            return res.redirect('/proveedores'); 
        });
    });
}

function remove(req, res) {
    const proveedorId = req.params.id;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('DELETE FROM proveedores WHERE id = ?', [proveedorId], (err, result) => {
            if (err) {
                console.error('Error al eliminar el proveedor:', err);
                return res.redirect('/error-page');
            }
            console.log('Proveedor eliminado exitosamente');
            return res.redirect('/proveedores');
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