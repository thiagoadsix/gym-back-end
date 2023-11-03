const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

function createDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function installPackages(appDir) {
  exec(`cd ${appDir} && yarn`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao instalar pacotes: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Erro ao instalar pacotes: ${stderr}`);
      return;
    }
    console.log(`Pacotes instalados com sucesso!\n${stdout}`);
  });
}

function createApp(appName) {
  const appDir = path.join(__dirname, "../apps", appName);

  // Criar diretório do app
  createDirectory(appDir);

  // Criar package.json
  const packageContent = {
    name: appName,
    version: "0.0.0",
    private: true,
    scripts: {
      build: "tsc",
      start: "node dist/src/index.js",
      dev: "nodemon",
      typeorm: "typeorm-ts-node-commonjs",
      migrate: "node migrate.js",
      "db:push":
        "rm -rf dist && yarn build && yarn typeorm migration:run -d utils/data-source.ts",
      "db:down":
        "rm -rf dist && yarn build && yarn typeorm migration:revert -d utils/data-source.ts",
    },
    keywords: ["node", "typescript", appName],
    author: "Thiago Andrade Silva",
    license: "ISC",
    dependencies: {
      "@types/jsonwebtoken": "^9.0.4",
      bcryptjs: "^2.4.3",
      config: "^3.3.9",
      "cookie-parser": "^1.4.6",
      cors: "^2.8.5",
      database: "*",
      "date-fns": "^2.30.0",
      dotenv: "^16.3.1",
      envalid: "^8.0.0",
      errors: "*",
      express: "^4.18.2",
      jsonwebtoken: "^9.0.2",
      pg: "^8.11.3",
      "redis-service": "*",
      "reflect-metadata": "^0.1.13",
      typeorm: "^0.3.17",
      typescript: "^5.2.2",
      zod: "^3.22.4",
    },
    devDependencies: {
      "@types/bcryptjs": "^2.4.5",
      "@types/config": "^3.3.2",
      "@types/cookie-parser": "^1.4.5",
      "@types/cors": "^2.8.15",
      "@types/express": "^4.17.20",
      "@types/morgan": "^1.9.7",
      "@types/node": "^20.8.9",
      morgan: "^1.10.0",
      nodemon: "^3.0.1",
      "ts-node": "^10.9.1",
    },
  };
  fs.writeFileSync(
    path.join(appDir, "package.json"),
    JSON.stringify(packageContent, null, 2)
  );

  // Criar migrate.js
  const migrateContent = `
const { exec } = require("child_process");

const nameArg = process.argv[2];
if (!nameArg) {
  console.error("Erro: Um nome de migration é necessário.");
  process.exit(1);
}

const command = \`rm -rf dist && yarn build && yarn typeorm migration:generate ./src/migrations/\${nameArg} -d ./utils/data-source.ts\`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(\`Erro: \${error.message}\`);
    return;
  }
  if (stderr) {
    console.error(\`Erro: \${stderr}\`);
    return;
  }
  console.log(\`Output: \${stdout}\`);
});
`;
  fs.writeFileSync(path.join(appDir, "migrate.js"), migrateContent);

  // Criar example.env
  fs.writeFileSync(path.join(appDir, "example.env"), "PORT=");

  // Criar nodemon.json
  const nodemonContent = {
    watch: ["src", ".env"],
    ext: "ts",
    exec: "ts-node src/index.ts",
    ignore: ["src/**/*.spec.ts"],
  };
  fs.writeFileSync(
    path.join(appDir, "nodemon.json"),
    JSON.stringify(nodemonContent, null, 2)
  );

  // Criar tsconfig.json (Você pode ajustar o conteúdo conforme necessário)
  const tsconfigContent = {
    compilerOptions: {
      target: "ES6",
      module: "CommonJS",
      strict: true,
      esModuleInterop: true,
    },
  };
  fs.writeFileSync(
    path.join(appDir, "tsconfig.json"),
    JSON.stringify(tsconfigContent, null, 2)
  );

  // Criar diretórios
  [
    "config",
    "utils",
    "src",
    "src/controllers",
    "src/middlewares",
    "src/migrations",
    "src/routes",
    "src/schemas",
    "src/services",
  ].forEach((dir) => {
    createDirectory(path.join(appDir, dir));
  });

  const contentDataSource = `
  require("dotenv").config();
  import "reflect-metadata";
  import { DataSource } from "typeorm";
  import config from "config";
  import { User, Student } from "database";
  
  const postgresConfig = config.get<{
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  }>("postgresConfig");
  
  export const AppDataSource = new DataSource({
    ...postgresConfig,
    type: "postgres",
    synchronize: false,
    logging: false,
    entities: [User, Student],
    migrations: ["src/migrations/**/*{.ts,.js}"],
    subscribers: ["src/subscribers/**/*{.ts,.js}"],
  });
  `;

  const filePath = path.join(appDir, "utils", "data-source.ts");
  fs.writeFileSync(filePath, contentDataSource.trim());

  const contentValidateEnv = `
import { cleanEnv, port, str } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
    JWT_ACCESS_TOKEN_PRIVATE_KEY: str(),
    JWT_ACCESS_TOKEN_PUBLIC_KEY: str(),
    JWT_REFRESH_TOKEN_PRIVATE_KEY: str(),
    JWT_REFRESH_TOKEN_PUBLIC_KEY: str(),
  });
};

export default validateEnv;
`;

  const filePathValidateEnv = path.join(appDir, "utils", "validate-env.ts");
  fs.writeFileSync(filePathValidateEnv, contentValidateEnv.trim());

  // Criar src/index.ts
  const indexContent = `
  require("dotenv").config();
  import express, { NextFunction, Request, Response } from "express";
  import config from "config";
  import morgan from "morgan";
  import cookieParser from "cookie-parser";
  import cors from "cors";
  import { redisClient } from "redis-service";
  import { AppError } from "errors";
  
  import validateEnv from "../utils/validate-env";
  import { AppDataSource } from "../utils/data-source";
  
  import ${appName}Route from "./routes/${appName}.route";
  
  AppDataSource.initialize()
    .then(async () => {
      validateEnv();
  
      const app = express();
  
      app.use(express.json({ limit: "10kb" }));
  
      if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
  
      app.use(cookieParser());
  
      app.use(
        cors({
          origin: config.get<string>("origin"),
          credentials: true,
        })
      );
  
      app.use("/api/${appName}", ${appName}Route);
  
      app.get("/api/healthChecker", async (_, res: Response) => {
        const message = await redisClient.get("try");
  
        res.status(200).json({
          status: "success",
          message,
        });
      });
  
      app.all("*", (req: Request, res: Response, next: NextFunction) => {
        next(new AppError(404, \`Route \${req.originalUrl} not found\`));
      });
  
      app.use(
        (error: AppError, req: Request, res: Response, next: NextFunction) => {
          error.status = error.status || "error";
          error.statusCode = error.statusCode || 500;
  
          res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
          });
        }
      );
  
      const port = config.get<number>("port");
      app.listen(port);
  
      console.log(\`Server started on port: \${port}\`);
    })
    .catch((error) => console.log(error));
      `;
  fs.writeFileSync(path.join(appDir, "src", "index.ts"), indexContent.trim());

  // Para transformar o nome do app em camelCase com a primeira letra maiúscula
  const camelCaseAppName = appName.charAt(0).toUpperCase() + appName.slice(1);

  // Criar src/routes/nome_do_app_aqui.route.ts
  const routesContent = `
import express from "express";
import {
hello${camelCaseAppName}Handler,
} from "../controllers/${appName}.controller";

const router = express.Router();

router.get("/", hello${camelCaseAppName}Handler);

export default router;
  `;
  fs.writeFileSync(
    path.join(appDir, "src", "routes", `${appName}.route.ts`),
    routesContent.trim()
  );

  // Criar src/controllers/nome_do_app_aqui.controller.ts
  const controllersContent = `
  import { NextFunction, Request, Response } from "express";
  import { hello${camelCaseAppName} } from "../services/${appName}.service";
  
  export const hello${camelCaseAppName}Handler = async (
    req: Request<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await hello${camelCaseAppName}();
  
      res.status(200).status(200).json({
        status: "success",
        data: {
          result,
        },
      });
    } catch (err: any) {
      next(err);
    }
  };
      `;
  fs.writeFileSync(
    path.join(appDir, "src", "controllers", `${appName}.controller.ts`),
    controllersContent.trim()
  );

  // Criar src/services/nome_do_app_aqui.service.ts
  const servicesContent = `
    export const hello${camelCaseAppName} = async () => {
      return \`Hello ${appName}!\`;
    };
        `;
  fs.writeFileSync(
    path.join(appDir, "src", "services", `${appName}.service.ts`),
    servicesContent.trim()
  );

  // Criar arquivos em src
  const srcFiles = [
    "middlewares/index.ts",
    "migrations/index.ts",
    "schemas/index.ts",
  ];
  srcFiles.forEach((file) => {
    fs.writeFileSync(path.join(appDir, "src", file), `// Conteúdo de ${file}`);
  });
}

const appName = process.argv[2];
if (!appName) {
  console.log("Por favor, forneça um nome para o app.");
  process.exit(1);
}

createApp(appName);
installPackages(path.join(__dirname, "../apps", appName));
