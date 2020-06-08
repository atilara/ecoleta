import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

// permite que todas as url acessem a api
app.use(cors());
// Fará com que o express entenda arquivos JSON
app.use(express.json());
// Usará as rotas localizadas em routes.ts
app.use(routes);
// Indica o local das imagens
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
// validação
app.use(errors());
// indica em que porta a aplicação será executada
app.listen(3333);