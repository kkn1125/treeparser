/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : 트리 입력 구문 테스트 케이스
 * 
 * @author   kimson <chaplet01@gmail.com>
 * @github   https://github.com/kkn1125
 * @written  2022-04-19 13:07:01
 * @modified 2022-04-19 21:26:59
 * @since    v0.1.0
 */

"use strict";

const SAMPLE_A = `
test
 test
  test
`;

const SAMPLE_B = `
test
 asd
 toto
  qwe
   cxvbxc
 gfhj
`;

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

const SAMPLE_EMPTY = ``;

const SAMPLE_ONLY_ROOT = ``;

const SAMPLE_BUG = `
wertwert
 wertwert
  ewrtwetr
 ewrtwter
  ewrtewrt
   ewrtetrw
    erwtewrt`;

export {
    SAMPLE_A,
    SAMPLE_B,
    SAMPLE_C,
    SAMPLE_SCATTERED_HOLE,
    SAMPLE_EMPTY,
    SAMPLE_ONLY_ROOT,
    SAMPLE_BUG
};