<template>
    <div class="helper">
        <span class="left">{{todoNumber}}&nbsp;&nbsp;items</span>
        <span class="tabs">
            <span
                v-for="state in states"
                :key="state"
                :class="[state,filter === state?'filter':'']"
                @click="toggleFilter(state)"
            >
                {{state}}
            </span>
        </span>
        <span class="clear" @click="clearCompleted">clear completed</span>
    </div>
</template>

<script>
    export default {
        name: "tab",
        props:{
            filter:{
                type:String,
                required:true
            },
            todos:{
                type: Array,
                required: true
            }
        },

        data() {
            return {
                states:['all','active','completed'],
            }
        },
        computed:{
            todoNumber(){
                return this.todos.filter(item=>item.completed === false).length
            }
        },
        methods:{
            toggleFilter(state){
                this.$emit('toggle',state)
            },
            clearCompleted(){
                this.$emit('clearAll')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .helper{
        width 700px
        height auto
        margin 0 auto
        font-weight 400
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #fff
        font-size 18px
        font-smoothing: antialiased
    }
    .left, .clear, .tabs{
        padding 0 10px
        box-sizing border-box
    }
    .left, .clear{
        width 200px
    }
    .left{
        text-align left
    }
    .clear{
        text-align right
        cursor pointer
    }
    .tabs{
        width 200px
        display flex
        justify-content space-around
        * {
            display inline-block
            padding 0 10px
            cursor pointer
            border 1px solid rgba(175,47,47,0)
            &.filter{
                border-color rgba(175,47,47,0.4)
                border-radius 5px
            }
        }
    }
</style>