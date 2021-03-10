const Tarea = require('./tarea');

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }
  constructor() {
    this._listado = {};
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completado } = tarea;
      const estado = completado ? 'Completado'.blue : 'Pendiente'.green;
      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let conta = 0;
    this.listadoArr.forEach((tarea) => {
      const { desc, completado } = tarea;
      const estado = completado ? 'Completado'.blue : 'Pendiente'.green;
      if (completadas) {
        //mostrar compleatadas
        if (completado) {
          conta += 1;
          console.log(`${(conta + '.').green} ${desc} :: ${completado.green}`);
        }
      } else {
        if (!completado) {
          conta += 1;
          console.log(`${(conta + '.').green} ${desc} :: ${estado}`);
        }
      }
    });
  }
  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }
  toggleCompl(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completado) {
        tarea.completado = new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completado = null;
      }
    });
  }
}

module.exports = Tareas;
