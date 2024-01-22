// 应用中的全部协作状态均可在单个 YDoc 容器中承载
// 将该实例传入 WebSocket 等协议的 provider 后即可支持网络同步
// const doc = new Y.Doc()

// // 在 YDoc 上可以创建不同类型的顶层 YModel 实例
// // 这里创建了一个顶层名为 root 的 YMap
// const yRoot = doc.getMap('root')

// // 也可以用 class 构造器来实例化独立的 YMap 等 YModel
// // 可直接用 get set delete 等常见 API 对 YModel 增删改查
// const yPoint = new Y.Map()
// yPoint.set('x', 0)
// yPoint.set('y', 0)

// // YMap 的值也可以是 YMap，从而构造出嵌套的数据类型
// yRoot.set('point', yPoint)

// // YMap 中还可以存入 YText 等其他 YModel，形成复合的数据类型
// const yName = new Y.Text()
// yName.insert(0, 'Wilson Edwards')
// yRoot.set('name', yName)

// console.log(yRoot.toJSON());

// const ydoc = new Y.Doc()

// // You can define a Y.Map as a top-level type or a nested type

// // Method 1: Define a top-level type
// const ymap = ydoc.getMap('my map type')
// // Method 2: Define Y.Map that can be included into the Yjs document
// const ymapNested = new Y.Map()

// // Nested types can be included as content into any other shared type
// ymap.set('my nested map', ymapNested)

// // Common methods
// ymap.set('prop-name', 'value') // value can be anything json-encodable
// ymap.set('id', '123')
// console.log(ymap.get('prop-name')); // => 'value'
// ymap.delete('prop-name')

// console.log(ymap.toJSON());

// {
//   name: 'kunkun',
//   age: '2.5',
//   address: {
//     country: 'China',
//     city: 'shanghai'
//   },
//   likes: ['Sing', 'dance', 'rap', 'basketball']
// }
import * as Y from 'yjs'

const ydoc = new Y.Doc()

console.log(ydoc.clientID);
ydoc.on('beforeTransaction', event => {console.log('beforeTransaction')})
ydoc.on('beforeObserverCalls', event => {console.log('beforeObserverCalls')})

ydoc.on('afterTransaction', event => {console.log('afterTransaction')})
ydoc.on('update', update => { console.log('update')})


// 创建一个顶层名为 kun 的 YMap
const ymap = ydoc.getMap('kun')
ymap.observe(event => {console.log('observe')})
ymap.observeDeep(event => {console.log('observeDeep')})

// 监听变化
ymap.observe(event => {
  event.changes.keys.forEach((change, key) => {
    if (change.action === 'add') {
      console.log(`Property "${key}" was added. Initial value: "${ymap.get(key)}".`)
    } else if (change.action === 'update') {
      console.log(`Property "${key}" was updated. New value: "${ymap.get(key)}". Previous value: "${change.oldValue}".`)
    } else if (change.action === 'delete') {
      console.log(`Property "${key}" was deleted. New value: undefined. Previous value: "${change.oldValue}".`)
    }
  })
})

// 构造嵌套的 ymap
const ymapAddress = new Y.Map()
ymapAddress.set('country', 'China')
ymapAddress.set('city', 'shanghai')
ymap.set('address', ymapAddress)

// 构造嵌套的 yarray
const yarrayLikes = Y.Array.from(['Sing', 'dance', 'rap', 'basketball'])
// const yarrayLikes = new Y.Array()
// yarrayLikes.push(['Sing'])
// yarrayLikes.push(['dance'])
// yarrayLikes.push(['rap'])
// yarrayLikes.insert(3, ['basketball'])
ymap.set('likes', yarrayLikes)
ymap.set('name', 'kunkun')
ymap.set('age', '2.5')
ymap.set('age', '3')
ymap.delete('age')

// 通过交换完整文档结构来同步两个客户端
// const state1 = Y.encodeStateAsUpdate(ydoc1);
// const state2 = Y.encodeStateAsUpdate(ydoc2);
// Y.applyUpdate(ydoc1, state2);
// Y.applyUpdate(ydoc2, state1);
console.log(ymap1.toJSON())
console.log(ymap2.toJSON())