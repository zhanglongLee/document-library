<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <m-card
            imgSrc="python.png"
            summary="程序员理财课 Python量化交易系统实战"
        >
        </m-card>
        <br>
        <m-card
            imgSrc="springboot.png"
            summary="SpringBoot 2.x 实战仿B站高性能后端项目"
        >
            <template v-slot:footer>
                <div class="footer">
                  <div class="number">中级 · 134报名</div>
                  <div class="price">￥1234</div>
                </div>
            </template>
        </m-card>
        <br>
        <m-card
            imgSrc="vue.png"
            :width="400"
            :imgHeight="160"
        >
        基于Vue3最新标准，实现后台前端综合解决方案
            <template v-slot:footer>
                <div class="footer">
                  <div class="number">高级 · 546报名</div>
                  <div class="price">￥2234</div>
                </div>
            </template>
        </m-card>
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.footer{
    padding: 0 10px;
  text-align: left;
}
.footer .number{
  font-size: 12px;
  color: #9199a1;
  margin: 8px 0;
}
.footer .price{
  font-size: 14px;
  color: #f01414;
  font-weight: bold;
}
</style>
