//https://economia.awesomeapi.com.br/json/all/EUR-BRL

import axios from "axios";

//ROTA PARA BUSCAR EUR>BRL: all/EUR-BRL

const api = axios.create({
    baseURL:'https://economia.awesomeapi.com.br/json/'
});

export default api;