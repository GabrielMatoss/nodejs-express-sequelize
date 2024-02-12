const dataSource = require('../database/models');

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros () {
    return dataSource[this.model].findAll();
  }

  async pegaUmRegistroPorId(id) {
    const registro = await dataSource[this.model].findByPk(id);

    if (registro === null) {
      return false;
    } 

    return registro;
  }

  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  async atualizaRegistro(dadosAtualizados, id) {
    const listaDeRegistrosAtualizados = await dataSource[this.model].update(dadosAtualizados, {
      where: {id: id}
    });

    if (listaDeRegistrosAtualizados[0] === 0) {
      return false;
    }
    return true;
  }

  async excluiRegistro(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }
}


module.exports = Services;