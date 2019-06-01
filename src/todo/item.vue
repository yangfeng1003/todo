<template>
    <div :class="['todo-item', todo.completed ? 'completed' : '']">
        <input class="toggle"
            type="checkbox"
            v-model="todo.completed"
        >
        <label class="label">{{todo.content}}</label>
        <button class="delete" @click="deleteTodo"></button>
    </div>
</template>

<script>
    export default {
        props:{
            todo:{
                type:Object,
                required:true
            }
        },
        methods:{
            deleteTodo(){
                this.$emit('del',this.todo.id); /*父子组件，子组件emit一个del事件*/
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .todo-item{
        position: relative
        width 700px
        height auto
        margin 0 auto
        background-color #fff
        font-size 24px
        box-shadow: inset 0 -1px 3px rgba(0,0,0,0.1)
        &:hover{
            .delete:after{
                content '×'
            }
        }
    }
    .toggle{
        position: absolute;
        width: 50px;
        height: 40px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        text-align: center;
        border: none;
        appearance: none;
        outline none
        &:after{
            content url('../assets/images/round.svg')
        }
        &:checked:after{
            content url('../assets/images/done.svg')
        }
    }
    .label{
        display block
        font-size 24px
        font-weight:400
        font-smoothing: antialiased
        white-space pre-line
        word-break break-all
        padding 12px 60px 15px 13px
        margin-left 45px
        line-height 1.2em
        color:#000
        transition color 0.4s
    }
    &.completed{
        .label{
            color #d9d9d9
            text-decoration line-through
        }
        /*&.check{}*/

    }
    .delete{
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        transition: color 0.4s ease-out;
        background-color transparent
        appearance none
        border-width 0
        cursor pointer
        outline none
    }
</style>