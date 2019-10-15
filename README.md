# jsDesign
js 设计模式学习
## 1. this 指向的类型
this 在函数的指向有以下几种场景：
1.  作为构造函数被 new 调用；
    - ``` javascript
        function Foo() {
            console.log(this)
        }
        var bar = new Foo()       // 输出: Foo 实例，this 就是 bar

      ``` 

var bar = new Foo()       // 输出: Foo 实例，this 就是 bar
2.  作为对象的方法使用；
3.  作为函数直接调用；
4.  被 call ，apply， bind 调用；
5.  箭头函数中的 this；



