const fs = require("fs");
const archivo = `./db/data.json`;

const guardarInfo = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};

const leerArchivo = () => {
  if (!fs.existsSync(archivo)) {
    return null;
  }
  const data = fs.readFileSync(archivo, { encoding: "utf-8" });
  const info = JSON.parse(data);

  return info;
};

module.exports = { guardarInfo, leerArchivo };
