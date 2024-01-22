import Quill from 'quill'
import QuillCursors from 'quill-cursors'
import 'quill/dist/quill.snow.css'
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'
import { WebsocketProvider } from 'y-websocket'

Quill.register('modules/cursors', QuillCursors)

const quill = new Quill(document.querySelector('#app'), {
  modules: {
    cursors: true,
    toolbar: [
      // adding some basic Quill content features
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
    ],
    history: {
      // Local undo shouldn't undo changes
      // from remote users
      userOnly: true,
    },
  },
  placeholder: 'Start collaborating...',
  theme: 'snow',
})

// Yjs文档，保存共享数据shared data
const ydoc = new Y.Doc()
// 在文档上定义共享文本类型
const ytext = ydoc.getText('quill-demo')

quill.on('text-change', (delta, content, source) => {
  if (source === 'api') return
  const text = quill.getText()
  ytext.delete(0, ytext.length)
  ytext.insert(0, text)
})
// 创建一个编辑器绑定 将quill编辑器“绑定”到 Y.Text 类型。
// const binding = new QuillBinding(ytext, quill)

// 连接到 websocket 服务端 yjs提供的体验服务器
const wsProvider = new WebsocketProvider(
  'ws://localhost:1234',
  'room',
  ydoc
)
// // 绑定
// const binding = new QuillBinding(ytext, quill, wsProvider.awareness)

wsProvider.on('status', (event) => {
  console.log(event.status) // logs "connected" or "disconnected"
})

ydoc.on('update', (update, origin) => {
  if (!origin) return
  Y.applyUpdate(ydoc, update)
  quill.setText(ytext.toString())
})
