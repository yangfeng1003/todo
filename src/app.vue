<template>
    <div id="app">
        <div id="cover"></div><!--虚化的背景-->
        <Header></Header>
        <todo></todo>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
import Todo from './todo/todo.vue'

export default {
    components:{
        Header,Footer,Todo
    }
}
</script>

<style lang="stylus" scoped>/*lang表示使用language使用哪个css预处理器  scoped表示这里定义的样式只在此组建有效，不会和其他同名格式冲突*/
    #app{
        position: absolute
        top: 0
        left:0
        right:0
        bottom:0
    }
    #cover{
        position: absolute
        top: 0
        left:0
        right:0
        bottom:0
        background-color #999
        opacity: .6;
        z-index -1
    }
</style>