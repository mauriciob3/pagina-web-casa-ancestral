const express = require("express");
const morgan = require("morgan");
const database = require("./database");
const cors = require("cors");

// Configuración inicial
const app = express();
app.set("port", 4000);
app.listen(app.get("port"), () => {
  console.log("Escuchando comunicaciones en el puerto " + app.get("port"));
});

// Middlewares
app.use(cors({
  origin: ["http://127.0.0.1:5501", "http://127.0.0.1:5500"]
}));
app.use(morgan("dev"));
app.use(express.json());

// Rutas
// Obtener todos los productos
app.get("/productos", async (req, res) => {
  let connection;
  try {
    // Obtener la conexión desde el módulo database
    connection = await database.getConnection();
    console.log("Conexión establecida correctamente.");

    // Realizar la consulta SQL para obtener todos los productos
    const result = await connection.query("SELECT * FROM productos_casa_ancestral.producto");
    console.log("Resultados de la consulta:", result);

    // Enviar los resultados como respuesta
    res.json(result);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
});


app.post("/carrito/comprar", async (req, res) => {
  if(req.body && req.body.length > 0){
    return res.sendStatus(200);
  }
  res.sendStatus(400)
})

