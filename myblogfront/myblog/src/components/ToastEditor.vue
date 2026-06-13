<script setup lang="ts">
import { ref , onMounted , onBeforeUnmount , defineExpose } from 'vue'
import Editor from '@toast-ui/editor'

import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import 'prismjs/themes/prism.css'

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';


const editorRoot = ref<HTMLElement | null>(null)
let editorInstance : Editor | null = null

onMounted(() => {
  editorInstance=new Editor({
    el:editorRoot.value,
    height:'500px',
    initialEditType:'markdown',
    previewStyle:'vertical',
    initialValue:'',
    plugins: [colorSyntax]
  })
})

defineExpose({
  getMarkdown: () =>editorInstance?.getMarkdown(),
  getHtml: () =>editorInstance?.getHTML(),
  setValue: (value: string) => editorInstance?.setMarkdown(value || ''),
})

onBeforeUnmount(() =>{
  editorInstance?.destroy()
})
</script>

<template>
  <div class="editor-container">
  <div ref="editorRoot" class="toast-editor"></div>
  </div>
</template>

<style scoped>
.editor-container{
  background-color:white;
}

</style>
<style>

</style>
