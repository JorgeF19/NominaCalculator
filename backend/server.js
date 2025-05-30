const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/nomina");

// Esquema y modelo
const RegistroSchema = new mongoose.Schema({
  fecha: String,
  total: String,
});

const Registro = mongoose.model("Registro", RegistroSchema);

// Endpoints
app.get("/registros", async (req, res) => {
  const registros = await Registro.find();
  res.json(registros);
});

app.post("/registros", async (req, res) => {
  const registro = new Registro(req.body);
  await registro.save();
  res.json(registro);
});

app.delete("/registros/:id", async (req, res) => {
  await Registro.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(3001, () => {
  console.log("Servidor backend corriendo en http://localhost:3001");
});
