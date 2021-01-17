<template>
  <div class="helper">
    <span class="left">{{unFinishedTodoLength}} items left</span>
    <span class="tabs">
      <span
        v-for="state in status"
        :key="state.id"
        :class="[state, filter === state ? 'actived' : '']"
        @click="toggleFilter(state)"
      >
        {{ state }}
      </span>
    </span>

    <span class="right" @click="clearAllCompleted">Clear completed</span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      require: true,
    },
    todos: {
      filter: {
        type: Array,
        require: true
      }
    }
  },
  data() {
    return {
      status: ["all", "active", "completed"],
    };
  },
  computed: {
    unFinishedTodoLength() {
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    clearAllCompleted() {
      this.$emit('clearAllCompleted')
    },
    toggleFilter(state) {
      this.$emit('toggle', state)
    },
  },
};
</script>

<style lang="stylus" scoped>
.helper {
  font-weight: 100;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  line-height: 30px;
  background-color: #ffffff;
  font-size: 14px;
  font-smoothing: antialiased;
}

.left, .clear, .tabs {
  padding: 0 10px;
}

.left .clear {
  width: 150px;
}

.left {
  text-align: center;
}

.clear {
  text-align: right;
  cursor: pointer;
}

.tabs {
  width: 200px;
  display: flex;
  justify-content: space-between;

  * {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid rgba(175, 47, 47, 0);

    &.actived {
      border-color: rgba(175, 47, 47, 0.4);
      border-radius: 5px;
    }
  }
}
</style>
