import dotenv from 'dotenv';
import express, { Express } from 'express';
dotenv.config();
interface AppConfig {
    PORT: number;
    DB_CONNECTION_STRING: string;
    SECRET_KEY: string;
    [key: string]: any;
}
const getConfig = (): AppConfig => {
    return {
        PORT: parseInt(process.env.PORT || '3000', 10),
        DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || '',
        SECRET_KEY: process.env.SECRET_KEY || '',
    };
};
const configureApp = (app: Express, config: AppConfig) => {
    app.use(express.json());
    app.get('/config', (req, res) => {
        res.json({
            message: 'This is a configuration endpoint',
            config,
        });
    });
};
const main = () => {
    const config = getConfig();
    const app = express();
    configureApp(app, config);
    app.listen(config.PORT, () => {
        console.log(`Server running on port ${config.PORT}`);
    });
};
main();