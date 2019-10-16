/* 备忘函数 */
function memorize(fn) {
    var cache = {}
    return function() {
        var args = Array.prototype.slice.call(arguments)
        var key = JSON.stringify(args)
        return cache[key] || (cache[key] = fn.apply(fn, args))
    }
}

/* 复杂计算函数 */
function add(a) {
    console.log(34455);
    
    return a + 1
}

var adder = memorize(add)

adder(1)            // 输出: 2    当前: cache: { '[1]': 2 }
adder(1)            // 输出: 2    当前: cache: { '[1]': 2 }
adder(2)            // 输出: 3    当前: cache: { '[1]': 2, '[2]': 3 }

//es6
/* 备忘函数 */
function memorize(fn) {
    const cache = {}
    return function(...args) {
        const key = JSON.stringify(args)
        return cache[key] || (cache[key] = fn.apply(fn, args))
    }
}

/* 复杂计算函数 */
function add(a) {
    return a + 1
}

const adder = memorize(add)

adder(1)            // 输出: 2    当前: cache: { '[1]': 2 }
adder(1)            // 输出: 2    当前: cache: { '[1]': 2 }
adder(2)            // 输出: 3    当前: cache: { '[1]': 2, '[2]': 3 }