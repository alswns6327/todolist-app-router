import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/pages/Home.vue");
const About = () => import("@/pages/About.vue");
const TodoList = () => import("@/pages/TodoList.vue");
const AddTodo = () => import("@/pages/AddTodo.vue");
const EditTodo = () => import("@/pages/EditTodo.vue");
const NotFound = () => import("@/pages/NotFound.vue");

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/about', component: About},
        {path: '/todos', component: TodoList},
        {path: '/todos/add', component: AddTodo},
        {path: '/todos/edit/:id', component: EditTodo},
        {path: '/:paths(.*)*', component: NotFound},
    ]
});

export default router;