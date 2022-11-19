/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : 테스트
 * 
 * @author    kimson <chaplet01@gmail.com>
 * @github    https://github.com/kkn1125
 * @written   2022-04-19 13:07:01
 * @modified  2022-04-27 13:39:09
 * @since     v0.1.0
 * @currently v0.2.2
 */

/**
 * @jest-environment jsdom
 */

"use strict";

import {
    getElement
} from "../assets/core/module/parts/constant.js";
import { deepCopy } from "../assets/core/module/parts/filterTools.js";

import {
    OptionalParser
} from "../assets/core/parser.js";

import {
    FILETREE_SCATTERED_HOLE_HTML_RESULT,
    OBJECT_ARRAY_HAS_BLANKS,
    OBJECT_ARRAY_HAS_FIRST_BRANCH,
    OBJECT_ARRAY_HAS_SECOND_BRANCH,
    OBJECT_ARRAY_HAS_THIRD_BRANCH,
    OBJECT_ARRAY_HAS_VERTICAL_BRANCH,
    OBJECT_ARRAY_VERTICAL_BRANCH,
    SAMPLE_A,
    SAMPLE_A_RESULT,
    SAMPLE_BUG_AND_SCATTERED_HOLE,
    SAMPLE_EMPTY,
    SAMPLE_SCATTERED_HOLE,
    SAMPLE_SCATTERED_HOLE_RESULT
} from "../assets/src/script/sample.js";

/**!
 * 테스트 명세
 * 1. separateLine      : 줄 단위 배열화
 * 2. filterWhitespace  : 빈 인덱스 제거
 * 3. parse             : 모든 파싱이 끝난 배열
 * 4. renderTree        : 브랜치 그리기
 */

const options = {};

const TreeParser = OptionalParser.init(options);

describe("구동 테스트", () => {

    test("출력 테스트", () => {
        expect("테스트").toStrictEqual("테스트");
    });

    test("줄 개수 테스트", () => {
        const parser = new TreeParser();
        const result = parser.separateLine(SAMPLE_A);

        expect(result.length).toStrictEqual(5);
    });

    test("공백 제거 및 줄 개수 테스트", () => {
        const parser        = new TreeParser();
        const trimedSources = SAMPLE_A.trim();
        const result        = parser.separateLine(trimedSources);

        expect(result.length).toStrictEqual(3);
    });

    test("공백 제거 및 빈 배열 테스트", () => {
        const parser        = new TreeParser();
        const trimedSources = SAMPLE_EMPTY.trim();
        const result        = parser.separateLine(trimedSources);

        expect(result).toStrictEqual([]);
    });

    test("공백 제거 및 줄 개수 테스트", () => {
        const parser        = new TreeParser();
        const trimedSources = SAMPLE_EMPTY.trim();
        const result        = parser.separateLine(trimedSources);

        expect(result.length).toStrictEqual(0);
    });

    test("비어있는 라인 제거 개수 테스트", () => {
        const parser         = new TreeParser();
        const trimedSources  = SAMPLE_SCATTERED_HOLE.trim();
        const convertedArray = parser.stringToArray(trimedSources);

        expect(convertedArray.length).toStrictEqual(8);
    });

    test("변환 배열 출력 테스트", () => {
        const parser         = new TreeParser();
        const trimedSources  = SAMPLE_SCATTERED_HOLE.trim();
        const convertedArray = parser.stringToArray(trimedSources);

        expect(convertedArray).toStrictEqual(SAMPLE_SCATTERED_HOLE_RESULT);
    });

    test("공백 수를 가진 객체 배열 출력 테스트", () => {
        const parser         = new TreeParser();
        const trimedSources  = SAMPLE_SCATTERED_HOLE.trim();
        const convertedArray = parser.stringToArray(trimedSources);
        const numberOfBlanks = parser.countIndences(convertedArray);

        expect(numberOfBlanks).toStrictEqual(OBJECT_ARRAY_HAS_BLANKS);
    });

    test("객체 배열 세 번째 브랜치 판별 테스트", () => {
        const parser                = new TreeParser();
        const trimedSources         = SAMPLE_SCATTERED_HOLE.trim();
        const convertedArray        = parser.stringToArray(trimedSources);
        const numberOfBlanks        = parser.countIndences(convertedArray);
        const addedFirstBranchArray = parser.addThirdBranch(numberOfBlanks);

        expect(addedFirstBranchArray).toStrictEqual(OBJECT_ARRAY_HAS_THIRD_BRANCH);
    });

    test("객체 배열 두 번째 브랜치 판별 테스트 - 자식 유무", () => {
        const parser                 = new TreeParser();
        const trimedSources          = SAMPLE_SCATTERED_HOLE.trim();
        const convertedArray         = parser.stringToArray(trimedSources);
        const numberOfBlanks         = parser.countIndences(convertedArray);
        const addedFirstBranchArray  = parser.addThirdBranch(numberOfBlanks);
        const addedSecondBranchArray = parser.addSecondBranch(addedFirstBranchArray);

        expect(addedSecondBranchArray).toStrictEqual(OBJECT_ARRAY_HAS_SECOND_BRANCH);
    });

    /**
     * @since v0.2.1
     */
    test("deep copy 테스트", () => {
        expect(deepCopy({
            name: "kimson"
        }, {
            name: "toto"
        })).toStrictEqual({
            name: "toto"
        });

        expect(deepCopy({
            name: "kimson",
        }, {
            name: "toto",
            coco: {
                alal: 123,
                arr: [1,2,3]
            }
        })).toStrictEqual({
            name: "toto",
            coco: {
                alal: 123,
                arr: [1,2,3]
            }
        });
    });

    test("객체 배열 첫 번째 브랜치 판별 테스트 - 형제 유무", () => {
        const parser         = new TreeParser();
        const trimedSources  = SAMPLE_SCATTERED_HOLE.trim();
        const convertedArray = parser.parse(trimedSources).getParsedLines();

        expect(convertedArray).toStrictEqual(OBJECT_ARRAY_HAS_FIRST_BRANCH);
    });

    test("객체 배열 수직 브랜치 판별 테스트 - 형제 유무", () => {
        const parser         = new TreeParser();
        const trimedSources  = SAMPLE_BUG_AND_SCATTERED_HOLE.trim();
        const convertedArray = parser.parse(trimedSources).getParsedLines();

        expect(convertedArray).toStrictEqual(OBJECT_ARRAY_VERTICAL_BRANCH);
    });

    /**
     * @since v0.2.0
     */
    test("파일 트리 출력 테스트", () => {
        ;
        const parser         = new TreeParser();
        const trimedSources  = SAMPLE_SCATTERED_HOLE.trim();
        const convertedArray = parser.parse(trimedSources);

        const app = document.createElement("div");
        app.id    = "#app";

        expect(parser.renderTree()).toStrictEqual(FILETREE_SCATTERED_HOLE_HTML_RESULT);

        expect(parser.renderTree(app)).toBeUndefined();
        expect(app.innerHTML).toStrictEqual(FILETREE_SCATTERED_HOLE_HTML_RESULT);
    });

    /**
     * @since v0.2.0
     */
    test("자식 출력 테스트", () => {
        const parser = new TreeParser();
        parser.parse(SAMPLE_A);

        const app = document.createElement("div");
        app.id    = "#app";

        expect(parser.renderTree()).toStrictEqual(SAMPLE_A_RESULT);
    });

    /**
     * @since v0.2.0
     */
    test("버그 혼합 샘플 테스트", () => {
        const parser = new TreeParser();
        parser.parse(SAMPLE_BUG_AND_SCATTERED_HOLE);

        const app = document.createElement("div");
        app.id    = "#app";

        expect(parser.getParsedLines()).toStrictEqual(OBJECT_ARRAY_VERTICAL_BRANCH);
    });
});