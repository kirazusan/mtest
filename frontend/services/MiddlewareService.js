

package frontend.services;

import { HttpContext } from './HttpContext';
import { MiddlewareDelegate } from './MiddlewareDelegate';

class MiddlewareService {
    async handleMiddlewareDelegate(httpContext) {
        const middlewareDelegate = new MiddlewareDelegate();
        const response = await middlewareDelegate.handle(httpContext);
        httpContext.res.write(response);
        await httpContext.res.end();
        return response;
    }
}

export default MiddlewareService;