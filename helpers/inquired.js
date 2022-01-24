const inquired = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1".brightGreen}.Crear tarea`,
      },
      {
        value: "2",
        name: `${"2".brightGreen}.Listar tareas`,
      },
      {
        value: "3",
        name: `${"3".brightGreen}.Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4".brightGreen}.Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5".brightGreen}.Completar tareas`,
      },
      {
        value: "6",
        name: `${"6".brightGreen}.Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0".brightGreen}.Salir`,
      },
    ],
  },
];

const inquireMenu = async () => {
  //console.clear();
  console.log("===============================================".green);
  console.log("             Seleccione una opcion             ".white);
  console.log("===============================================\n".green);

  const { option } = await inquired.prompt(preguntas);
  return option;
};

const pausa = async () => {
  const continuar = [
    {
      type: "input",
      name: "seguir",
      message: `Presione ${"ENTER".blue} para continuar\n `,
    },
  ];
  await inquired.prompt(continuar);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquired.prompt(question);
  return desc;
};

const listadoTareaBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const index = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${index} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + "Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquired.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const pregunta = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquired.prompt(pregunta);
  return ok;
};

const listadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const index = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${index} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquired.prompt(preguntas);
  return ids;
};
module.exports = {
  inquireMenu,
  pausa,
  leerInput,
  listadoTareaBorrar,
  confirmar,
  listadoChecklist,
};
