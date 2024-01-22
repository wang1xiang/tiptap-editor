import * as Y from 'yjs'

const ydoc = new Y.Doc()
// Every peer that defines "my array" like this will sync content with this peer.
const yarray = ydoc.getArray('my array')

// We can register change-observers like this
yarray.observe((event) => {
  // Log a delta every time the type changes
  // Learn more about the delta format here: https://quilljs.com/docs/delta/
  console.log('delta:', event.changes.delta)
})

// There are a few caveats that you need to understand when working with shared types
// It is best to explain this in a few lines of code:

// We can insert & delete content
yarray.insert(0, ['some content']) // => delta: [{ insert: ['some content'] }]
// Note that the above method accepts an array of content to insert.
// So the final document will look like this:
yarray.toArray() // => ['some content']
// We can insert anything that is JSON-encodable. Uint8Arrays also work.
yarray.insert(0, [1, { bool: true }, new Uint8Array([1, 2, 3])]) // => delta: [{ insert: [1, { bool: true }, Uint8Array([1,2,3])] }]
yarray.toArray() // => [1, { bool: true }, Uint8Array([1,2,3]), 'some content']
// You can even insert Yjs types, allowing you to create nested structures
const subArray = new Y.Array()
yarray.insert(0, [subArray]) // => delta: [{ insert: [subArray] }]
// Note that the above observer doesn't fire when you insert content into subArray
subArray.insert(0, ['nope']) // [observer not called]
// You need to create an observer on subArray instead
subArray.observe((event) => {
  console.log(event)
})
// Alternatively you can observe deep changes on yarray (allowing you to observe child-events as well)
yarray.observeDeep((events) => {
  console.log('All deep events: ', events)
})
subArray.insert(0, ['this works']) // => All deep events: [..]
// You can't insert the array at another place. A shared type can only exist in one place.
// yarray.insert(0, [subArray]) // Throws exception!
