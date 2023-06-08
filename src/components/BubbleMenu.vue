<template>
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 100 }"
    :should-show="shouldShow"
  >
    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
      bold
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
      italic
    </button>
    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
      strike
    </button>
  </bubble-menu>
</template>

<script setup>
import { BubbleMenu, Editor } from '@tiptap/vue-3'
defineProps({
  editor: {
    type: Editor,
    require: true,
  },
})

const shouldShow = ({ editor, view, state, oldState, from, to }) => {
  // 仅在无序列表选中的时候才显示 气泡菜单
  return editor.isActive("bulletList");
};
</script>

<style lang="scss" scoped>

</style>