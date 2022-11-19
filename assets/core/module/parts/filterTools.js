/**!
 * Copyright 2022. kkn1125 All rights reserved.
 *
 * 파일 트리 파싱 : 배열 필터에 사용되는 predicate 함수
 *
 * @author    kimson <chaplet01@gmail.com>
 * @github    https://github.com/kkn1125
 * @written   2022-04-19 13:07:01
 * @modified 2022-11-19 17:13:36
 * @since     v0.1.0
 * @currently v0.3.0
 */
"use strict";
import { store } from "../../store.js";
import { BRANCH_FIRST_BROTHER, BRANCH_FIRST_ONLY, BRANCH_SECOND_CHILD, BRANCH_SECOND_ONLY, BRANCH_THIRD_ONLY, BRANCH_VERTICAL_ONLY, } from "./constant.js";
import { BLANK, EACH_TEXT } from "./regexp.js";
/**
 * 스택에 수직 브랜치가 들어가는 곳을 플래그 형식으로 넣고 빼는 용도
 * @member {int[]} stack
 * @see    setFirstBranch
 * @since  v0.2.0
 */
let stack = [];
/**
 * 비교 대상 객체의 내용을 덮어쓰기
 * @param {Object} target
 * @param {Object} compare
 * @returns {Object}
 * @since v0.2.1
 */
function deepCopy(target, compare) {
    let temp = target;
    let key = null;
    for (key in compare) {
        if (key === null)
            continue;
        if (!(compare[key] instanceof Array) &&
            compare[key] instanceof Object &&
            typeof compare[key] === "object") {
            if (!temp[key]) {
                temp[key] = {};
            }
            temp[key] = deepCopy(temp[key], compare[key] || {});
        }
        else {
            if (compare[key] instanceof Array) {
                if (compare[key].filter((i) => i !== null && i !== undefined)
                    .length > 0) {
                    temp[key] = [...compare[key]];
                }
            }
            else {
                if (compare[key] !== undefined &&
                    compare[key] !== null //&&
                //   compare[key] != ""
                ) {
                    temp[key] = compare[key];
                }
            }
        }
    }
    return temp;
}
// istanbul ignore next
/**
 * 빈 문자열 판별
 * @param   {string} line
 * @returns {string}
 */
function isEmpty(line) {
    return line.trim() != "";
}
/**
 * 문자열의 공백 개수 산출, 없으면 0 반환
 * @param   {string} line
 * @returns {int}
 * @since v0.1.0
 * @since v0.2.2
 */
function countMatchedIndencesOrZero(line) {
    const matcher = line.match(BLANK);
    return line.length > 0 && matcher
        ? parseInt((matcher[0].length / (store.indent || 1)).toString())
        : 0;
}
/**
 * 공통 연결 브랜치 지정
 * @param   {string} line
 * @returns {Object}
 */
function setThirdBranch(line) {
    return {
        ...line,
        third: typeof store?.branches?.third === "string"
            ? store?.branches?.third
            : BRANCH_THIRD_ONLY,
    };
}
/**
 * 두 번째 브랜치 자식 유무에 따라 브랜치 선택
 * @param   {CountIndences}   line
 * @param   {Integer}  idx
 * @param   {CountIndences[]} origin
 * @returns {CountIndences}
 */
function setSecondBranch(line, idx, origin) {
    let branch = store?.branches?.second?.only || BRANCH_SECOND_ONLY;
    if (idx < origin.length - 1) {
        const now = origin[idx].numberOfIndences;
        const next = origin[idx + 1].numberOfIndences;
        if (now < next) {
            branch = store?.branches?.second?.child || BRANCH_SECOND_CHILD;
        }
    }
    return {
        ...line,
        second: branch,
    };
}
/**
 * 첫 번째 브랜치 형제가 존재하는지 배열에 담아 브랜치 선택에 사용
 * @param   {CountIndences[]} addedSecondBranchArray
 * @returns {CountIndences}
 */
function setFirstBranch(line, idx, origin) {
    let finder;
    /**
     * 자식이 없으면 first branch only
     * 형제가 있어도 내려갈때 막히면 first branch only
     * 형제가 있으면 first branch brother
     */
    const nextLines = origin.slice(idx + 1);
    for (finder of nextLines) {
        if (!line.vertical)
            line.vertical = [];
        if (!line.vertical[line.numberOfIndences])
            stack[line.numberOfIndences] = line.numberOfIndences;
        const copyVertical = stack
            .filter((number) => typeof number === "number")
            .slice(0);
        if (copyVertical.length > 1) {
            line.vertical = copyVertical.slice(0, copyVertical.length - 1);
        }
        else {
            line.vertical = copyVertical;
        }
        if (line.numberOfIndences > finder.numberOfIndences) {
            delete stack[line.numberOfIndences];
            return {
                ...line,
                first: store?.branches?.first?.only || BRANCH_FIRST_ONLY,
            };
        }
        else if (line.numberOfIndences === finder.numberOfIndences) {
            return {
                ...line,
                first: store?.branches?.first?.brother || BRANCH_FIRST_BROTHER,
            };
        }
    }
    delete stack[line.numberOfIndences];
    return {
        ...line,
        first: store?.branches?.first?.only || BRANCH_FIRST_ONLY,
        vertical: [],
    };
}
/**
 * 버티컬 인덱스에 매치되는 공백을 수직 선으로 치환
 * @function changeBrotherToVertical
 * @param    {int[]}  vertical
 * @param    {string} blank
 * @param    {int}    idx
 * @returns  {string}
 * @see      treeFormatter
 */
function changeBrotherToVertical(vertical, blank, idx) {
    vertical.forEach((number) => {
        if (idx === number) {
            blank = store?.branches?.vertical || BRANCH_VERTICAL_ONLY;
        }
    });
    return blank;
}
// istanbul ignore next
/**
 * collector의 마지막 라인 제거
 * @param   {string} line
 * @returns {int}
 */
function treeFormatter(line) {
    const { numberOfIndences, vertical, first, second, third, directoryName } = line;
    const whitespace = "　".repeat(numberOfIndences);
    const whitespaceWithVertical = whitespace
        .split(EACH_TEXT)
        .map(changeBrotherToVertical.bind(this, vertical))
        .join("");
    // const isFolder = whitespaceWithVertical.match(/\/^/g);
    const isParentFolder = second === BRANCH_SECOND_CHILD || directoryName.match(/\/$/g);
    return `<div
        class="parsed-data">
        ${whitespaceWithVertical}${first}${second}${third}${"&nbsp;".repeat(store?.style?.offset || 0)}
        <span style="font-size: 16px;">
          ${isParentFolder ? store.emoji.folder : store.emoji.file}
          ${(isParentFolder &&
        '<span style="border-bottom: 1px solid gray; font-weight: 600;">') ||
        ""}
          ${directoryName.badge(store?.style?.directory || "")}
          ${(isParentFolder && "</span>") || ""}
        </span>
        
    </div>`;
}
export { isEmpty, setThirdBranch, setSecondBranch, setFirstBranch, countMatchedIndencesOrZero, treeFormatter, deepCopy, };
