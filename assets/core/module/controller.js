/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : 데모 페이지 이벤트 제어
 * 
 * @author   kimson <chaplet01@gmail.com>
 * @github   https://github.com/kkn1125
 * @written  2022-04-19 13:07:01
 * @modified 2022-04-21 11:32:29
 * @since    v0.1.0
 */

"use strict";

import { SAMPLE_ORDERED_NAME } from "../../src/script/sample.js";
import { getElement } from "./parts/constant.js";

const Controller = function () {
    let models;
    this.init = function (model) {
        models = model;
        window.addEventListener("keyup", this.handleInput);
        
        // 샘플 텍스트
        setTimeout(() => {
            models.renderParsedTree(SAMPLE_ORDERED_NAME, getElement("#app"));
        }, 10);
    }

    // istanbul ignore next
    this.handleInput = function (e) {
        const target = e.target;
        
        if(target.id !== "inputs") return;

        models.renderParsedTree(getElement('#inputs').value || SAMPLE_ORDERED_NAME, getElement("#app"));
    }
}

export {Controller};