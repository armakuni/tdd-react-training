"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const port = 5001;
// eslint-disable-next-line no-console
(0, server_1.default)().listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map