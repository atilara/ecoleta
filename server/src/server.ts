import express from 'express';

const app = express();

// Fará com que o express entenda arquivos JSON
app.use(express.json());

// função get recebe os parâmetros que indicam a rota e a função que é executada nessa rota, que também contém dois parâmetros
// request: obter dados da requisição
// response: devolver a respota para quem consumir os dados (navegador, etc)
const users = [
    'Átila',
    'Diego',
    'Robson',
    'Adriano'
];

app.get('/users', (request, response) => {
    const search = String(request.query.search);

    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;
    
    return response.json(filteredUsers);
});

// dois pontos significa o recebimento de um parâmetro
app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);
    
    const user = users[id];

    return response.json(user);
});

app.post('/users', (request, response) => {
    const data = request.body;
    
    const user = {
        name: data.name,
        email: data.email
    };

    response.json(user);
});

// indica em que porta a aplicação será executada
app.listen(3333);