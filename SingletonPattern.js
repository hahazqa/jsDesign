//单例模式
/***
 *  （Singleton Pattern）又称为单体模式，保证一个类只有一个实例，
 * 并提供一个访问它的全局访问点。也就是说，第二次使用同一个类创建新对象的时候，
 * 应该得到与第一次创建的对象完全相同的对象。
 */
//IIFE 方式创建单例模式
// const Singleton = (function() {
//   let _instance = null; // 存储单例

//   const Singleton = function() {
//     if (_instance) return _instance; // 判断是否已有单例
//     _instance = this;
//     this.init(); // 初始化操作
//     return _instance;
//   };

//   Singleton.prototype.init = function() {
//     this.foo = "Singleton Pattern";
//   };

//   Singleton.getlnstance = function() {
//       if(_instance) return _instance;
//       _instance = new Singleton();
//       return _instance;
//   }

//   return Singleton;
// })();

// const visitor1 = new Singleton();
// const visitor2 = new Singleton();
// const visitor3 = Singleton.getlnstance();
// console.log(visitor1 === visitor2); // true

//块级作用域方式创建单例

// let getlnstance

// {
//     let _instance = null;

//     const Singleton = function() {
//         if(_instance) return _instance;
//         _instance = this;
//         this.init();
//         return _instance;
//     }

//     Singleton.prototype.init = function() {
//         this.foo = "hahaha"
//     }

//     getlnstance = function() {
//         if(_instance) return _instance;
//         _instance = new Singleton();
//         return _instance;
//     }
// }

// const visitor1 = getInstance()
// const visitor2 = getInstance()

// console.log(visitor1 === visitor2)

/* 功能类 */
// class FuncClass {
//   constructor(bar) {
//     this.bar = bar;
//     this.init();
//   }

//   init() {
//     this.foo = "Singleton Pattern";
//   }
// }

// /* 单例模式的赋能类 */
// const Singleton = (function() {
//   let _instance = null; // 存储单例

//   const ProxySingleton = function(bar) {
//     if (_instance) return _instance; // 判断是否已有单例
//     _instance = new FuncClass(bar);
//     return _instance;
//   };

//   ProxySingleton.getInstance = function(bar) {
//     if (_instance) return _instance;
//     _instance = new Singleton(bar);
//     return _instance;
//   };

//   return ProxySingleton;
// })();

// const visitor1 = new Singleton("单例1");
// const visitor2 = new Singleton("单例2");
// const visitor3 = Singleton.getInstance();

// console.log(visitor1 === visitor2); // true
// console.log(visitor1 === visitor3); // true 112

class FuncClass {
    constructor() { this.bar = 'bar' }
}

// 饿汉式
const HungrySingleton = (function() {
    const _instance = new FuncClass()
    console.log(3333);
    
    return function() {
        console.log(444);
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
console.log(visitor1.bar)	// true
console.log(visitor3 === visitor4)	// true
