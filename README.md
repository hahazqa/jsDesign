# jsDesign
js 设计模式学习
## 1. this 指向的类型
this 在函数的指向有以下几种场景：
1.  作为构造函数被 new 调用；
    - 1.1 new绑定 
    ``` javascript
        function Foo() {
            console.log(this)
        }
        var bar = new Foo()       // 输出: Foo 实例，this 就是 bar

    ``` 
      实际上使用 new 调用构造函数时，会依次执行下面的操作：
      1.    创造一个新对象；
      2.    构造函数的 prototype 被赋值给新对象的 __proto__；
      3.    将新对象赋给当前的 this；
      4.    执行构造函数；
      5.    如果函数没有返回其他的对象，那么 new 表达式中的函数调用会自动返回这个新对象，如果返回的不是对象将被忽略；
2.  作为对象的方法使用；
3.  作为函数直接调用；
4.  被 call ，apply， bind 调用；
5.  箭头函数中的 this；
## 2. this绑定的优先级
    优先级：new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定
1.  new 绑定：函数是否在 new 中调用？如果是的话 this 绑定的是新创建的对象；
2.  显示绑定：函数是否是通过 bind，call，apply 调用？如果是的话，this 绑定的是指定的对象；
3.  隐试绑定：函数是否在某个上下文对象中调用？如果是的话， this 绑定的是那个上下对象；
4.  如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined， 否则绑定到全局对象；
## 1. this 闭包与高阶函数
1.  闭包
    - 1.1 什么是闭包
    当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数在当前词法作用域之外执行。
    列子：
    ``` javascript
        function foo() {
            var a = 2
            
            function bar() {
                console.log(a)
            }

            return bar
        }

        var baz = foo()

        baz()            // 输出: 2

    ```
    - 1.2 利用闭包实现结果缓存（备忘录模式）
    
     ``` javascript
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
            return a + 1
        }

        var adder = memorize(add)

        adder(1)            // 输出: 2    当前: cache: { '[1]': 2 }
        adder(1)            // 输出: 2    当前: cache: { '[1]': 2 }
        adder(2)            // 输出: 3    当前: cache: { '[1]': 2, '[2]': 3 }

    ```
2.  高阶函数
    就是输入参数里有函数，或者输出是函数的函数。
    - 2.1 函数作为参数
    这是我们最常看到的场景：回调函数。
    - 2.2 函数作为返回值
    另一个经常看到的高阶函数的场景是在一个函数内部输出另一个函数，比如：
     ``` javascript
        function foo() {
            return function bar() {}
        }

     ```
