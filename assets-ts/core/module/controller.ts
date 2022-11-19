/**!
 * Copyright 2022. kkn1125 All rights reserved.
 *
 * 파일 트리 파싱 : 데모 페이지 이벤트 제어
 *
 * @author    kimson <chaplet01@gmail.com>
 * @github    https://github.com/kkn1125
 * @written   2022-04-19 13:07:01
 * @modified  2022-07-01 21:38:45
 * @since     v0.1.0
 * @currently v0.2.4
 */

"use strict";

import { SAMPLE_ORDERED_NAME } from "../../src/script/sample.js";

import { isBase, store } from "../store.js";

import { getElement } from "./parts/constant.js";

const LOCALS = ["localhost", "127.0.0.1"];
const DEMO = "https://kkn1125.github.io/treeparser/";

const Controller = function () {
  let models;
  this.init = function (model) {
    models = model;

    if (isBase(...LOCALS, DEMO)) {
      window.addEventListener("keyup", this.handleInput);
      window.addEventListener("click", this.clipboardCopy);
      window.addEventListener("change", this.handleTypeChange);
      window.addEventListener("change", this.handleNameOffset);
      window.addEventListener("change", this.handleFontSize);
      window.addEventListener("change", this.handleEmoji);

      // 샘플 텍스트
      setTimeout(() => {
        models.renderParsedTree(SAMPLE_ORDERED_NAME);
      }, 10);
    }
  };

  this.handleTypeChange = function (e) {
    if (e.target.name !== "decoration") return;
    switch (e.target.value) {
      case "none":
        store.style.directory = [];
        break;
      case "box":
        store.style.directory = ["badge", "bg-info"];
        break;
      case "bold":
        store.style.directory = ["fw-bold"];
        break;
    }
    models.renderTree();
  };

  // 추가 @since v0.2.4
  this.handleEmoji = function (e) {
    if (e.target.name !== "emoji") return;

    store.manager("emoji", {
      folder: e.target.checked ? "📂" : "",
      file: e.target.checked ? "📄" : "",
    });

    console.log(store.emoji);
    models.renderTree();
  };

  this.handleNameOffset = function (e) {
    if (e.target.name !== "nameOffset") return;
    store.style.offset = parseInt(e.target.value);
    models.renderTree();
  };

  this.handleFontSize = function (e) {
    if (e.target.name !== "fontSize") return;
    store.style.fontSize = parseInt(e.target.value);
    models.renderTree();
  };

  // istanbul ignore next
  this.clipboardCopy = function (e) {
    const target = e.target;
    if (target.id !== "textcopy" && target.id !== "wrapedcopy") return;

    target.innerHTML = "✅ Copied!";

    setTimeout(() => {
      target.innerHTML = target.dataset.text;
    }, 3000);

    navigator.clipboard
      .writeText(
        target.id === "textcopy"
          ? getElement("#app").innerText
          : getElement("#app").outerHTML
      )
      .then(
        function () {
          console.log("Async: Copying to clipboard was successful!");
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
  };

  // istanbul ignore next
  this.handleInput = function (e) {
    const target = e.target;

    if (target.id !== "inputs") return;

    models.renderParsedTree(
      getElement("#inputs").value || SAMPLE_ORDERED_NAME,
      getElement("#app")
    );
  };
};

export { Controller };
