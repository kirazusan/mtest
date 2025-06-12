

package backend;

import express from 'express';
import helloWorldRoute from './routes/helloWorldRoute';

const app = express();

app.use('/hello-world', helloWorldRoute);

export default app;