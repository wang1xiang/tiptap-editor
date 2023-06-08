<template>
  <div v-if="editor" class="ProseMirror">
    <fixed-menu :editor="editor" />
    <bubble-menu :editor="editor" />
    <floating-menu :editor="editor" />
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import FixedMenu from './components/FixedMenu.vue'
import BubbleMenu from './components/BubbleMenu.vue'
import FloatingMenu from './components/FloatingMenu.vue'
import Commands from './components/plugins/commands'
import suggestion from './components/plugins/suggestion'
import { CustomBold } from './components/extensions/CustomBold'
import { ref, onMounted, onUnmounted } from 'vue'

const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    editorProps: {
      attributes: {
        class: 'tiptap-prose',
      },
    },
    extensions: [
      StarterKit.configure({
        // 禁用历史记录
        // history: false,
        // 目录只有一级目录和二级目录
        // heading: {
        //   levels: [1, 2],
        // },
        paragraph: {
          HTMLAttributes: {
            class: 'my-custom-paragraph',
          },
        },
        heading: {
          HTMLAttributes: {
            class: 'my-custom-heading',
          },
        },
      }),
      CustomBold,
      Commands.configure({
        suggestion,
      }),
    ],
    content:
      '<h1>仅仅使用StarterKit提供的node、 nark和extensions</h1><p><strong><em><s>字体样式</s></em></strong></p><hr contenteditable="false"><pre><code>时代风帆大厦</code></pre><hr contenteditable="false"><ul><li><p>无序列表</p></li></ul><ol><li><p>有序列表行内<code>代码</code></p></li></ol><blockquote><p>注释</p></blockquote>',
    autofocus: true,
  })
})
onUnmounted(() => editor.value.destroy())
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  padding: 12px;
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
  .is-active {
    background: black;
    color: #fff;
  }
}
</style>
