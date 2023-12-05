<template>
  <div class="container">
    <Header/>
    <router-view/>
    <Loading v-if="isLoading"/>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { computed } from '@vue/reactivity';
import Loading from './components/Loading.vue';
import {useTodoListStore} from '@/stores/todoList';

const todoStore = useTodoListStore();

const {fetchTodoList} = todoStore;

const isLoading = computed(()=> todoStore.isLoading);

fetchTodoList();
</script>

<style scoped>

</style>
