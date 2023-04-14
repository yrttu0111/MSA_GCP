"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
let BoardService = class BoardService {
    findAll() {
        const result = [
            {
                number: 1,
                writer: '철수',
                title: '제목입니다~~',
                contents: '내용이에요@@@',
            },
            {
                number: 2,
                writer: '영희',
                title: '영희 제목입니다~~',
                contents: '영희 내용이에요@@@',
            },
            {
                number: 3,
                writer: '훈이',
                title: '훈이 제목입니다~~',
                contents: '훈이 내용이에요@@@',
            },
        ];
        return result;
    }
    create() {
        return '등록에 성공하였습니다.';
    }
};
BoardService = __decorate([
    (0, common_1.Injectable)()
], BoardService);
exports.BoardService = BoardService;
//# sourceMappingURL=boards.service.js.map