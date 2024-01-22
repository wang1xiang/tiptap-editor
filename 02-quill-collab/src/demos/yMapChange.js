import * as Y from 'yjs'

const ydoc1 = new Y.Doc()
const ydoc2 = new Y.Doc()

// 在其中一份 YDoc 更新时，通过applyUpdate将二进制数据应用到其他 YDoc 上 
ydoc1.on('update', (update) => Y.applyUpdate(ydoc2, update))
ydoc2.on('update', (update) => Y.applyUpdate(ydoc1, update))

// 创建一个顶层名为 kun 的 YMap
const ymap1 = ydoc1.getMap('kun')
const ymap2 = ydoc2.getMap('kun')
// 监听变化
ymap1.observe(event => {
  event.changes.keys.forEach((change, key) => {
    if (change.action === 'add') {
      console.log(`ymap1: Property "${key}" was added. Initial value: "${ymap1.get(key)}".`)
    } else if (change.action === 'update') {
      console.log(`ymap1: Property "${key}" was updated. New value: "${ymap1.get(key)}". Previous value: "${change.oldValue}".`)
    } else if (change.action === 'delete') {
      console.log(`ymap1: Property "${key}" was deleted. New value: undefined. Previous value: "${change.oldValue}".`)
    }
  })
})
ymap2.observe(event => {
  event.changes.keys.forEach((change, key) => {
    if (change.action === 'add') {
      console.log(`ymap2: Property "${key}" was added. Initial value: "${ymap2.get(key)}".`)
    } else if (change.action === 'update') {
      console.log(`ymap2: Property "${key}" was updated. New value: "${ymap2.get(key)}". Previous value: "${change.oldValue}".`)
    } else if (change.action === 'delete') {
      console.log(`ymap2: Property "${key}" was deleted. New value: undefined. Previous value: "${change.oldValue}".`)
    }
  })
})

// 构造嵌套的 ymap
const ymapAddress = new Y.Map()
ymapAddress.set('country', 'China')
ymapAddress.set('city', 'shanghai')
ymap1.set('address', ymapAddress)

// 构造嵌套的 yarray
const yarrayLikes = Y.Array.from(['Sing', 'dance', 'rap', 'basketball'])

ymap1.set('likes', yarrayLikes)
ymap1.set('name', 'kunkun')
ymap1.set('age', '2.5')
ymap1.set('age', '3')
ymap2.set('age', '4')
ymap1.delete('age')
ymap2.set('sex', 'male')


console.log(ymap1.toJSON())
console.log(ymap2.toJSON())
