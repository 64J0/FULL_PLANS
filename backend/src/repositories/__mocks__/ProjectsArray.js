const ProjectsArray = [
  {
    _id: "1",
    arquivado: false,
    cliente: "EMBRAER",
    nomeProjeto: "NOVO AILERON",
    disciplinaMestre: "MECÂNICA ESTRUTURAL",
    numPedido: "123456",
    responsavel: "BARACK OBAMA",
    tipoEngenharia: "D",
    status: "AGUARDANDO LEVANTAMENTO DE CAMPO",
    infoProjetos: [
      {
        statusPorcentagem: 25,
        _id: "11",
        dataInicio: "2020-01-01",
        dataFinal: "2020-02-01",
        linkDesenho: "https://google.com",
        tipoEngenharia: "A",
        disciplinaDesenho: "MECÂNICA",
        revisão: "3",
        numFull: "123456A",
        numCliente: "333A",
        formato: "A0",
        descricao: "DESENHO BÁSICO DO SUPORTE DA LONGARINA",
        projetistaDesenho: "VINÍCIUS GAJO",
        verificadorDesenho: "ELON MUSK",
        comentarioDesenho: "TESTE DE COMENTÁRIO"
      },
      {
        statusPorcentagem: 75,
        _id: "12",
        dataInicio: "2020-01-01",
        dataFinal: "2020-02-01",
        linkDesenho: "https://google.com",
        tipoEngenharia: "A",
        disciplinaDesenho: "DESENHO",
        revisão: "2",
        numFull: "123456B",
        numCliente: "333B",
        formato: "A0",
        descricao: "DESENHO DE CONJUNTO",
        projetistaDesenho: "VINÍCIUS GAJO",
        verificadorDesenho: "ELON MUSK",
        comentarioDesenho: "TESTE DE COMENTÁRIO 2"
      }
    ]
  },

  {
    _id: "2",
    arquivado: false,
    cliente: "FIAT",
    nomeProjeto: "EMBREAGEM",
    disciplinaMestre: "DESIGN MECÂNICO",
    numPedido: "9090",
    responsavel: "DONALD TRUMP",
    tipoEngenharia: "C",
    status: "HOMOLOGAÇÃO",
    infoProjetos: [
      {
        statusPorcentagem: 75,
        _id: "13",
        dataInicio: "2020-01-01",
        dataFinal: "2020-02-01",
        linkDesenho: "https://google.com",
        tipoEngenharia: "A",
        disciplinaDesenho: "MECÂNICA",
        revisão: "3",
        numFull: "9090A",
        numCliente: "666A",
        formato: "A0",
        descricao: "MODELAGEM COMPUTACIONAL",
        projetistaDesenho: "VINÍCIUS GAJO",
        verificadorDesenho: "JAIR BOLSONARO",
        comentarioDesenho: "COMENTÁRIO A"
      },
      {
        statusPorcentagem: 50,
        _id: "14",
        dataInicio: "2020-01-01",
        dataFinal: "2020-02-01",
        linkDesenho: "https://google.com",
        tipoEngenharia: "A",
        disciplinaDesenho: "DESENHO",
        revisão: "2",
        numFull: "9090B",
        numCliente: "666B",
        formato: "A0",
        descricao: "DESENHO DETALHADO",
        projetistaDesenho: "VINÍCIUS GAJO",
        verificadorDesenho: "JAIR BOLSONARO",
        comentarioDesenho: "COMENTÁRIO B"
      }
    ]
  }
];

module.exports = ProjectsArray;