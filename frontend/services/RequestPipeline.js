

import { NextFunction, Request, Response } from 'express';

class RequestPipeline {
    configure(app) {
        app.use((req: Request, res: Response, next: NextFunction) => {
            // Middleware delegate will be executed for every incoming request
            next();
        });
    }
}

export default RequestPipeline;