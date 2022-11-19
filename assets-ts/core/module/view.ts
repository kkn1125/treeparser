/**!
 * Copyright 2022. kkn1125 All rights reserved.
 *
 * 파일 트리 파싱 : 변환된 파일트리 출력 제어
 *
 * @author    kimson <chaplet01@gmail.com>
 * @github    https://github.com/kkn1125
 * @written   2022-04-19 13:07:01
 * @modified  2022-07-01 21:38:45
 * @since     v0.1.0
 * @currently v0.2.4
 */

"use strict";

import { store } from "../store.js";

import { getElement } from "./parts/constant.js";

import { deepCopy, treeFormatter } from "./parts/filterTools.js";

const initialOption = {
  app: "#app",
  branches: {
    first: {
      only: "└",
      brother: "├",
    },
    second: {
      only: "─",
      child: "┬",
    },
    third: "─",
    vertical: "│",
  },
  emoji: { // 추가 @since v0.2.4
    folder: "📂",
    file: "📄",
  },
  style: {
    directory: "",
    offset: 0, // default : 0
    fontSize: 16,
  },
  indent: 1,
};

const View = function () {
  let options, app;

  /**
   * 상태관리 store에 옵션을 복사 및 초기화
   * @function initialOptions
   * @since v0.2.2
   */
  this.initialOptions = function (options) {
    const copy = deepCopy(initialOption, options);
    store.manager("app", copy.app || "#app");
    store.manager("branches", copy.branches);
    store.manager("style", copy.style);
    store.manager("indent", copy.indent);
    store.manager("emoji", copy.emoji); // 추가 @since v0.2.4
  };

  /**
   * view 초기화 설정
   * @function init
   * @param {Object} option
   */
  this.init = function (option) {
    options = option;

    this.initialOptions(options);

    /**
     * default 값 지정
     * 2022-04-27 10:28:34
     */
    app = getElement(store.app);
  };

  /**
   * 파싱 데이터를 html 태그로 반환
   * @function renderTree
   * @param {Object[]} convertedArray
   * @returns {string}
   */
  this.renderTree = function (convertedArray) {
    const result = convertedArray.map(treeFormatter).join("");
    const wrap = document.createElement("div");
    wrap.style.opacity = 0.5;

    if (app) {
      setTimeout(() => {
        if (result.match(/this\sis\sa\ssample/gi)) {
          wrap.innerHTML = result;
          app.innerHTML = wrap.outerHTML;
        } else {
          app.innerHTML = result;
        }
        [...app.children].forEach(
          (item) => (item.style.fontSize = store.style.fontSize + "px")
        );
      }, 0);
      return undefined;
    } else {
      return result;
    }
  };
};

export { View };
