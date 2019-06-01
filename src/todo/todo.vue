<template>
    <div>
        <section class="input-todo-section">
            <input
                    type="text"
                    class="input-todo"
                    placeholder="接下来要做什么"
                    autofocus="autofocus"
                    @keyup.enter="addTodo"
            >
        </section>
        <item
                v-for="todo in filterdTodos"
                :todo="todo"
                :key="todo.id"
                @del = "deleteTodo"
        />
        <Tabs :filter="filter"
              :todos="todos"
              @toggle = "toggleFilter"
              @clearAll = "clearAll"
        ></Tabs>
    </div>
</template>

<script>
    import Item from './item.vue'
    import Tabs from "./tabs.vue";
    let id = 0;
    export default {
        name: "todo.vue",
        components: {
            Tabs,
            Item
        },
        data(){
            return{
                todos:[],
                filter:'all'
            }
        },
        computed:{
            filterdTodos() {
                if(this.filter === 'all')
                    return this.todos;
                else{
                    /*if(this.filter === 'completed'){
                        return this.todos.filter(item => item.completed===true)
                    }else
                        return this.todos.filter(item => item.completed===false)*/
                    const completedFlag = this.filter === 'completed';
                    return this.todos.filter(item => item.completed===completedFlag)
                }
            }
        },
        methods:{
            addTodo(e){
                this.todos.unshift({
                    id:id++,
                    content:e.target.value.trim(),
                    completed:false
                });
                e.target.value = '';
            },
            deleteTodo(id){
                this.todos.splice(this.todos.findIndex(item=>item.id === id),1);
            },
            toggleFilter(state){
                this.filter = state
            },
            clearAll(){
                // this.todos = this.todos.filter(item => item.completed===false)
                this.todos = this.todos.filter(item => !item.completed)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .input-todo-section{
        width 700px
        height auto
        margin 0 auto
        box-shadow 0 0 5px #666
    }
    .input-todo{
        width: calc(100% - 75px);
        line-height:1.2em
        font-size 24px
        font-weight:300
        font-smoothing: antialiased
        padding:15px 15px 15px 60px
        border: none
        outline: none;  /*这样聚焦的时候就没有框了*/
        box-shadow: inset 0 -1px 3px rgba(0,0,0,0.1)
    }
</style>