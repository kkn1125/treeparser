import * as module from './SpaceLength'

const inputs = 
`
test
 wow
  tree
 good
hm
 good
 test
  wow
   kimson
    dobby
  ket
 dogs
`.trim();

const outputs =
`
test
─wow
──tree
─good
hm
─good
─test
──wow
───kimson
────dobby
──ket
─dogs
`.trim();

test('null, undefined, 빈 문자 검증', () => {
    expect(module.isNullable(undefined)).toBeTruthy();
    expect(module.isNullable(null)).toBeTruthy();
});

test('정수, 소수인지 검증', () => {
    expect(module.validNumberOrDigit(321.23)).toBeTruthy();
    expect(module.validNumberOrDigit(321)).toBeTruthy();
    expect(module.validNumberOrDigit(0)).toBeTruthy();
    expect(module.validNumberOrDigit('0a')).toBeFalsy();
});

test('빈 문자열 검증', () => {
    expect(module.isEmpty('')).toBeTruthy();
    expect(module.isEmpty(undefined)).toBeNull();
    expect(module.isEmpty(null)).toBeNull();
});

test('문자열이 있는지 검증', () => {
    expect(module.isNotEmpty(' ')).toBeTruthy();
    expect(module.isNotEmpty('0')).toBeTruthy();
    expect(module.isNotEmpty('3')).toBeTruthy();
    expect(module.isNotEmpty(323)).toBeNull();
    expect(module.isNotEmpty(3+'qwe')).toBeTruthy();
    expect(module.isNotEmpty(' '+3)).toBeTruthy();
});

test('공백 배열 다중 여부 검증', () => {
    expect(module.isMultiSpace(['  ', ' '])).toBeTruthy();
    expect(module.isMultiSpace(['  '])).toBeFalsy();
});

test('공백 중 문자 끼여있는지 테스트 (ex: \s\s힣\s가나다)', () => {
    expect(module.hasCharInSpace('')).toBeFalsy();
    expect(module.hasCharInSpace(' ')).toBeFalsy();
    expect(module.hasCharInSpace(' ㄷ test')).toBeTruthy();
    expect(module.hasCharInSpace('  test')).toBeFalsy();
});

test('공백 길이 테스트', () => {
    expect(module.spaceLength('  te st')).toBe(-1);
    expect(module.spaceLength(' '.repeat(10)+'test')).toBe(10);
    expect(module.spaceLength('  test')).toBe(2);
    expect(module.spaceLength('test')).toBe(0);
    expect(module.spaceLength('  ')).toBe(2);
    expect(module.spaceLength('')).toBe(0);
});

test('문자를 줄바꿈 기준으로 배열 얻기', () => {
    const input = 
`
test
 test
 test
`.trim();
    const output = ['test',' test',' test'];
    expect(module.getLines(input)).toEqual(output);
});

test('공백 잘라내기', () => {
    expect(module.cleanSpace('  te st')).toBe('te st');
});

test('가지 그리기', () => {
    expect(module.drawBranch('test')).toBe('test');
    expect(module.drawBranch(' test')).toBe('─test');
    expect(module.drawBranch(' t est')).toBe(' t est [X]');
});

test('트리 그리기', () => {
    expect(module.drawFileTree(inputs)).toEqual(outputs);
});

test('항목 서로 비교하기', () => {
    expect(module.compareWith(' test', 'test')).toBe(-1);
    expect(module.compareWith('test', ' test')).toBe(1);
    expect(module.compareWith('test', 'test')).toBe(0);
});

test('스텝 값으로 루프돌기', () => {
    expect(module.rangeLoop(['list', 'test'], 1)).toEqual(['list', 'test']);
    expect(module.rangeLoop(['list', 'test', 'gogo'], 2)).toEqual(['list', 'test', 'gogo']);
})

// test('하위 항목 개수 표시', () => {
//     expect(module.childCount(inputs)).toEqual(outputs);
// });