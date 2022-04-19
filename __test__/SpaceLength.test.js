/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : 테스트
 * 
 * @author   kimson <chaplet01@gmail.com>
 * @github   https://github.com/kkn1125
 * @written  2022-04-19 13:07:01
 * @modified 2022-04-19 21:26:59
 * @since    v0.1.0
 */

/**
 * @jest-environment jsdom
 */

"use strict";

import { getElement } from "../assets/core/module/parts/constant.js";
import {
    OptionalParser
} from "../assets/core/parser.js";

import {
    SAMPLE_A,
    SAMPLE_EMPTY,
    SAMPLE_SCATTERED_HOLE
} from "./sample.js";

/**!
 * 테스트 명세
 * 1. separateLine      : 줄 단위 배열화
 * 2. filterWhitespace  : 빈 인덱스 제거
 * 3. parse             : 모든 파싱이 끝난 배열
 * 4. drawBranch        : 브랜치 그리기
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

        expect(convertedArray).toStrictEqual([
            "test",
            " asd",
            "  qwe",
            "  gfhj",
            "  ads",
            "   fgd",
            "  sdfg",
            " cbv",
        ]);
    });

    test("공백 수를 가진 객체 배열 출력 테스트", () => {
        const parser         = new TreeParser();
        const trimedSources  = SAMPLE_SCATTERED_HOLE.trim();
        const convertedArray = parser.stringToArray(trimedSources);
        const numberOfBlanks = parser.countIndences(convertedArray);

        expect(numberOfBlanks).toStrictEqual([
            {
                directoryName: "test",
                numberOfIndences: 0,
            },
            {
                directoryName: "asd",
                numberOfIndences: 1,
            },
            {
                directoryName: "qwe",
                numberOfIndences: 2,
            },
            {
                directoryName: "gfhj",
                numberOfIndences: 2,
            },
            {
                directoryName: "ads",
                numberOfIndences: 2,
            },
            {
                directoryName: "fgd",
                numberOfIndences: 3,
            },
            {
                directoryName: "sdfg",
                numberOfIndences: 2,
            },
            {
                directoryName: "cbv",
                numberOfIndences: 1,
            },
        ]);
    });

    test("객체 배열 세 번째 브랜치 판별 테스트", () => {
        const parser                = new TreeParser();
        const trimedSources         = SAMPLE_SCATTERED_HOLE.trim();
        const convertedArray        = parser.stringToArray(trimedSources);
        const numberOfBlanks        = parser.countIndences(convertedArray);
        const addedFirstBranchArray = parser.addThirdBranch(numberOfBlanks);

        expect(addedFirstBranchArray).toStrictEqual([
            {
                directoryName: "test",
                numberOfIndences: 0,
                third: "─",
            },
            {
                directoryName: "asd",
                numberOfIndences: 1,
                third: "─",
            },
            {
                directoryName: "qwe",
                numberOfIndences: 2,
                third: "─",
            },
            {
                directoryName: "gfhj",
                numberOfIndences: 2,
                third: "─",
            },
            {
                directoryName: "ads",
                numberOfIndences: 2,
                third: "─",
            },
            {
                directoryName: "fgd",
                numberOfIndences: 3,
                third: "─",
            },
            {
                directoryName: "sdfg",
                numberOfIndences: 2,
                third: "─",
            },
            {
                directoryName: "cbv",
                numberOfIndences: 1,
                third: "─",
            },
        ]);
    });

    test("객체 배열 두 번째 브랜치 판별 테스트 - 자식 유무", () => {
        const parser                 = new TreeParser();
        const trimedSources          = SAMPLE_SCATTERED_HOLE.trim();
        const convertedArray         = parser.stringToArray(trimedSources);
        const numberOfBlanks         = parser.countIndences(convertedArray);
        const addedFirstBranchArray  = parser.addThirdBranch(numberOfBlanks);
        const addedSecondBranchArray = parser.addSecondBranch(addedFirstBranchArray);

        expect(addedSecondBranchArray).toStrictEqual([
            {
                directoryName: "test",
                numberOfIndences: 0,
                second: "┬",
                third: "─",
            },
            {
                directoryName: "asd",
                numberOfIndences: 1,
                second: "┬",
                third: "─",
            },
            {
                directoryName: "qwe",
                numberOfIndences: 2,
                second: "─",
                third: "─",
            },
            {
                directoryName: "gfhj",
                numberOfIndences: 2,
                second: "─",
                third: "─",
            },
            {
                directoryName: "ads",
                numberOfIndences: 2,
                second: "┬",
                third: "─",
            },
            {
                directoryName: "fgd",
                numberOfIndences: 3,
                second: "─",
                third: "─",
            },
            {
                directoryName: "sdfg",
                numberOfIndences: 2,
                second: "─",
                third: "─",
            },
            {
                directoryName: "cbv",
                numberOfIndences: 1,
                second: "─",
                third: "─",
            },
        ]);
    });

    test("객체 배열 첫 번째 브랜치 판별 테스트 - 형제 유무", () => {
        const parser         = new TreeParser();
        const trimedSources  = SAMPLE_SCATTERED_HOLE.trim();
        const convertedArray = parser.parse(trimedSources).getParsedLines();

        expect(convertedArray).toStrictEqual([
            {
                directoryName: "test",
                numberOfIndences: 0,
                first: "└",
                second: "┬",
                third: "─",
                vertical: [],
            },
            {
                directoryName: "asd",
                numberOfIndences: 1,
                first: "├",
                second: "┬",
                third: "─",
                vertical: [],
            },
            {
                directoryName: "qwe",
                numberOfIndences: 2,
                first: "├",
                second: "─",
                third: "─",
                vertical: [1],
            },
            {
                directoryName: "gfhj",
                numberOfIndences: 2,
                first: "├",
                second: "─",
                third: "─",
                vertical: [1],
            },
            {
                directoryName: "ads",
                numberOfIndences: 2,
                first: "├",
                second: "┬",
                third: "─",
                vertical: [1],
            },
            {
                directoryName: "fgd",
                numberOfIndences: 3,
                first: "└",
                second: "─",
                third: "─",
                vertical: [1,2],
            },
            {
                directoryName: "sdfg",
                numberOfIndences: 2,
                first: "└",
                second: "─",
                third: "─",
                vertical: [1],
            },
            {
                directoryName: "cbv",
                numberOfIndences: 1,
                first: "└",
                second: "─",
                third: "─",
                vertical: [],
            },
        ]);
    });

    describe("파일 트리 출력 테스트", () => {;
        const parser         = new TreeParser();
        const trimedSources  = SAMPLE_SCATTERED_HOLE.trim();
        const convertedArray = parser.parse(trimedSources);
        const app = document.createElement("div");
        app.id = "#app";

        expect(parser.renderTree()).toStrictEqual(`<div class="parsed-data">
        └┬─test
    </div><div class="parsed-data">
        　├┬─asd
    </div><div class="parsed-data">
        　│├──qwe
    </div><div class="parsed-data">
        　│├──gfhj
    </div><div class="parsed-data">
        　│├┬─ads
    </div><div class="parsed-data">
        　││└──fgd
    </div><div class="parsed-data">
        　│└──sdfg
    </div><div class="parsed-data">
        　└──cbv
    </div>`);

        expect(parser.renderTree(app)).toBeUndefined();
        expect(app.innerHTML).toStrictEqual(`<div class="parsed-data">
        └┬─test
    </div><div class="parsed-data">
        　├┬─asd
    </div><div class="parsed-data">
        　│├──qwe
    </div><div class="parsed-data">
        　│├──gfhj
    </div><div class="parsed-data">
        　│├┬─ads
    </div><div class="parsed-data">
        　││└──fgd
    </div><div class="parsed-data">
        　│└──sdfg
    </div><div class="parsed-data">
        　└──cbv
    </div>`);
    });
});