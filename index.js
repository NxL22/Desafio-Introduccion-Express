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
*/

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




