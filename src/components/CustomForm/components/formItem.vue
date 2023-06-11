<template>
    <el-col>
        <el-form-item
            v-for="(item, index) in props.formConfig"
            :key="index"
            v-bind="item"
        >
            <slot :name="item.slot" v-if="item.slot" v-bind="{item}"></slot>
            <component :is="item.component" v-model="item[item.prop]" v-else/>
        </el-form-item>
    </el-col>
    
</template>

<script lang="ts" setup>
import { defineProps,withDefaults } from 'vue'

const props = withDefaults(defineProps<{
    formConfig: any
}>(), {
    formConfig: []
})

</script>