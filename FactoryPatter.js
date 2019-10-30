// //工厂模式的实例实现
// /** 饭店 */
// function restaurant(menu) {
//     switch (menu) {
//         case '鱼香肉丝':
//             return new YuXiangRouSi();
//             break;
//         case '宫保鸡丁':
//             return new GongBaoJiDin();
//             break;
//         default:
//             throw new Error('没有这个菜呀')
//             break;
//     }
// }

// function YuXiangRouSi() {
//     this.type = '鱼香肉丝'
// }
// YuXiangRouSi.prototype.eat = function () {
//     console.log(this.type + ' 真香~')
// }

// function GongBaoJiDin() {
//     this.type = '宫保鸡丁'
// }
// GongBaoJiDin.prototype.eat = function () {
//     console.log(this.type + ' 好吃~')
// }

// const ea1 = restaurant('鱼香肉丝');
// ea1.eat()
// const ea2 = restaurant('宫保鸡丁');
// const ea3 = restaurant('haha');

//es6 实现方法

class Restaurant {
    static getMenu(menu) {
        switch (menu) {
            case '鱼香肉丝':
                return new YuXiangRouSi()
            case '宫保鸡丁':
                return new GongBaoJiDin()
            default:
                throw new Error('这个菜本店没有 -。-')
        }
    }
}



class YuXiangRouSi {
    constructor() {
        this.type = '鱼香肉丝'
    }
    eat() {
        console.log(this.type + ' 真香~') 
    }
}

class GongBaoJiDin {
    constructor() {
        this.type = '宫保鸡丁'
    }
    eat() {
        console.log(this.type + ' 真香~233') 
    }
}

const dish1 = Restaurant.getMenu('鱼香肉丝')
dish1.eat()													 				 // 输出: 鱼香肉丝 真香~
// const dish2 = Restaurant.getMenu('红烧排骨')