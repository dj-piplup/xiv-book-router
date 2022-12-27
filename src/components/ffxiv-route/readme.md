# my-component



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type       | Default     |
| ----------- | ----------- | ----------- | ---------- | ----------- |
| `favorites` | --          |             | `string[]` | `undefined` |
| `freeDest`  | `free-dest` |             | `string`   | `undefined` |
| `home`      | `home`      |             | `string`   | `undefined` |


## Dependencies

### Used by

 - [app-root](../app-root)

### Depends on

- [dungeon-list](../dungeon-list)
- [ffxiv-subroute](../ffxiv-subroute)

### Graph
```mermaid
graph TD;
  ffxiv-route --> dungeon-list
  ffxiv-route --> ffxiv-subroute
  app-root --> ffxiv-route
  style ffxiv-route fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
