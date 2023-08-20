function index(req,res) {
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('SELECT * FROM productos', (err, rows) => {
            if (err) {
                console.error('Error al obtener los productos:', err);
                return res.redirect('/error-page');
            }
            res.render('productos/index', { productos: rows });
        });
    });
}


function create(req,res) {
    res.render('productos/create')
}

function save(req,res) {
    const data= req.body;

    req.getConnection((err,conn)=>{
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('INSERT INTO productos SET ?', [data], (err, result) => {
            if (err) {
                console.error('Error al crear el producto:', err);
                return res.redirect('/error-page');
            }
            console.log('Producto creado exitosamente');
            return res.redirect('/productos');
        });
    });
}

function edit(req, res) {
    const productoId = req.params.id;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('SELECT * FROM productos WHERE id = ?', [productoId], (err, rows) => {
            if (err) {
                console.error('Error al obtener el producto:', err);
                return res.redirect('/error-page');
            }
            res.render('productos/edit', { producto: rows[0] });
        });
    });
}

function update(req, res) {
    const productoId = req.params.id;
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).send('Error de conexión a la base de datos');
        }

        delete data.id;

        conn.query('UPDATE productos SET ? WHERE id = ?', [data, productoId], (err, result) => {
            if (err) {
                console.error('Error al actualizar el producto:', err);
                return res.status(500).send('Error al actualizar el producto');
            }
            console.log('Producto actualizado exitosamente');
            return res.redirect('/productos'); 
        });
    });
}

function remove(req, res) {
    const productoId = req.params.id;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.redirect('/error-page');
        }

        conn.query('DELETE FROM productos WHERE id = ?', [productoId], (err, result) => {
            if (err) {
                console.error('Error al eliminar el producto:', err);
                return res.redirect('/error-page');
            }
            console.log('Productos eliminado exitosamente');
            return res.redirect('/productos');
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