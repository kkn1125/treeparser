/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : 브랜치 모양
 * 
 * @author      kimson <chaplet01@gmail.com>
 * @github      https://github.com/kkn1125
 * @written_at  2022-04-19 13:07:01
 */

"use strict";

// 첫 번째 브랜치 기호 : 파일 디렉토리가 자신 하나 일 때
const BRANCH_VERTICAL_ONLY     = "│";
const BRANCH_FIRST_ONLY     = "└";
// 첫 번째 브랜치 기호 : 같은 디렉토리에 파일이 존재할 때
const BRANCH_FIRST_BROTHER  = "├";
// 두 번째 브랜치 기호 : 하위 디렉토리 없을 때
const BRANCH_SECOND_ONLY    = "─";
// 두 번째 브랜치 기호 : 하위 디렉토리 있을 때
const BRANCH_SECOND_CHILD   = "┬";
// 세 번째 브랜치 기호 : 항상 자신 디렉토리를 가리킴
const BRANCH_THIRD_ONLY     = "─";

export {
    BRANCH_VERTICAL_ONLY,
    BRANCH_FIRST_ONLY,
    BRANCH_FIRST_BROTHER,
    BRANCH_SECOND_ONLY,
    BRANCH_SECOND_CHILD,
    BRANCH_THIRD_ONLY
}