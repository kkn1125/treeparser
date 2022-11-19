/**!
 * Copyright 2022. kkn1125 All rights reserved.
 *
 * 파일 트리 파싱 : 변환된 파일트리 출력 제어
 *
 * @author    kimson <chaplet01@gmail.com>
 * @github    https://github.com/kkn1125
 * @written   2022-04-19 13:07:01
 * @modified 2022-11-19 17:13:36
 * @since     v0.1.0
 * @currently v0.3.0
 */

import { store } from "../store.js";

import { getElement } from "./parts/constant.js";

import { deepCopy, treeFormatter } from "./parts/filterTools.js";

const initialOption: InitialOption = {
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
  emoji: {
    // 추가 @since v0.3.0
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

const View = function View(this: ViewEntity) {
  let options: InitialOption;
  let app: Element | null;

  /**
   * 상태관리 store에 옵션을 복사 및 초기화
   * @function initialOptions
   * @since v0.2.2
   */
  this.initialOptions = function (options: InitialOption) {
    const copy = deepCopy(initialOption, options);
    store.manager("app", copy.app || "#app");
    store.manager("branches", copy.branches);
    store.manager("style", copy.style);
    store.manager("indent", copy.indent);
    store.manager("emoji", copy.emoji); // 추가 @since v0.3.0
  };

  /**
   * view 초기화 설정
   * @function init
   * @param {Object} option
   */
  this.init = function (option: InitialOption) {
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
  this.renderTree = function (convertedArray: CountIndences[]) {
    const result = convertedArray.map(treeFormatter).join("");
    const wrap = document.createElement("div");
    wrap.style.opacity = "0.5";

    if (app) {
      setTimeout(() => {
        if (result.match(/this\sis\sa\ssample/gi)) {
          wrap.innerHTML = result;
          if (app) {
            app.innerHTML = wrap.outerHTML;
          }
        } else {
          if (app) {
            app.innerHTML = result;
          }
        }
        if (app) {
          [...app.children].forEach(
            (item) =>
              ((item as HTMLElement).style.fontSize =
                store.style.fontSize + "px")
          );
        }
      }, 0);
      return undefined;
    } else {
      return result;
    }
  };
};

export { View };
