"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpApp = void 0;
const common_1 = require("@nestjs/common");
const CookieSession = require("cookie-session");
const setUpApp = (app) => {
    app.use(CookieSession({
        keys: ['asdfadf'],
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
};
exports.setUpApp = setUpApp;
//# sourceMappingURL=setup-app.js.map