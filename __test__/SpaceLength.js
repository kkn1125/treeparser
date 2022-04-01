// const hasChar = /\b(?<=\s+)[\s\S]+/g;
// 앞 공백 외의 문자 찾기(공백포함된 문자 포함)

const hasSpace = /\s/g;
// 문자 내 개별 공백 찾기

const spaceValidate = /\s+(?=[\s\S]+)/g;
// 공백 뭉텅이를 찾는데, 문자 사이 공백도 같이 찾음
// 즉, 공백 배열이 1개면 앞 공백만, 1개 초과면 잘못된 형식

export const isNullable = function (valid) {
    return valid == '' ? false : !valid;
}

export const validNumberOrDigit = function (valid) {
    return typeof valid == 'number';
}

export const isMultiSpace = function (list) {
    return list.length > 1;
}

export const isEmpty = function (str) {
    return isNullable(str) || validNumberOrDigit(str) ? null : str.length == 0;
}

export const isNotEmpty = function (str) {
    return isNullable(str) || validNumberOrDigit(str) ? null : str.length > 0;
}

export const noSpace = function (str) {
    return !str.match(hasSpace);
}

export const hasCharInSpace = function (str) {
    const validateMatches = str.match(spaceValidate);
    if(isNullable(validateMatches)) return false;
    return isMultiSpace(validateMatches);
}

export const spaceLength = function (str) {
    if (noSpace(str)) return 0;
    if (hasCharInSpace(str)) return -1;
    return str.match(hasSpace).length;
}

export const getLines = function (inputs) {
    return inputs.split(/\n/g);
}

export const cleanSpace = function (line) {
    return line.replace(/^\s+/g, '');
}

export const drawBranch = function (line) {
    if(hasCharInSpace(line)) return line+' [X]';
    const count = spaceLength(line);
    const cleanedLine = cleanSpace(line);
    return `${'─'.repeat(count)}${cleanedLine}`;
}

export const drawFileTree = function (inputs) {
    const lines = getLines(inputs);
    return lines.map(drawBranch).join('\n');
}

export const compareWith = function (first, second) {
    const [a, b] = [spaceLength(first), spaceLength(second)];
    const gap = a-b;
    if(gap>0) return -1;
    return gap<0?1:0;
}

export const rangeLoop = function (origin, amount=1){
    const len = origin.length - amount;
    for(let i=0; i<=len; i++) {
        console.log(origin.slice(i, i+amount))
    }
    return origin;
}

// export const childCount = function (first, second) {
//     compareWith(first, second)
// }