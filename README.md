# TreeParser

indence value로 File Tree를 실시간으로 생성.

## 작성자

[@kkn1125](mailto:chaple@gmail.com)

## 버전

v0.2.1

## 라이선스

[MIT License](https://github.com/kkn1125/filetree/blob/main/LICENSE)

## 목적

파일트리를 표현하는데 어려움이 있습니다. 특히나 특수문자를 하나하나 찾아 작성해야하는 번거로움 때문에 해당 기능을 구현하게 되었습니다.

## 기능

1. `indence` 1에 반응
2. 자식요소 표현 [ `┬` ]
3. 형제요소를 탐색해서 연결 표시 [ `│`, `├` ]
4. `pipeline`을 구성
5. 순차적 파싱
6. 파일트리 파싱 단계 객체 얻기
7. 파싱된 객체 원하는 엘리먼트에 출력
8. 브랜치 모양 커스터마이징

### 개선 사항

- [ ] 들여쓰기 값 커스터마이징 문제
- [ ] TreeParser를 API로 사용하는 문제
- [x] child만 있을 때 수직 선 생기는 버그 문제

## coverage 90%이상

![image](https://user-images.githubusercontent.com/71887242/165322944-524043b2-fb52-4d57-b40c-76c62c9ce5a4.png)