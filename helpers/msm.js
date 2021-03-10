const { resolve } = require('path');

require('colors');

const mostrarM = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log('========================='.red);
    console.log(' SELECCIONAR UNA OPCION   '.red);
    console.log('=========================\n'.red);
    console.log(`${'1.'.blue} Crear una tarea`);
    console.log(`${'2.'.blue} Listar tareas`);
    console.log(`${'3.'.blue} Listar tareas completadas`);
    console.log(`${'4.'.blue} Listar tareas pendientes`);
    console.log(`${'5.'.blue} Completar tarea`);
    console.log(`${'6.'.blue} Borrar tarea`);
    console.log(`${'0.'.blue} Salir`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Seleccione una opcion: ', (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${'ENTER'.red} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  mostrarM,
  pausa,
};
