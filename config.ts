import dotenv from 'dotenv';
import express, { Express } from 'express';
dotenv.config();

interface AppConfig {
    PORT: number;
    DB_CONNECTION_STRING: string;
    SECRET_KEY: string;
}

const appConfig: AppConfig = {
    PORT: parseInt(process.env.PORT || '3000', 10),
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || '',
    SECRET_KEY: process.env.SECRET_KEY || '',
};

const configureApp = (app: Express) => {
    app.use(express.json());
    app.get('/config', (req, res) => {
        res.json({
            message: 'This is a configuration endpoint',
            config: "Sensitive information hidden"
        });
    });
};

const main = () => {
    const app = express();
    configureApp(app);
    app.listen(appConfig.PORT, () => {
        console.log(`Server running on port ${appConfig.PORT}`);
    });
};

main();