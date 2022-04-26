/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : demo 페이지 구동 자바스크립트
 * 
 * @author    kimson <chaplet01@gmail.com>
 * @github    https://github.com/kkn1125
 * @written   2022-04-19 13:07:01
 * @modified  2022-04-26 23:24:10
 * @since     v0.1.0
 * @currently v0.2.1
 */

"use strict";

import { isDeepCopy } from '../../core/module/parts/filterTools.js';
import {
    OptionalParser
} from '../../core/parser.js';

import {
    store
} from '../../core/store.js';

const options = {
    app: '#app',
    branches: {
        first: {
            only: '└',
            brother: '├',
        },
        second: {
            only: '─',
            child: '┬',
        },
        third: '─',
        vertical: '│',
    },
    style: {
        directory: ['badge', 'bg-info'],
        offset: 0 // default : 0
    }
};

store.manager('branches', isDeepCopy({}, options.branches));
store.manager('style', isDeepCopy({}, options.style));

const TreeParser    = OptionalParser.init(options);
const parser        = new TreeParser();
// const trimedSources = SAMPLE_ORDERED_NAME.trim();

// const a = parser.parse(trimedSources).renderTree(getElement(options.app));