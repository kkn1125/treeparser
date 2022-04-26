/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : 변환된 파일트리 출력 제어
 * 
 * @author    kimson <chaplet01@gmail.com>
 * @github    https://github.com/kkn1125
 * @written   2022-04-19 13:07:01
 * @modified  2022-04-26 23:24:51
 * @since     v0.1.0
 * @currently v0.2.1
 */

"use strict";

import { store } from "../store.js";
import {
    getElement
} from "./parts/constant.js";

import {
    treeFormatter
} from "./parts/filterTools.js";

const View = function () {
    let options, app;

    this.init = function (option) {
        options = option;
        
        app = getElement(options.app);
    }

    this.renderTree = function (convertedArray, app) {
        const result = convertedArray.map(treeFormatter).join("");
        
        if(app) {
            app.innerHTML = result;
            return undefined;
        } else {
            return result;
        }
    }
}

export {
    View
};