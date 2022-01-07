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
