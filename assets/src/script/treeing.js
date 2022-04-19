/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : demo 페이지 구동 자바스크립트
 * 
 * @author      kimson <chaplet01@gmail.com>
 * @github      https://github.com/kkn1125
 * @written_at  2022-04-19 13:07:01
 */

"use strict";

import { SAMPLE_SCATTERED_HOLE } from '../../../__test__/sample.js';
import { BRANCH_VERTICAL_ONLY } from '../../core/module/parts/constant.js';
import {
    OptionalParser
} from '../../core/parser.js';

const options = {};

const TreeParser             = OptionalParser.init(options);
const parser                 = new TreeParser();
const trimedSources          = SAMPLE_SCATTERED_HOLE.trim();
const convertedArray         = parser.stringToArray(trimedSources);
const numberOfIndences       = parser.countIndences(convertedArray);
const addedThirdBranchArray  = parser.addThirdBranch(numberOfIndences);
const addedSecondBranchArray = parser.addSecondBranch(addedThirdBranchArray);
const addedFirstBranchArray  = parser.addFirstBranch(addedSecondBranchArray);

console.log(addedFirstBranchArray);

document.body.innerHTML += `<div id="app" class="container">
    ${addedFirstBranchArray.map(line=>{
        return `<div>
            ${'　'.repeat(line.numberOfIndences).split('').map((l,i)=>line.vertical.some(x=>x==i)?BRANCH_VERTICAL_ONLY:l).join('')}${line.first}${line.second}${line.third}${line.directoryName}
        </div>`
    }).join('')}
</div>`;