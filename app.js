require("colors");
const {
  guardarInfo,
  leerArchivo,
  listadoCompleto,
} = require("./helpers/manejoDeInfo");
const {
  inquireMenu,
  pausa,
  leerInput,
  listadoTareaBorrar,
  confirmar,
  listadoChecklist,
} = require("./helpers/inquired");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerArchivo();

  if (tareasDB) {
    tareas.cargarTareas(tareasDB);
  }

  do {
    opt = await inquireMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion : ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listadoPendientesCompletado(true);
        break;
      case "4":
        tareas.listadoPendientesCompletado(false);
        break;
      case "5":
        const ids = await listadoChecklist(tareas.tareaArray);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareaBorrar(tareas.tareaArray);
        if (id !== "0") {
          const ok = await confirmar("¿Estas seguro?");
          if (ok === true) {
            tareas.borrarTarea(id);
            console.log("Tarea Borrada");
          }
        }
        break;
    }

    guardarInfo(tareas.tareaArray);
    await pausa();
  } while (opt !== "0");

  // pausa();
};

main();
