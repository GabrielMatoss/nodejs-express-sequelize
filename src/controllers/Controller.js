class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      const listaDeRegistro = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistro);
    } catch (erro) {
      return res.status(500).json({erro: erro.message});     
    }
  }

  async pegaUmPorId(req, res) {
    const { id } = req.params;

    try {
      const umRegistro = await this.entidadeService.pegaUmRegistroPorId(Number(id));
      
      if(!umRegistro) {
        return res.status(400).json({message: 'Registro não foi encontrado'});
      }

      return res.status(200).json(umRegistro);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });    
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;

    try {
      const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
      return res.status(200).json(novoRegistroCriado);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });    
    }
  }

  async atualiza(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
      const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number(id));
      const umRegistro = await this.entidadeService.pegaUmRegistroPorId(Number(id));
      

      if (!foiAtualizado && !umRegistro) {
        return res.status(400).json({ message: 'Registro não foi atualizado' });
      }
      return res.status(200).json({ message: 'Atualizado com sucesso', registroModificado: umRegistro });

    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async exclui(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluiRegistro(Number(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });
      
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = Controller;