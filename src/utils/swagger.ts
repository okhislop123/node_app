import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.OAS3Options = {
  definition: {
    info: {
      title: "REST API docs",
      version: "1.0.0",
    },
    openapi: "3.0.0",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/routes.ts",
    "./src/*/*.ts",
    "./src/routes/*/index.ts",
    "./src/schema/*.ts",
    "./src/schema/*/*.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Express, port: number | string) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Docs available at port ${port}`);
};

export default swaggerDocs;
