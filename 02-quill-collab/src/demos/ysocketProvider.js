import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

const ydoc = new Y.Doc()

const wsProvider = new WebsocketProvider(
  'ws://localhost:1234',
  'my-roomname',
  ydoc
)

wsProvider.on('status', (event) => {
  console.log(event.status) // logs "connected" or "disconnected"
})
const yText = ydoc.getText()

// 在某份 YDoc 更新时，应用二进制的 update 数据到另一份 YDoc 上
ydoc.on('update', (update, origin) => {
  Y.applyUpdate(ydoc, update)
  console.log(yText.toJSON())
  div.innerText = yText.toJSON()
})

const button = document.createElement('button')
const div = document.createElement('div')
button.innerText = 'click'
document.querySelector('#app')?.appendChild(button)
document.querySelector('#app')?.appendChild(div)

button.onclick = () => yText.insert(0, Math.floor(Math.random() * 10) + '')
