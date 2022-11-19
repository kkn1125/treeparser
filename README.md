# TreeParser

> indence value로 File Tree를 실시간으로 생성.

파일 구조를 도식화할 때는 매우 번거롭습니다. 라이브러리, 프레임워크를 설명해야 하는 상황에 많은 하위 항목이 있다면 더욱 그럴 것 입니다. `TreeParser`는 편리하게 파일 구조를 도식화하는데 도움을 줍니다 😎

> 2022.07.01 자로 이모지 표시기능 추가하였습니다. 현재 타입스크립트와 리덕스, 리액트를 사용해서 해당 저장소 업데이트 예정입니다.

## 버전

v0.2.4

## 라이선스

[MIT License](https://github.com/kkn1125/filetree/blob/main/LICENSE)

## 목적

파일 구조를 표현하는데 어려움이 있습니다. 특수문자를 하나하나 찾아 작성해야하는 번거로움이 있고, 블로그나 설명을 위한 자료로써 필요한 상황을 위해서 개발하게 되었습니다.

## 사용 예제

1. `CDN`을 사용해서 `OptionalParser`를 `import`합니다.
2. `OptionalParser`의 `init`메서드를 호출합니다. 이때 사용자 옵션을 `object`로 작성해서 전달합니다.

> `init`메서드는 새로운 파서 객체를 반환하므로 저장해서 사용합니다.

```javascript
// main.js

import {OptionalParser} from 'https://cdn.jsdelivr.net/gh/kkn1125/treeparser@4c93b00/assets/core/parser.js';

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
        third: "─",
        vertical: "│",
    },
    style: {
        directory: ["badge", "bg-info"],
        offset: 1 // default : 0
    },
    emoji: { // v0.2.4 에서 추가 되었습니다!
        file: '📄',
        folder: '📂'
    },
    indent: 1
};

const TreeParser = OptionalParser.init(options);
const parser     = new TreeParser();

const source = getSomeSources;

// 파싱 후 출력
const parsed = parser.parse(source);
parsed.renderTree();

// 또는
parser.parse(source).renderTree();

// 위의 축약형 메서드
parser.renderParsedTree(source);

// 파싱된 객체를 반환합니다.
parser.parse(source).getParsedLines();
```

`parser`의 가용 메서드는 아래와 같습니다.

### TreeParser Methods

| Name  | Description | Parameters | Return |
| ----  | ----------- | ---------- | ------ |
| renderParsedTree | 원문 소스를 파싱하고 지정된 태그에 출력시킵니다 | `{string}` | `void` |
| parse | 원문을 파싱합니다 | `{string}` | `{Model}` |
| renderTree | 파싱된 원문을 지정된 태그에 출력시킵니다 | - | `void` |
| getParsedLines | 파싱된 객체를 반환합니다 | - | `{Object}` |

#### 메서드 관계

> > **renderParsedTree**
> `parse`와 `renderTree`를 함께 호출합니다.

> > **renderTree**
> `parse`메서드를 호출해야 사용가능합니다.

## 업데이트 내역

[업데이트 내역 참조](https://github.com/kkn1125/treeparser/blob/main/UPDATE.md)

## 정보

kimson - [@blog](https://kkn1125.github.io/) - [chaplet01@gmail.com](mailto:chaplet01@gmail.com)

MIT 라이센스를 준수하며 [``LICENSE``](https://github.com/kkn1125/treeparser/blob/main/LICENSE)에서 자세한 정보를 확인할 수 있습니다.

[https://github.com/kkn1125/treeparser/](https://github.com/kkn1125/treeparser/)

## 기능

1. 파일 구조 도식화
2. 파싱 옵션 커스터마이징
3. 도식화 된 파일 구조 출력
4. `indence`에 대응한 브랜치 관계를 분석

### 개선 사항

- [x] 들여쓰기 값 커스터마이징 문제
- [x] child만 있을 때 수직 선 생기는 버그 문제
- [ ] 데모 사이트 option generator 생성
- [ ] TreeParser를 API로 사용하는 문제

## 기여 방법

1. (<https://github.com/kkn1125/treeparser/fork>)을 포크합니다.
2. (`git checkout -b feature/fooBar`) 명령어로 새 브랜치를 만드세요.
3. (`git commit -am 'feat: Add some fooBar'`) 명령어로 커밋하세요.
4. (`git push origin feature/fooBar`) 명령어로 브랜치에 푸시하세요.
5. 풀리퀘스트를 보내주세요. 😄

## coverage 관리

![image](https://user-images.githubusercontent.com/71887242/165441924-3b669e9c-7adb-4e54-b3f6-9cb009d90bf7.png)