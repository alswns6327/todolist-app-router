<template>
    <div class="row">
        <div class="col p-3">
            <h2>할 일 추가</h2>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label htmlFor="todo">할일 : </label>
                <input type="text" class="form-control" id="todo" v-model="todoItem.todo"/>
            </div>
            <div class="form-group">
                <label htmlFor="desc">설명  : </label>
                <textarea class="form-control" row="3" id="desc" v-model="todoItem.desc"></textarea>
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-primary m-1"
                    @click="addTodoHandler">추가</button>
                <button type="button" class="btn btn-primary m-1"
                    @click="router.push('/todos')">취소</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import {useTodoListStore} from '@/stores/todoList';

const router = useRouter();
const todoItem = reactive({todo : '', desc : ''});

const todoStore = useTodoListStore();

const {addTodo} = todoStore;

const successCallback = () => {
    alert("저장완료");
    router.push("/todos");
}

const addTodoHandler = () =>{
    if(!todoItem.todo || todoItem.todo.trim() == "") return alert("필수값을 입력해주세요.");

    addTodo(todoItem, successCallback);
}
</script>

<style scoped>

</style>