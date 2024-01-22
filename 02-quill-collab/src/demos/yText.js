import * as Y from 'yjs'
// 可以用 2 份独立的 YDoc 实例来模拟 2 个客户端
const doc1 = new Y.Doc()
const doc2 = new Y.Doc()
const yText1 = doc1.getText()
const yText2 = doc2.getText()

// 在某份 YDoc 更新时，应用二进制的 update 数据到另一份 YDoc 上
doc1.on('update', (update) => Y.applyUpdate(doc2, update))
doc2.on('update', (update) => Y.applyUpdate(doc1, update))

// 制造两次存在潜在冲突的更新
yText1.insert(0, '1')
yText2.insert(0, '2')

// CRDT 算法可保证两份客户端中的状态始终一致
console.log(yText1.toString()); // 21
console.log(yText2.toString()); // 21
