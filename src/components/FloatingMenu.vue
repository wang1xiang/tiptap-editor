<template>
  <floating-menu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 100 }"
  >
    <button
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
    >
      H1
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
    >
      H2
    </button>
    <button
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      Bullet List
    </button>
  </floating-menu>
</template>

<script setup>
import { FloatingMenu, Editor } from '@tiptap/vue-3'
defineProps({
  editor: {
    type: Editor,
    require: true,
  },
})

const shouldShow = ({ editor, view, state, oldState, from, to }) => {
  // 仅在无序列表选中的时候才显示 气泡菜单
  return editor.isActive('bulletList')
}
</script>

<style lang="scss" scoped></style>
