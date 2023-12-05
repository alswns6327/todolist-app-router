<template>
  <div class="container">
    <Header/>
    <router-view/>
    <Loading v-if="states.isLoading"/>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { computed } from '@vue/reactivity';
import { provide, reactive } from 'vue';
import axios from 'axios';
import Loading from './components/Loading.vue';

const owner = "gdhong";
// 의도적 지연 시간을 발생시키는 /todolist_long 이용
const BASE_URI = "/api/todolist_long";
const states = reactive({todoList : [], isLoading : false});
// todoList 목록 조회
const fetchTodoList = async () => {
  try{
    states.todoList = []; states.isLoading = true;
    const response = await axios.get(BASE_URI+ `/${owner}`);
    states.isLoading = false;
    if(response.status === 200){
      states.todoList = response.data;
    }else{
      alert("데이터 조회 실패");
    }
  }catch(e){
    console.log(e);
  }
};

const addTodo = async ({todo, desc}, successCallback) => {
  try{
    const payload = {todo, desc}; states.isLoading = true;
    const response = await axios.post(BASE_URI + `/${owner}`, payload);
    states.isLoading = false;
    if(response.data.status === "success"){
      states.todoList.push({id : response.data.item.id, todo, desc, done: false});
      successCallback();
    }else{
      alert("저장 실패 : " + response.data.message);
    }
  }catch(e){
    alert("에러발생 : " + e);
  }
}

const updateTodo = async ({id, todo, desc, done}, successCallback) => {
  try{
    const payload = {todo, desc, done}; states.isLoading = true;
    const response = await axios.put(BASE_URI + `/${owner}/${id}`, payload);
    states.isLoading = false;
    if(response.data.status === "success"){
      states.todoList = states.todoList.map(todoItem => todoItem.id === id ? {id, todo, desc, done} : todoItem);
      successCallback();
    }else{
      alert("수정 실패 : " + response.data.message);
    }
  }catch(e){
    alert("에러발생 : " + e);
  }
}

const deleteTodo = async (id) => {
  try{
    states.isLoading = true;
    const response = await axios.delete(BASE_URI + `/${owner}/${id}`);
    states.isLoading = false;
    if(response.data.status === "success"){
      states.todoList = states.todoList.filter(todoItem => todoItem.id !== id);
    }else{
      lert("삭제 실패 : " + response.data.message);
    }
  }catch(e){
    alert("에러발생 : " + e);
  }
  states.todoList = states.todoList.filter(todoItem => todoItem.id !== id);
}

const toggleDone = async (id) => {
  try{
    states.isLoading = true;
    const response = await axios.put(BASE_URI + `/${owner}/${id}/done`);
    states.isLoading = false;
    if(response.data.status === "success"){
      states.todoList = states.todoList.map(todoItem => todoItem.id === id ? {...todoItem, done : !todoItem.done} : todoItem);
    }else{
      lert("완료상태 변경 실패 : " + response.data.message);
    }
  }catch(e){
    alert("에러발생 : " + e);
  }
}

provide('todoList', computed(() => states.todoList));
provide('actions', {addTodo, updateTodo, toggleDone, deleteTodo, fetchTodoList});

fetchTodoList();
</script>

<style scoped>

</style>
