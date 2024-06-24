import { __dirname } from '../root.js';
import { join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';

const app = express();
app.use('/static', express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'src', 'views'));
app.use(compression({
    level:6
}));



// Routes
import { rootRouter } from './routes/root.routes.js';
import { userRouter } from './routes/user.routes.js';

app.use('/', rootRouter);
app.use('/user', userRouter);

export { app };
