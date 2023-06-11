<template>
    <el-form :model="form">
        <el-row>
            <FormItem :formConfig="props.formConfig"/>
        </el-row>
    </el-form>
</template>

<script lang="ts" setup>
import { watch } from 'fs';
import { defineProps,withDefaults, ref } from 'vue'
import FormItem from './components/formItem.vue'

const props = withDefaults(defineProps<{
    formConfig: any
}>(), {
    formConfig: []
})

const form= ref({})


</script>