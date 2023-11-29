const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

// Creamos la conexion a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "vt_argl",
  password: "admin",
  database: "Veterinaria"
});

//Metodo listar
router.get('/', (req, res) => {
    db.query("SELECT * FROM adopciones", (error, resultado) => {
      error ? console.log("Error: ", error) : res.send(resultado);
    });
  });
  
router.post("/", (req, res) =>{
    const nombreAdoptante= req.body.nombreAdoptante;
    const telefono = req.body.telefono
    const email = req.body.email;
    const domicilio = req.body.domicilio;
    const mascota = req.body.mascota;
    const caracteristicas= req.body.caracteristicas;
    const interesAdoptar = req.body.interesAdoptar;

    db.query(
    "INSERT INTO adopciones(nombre_adoptante, telefono, email, domicilio, mascota, caracteristicas, interes_adoptar) VALUES(?, ?, ?, ?, ?, ?, ?); ",
    [
        nombreAdoptante,
        telefono,
        email,
        domicilio,
        mascota,
        caracteristicas,
        interesAdoptar
    ],
    (error, resultado) =>{
        error? console.log("Error: ", error): res.send("Adopcion registrada con exito");
    }
  );
});

router.put("/", (req, res) =>{
    const id = req.body.id;
    const nombreAdoptante= req.body.nombreAdoptante;
    const telefono = req.body.telefono
    const email = req.body.email;
    const domicilio = req.body.domicilio;
    const mascota = req.body.mascota;
    const caracteristicas= req.body.caracteristicas;
    const interesAdoptar = req.body.interesAdoptar;

    db.query(
        "UPDATE adopciones SET nombre_adoptante=?, telefono=?, email=?, domicilio=?, mascota=?, caracteristicas=?, interes_adoptar=? WHERE id=?",
        [
            nombreAdoptante,
            telefono,
            email,
            domicilio,
            mascota,
            caracteristicas,
            interesAdoptar,
            id
        ],
        (error, resultado)=>{
            error ? console.log("Error: ", error): res.send("Adopción actualizada con exito");
        }
    )
})

router.delete("/:id", (req, res) => {
    const id= req.params.id;

    db.query("DELETE FROM adopciones WHERE id=?", id, (error, resultado)=>{
        error ? console.log("Error: ", error): res.send(resultado);
    });
});

//Inicializar servidor
app.listen(3005, ()=> console.log("Servidor funcionando en el puerto 3005"));