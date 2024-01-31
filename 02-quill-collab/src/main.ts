import Quill from 'quill'
import QuillCursors from 'quill-cursors'
import 'quill/dist/quill.snow.css'
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'
import { WebsocketProvider } from 'y-websocket'
import { IndexeddbPersistence } from 'y-indexeddb'

Quill.register('modules/cursors', QuillCursors)

const quill = new Quill(document.querySelector('#app') as HTMLElement, {
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

const roomName = 'quill-room-name'
// 连接到 websocket 服务端 yjs提供的体验服务器
const wsProvider = new WebsocketProvider('ws://localhost:1234', roomName, ydoc)
// 绑定
const binding = new QuillBinding(ytext, quill, wsProvider.awareness)

const indexDBProvider = new IndexeddbPersistence(roomName, ydoc)

// 文档加载完成后
indexDBProvider.on('synced', () => {
  console.log('indexDB数据加载完成')
})

indexDBProvider.set('version', '1')
indexDBProvider.get('version').then(console.log)
// 从wsProvider获取awareness
const awareness = wsProvider.awareness

// 监听awareness变化
awareness.on('change', (changes: Y.Transaction) => {
  // 获取所有协同信息 显示光标位置和用户列表
  console.log(Array.from(awareness.getStates().values()))
})

// 设置user字段传递用户信息 { name: '', color: '' }
// 如果未指定user字段，Provider会使用随机用户名以默认颜色呈现光标。
awareness.setLocalStateField('user', {
  name: 'Emmanuelle Charpentier',
  color: '#ffb61e',
})
