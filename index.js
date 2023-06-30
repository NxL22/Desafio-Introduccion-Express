const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Levanto el servidor.
app.listen(3000, console.log(`Servidor en funcionamiento en el puerto: ${port}`))

// Middleware:
app.use(express.json());

// Ruta GET para devolver la página web, "aqui uni el back con el front".
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


// Ruta Get para poder ver las canciones en la APP. 
app.get("/canciones", (req, res) => {
    const leerCancion = JSON.parse(fs.readFileSync("canciones.json"))
    res.json(leerCancion)
})


// Agregar canciones:
app.post("/canciones", (req, res) => {
    // 1. Almacenando en una constante llamada producto el payload de la consulta(req.body).
    const cancion = req.body;
    // 2. Creando una constante productos que almacena el contenido de productos.json parseado.
    const canciones = JSON.parse(fs.readFileSync("canciones.json", "utf8"));
    // 3. Agregando la cancion recibida en la consulta al arreglo de canciones.
    canciones.push(cancion);
    // 4. Sobrescribiendo canciones.json por el nuevo arreglo de canciones que incluye la cancion recibida.
    fs.writeFileSync("canciones.json", JSON.stringify(canciones));
    // 5. Mensajito!
    res.send("Canción agregada con éxito! :)");
});


//Borrar canciones:
app.delete('/canciones/:id', (req, res) => {
    const repertorio = JSON.parse(fs.readFileSync('./canciones.json', 'utf-8'));
    // Lee el contenido del archivo 'canciones.json'
    const id = parseInt(req.params.id);
    // Obtiene el ID de la canción a eliminar
    const cancionIndex = repertorio.findIndex(c => c.id === id);
    // Encuentra el índice de la canción con el ID especificado
    if (cancionIndex !== -1) {   // Si se encuentra la canción
        repertorio.splice(cancionIndex, 1);  //  Elimina la canción del array
        fs.writeFileSync('./canciones.json', JSON.stringify(repertorio));
        // Escribe los cambios en el archivo JSON
        res.send('Canción eliminada');
        // Envía una respuesta exitosa
    }
});


// Editar canciones:
app.put('/canciones/:id', (req, res) => {
    // Lee el repertorio de canciones.
    const repertorio = JSON.parse(fs.readFileSync('./canciones.json', 'utf-8'));
    // Obtener la cancion actualizada desde el cuerpo de la solicitud.
    const cancionActualizada = req.body;
    // Obtener el ID de la canción a actualizar desde los parametros de la URL.
    const id = parseInt(req.params.id);
    // Encontrar el indice de la cancion basado en su ID.
    const cancionIndex = repertorio.findIndex(c => c.id === id);
    
    // Verifica si se encontró la canción.
    if (cancionIndex !== -1) {
        // Actualiza la cancion en repertorio con la nueva información.
        repertorio[cancionIndex] = cancionActualizada;
        // Escribe el repertorio actualizado de canciones en el archivo 'canciones.json'.
        fs.writeFileSync('./canciones.json', JSON.stringify(repertorio));
        // Envia la canción actualizada.
        res.send(cancionActualizada);
    }
});















/*
app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params // Guarda el ID
    console.log('id', id)
    const canciones = JSON.parse(fs.readFileSync('canciones.json')) // Lee y conviertelo
    const idCanciones = canciones.findIndex(p => p.id == id) // Devuelve el primero que cumple la funcion (lo encuentra).
    canciones.splice(idCanciones, 1) // Borra UNO
    fs.writeFileSync('canciones.json', json.stringify(canciones))
    res.send('Canción eliminada correctamente') // Mensajito
})
*/

/*
app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params // Guarda el ID
    console.log('id', id)
    const canciones = JSON.parse(fs.readFileSync('canciones.json')) // Lee y conviertelo
    const idCanciones = canciones.findIndex(p => p.id == id) // Devuelve el primero que cumple la funcion (lo encuentra).
    canciones.splice(idCanciones, 1) // Borra UNO
    fs.writeFileSync('canciones.json', json.stringify(canciones))
    res.send('Canción eliminada correctamente') // Mensajito
})
*/


//Para eliminar un elemento de un arreglo en Node.js, se puede usar el método `splice()`. Este método cambia el contenido del arreglo eliminando elementos existentes y/o agregando nuevos elementos. El primer parámetro de `splice()` es el índice del elemento que se desea eliminar y el segundo parámetro es la cantidad de elementos que se desean eliminar. En este caso, se desea eliminar solo un elemento por lo que se pasa como segundo parámetro el número 1.




/*
const cancion = req.body;
    if(cancion){
        try {
            const canciones = JSON.parse(fs.readFileSync("canciones.json", "utf8"));
            // 3
            canciones.push(cancion);
            // 4
            fs.writeFileSync("canciones.json", JSON.stringify(canciones));
            // 5
            res.send("Canción agregada con éxito! :)");
        } catch (error) {
            console.log(error)
        }
    }
*/



/*
app.get("/canciones", (req, res) => {
const canciones = JSON.parse(fs.readFileSync("canciones.json"))
res.json(canciones)
})


// Ruta POST para agregar una canción al repertorio
app.post('/canciones', (req, res) => {
    const nuevaCancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('canciones.json'));
    nuevaCancion.id = canciones.length + 1;
    canciones.push(nuevaCancion);
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
    res.send('Canción agregada correctamente');
});


app.post("/canciones", (req, res) => {
    // 1
    const cancion = req.body;
    // 2
    const canciones = JSON.parse(fs.readFileSync("canciones.json", "utf8"));
    // 3
    canciones.push(cancion);
    // 4
    fs.writeFileSync("canciones.json", JSON.stringify(canciones));
    // 5
    res.send("Canción agregada con éxito! :)");
});
*/






/*
app.put('/canciones/:id')
*/





//**HECHO EN CLASE, BUSCA ALTERNATIVAS***/
/*
app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params // Guarda el ID
    console.log('id', id)
    const canciones = JSON.parse(fs.readFileSync('canciones.json')) // Lee y conviertelo
    const idCanciones = canciones.findIndex(p => p.id == id) // Devuelve el primero que cumple la funcion (lo encuentra).
    canciones.splice(index, 1) // Borra UNO
    fs.writeFileSync('canciones.json', json.stringify(canciones))
    res.send('Canción eliminada correctamente') // Mensajito
})
*/







/*
*****************************************************************************************
// Ruta GET para obtener todas las canciones del repertorio
app.get('/canciones', (req, res) => {
    fs.readFile('repertorio.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al leer el archivo del repertorio' });
            return;
        }

        const repertorio = JSON.parse(data);
        res.json(repertorio);
    });
});
*/




