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
    if (cancionIndex !== -1) {   // Si se encuentra la canción. ( Si ningún elemento cumple la función dada entonces devuelve -1)
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
    // Obtener la canción actualizada desde el cuerpo de la solicitud.
    const cancionActualizada = req.body;
    // Obtener el ID de la canción a actualizar desde los parámetros de la URL.
    const id = parseInt(req.params.id);
    // Encontrar el índice de la canción basado en su ID.
    const cancionIndex = repertorio.findIndex(c => c.id === id);
    // Verifica si se encontró la canción.
    if (cancionIndex !== -1) {
        // Asigna el ID original a la canción actualizada.
        cancionActualizada.id = id;
        // Actualiza la canción en repertorio con la nueva información.
        repertorio[cancionIndex] = cancionActualizada;
        // Escribe el repertorio actualizado de canciones en el archivo 'canciones.json'.
        fs.writeFileSync('./canciones.json', JSON.stringify(repertorio));
        // Envia la canción actualizada.
        res.send(cancionActualizada);
    }
});