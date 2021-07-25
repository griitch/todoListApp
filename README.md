# Todo App

A todo app in which you can
- Make projects
- Add todos to the projects
- Mark todos as complete and incomplete
- Add todos to a "default" project that can't be removed
- remove todos and projects  
  
The app is made with vanilla JS and styled with bootstrap 5, the data is stored on the users local storage.
  
The source code is made of 3 files : 
1. **todoStuff.js** : Contains functions about creating and removing todos and projects
2. **domstuff.js** : Contains utilities for manipulating the DOM
3. **index.js** : A file that groups everyting together 
  
The app uses the 3rd party library [Date fns](https://duckduckgo.com). for date utilities. 
It can be automatically installed alongside other dependencies using : 
```
npm install

```

The app uses webpack to bundle all the dependencies into one file, to compile use the npm script build using
```
npm run build

```

