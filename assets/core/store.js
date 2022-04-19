const isBase = function () {return [...arguments].some(compare=>location.hostname == compare)};

/* istanbul ignore next */
console.test = function (...args) {
    if(isBase('127.0.0.1', 'localhost')) console.warn(...args);
}

/* istanbul ignore next */
console.mark = function (...args) {
    if(isBase('127.0.0.1', 'localhost')) console.debug(...args);
}

/* istanbul ignore next */
const manageHandler = {
    apply (target, thisArg, args) {
        const [key, value] = args;
        if(typeof key != 'string') {
            console.mark('[TypeError] key는 문자여야합니다!');
            delete thisArg['valid'];
            return false;
        } else {
            if(args.length == 1) {
                if(key in thisArg) {
                    delete thisArg['valid'];
                    return thisArg[key];
                } else {
                    if(!(key in thisArg)) {
                        console.mark(`[NoProperty] ${key}는 존재하지 않습니다.`);
                    }
                    delete thisArg['valid'];
                    return false;
                }
            } else if(args.length == 2) {
                return thisArg[key] = value;
            }
        }
        Reflect.apply(target, thisArg, args);
    }
};

/* istanbul ignore next */
const storeHandler = {
    set (obj, prop, val) {
        if(obj['valid']) {
            obj[prop] = val;
            delete obj['valid'];
        }

        return true;
    },
    get (obj, prop, proxy) {
        if(typeof obj[prop] == 'function' && prop == 'manager') {
            obj['valid'] = true;
            return Reflect.get(...arguments);
        }

        return false;
    }
};
const manager = new Proxy(function () {}, manageHandler);
const store = new Proxy({manager}, storeHandler);

export {store};