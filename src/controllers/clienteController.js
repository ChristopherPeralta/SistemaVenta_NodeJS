function index(req,res) {
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('SELECT * FROM clientes', (err, rows) => {
            if (err) {
                console.error('Error al obtener los clientes:', err);
                return res.redirect('/error-page');
            }
            res.render('clientes/index', { clientes: rows });
        });
    });
}


function create(req,res) {
    res.render('clientes/create')
}

function save(req,res) {
    const data= req.body;

    req.getConnection((err,conn)=>{
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('INSERT INTO clientes SET ?', [data], (err, result) => {
            if (err) {
                console.error('Error al crear el cliente:', err);
                return res.redirect('/error-page');
            }
            console.log('Cliente creado exitosamente');
            return res.redirect('/clientes');
        });
    });
}

function edit(req, res) {
    const clienteId = req.params.id;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('SELECT * FROM clientes WHERE id = ?', [clienteId], (err, rows) => {
            if (err) {
                console.error('Error al obtener el cliente:', err);
                return res.redirect('/error-page');
            }
            res.render('clientes/edit', { clientes: rows[0] });
        });
    });
}

function update(req, res) {
    const clienteId = req.params.id;
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).send('Error de conexión a la base de datos');
        }

        delete data.id;

        conn.query('UPDATE clientes SET ? WHERE id = ?', [data, clienteId], (err, result) => {
            if (err) {
                console.error('Error al actualizar el cliente:', err);
                return res.status(500).send('Error al actualizar el cliente');
            }
            console.log('Cliente actualizado exitosamente');
            return res.redirect('/clientes');
        });
    });
}

function remove(req, res) {
    const clienteId = req.params.id;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('DELETE FROM clientes WHERE id = ?', [clienteId], (err, result) => {
            if (err) {
                console.error('Error al eliminar el cliente:', err);
                return res.redirect('/error-page');
            }
            console.log('Cliente eliminado exitosamente');
            return res.redirect('/clientes');
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