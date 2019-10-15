// function foo ( name, price ) {
//     this.name = name;
//     this.price = price;
// }

// function Foo ( category, name, price ) {
//     foo.call(this,name,price);
//     // foo.apply(this, [name, price])    // apply 方式调用
//     this.category = category;
// }

// let FF = new Foo('食品', '汉堡', '5块钱');
// console.log(FF);
//es5 实现
Function.prototype.bind = Function.prototype.bind || function() {
    var self = this
    var rest1 = Array.prototype.slice.call(arguments)
    var context = rest1.shift()
    return function() {
        var rest2 = Array.prototype.slice.call(arguments)
        return self.apply(context, rest1.concat(rest2))
    }
}
// ES6 方式
Function.prototype.bind = Function.prototype.bind || function(...rest1) {
    const self = this
    const context = rest1.shift()
    return function(...rest2) {
        return self.apply(context, [...rest1, ...rest2])
    }
}

var food = {
    name: '汉堡',
    price: '5块钱',
    getPrice: function(place) {
        console.log(place + this.price)
    }
}

// food.getPrice('KFC ')   // 浏览器中输出: "KFC 5块钱"

var getPrice1 = food.getPrice.bind(food,'haha')
getPrice1()       // 浏览器中输出: "肯打鸡 7块钱"