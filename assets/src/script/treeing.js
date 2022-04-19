/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : demo 페이지 구동 자바스크립트
 * 
 * @author   kimson <chaplet01@gmail.com>
 * @github   https://github.com/kkn1125
 * @written  2022-04-19 13:07:01
 * @modified 2022-04-19 21:26:59
 * @since    v0.1.0
 */

"use strict";

import { SAMPLE_BUG, SAMPLE_SCATTERED_HOLE } from '../../../__test__/sample.js';
import { getElement } from '../../core/module/parts/constant.js';
import {
    OptionalParser
} from '../../core/parser.js';

const options = {
    app: '#app',
};

const TreeParser    = OptionalParser.init(options);
const parser        = new TreeParser();
const trimedSources = SAMPLE_BUG.trim();

const a = parser.parse(trimedSources).renderTree(getElement(options.app));