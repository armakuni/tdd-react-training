"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pino_http_1 = __importDefault(require("pino-http"));
const cors_1 = __importDefault(require("cors"));
function server() {
    const app = (0, express_1.default)();
    app.use((0, pino_http_1.default)());
    app.use((0, cors_1.default)());
    app.get('/', (req, res) => {
        req.log.info({ logger: 'pino' });
        res.status(200).send();
    });
    app.get('/ping', (_, res) => {
        res
            .status(200)
            .header('Content-Type', 'application/json')
            .send('"pong"');
    });
    app.get('/sizes', (_, res) => {
        res
            .status(200)
            .send(['small', 'medium', 'large']);
    });
    app.get('/sauces', (_, res) => {
        res
            .status(200)
            .send(['tomato', 'white', 'none']);
    });
    return app;
}
exports.default = server;
//# sourceMappingURL=server.js.map