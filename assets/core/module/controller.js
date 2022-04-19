/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : 데모 페이지 이벤트 제어
 * 
 * @author   kimson <chaplet01@gmail.com>
 * @github   https://github.com/kkn1125
 * @written  2022-04-19 13:07:01
 * @modified 2022-04-19 21:26:59
 * @since    v0.1.0
 */

"use strict";

import { getElement } from "./parts/constant.js";

const Controller = function () {
    let models;
    this.init = function (model) {
        models = model;
        window.addEventListener("keyup", this.handleInput);
    }

    this.handleInput = function (e) {
        models.renderParsedTree(getElement('#inputs').value, getElement("#app"));
    }
}

export {Controller};