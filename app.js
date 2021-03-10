require('colors');
const { guardaBD, leerBD } = require('./helpers/guardar');
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListado,
} = require('./helpers/inq');
//const Tarea = require('./model/tarea');
const Tareas = require('./model/tareas');

//console.clear();

const main = async () => {
  let opt = '';
  const tareas = new Tareas();
  const tareasBD = leerBD();
  if (tareasBD) {
    //cargar tareas
    tareas.cargarTareasFromArray(tareasBD);
  }
  do {
    opt = await inquirerMenu();
    //console.log({ opt });
    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion: ');
        tareas.crearTarea(desc);
        break;
      case '2':
        tareas.listadoCompleto();
        break;
      case '3':
        tareas.listarPendientesCompletadas(true);
        break;
      case '4':
        tareas.listarPendientesCompletadas(false);
        break;
      case '5':
        const ids = await mostrarListado(tareas.listadoArr);
        tareas.toggleCompl(ids);
        break;
      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== '0') {
          const sino = await confirmar('Seguro que desea borrar');
          //console.log({ id });
          if (sino) {
            tareas.borrarTarea(id);
            console.log('Tarea elimida con exito!');
          }
        }
        break;
    }

    guardaBD(tareas.listadoArr);
    //if (opt === '0')

    //const tarea = new Tarea('Comprar comida');
    //tareas._listado[tarea.id] = tarea;
    //console.log(tareas);
    await pausa();
  } while (opt !== '0');

  //pausa();
};

main();
