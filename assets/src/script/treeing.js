/**!
 * Copyright 2022. kkn1125 All rights reserved.
 *
 * 파일 트리 파싱 : demo 페이지 구동 자바스크립트
 *
 * @author    kimson <chaplet01@gmail.com>
 * @github    https://github.com/kkn1125
 * @written   2022-04-19 13:07:01
 * @modified  2022-07-01 21:38:45
 * @since     v0.1.0
 * @currently v0.2.4
 */

"use strict";

import { OptionalParser } from "../../core/parser.js";

/**
 * @since v0.2.2
 */
const options = {
  app: "#app",
  branches: {
    first: {
      only: "└",
      brother: "├",
    },
    second: {
      only: "─",
      child: "┬",
    },
    third: "",
    vertical: "│",
  },
  style: {
    directory: ["badge", "bg-info"],
    offset: 1,
    fontSize: 16,
  },
  emoji: null,
  indent: 1,
};

const TreeParser = OptionalParser.init(options);
const parser = new TreeParser();
