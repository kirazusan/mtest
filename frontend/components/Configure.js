

import React, { useEffect } from 'react';

const Configure = ({ app, env }) => {
  useEffect(() => {
    const configureRequestPipeline = async () => {
      if (env === 'Development') {
        app.use(async (context, next) => {
          await context.response.writeAsync('Hello World!');
          await next();
        });
      } else {
        app.use(async (context, next) => {
          await context.response.writeAsync('Hello World!');
          await next();
        });
      }
    };

    configureRequestPipeline();
  }, [app, env]);

  return <div />;
};

export default Configure;