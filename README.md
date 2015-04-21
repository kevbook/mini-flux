# mini-flux

__Minimal, simplest reactive flux architecture implementation.__

The idea is to implement uni-directional reactive architecture. Every component is independent and reacts to an event (propagation of change). It implements dynamic data flows through components listening for changes.


__Components are:__

1. __Actions:__ reacts to events/actions triggered by views, or other events such as change in route.

2. __Stores__: reacts to Actions and updates the data based on actions or data passed through. All the changes in the store is broadcasted.

3. __View__: reacts to change in store and updates the views accordingly.


__Note: mini-flux__ is more Functional Reactive Programming (FRP) than traditional flux architecture. There is no dispatcher, components are listenable;


```
╔═════════╗       ╔════════╗       ╔═════════════════╗
║ Actions ║──────>║ Stores ║──────>║ View Components ║
╚═════════╝       ╚════════╝       ╚═════════════════╝
                   listener             listener
     ^                                      │
     └──────────────────────────────────────┘
```
