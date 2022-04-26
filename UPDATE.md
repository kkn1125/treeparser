# UPDATE

> author kimson
> blog   https://kimson.github.io/

## v0.2.1

### 수정

1. store 수정
2. 브랜치 커스터마이징 설정


### 개선사항

1. 브랜치 커스터마이징

> 2022-04-26 23:29:04

-----

## v0.2.0

### 수정

1. addFirstBranch 메서드 재작성 (v0.1.0과 호환 안 됨)
2. firstBranch 판별 방식
   - 형제 브랜치 및 자식 브랜치 판별하고 스위치 방식의 로직 적용
3. 메서드 변동
   - setFirstBranch          [ 수정 ]
   - isStrictSame            [ 삭제 ]
   - changeBrotherToVertical [ 수정 ]
   - treeFormatter           [ 수정 ]

### 추가

1. v0.2.0으로 업데이트
2. 재작성한 로직에 관한 테스터 케이스
3. 파싱된 각 라인에 `id`부여

### 개선사항

1. API 사용
2. 커스터마이징 적용
3. 결과 카피 버튼
4. Demo 사이트 UI 변경

> 2022-04-21 12:41:38

-----

## v0.1.0

1. TreeParser로 이름 변경
2. 시험 배포
3. TDD로 버그 확률 대폭 감소
4. 기존 버전 삭제

> 2022-04-19 22:10:36