"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("./server"));
describe('server', () => {
    const app = (0, server_1.default)();
    describe('/', () => {
        const route = '/';
        it('returns a 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get(route);
            expect(response.statusCode).toBe(200);
        }));
        it('returns cors headers', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get(route);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            expect(response.headers['access-control-allow-origin']).toBe('*');
        }));
    });
    describe('/ping', () => {
        it('returns a 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/ping');
            expect(response.statusCode).toBe(200);
        }));
        it('returns a "application/json" content-type', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/ping');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        }));
        it('returns a "pong"', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/ping');
            expect(response.body).toBe('pong');
        }));
    });
    describe('/sizes', () => {
        it('returns a 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/sizes');
            expect(response.statusCode).toBe(200);
        }));
        it('returns a "application/json" content-type', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/sizes');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        }));
        it('returns small, medium and large', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/sizes');
            expect(response.body).toStrictEqual(['small', 'medium', 'large']);
        }));
    });
    describe('/sauces', () => {
        it('returns a 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/sauces');
            expect(response.statusCode).toBe(200);
        }));
        it('returns a "application/json" content-type', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/sauces');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        }));
        it('returns tomato, white and none', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/sauces');
            expect(response.body).toStrictEqual(['tomato', 'white', 'none']);
        }));
    });
});
function isObjectWithProperty(value, property) {
    if (typeof value !== 'object') {
        return false;
    }
    if (value === null) {
        return false;
    }
    return property in value;
}
describe('isThing', () => {
    it('returns false when not an object', () => {
        expect(isObjectWithProperty(7, 'hello')).toBe(false);
    });
    it('returns false when object is null', () => {
        expect(isObjectWithProperty(null, 'hello')).toBe(false);
    });
    it('returns false key is missing', () => {
        expect(isObjectWithProperty({}, 'hello')).toBe(false);
    });
    it('returns true when key exists', () => {
        const thing = { value: 'hello' };
        if (isObjectWithProperty(thing, 'value')) {
            expect(thing.value)
                .toBe(true);
        }
    });
});
//# sourceMappingURL=server.test.js.map