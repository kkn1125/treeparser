/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : 배열 필터에 사용되는 predicate 함수
 * 
 * @author   kimson <chaplet01@gmail.com>
 * @github   https://github.com/kkn1125
 * @written  2022-04-19 13:07:01
 * @modified 2022-04-19 21:26:59
 * @since    v0.1.0
 */

"use strict";

import {
    BRANCH_SECOND_CHILD,
    BRANCH_SECOND_ONLY,
    BRANCH_THIRD_ONLY,
    BRANCH_VERTICAL_ONLY
} from "./constant.js";

import {
    BLANK,
    EACH_TEXT
} from "./regexp.js";

// istanbul ignore next
/**
 * 빈 문자열 판별
 * @param {string} line 
 * @returns {string}
 */
function isEmpty(line) {
    return (line.trim() != '');
}

/**
 * 문자열의 공백 개수 산출, 없으면 0 반환
 * @param {string} line 
 * @returns {int}
 */
function countMatchedIndencesOrZero(line) {
    const matcher = line.match(BLANK);
    return (line.length > 0) && matcher ? matcher.length : 0;
}

function setThirdBranch(line) {
    return {
        ...line,
        third: BRANCH_THIRD_ONLY
    }
}

/**
 * 두 번째 브랜치 자식 유무에 따라 브랜치 선택
 * @param {Object} line 
 * @param {Integer} idx 
 * @param {Object[]} origin 
 * @returns 
 */
function setSecondBranch(line, idx, origin) {
    let branch = BRANCH_SECOND_ONLY;

    if (idx < origin.length - 1) {
        const now = origin[idx].numberOfIndences;
        const next = origin[idx + 1].numberOfIndences;

        if (now < next) {
            branch = BRANCH_SECOND_CHILD;
        }
    }

    return {
        ...line,
        second: branch
    }
}

/**
 * 첫 번째 브랜치 형제가 존재하는지 배열에 담아 브랜치 선택에 사용
 * @param {Object[]} addedSecondBranchArray 
 * @returns {Object[]}
 */
function setFirstBranch(addedSecondBranchArray) {
    const collector = [];

    addedSecondBranchArray.forEach(function (line, idx) {
        if (!collector[line.numberOfIndences]) {
            collector[line.numberOfIndences] = [];
        }

        collector[line.numberOfIndences].push(line);
    });

    return collector;
}

/**
 * collector의 마지막 라인 제거
 * @param {string} line 
 * @returns {int}
 */
function withoutLastLine(line) {
    if (line.length > 0) {
        line.pop();
    }

    return line;
}

// istanbul ignore next
/**
 * vertical에 등록된 수직선 위치 번호를 대조하고 수직 브랜치를 반환
 * @param {int[]} vertical 
 * @param {string} line 
 * @param {int} idx 
 * @returns {boolean}
 * @see treeFormatter
 */
function changeBrotherToVertical(vertical, line, idx) {
    return vertical.some(compare => (compare === idx)) ? BRANCH_VERTICAL_ONLY : line;
}

// istanbul ignore next
/**
 * collector의 마지막 라인 제거
 * @param {string} line 
 * @returns {int}
 */
function treeFormatter(line) {
    const {
        numberOfIndences,
        vertical,
        first,
        second,
        third,
        directoryName
    } = line;

    const whitespace = '　'.repeat(numberOfIndences);
    const whitespaceWithVertical = whitespace.split(EACH_TEXT).map(changeBrotherToVertical.bind(this, vertical)).join('');

    return `<div class="parsed-data">
        ${whitespaceWithVertical}${first}${second}${third}${directoryName}
    </div>`;
}

export {
    isEmpty,
    setThirdBranch,
    setSecondBranch,
    setFirstBranch,
    countMatchedIndencesOrZero,
    withoutLastLine,
    treeFormatter,
}