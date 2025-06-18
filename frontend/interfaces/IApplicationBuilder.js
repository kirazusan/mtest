

// frontend/interfaces/IApplicationBuilder.js

class Middleware {
  constructor() {}
}

class ApplicationBuilder {
  constructor() {
    this.middleware = [];
  }

  use(middleware) {
    this.middleware.push(middleware);
    return this;
  }

  build() {
    // Implement building the application
  }
}

class IApplicationBuilder {
  constructor() {
    this.ApplicationBuilder = new ApplicationBuilder();
  }

  use(middleware) {
    this.ApplicationBuilder.use(middleware);
    return this;
  }

  build() {
    this.ApplicationBuilder.build();
  }
}