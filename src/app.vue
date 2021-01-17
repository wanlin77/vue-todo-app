<template>
  <div id="app">
    <div id="cover"></div>
    <todo-header></todo-header>
    <todo></todo>
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import TodoHeader from './todo/header.vue'
import TodoFooter from './todo/footer.jsx'
import todo from './todo/todo.vue'

export default {
  components: {
    TodoHeader,
    TodoFooter,
    todo
  }
}
</script>

// lang="stylus" 指定用 stylus-loader 去解析
<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.5;
  z-index: -1;
}
</style>