import axios from 'axios';

// Se mudar a baseURL para o endereço de IP:porta então dará pra acessar a aplicação a partir de um local externo na mesma rede LAN

const api = axios.create({
    baseURL: 'http://192.168.1.11:3333',
});

export default api;