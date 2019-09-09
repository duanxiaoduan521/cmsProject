<template>
    <li>
       <slot></slot> 
       <slot name="icon" class="icon"></slot>
    </li>
</template>

<script>
export default {
    name:'my-li',
    data(){
        return{

        }
    }
}
</script>

<style scoped>
    ul li {
    box-sizing: border-box;
    border: 1px solid #ccc;
    margin: 10px 5px;
    width: 30%;
    height: 80px;
    }
    .icon{
        width: 100%;
    }
</style>>