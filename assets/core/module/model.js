/**!
 * Copyright 2022. kkn1125 All rights reserved.
 *
 * 파일 트리 파싱 : 트리 파싱에 핵심이 되는 Model 제어
 *
 * @author     kimson <chaplet01@gmail.com>
 * @github     https://github.com/kkn1125
 * @written    2022-04-19 13:07:01
 * @modified   2022-07-01 21:38:45
 * @since      v0.1.0
 * @currently  v0.2.4
 * @references code convention
 *  - https://dkje.github.io/2020/08/03/CleanCodeSeries2-copy
 *  - https://itmining.tistory.com/72
 */

"use strict";

import { LINE } from "./parts/regexp.js";

import {
  isEmpty,
  countMatchedIndencesOrZero,
  setThirdBranch,
  setSecondBranch,
  setFirstBranch,
} from "./parts/filterTools.js";
import { getElement } from "./parts/constant.js";

const wrap = document.createElement("div");

const Model = function () {
  let convertedLines, parsedLines, views;

  /**
   * @function Model.init
   */
  this.init = function (view) {
    views = view;
  };

  // istanbul ignore next
  /** ================================ */
  /**            메인 메서드            */
  /** ================================ */
  this.renderParsedTree = function (contents) {
    this.parse(contents);
    this.renderTree();
  };

  /**
   * 줄 단위 배열을 받아 tree를 그림
   * 인덱싱         :      1 2 3
   * 기본 형태      :      └ ─ ─ 파일명
   * 최하단 형태    :      └ ─ ─ 파일명
   * 하위 폴더      :      └ ┬ ─ 파일명
   *                      └ ─ ─ 파일명
   * 계단식 폴더    :      └ ┬ ─ 파일명
   * 같은 레벨 폴더 :        ├ ┬ ─ 파일명
   * 하위 레벨 폴더 :        │ └ ─ ─ 파일명
   * 같은 레벨 폴더 :        └ ─ ─ 파일명
   *
   * 1. 첫 번째 브랜치 기호 : 같은 레벨의 파일이 존재할 때
   * 2. 두 번째 브랜치 기호 : 하위 레벨 파일 존재할 때
   * 3. 세 번째 브랜치 기호 : 파일이 존재할 때 (항상 동일)
   *
   * @function renderTree
   */
  this.renderTree = function () {
    return views.renderTree(parsedLines);
  };

  // istanbul ignore next
  /**
   * 원문 파싱 후 브랜치를 그림
   * @param {string} source
   * @returns {string[]}
   */
  this.parse = function (source) {
    convertedLines = this.stringToArray(source);
    parsedLines = this.parseLines(convertedLines);

    return this;
  };

  /**
   * 파싱된 객체 반환
   * @returns {Object}
   */
  this.getParsedLines = function () {
    return parsedLines;
  };

  /**
   * 원문 소스를 공백 제거된 줄(line) 단위 배열로 변환
   * @param {string} source
   * @returns {string[]}
   */
  this.stringToArray = function (source) {
    const trimSources = source.trim();
    const splitedLines = this.separateLine(trimSources);
    const filteredLines = this.filterEmptyLine(splitedLines);

    return filteredLines;
  };

  /**
   * View 단에 출력하기 전 마지막 데이터 가공 상태 반환
   * @param {Object[]} lines
   * @returns {Object[]}
   */
  this.parseLines = function (lines) {
    const convertedCountIndenceArray = this.countIndences(lines);
    const addedThirdBranchArray = this.addThirdBranch(
      convertedCountIndenceArray
    );
    const addedSecondBranchArray = this.addSecondBranch(addedThirdBranchArray);
    const addedFirstBranchArray = this.addFirstBranch(addedSecondBranchArray);

    return addedFirstBranchArray;
  };

  /** ================================ */
  /** 메인 메서드를 위한 pipeline 메서드 */
  /** ================================ */

  /**
   * 들여쓰기 텍스트를 줄 단위 배열화
   * @function separateLine
   * @param {string} trimedSources
   * @returns {string[]}
   */
  this.separateLine = function (trimSources) {
    const IS_NO_TEXT = !trimSources;
    const IS_ZERO_FIELD = trimSources.length == 0;
    const EMPTY_ARRAY = [];

    if (IS_NO_TEXT || IS_ZERO_FIELD) return EMPTY_ARRAY;

    return trimSources.split(LINE);
  };

  /**
   * 줄 단위 배열을 받아 공백, 줄바꿈 제거
   * @function filterEmptyLine
   * @param {string[]} splitedLines
   * @returns {string[]}
   */
  this.filterEmptyLine = function (splitedLines) {
    return splitedLines.filter(isEmpty);
  };

  /**
   * 공백 수를 가진 객체 배열로 변환
   * @param {string[]} lines
   * @returns {Object}
   */
  this.countIndences = function (lines) {
    function collectBlank(line, id) {
      return {
        lineId: id,
        numberOfIndences: countMatchedIndencesOrZero(line),
        directoryName: line.trim(),
      };
    }

    return lines.map(collectBlank);
  };

  /**
   * 들여쓰기 카운팅 된 객체 배열로 third 브랜치 작성
   * @param {Object[]} indenceCountedArray
   * @returns {Object[]}
   */
  this.addThirdBranch = function (indenceCountedArray) {
    return indenceCountedArray.map(setThirdBranch);
  };

  /**
   * 자식 요소 판별해서 second 브랜치 기호 작성
   * @param {Object[]} indenceCountedArray
   * @returns {Object[]}
   */
  this.addSecondBranch = function (addedThirdBranchArray) {
    return addedThirdBranchArray.map(setSecondBranch);
  };

  /**
   * 형제요소 연속 및 자식요소, 마지막 요소 판별
   * first 브랜치 기호 작성
   * vertical 브랜치 기호 작성
   * @param {Object[]} addedSecondBranchArray
   * @returns {Object[]}
   * @since v0.2.0
   */
  this.addFirstBranch = function (addedSecondBranchArray) {
    const containsFirstBranch = addedSecondBranchArray.map(setFirstBranch);

    return containsFirstBranch;
  };
};

export { Model };
