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
     主要是利用闭包来保持着作用域：
     ``` javascript
        function add() {
            var num = 0
            return function(a) {
                return num = num + a
            }
        }
        var adder = add()

        adder(1)     // 输出: 1
        adder(2)     // 输出: 3

     ```
1.  柯里化     
    柯里化（Currying），又称部分求值（Partial Evaluation），是把接受多个参数的原函数变换成接受一个单一参数（原函数的第一个参数）的函数，并且返回一个新函数，新函数能够接受余下的参数，最后返回同原函数一样的结果。
    - 1.1 柯里化有 3 个常见作用：参数复用,提前返回,延迟计算 / 运行
    柯里化通用实现:
    ``` javascript
        // ES5 方式
        function currying(fn) {
            var rest1 = Array.prototype.slice.call(arguments)
            rest1.shift()
            return function() {
                var rest2 = Array.prototype.slice.call(arguments)
                return fn.apply(null, rest1.concat(rest2))
            }
        }

        // ES6 方式
        function currying(fn, ...rest1) {
            return function(...rest2) {
                return fn.apply(null, rest1.concat(rest2))
            }
        }

    ```
    用它将一个 sayHello  函数柯里化试试：
    ``` javascript

        // 接上面
        function sayHello(name, age, fruit) {
        console.log(`我叫 ${name},我 ${age} 岁了, 我喜欢吃 ${fruit}`)
        }

        var curryingShowMsg1 = currying(sayHello, '小明')
        curryingShowMsg1(22, '苹果')           // 输出: 我叫 小明,我 22 岁了, 我喜欢吃 苹果

        var curryingShowMsg2 = currying(sayHello, '小衰', 20)
        curryingShowMsg2('西瓜')               // 输出: 我叫 小衰,我 20 岁了, 我喜欢吃 西瓜

    ```
2.  反柯里化
    柯里化是固定部分参数，返回一个接受剩余参数的函数，也称为部分计算函数，目的是为了缩小适用范围，创建一个针对性更强的函数。核心思想是把多参数传入的函数拆成单参数（或部分）函数，内部再返回调用下一个单参数（或部分）函数，依次处理剩余的参数。
    而反柯里化，从字面讲，意义和用法跟函数柯里化相比正好相反，扩大适用范围，创建一个应用范围更广的函数。使本来只有特定对象才适用的方法，扩展到更多的对象。
    反柯里化通用实现：
    ``` javascript
        // ES5 方式
        Function.prototype.unCurrying = function() {
            var self = this
            return function() {
                var rest = Array.prototype.slice.call(arguments)
                return Function.prototype.call.apply(self, rest)
            }
        }

        // ES6 方式
        Function.prototype.unCurrying = function() {
            const self = this
            return function(...rest) {
                return Function.prototype.call.apply(self, rest)
            }
        }

    ```
    如果你觉得把函数放在 Function 的原型上不太好，也可以这样：

    ``` javascript

        // ES5 方式
        function unCurrying(fn) {
            return function (tar) {
                var rest = Array.prototype.slice.call(arguments)
                rest.shift()
                return fn.apply(tar, rest)
            }
        }

        // ES6 方式
        function unCurrying(fn) {
            return function(tar, ...argu) {
                return fn.apply(tar, argu)
            }
        }
    ```
    下面简单试用一下反柯里化通用实现，我们将 Array 上的 push  方法借出来给 arguments 这样的类数组增加一个元素：
    ``` javascript

        // 接上面
        var push = unCurrying(Array.prototype.push)

        function execPush() {
            push(arguments, 4)
            console.log(arguments)
        }

        execPush(1, 2, 3)    // 输出: [1, 2, 3, 4]

    ```
    可以这样理解柯里化和反柯里化的区别：
    柯里化是在运算前提前传参，可以传递多个参数；
    反柯里化是延迟传参，在运算时把原来已经固定的参数或者 this 上下文等当作参数延迟到未来传递。

    1.  单例模式 
        惰性单例又被成为懒汉式，相对应的概念是饿汉式：
        - 懒汉式单例是在使用时才实例化
        - 饿汉式是当程序启动时或单例模式类一加载的时候就被创建。

    ```   javascript
        
           class FuncClass {
                constructor() { this.bar = 'bar' }
            }

            // 饿汉式
            const HungrySingleton = (function() {
                const _instance = new FuncClass()
                
                return function() {
                    return _instance
                }
            })()

            // 懒汉式
            const LazySingleton = (function() {
                let _instance = null
                
                return function() {
                    return _instance || (_instance = new FuncClass())
                }
            })()

            const visitor1 = new HungrySingleton()
            const visitor2 = new HungrySingleton()
            const visitor3 = new LazySingleton()
            const visitor4 = new LazySingleton()

            console.log(visitor1 === visitor2)	// true
            console.log(visitor3 === visitor4)	// true 
            

    ```   

    2.  单例模式的优缺点
        单例模式主要解决的问题就是节约资源，保持访问一致性
        - 1.  简单分析一下它的优点：
            - 单例模式在创建后在内存中只存在一个实例，节约了内存开支和实例化时的性能开支，特别是需要重复使用一个创建开销比较大的类时，比起实例不断地销毁和重新实例化，单例能节约更多资源，比如数据库连接；
            - 单例模式可以解决对资源的多重占用，比如写文件操作时，因为只有一个实例，可以避免对一个文件进行同时操作；
            - 只使用一个实例，也可以减小垃圾回收机制 GC（Garbage Collecation） 的压力，表现在浏览器中就是系统卡顿减少，操作更流畅，CPU 资源占用更少；
        - 2. 单例模式也是有缺点的
            - 单例模式对扩展不友好，一般不容易扩展，因为单例模式一般自行实例化，没有接口；
            - 与单一职责原则冲突，一个类应该只关心内部逻辑，而不关心外面怎么样来实例化；
    3.  单例模式的使用场景
        当一个类的实例化过程消耗的资源过多，可以使用单例模式来避免性能浪费；
        当项目中需要一个公共的状态，那么需要使用单例模式来保证访问一致性.            