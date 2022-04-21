/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : 트리 입력 구문 테스트 케이스
 * 
 * @author   kimson <chaplet01@gmail.com>
 * @github   https://github.com/kkn1125
 * @written  2022-04-19 13:07:01
 * @modified 2022-04-21 11:32:29
 * @since    v0.1.0
 */

"use strict";

/**
 * 테스트 인풋 샘플
 */

/**
 * child 가지는 샘플
 */
const SAMPLE_A = `
test
 test
  test
`;

/**
 * child 가지다가 parent 가지는 샘플
 */
const SAMPLE_B = `
test
 asd
 toto
  qwe
   cxvbxc
 gfhj
`;

/**
 * child + parent 섞인 샘플
 */
const SAMPLE_C = `
test
 asd
 toto
  qwe
   cxvbxc
  gfhj
  ads
   sa
    fgd
     gjhk
  sdfg
 cbv
`;

/**
 * 공백이 흩어져 섞인 샘플
 */
const SAMPLE_SCATTERED_HOLE = `
test
 asd
 
  qwe
   
  gfhj
  ads
   
   fgd
     
  sdfg
 cbv
`;

/**
 * 빈 문자열 샘플
 */
const SAMPLE_EMPTY = ``;

/**
 * 하나의 디렉토리만 있는 샘플
 */
const SAMPLE_ONLY_ROOT = `root`;

/**
 * 버그 생기는 샘플
 * @since v0.2.0
 */
const SAMPLE_BUG = `
wertwert
 wertwert
  ewrtwetr
 ewrtwter
  ewrtewrt
   ewrtetrw
    erwtewrt`;

/**
 * 버그 및 정상작동 혼합 샘플
 * @since v0.2.0
 */
const SAMPLE_BUG_AND_SCATTERED_HOLE = `
wertwert
 wertwert
  ewrtwetr
 ewrtwter
  ewrtewrt
   ewrtetrw
    erwtewrt
test
 asd
 
  qwe
   
  gfhj
  ads
   
   fgd
     
  sdfg
 cbv`;

/**
 * @since v0.2.0
 */
const SAMPLE_ORDERED_NAME = `
This is a sample
 sample child 1-1
  sample child 2-1
 sample child 1-2
  sample child 2-2
   children
    children
Other Parent
 child
 
  child
   
   child
  test1
   
   test2
     
  test3
 test4`;

/**
 * 테스트 예상 결과 샘플
 */

const SAMPLE_A_RESULT = `<div class=\"parsed-data\">
        └┬─test
    </div><div class=\"parsed-data\">
        　└┬─test
    </div><div class=\"parsed-data\">
        　　└──test
    </div>`;

const SAMPLE_SCATTERED_HOLE_RESULT = [
  "test",
  " asd",
  "  qwe",
  "  gfhj",
  "  ads",
  "   fgd",
  "  sdfg",
  " cbv",
];

const OBJECT_ARRAY_HAS_BLANKS = [
  {
      lineId: 0,
      directoryName: "test",
      numberOfIndences: 0,
  },
  {
      lineId: 1,
      directoryName: "asd",
      numberOfIndences: 1,
  },
  {
      lineId: 2,
      directoryName: "qwe",
      numberOfIndences: 2,
  },
  {
      lineId: 3,
      directoryName: "gfhj",
      numberOfIndences: 2,
  },
  {
      lineId: 4,
      directoryName: "ads",
      numberOfIndences: 2,
  },
  {
      lineId: 5,
      directoryName: "fgd",
      numberOfIndences: 3,
  },
  {
      lineId: 6,
      directoryName: "sdfg",
      numberOfIndences: 2,
  },
  {
      lineId: 7,
      directoryName: "cbv",
      numberOfIndences: 1,
  },
];

const OBJECT_ARRAY_HAS_THIRD_BRANCH = [
  {
      lineId: 0,
      directoryName: "test",
      numberOfIndences: 0,
      third: "─",
  },
  {
      lineId: 1,
      directoryName: "asd",
      numberOfIndences: 1,
      third: "─",
  },
  {
      lineId: 2,
      directoryName: "qwe",
      numberOfIndences: 2,
      third: "─",
  },
  {
      lineId: 3,
      directoryName: "gfhj",
      numberOfIndences: 2,
      third: "─",
  },
  {
      lineId: 4,
      directoryName: "ads",
      numberOfIndences: 2,
      third: "─",
  },
  {
      lineId: 5,
      directoryName: "fgd",
      numberOfIndences: 3,
      third: "─",
  },
  {
      lineId: 6,
      directoryName: "sdfg",
      numberOfIndences: 2,
      third: "─",
  },
  {
      lineId: 7,
      directoryName: "cbv",
      numberOfIndences: 1,
      third: "─",
  },
];

const OBJECT_ARRAY_HAS_SECOND_BRANCH = [
  {
      lineId: 0,
      directoryName: "test",
      numberOfIndences: 0,
      second: "┬",
      third: "─",
  },
  {
      lineId: 1,
      directoryName: "asd",
      numberOfIndences: 1,
      second: "┬",
      third: "─",
  },
  {
      lineId: 2,
      directoryName: "qwe",
      numberOfIndences: 2,
      second: "─",
      third: "─",
  },
  {
      lineId: 3,
      directoryName: "gfhj",
      numberOfIndences: 2,
      second: "─",
      third: "─",
  },
  {
      lineId: 4,
      directoryName: "ads",
      numberOfIndences: 2,
      second: "┬",
      third: "─",
  },
  {
      lineId: 5,
      directoryName: "fgd",
      numberOfIndences: 3,
      second: "─",
      third: "─",
  },
  {
      lineId: 6,
      directoryName: "sdfg",
      numberOfIndences: 2,
      second: "─",
      third: "─",
  },
  {
      lineId: 7,
      directoryName: "cbv",
      numberOfIndences: 1,
      second: "─",
      third: "─",
  },
];

const OBJECT_ARRAY_HAS_FIRST_BRANCH = [
  {
      lineId: 0,
      directoryName: "test",
      numberOfIndences: 0,
      first: "└",
      second: "┬",
      third: "─",
      vertical: [],
  },
  {
      lineId: 1,
      directoryName: "asd",
      numberOfIndences: 1,
      first: "├",
      second: "┬",
      third: "─",
      vertical: [1],
  },
  {
      lineId: 2,
      directoryName: "qwe",
      numberOfIndences: 2,
      first: "├",
      second: "─",
      third: "─",
      vertical: [1],
  },
  {
      lineId: 3,
      directoryName: "gfhj",
      numberOfIndences: 2,
      first: "├",
      second: "─",
      third: "─",
      vertical: [1],
  },
  {
      lineId: 4,
      directoryName: "ads",
      numberOfIndences: 2,
      first: "├",
      second: "┬",
      third: "─",
      vertical: [1],
  },
  {
      lineId: 5,
      directoryName: "fgd",
      numberOfIndences: 3,
      first: "└",
      second: "─",
      third: "─",
      vertical: [1,2],
  },
  {
      lineId: 6,
      directoryName: "sdfg",
      numberOfIndences: 2,
      first: "└",
      second: "─",
      third: "─",
      vertical: [1],
  },
  {
      lineId: 7,
      directoryName: "cbv",
      numberOfIndences: 1,
      first: "└",
      second: "─",
      third: "─",
      vertical: [],
  },
];

const OBJECT_ARRAY_HAS_VERTICAL_BRANCH = [
  {
      lineId: 0,
      directoryName: "test",
      numberOfIndences: 0,
      first: "└",
      second: "┬",
      third: "─",
      vertical: [],
  },
  {
      lineId: 1,
      directoryName: "asd",
      numberOfIndences: 1,
      first: "├",
      second: "┬",
      third: "─",
      vertical: [],
  },
  {
      lineId: 2,
      directoryName: "qwe",
      numberOfIndences: 2,
      first: "├",
      second: "─",
      third: "─",
      vertical: [1],
  },
  {
      lineId: 3,
      directoryName: "gfhj",
      numberOfIndences: 2,
      first: "├",
      second: "─",
      third: "─",
      vertical: [1],
  },
  {
      lineId: 4,
      directoryName: "ads",
      numberOfIndences: 2,
      first: "├",
      second: "┬",
      third: "─",
      vertical: [1],
  },
  {
      lineId: 5,
      directoryName: "fgd",
      numberOfIndences: 3,
      first: "└",
      second: "─",
      third: "─",
      vertical: [1,2],
  },
  {
      lineId: 6,
      directoryName: "sdfg",
      numberOfIndences: 2,
      first: "└",
      second: "─",
      third: "─",
      vertical: [1],
  },
  {
      lineId: 7,
      directoryName: "cbv",
      numberOfIndences: 1,
      first: "└",
      second: "─",
      third: "─",
      vertical: [],
  },
];

const FILETREE_SCATTERED_HOLE_HTML_RESULT = `<div class="parsed-data">
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
    </div>`;

/**
 * @since v0.2.0
 */
const OBJECT_ARRAY_VERTICAL_BRANCH = [{
    "lineId": 0,
    "directoryName": "wertwert",
    "first": "├",
    "numberOfIndences": 0,
    "second": "┬",
    "third": "─",
    "vertical": [0]
}, {
    "lineId": 1,
    "directoryName": "wertwert",
    "first": "├",
    "numberOfIndences": 1,
    "second": "┬",
    "third": "─",
    "vertical": [0]
}, {
    "lineId": 2,
    "directoryName": "ewrtwetr",
    "first": "└",
    "numberOfIndences": 2,
    "second": "─",
    "third": "─",
    "vertical": [0, 1]
}, {
    "lineId": 3,
    "directoryName": "ewrtwter",
    "first": "└",
    "numberOfIndences": 1,
    "second": "┬",
    "third": "─",
    "vertical": [0]
}, {
    "lineId": 4,
    "directoryName": "ewrtewrt",
    "first": "└",
    "numberOfIndences": 2,
    "second": "┬",
    "third": "─",
    "vertical": [0]
}, {
    "lineId": 5,
    "directoryName": "ewrtetrw",
    "first": "└",
    "numberOfIndences": 3,
    "second": "┬",
    "third": "─",
    "vertical": [0]
}, {
    "lineId": 6,
    "directoryName": "erwtewrt",
    "first": "└",
    "numberOfIndences": 4,
    "second": "─",
    "third": "─",
    "vertical": [0]
}, {
    "lineId": 7,
    "directoryName": "test",
    "first": "└",
    "numberOfIndences": 0,
    "second": "┬",
    "third": "─",
    "vertical": []
}, {
    "lineId": 8,
    "directoryName": "asd",
    "first": "├",
    "numberOfIndences": 1,
    "second": "┬",
    "third": "─",
    "vertical": [1]
}, {
    "lineId": 9,
    "directoryName": "qwe",
    "first": "├",
    "numberOfIndences": 2,
    "second": "─",
    "third": "─",
    "vertical": [1]
}, {
    "lineId": 10,
    "directoryName": "gfhj",
    "first": "├",
    "numberOfIndences": 2,
    "second": "─",
    "third": "─",
    "vertical": [1]
}, {
    "lineId": 11,
    "directoryName": "ads",
    "first": "├",
    "numberOfIndences": 2,
    "second": "┬",
    "third": "─",
    "vertical": [1]
}, {
    "lineId": 12,
    "directoryName": "fgd",
    "first": "└",
    "numberOfIndences": 3,
    "second": "─",
    "third": "─",
    "vertical": [1, 2]
}, {
    "lineId": 13,
    "directoryName": "sdfg",
    "first": "└",
    "numberOfIndences": 2,
    "second": "─",
    "third": "─",
    "vertical": [1]
}, {
    "lineId": 14,
    "directoryName": "cbv",
    "first": "└",
    "numberOfIndences": 1,
    "second": "─",
    "third": "─",
    "vertical": []
}]

export {

  // 샘플 인풋
  SAMPLE_A,
  SAMPLE_B,
  SAMPLE_C,
  SAMPLE_SCATTERED_HOLE,
  SAMPLE_EMPTY,
  SAMPLE_ONLY_ROOT,
  SAMPLE_BUG,
  SAMPLE_BUG_AND_SCATTERED_HOLE,
  SAMPLE_ORDERED_NAME,

  // 예상 결과
  SAMPLE_SCATTERED_HOLE_RESULT,
  OBJECT_ARRAY_HAS_BLANKS,
  OBJECT_ARRAY_HAS_THIRD_BRANCH,
  OBJECT_ARRAY_HAS_SECOND_BRANCH,
  OBJECT_ARRAY_HAS_FIRST_BRANCH,
  OBJECT_ARRAY_HAS_VERTICAL_BRANCH,
  OBJECT_ARRAY_VERTICAL_BRANCH,

  // html result
  SAMPLE_A_RESULT,
  FILETREE_SCATTERED_HOLE_HTML_RESULT,
};