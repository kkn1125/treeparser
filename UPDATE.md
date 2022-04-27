# UPDATE

> author   kimson
> blog     https://kimson.github.io/
> modified 2022-04-27 13:16:41

- v0.2.2
  - 수정:
    - Demo site UI 수정
    - `Controller`의 이벤트 실행 제한
    - `isBase` 판별식 수정
    - regexp `BLANK` 정규식 수정
    - 메서드 명 변경 `isDeepCopy` ⇒ `deepCopy`
    - `filterTools.js` 커스터마이징 옵션 반영
  - *버그수정: 트리 렌더링 시 디렉토리 명에 공백 수 포함해서 브랜치 어긋나는 현상
  - 추가:
    - CDN 사용방법 추가
    - option.`style` 옵션 추가 : `directory`, `offset` 속성
    - option.`indent` 옵션 추가 : 기본 들여쓰기 반응 값 `{int}`
- v0.2.1
  - 수정:
    - store 수정
    - 브랜치 커스터마이징 설정
  - 버그: 디렉토리에 공백 있을 시 브랜치 어긋나는 문제
  - 개선사항:
    - API 사용
    - 브랜치 커스터마이징
    - 결과 카피 버튼
- v0.2.0
  - 수정:
    - addFirstBranch 메서드 재작성 (v0.1.0과 호환 안 됨)
    - firstBranch 판별 방식
       - 형제 브랜치 및 자식 브랜치 판별하고 스위치 방식의 로직 적용
    - 메서드 변동
       - setFirstBranch          [ 수정 ]
       - isStrictSame            [ 삭제 ]
       - changeBrotherToVertical [ 수정 ]
       - treeFormatter           [ 수정 ]
  - 추가:
    - v0.2.0으로 업데이트
    - 재작성한 로직에 관한 테스터 케이스
    - 파싱된 각 라인에 `id`부여
  - 개선사항:
    - API 사용
    - 커스터마이징 적용
    - 결과 카피 버튼
    - Demo 사이트 UI 변경
- v0.1.0
   - 수정:
    - TreeParser로 이름 변경
    - 시험 배포
    - TDD로 버그 확률 대폭 감소
    - 기존 버전 삭제