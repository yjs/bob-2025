
# Bob <> Yjs CheatSheet

```sh
git clone https://github.com/yjs/bob-2025
```

## Resources
- GitHub Repo: [github.com/yjs/yjs](https://github.com/yjs/yjs)
- Yjs Docs: [docs.yjs.dev](https://docs.yjs.dev/)
- Interactive tutorial: [learn.yjs.dev](learn.yjs.dev)
- Inspector: [inspector.yjs.dev](https://inspector.yjs.dev/)

## Create Yjs Document

```
import * as Y from 'yjs'
const ydoc = new Y.Doc()
```

## Updates

- `Y.encodeStateAsUpdate(ydoc: Y.Doc): Uint8Array` - encode the Yjs document
- `Y.encodeStateVector(ydoc: Y.Doc): Uint8Array` - encode the state vector that
  describes the state of the Yjs document
- `Y.encodeStateAsUpdate(ydoc: Y.Doc, stateVector: Uint8Array): Uint8Array` - only encode the differences
- `Y.encodeStateAsUpdate(ydoc: Y.Doc): Uint8Array` - apply an update to a Yjs doc
- `ydoc.on('update', (update: Uint8Array) => { /* handle update */ } )` - listen
  to updates on a Yjs document

## Shared Types

- `ydoc.getMap('my map'): Y.Map` - define a top-level Y.Map type named "my map". 
- `ydoc.getMap('my array'): Y.Array` - define a top-level Y.Array type named "my array". 
- `ydoc.getMap('my text'): Y.Text` - define a top-level Y.Text type named "my text". 

### Nest Shared Types

- `ydoc.getMap('my map').set('my array', new Y.Array())` - insert a Y.Array into
  a Y.Map
- `ydoc.getArray('my map').insert(0, [Y.Text])` - insert a Y.Text into
  a Y.Array

### Observe Changes

```js
ymap.observe(event => {
  console.log(ymapEvent.changes.keys)
})
yarray.observe(event => {
  console.log(event.changes.delta)
})
```

## Utilities

- `ymap.set(key: string, value: JSON | Y.AbstractType)` - set a key-value pair on
a Y.Map
- `yarray.insert(0, Array<JSON|Y.AbstractType>)` - insert elements into a Y.Array.
Note that `insert` accepts an Array of values.
- `ytype.toJSON()` Transform any Yjs type to a JSON-representation.

## Popular Providers

### y-webrtc

Sync a Yjs doc via webrtc (p2p).

```js
import { WebrtcProvider } from "y-webrtc"

const webrtcProvider = new WebrtcProvider('room-name', ydoc)
```

### y-websocket

Sync a Yjs doc through a websocket server (e.g. y-websocket, y-redis, y-sweet,
or hocuspocus).

```js
import { WebsocketProvider } from 'y-websocket'

const provider = new WebsocketProvider(
  'wss://demos.yjs.dev/ws', // use the public ws server
  'room-name',
  ydoc
)
```

### y-indexeddb

Make a Yjs document available offline, by storing it in the browser database
"indexeddb".

```js
import { IndexeddbPersistence } from 'y-indexeddb'

const provider = new IndexeddbPersistence(docName, ydoc)
```

