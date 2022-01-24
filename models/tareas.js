const Tarea = require("./tarea");

class Tareas {
  _listado = {};
  constructor() {
    this._listado = {};
  }

  get tareaArray() {
    const listado = [];
    Object.keys(this._listado).forEach((keys) => {
      listado.push(this._listado[keys]);
    });

    return listado;
  }

  cargarTareas(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }
  listadoCompleto() {
    console.log();
    this.tareaArray.forEach((tarea, i) => {
      const index = `${i + 1}.`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;
      console.log(`${index} ${desc} :: ${estado} `);
    });
    console.log();

    /*  this.tareaArray.forEach((tarea, i) => {
      tarea.completadoEn === null
        ? console.log(
            `${i + 1}`.cyan + `. ${tarea.desc}`.white + " :: Pendiente".red
          )
        : console.log(
            `${i + 1}`.cyan + `. ${tarea.desc}`.white + " :: Completado".green
          );
    }); */
  }
  listadoPendientesCompletado(completado = true) {
    let contador = 0;
    this.tareaArray.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;
      if (completado) {
        if (completadoEn) {
          contador += 1;
          console.log(
            `${(contador + ".").green} ${desc.white} :: ${completadoEn.green} `
          );
        }
        //muestro las completadas
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc.white} :: ${estado} `);
        }
      }
    });
  }
  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });
    this.tareaArray.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
