/*
    Neste código é carregado o pacote do Express, sendo posteriormente instanciado em uma variável chamada express. Em seguida é instanciado um objeto do Express criado para lidar especificamente com o roteamento do navegador, neste caso, express.Router().
*/
const express = require('express');
const router = express.Router();

const packageJson = require('../../package.json');

/*
    De acordo com o que está definido em app.js, quando o usuário entrar na página inicial, INDEX, será enviada uma requisição GET pelo navegador. Em seguida, o servidor, ouvindo essa requisição, retornará uma resposta, com o código 200 que significa que tudo deu certo, e será mostrado um arquivo json com um título e a versão.
*/
router.get('/', (req, res) => {
    res.status(200).send({
        title: 'FULL Plans API',
        version: packageJson.version
    });
});

module.exports = router;