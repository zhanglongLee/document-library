# 一.let、const

## let

1. 不能重复定义变量；
2. 块级作用域；
3. 不存在变量提升，称为`暂时性死区`；
4. 不影响作用域链

## const

1. 一定要赋初值，否则会报错；
2. 一般常量使用大写（潜规则）；
3. 常量的值不能修改；
4. 块级作用域；
5. 对于数组和对象的元素修改，不算做对常量的修改，不会报错；

# 二、解构赋值

## 数组解构

```javascript
const F4 = ["刘备","张飞","关羽","赵云"];
let [liu,zhang,guan,zhao] = F4;
console.log(liu);// 刘备
console.log(zhang);// 张飞
console.log(guan);// 关羽
console.log(zhao);// 赵云
```

## 对象结构

```javascript
const zhao = {
	name: "赵本山",
	age: "不详",
	xiaopin: function(){
		console.log("我会演小品");
	}
}
let {name, age, xiaopin} = zhao;
console.log(name);// 赵本山
console.log(age);// 不详
console.log(xiaopin);
xiaopin();// 我会演小品
```

# 三、箭头函数

- this 是**静态**的，this 始终是指向函数声明时所在作用域下的 this 的值；
- 不能做构造函数生成实例化对象；
- 不能使用 arguments 对象；
- 引入 rest 参数，用于获取函数的实参，用来代替 arguments；

```javascript
// rest 参数
const fn = (...args) => {
	console.log(args);// [1, 2, 3, 4] 它是数组，可以使用some，forEach，filter等等api
}
fn(1, 2, 3, 4);
```



## **箭头函数的简写**

- 省略小括号，当形参有且只有一个的时候；
- 省略花括号，当代码体只有一条return语句的时候， return 必须省略。而且语句的执行结果就是函数的返回值。

## 箭头函数的适用场景

- 与 this 无关的回调。定时器，数组的方法回调。
- 不适合与 this 有关的回调。DOM元素事件回调，对象的方法。

# 四、迭代器

`iteration`成为迭代器，又叫遍历器。

## **作用：**

1. 为各种数据结构，提供一个统一的、简便的访问接口；
2. 使得数据结构的成员能够按某种次序排列；
3. 主要供`for...of`消费

## **工作原理：**

- 创建一个指针对象，指向当前数据结构的起始位置
- 第一次调用对象的next方法，指针自动指向数据结构的第一个成员
- 接下来不断调用next方法，指针一直往后移动，直到指向最后一个成员
- 每调用next方法返回一个包含value和done属性的对象

```javascript
// 自定义迭代器
let obj = {
    name: '究极一班',
    stus: [
        'xiaoming',
        'wangwu',
        'zhaoliu',
        'lixing'
    ],
    [Symbol.iterator]: function () {
        // 索引
        let index = 0;

        return {
            next: () => {
                let result
                if (index < this.stus.length) {
                    result = { value: this.stus[index], done: false }
                    // 索引自增
                    index++
                } else {
                    result = { value: undefined, done: true }
                }
                return result
            }
        };
    }
}
for (let i of obj) {
    console.log(i);
    // xiaoming
    // wangwu
    // zhaoliu
    // lixing
}
```



在js里原生具备 Iterator 接口的数据结构如下：

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

## 使用场景：

- 结构赋值
- 扩展运算符
- generator函数。调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是返回一个遍历器对象
- Array.from()、Promise.all()等等

