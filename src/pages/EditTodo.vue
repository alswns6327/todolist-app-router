<template>
    <div class="row">
        <div class="col p-3">
            <h2>할일 수정</h2>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label htmlFor="todo">할일:</label>
                <input type="text" class="form-control" id="todo" v-model="todoItem.todo"/>
            </div>
            <div class="form-group">
                <label htmlFor="desc">설명</label>
                <textarea class="form-control" row="3" v-model="todoItem.desc" id="desc"></textarea>
            </div>
            <div class="form-group">
                <label htmlFor="done">완료 여부 : </label>&nbsp;
                <input type="checkbox" v-model="todoItem.done"/>
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-primary m-1"
                    @click="updateTodoHandler">추가</button>
                <button type="button" class="btn btn-primary m-1"
                    @click="router.push('/todos')">취소</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {useTodoListStore} from '@/stores/todoList';

const todoStore = useTodoListStore();

const {todoList, updateTodo} = todoStore;

const currentRoute = useRoute();
const router = useRouter();

const {id} = currentRoute.params;

const matchItem = todoList.find(todo=> todo.id === parseInt(id));

if(!matchItem){
    alert("매칭되는 ID를 가진 todo가 없습니다.");
    router.push("/todos");
}

const todoItem = reactive({...matchItem});

const successCallback = () => {
    alert("수정 완료");
    router.push("/todos");
}

const updateTodoHandler = () => {
    if(!todoItem.todo || todoItem.todo.trim() === "") return alert("필수값을 입력해주세요.");

    updateTodo({...todoItem}, successCallback);
}

</script>