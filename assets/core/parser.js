/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : 코어 자바스크립트
 * 
 * @author    kimson <chaplet01@gmail.com>
 * @github    https://github.com/kkn1125
 * @written   2022-04-19 13:07:01
 * @modified  2022-04-26 23:24:58
 * @since     v0.1.0
 * @currently v0.2.1
 */

"use strict";

import {
    Controller
} from "./module/controller.js";

import {
    Model
} from "./module/model.js";

import {
    View
} from "./module/view.js";

const OptionalParser = (function () {
    return {
        init(options) {
            const controller = new Controller();
            const model = new Model();
            const view = new View();

            controller.init(model);
            model.init(view);
            view.init(options);

            function Parser() {};
            Object.keys(model).forEach(key => Parser.prototype[key] = model[key]);
            return Parser;
        }
    }
})();

export {
    OptionalParser
};