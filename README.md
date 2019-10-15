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



