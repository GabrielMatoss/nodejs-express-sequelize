const { Op } = require('sequelize');

const Controller = require('./Controller.js');
const CursoServices = require('../services/CursoServices.js');

const cursoServices = new CursoServices();

class CursoController extends Controller {
  constructor() {
    super(cursoServices);
  }

  async pegaCursos(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    //se existir param, cria uma propriedade vazia {}
    data_inicial || data_final ? where.data_inicio = {} : null;
    //se existir algum valor em data_inicial, adiciona propriedade com valor
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    //se existir algum valor em data_final, adiciona propriedade com valor
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    try {
      const listaCursos = await cursoServices.pegaTodosOsRegistros(where);
      res.status(200).json(listaCursos);
    } catch (erro) {
      res.status(500).json({erro: erro.message});
    }
  }
}

module.exports = CursoController;