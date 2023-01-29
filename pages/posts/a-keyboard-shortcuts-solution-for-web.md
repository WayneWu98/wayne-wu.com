---
title: 网页端快捷键的实现
date: 2023-01-29T16:27:50+08:00
category: Front End
---

通过监听键盘事件可以简单的实现网页快捷键，同时键盘事件提供的几个属性 `altKey`、`ctrKey`、`shiftKey` 和 `metaKey` 也能快速实现基本的组合快捷键。但对于多字母（A-Z）组合的快捷键，情况就变的有些复杂了。另外还需要处理局部快捷键与全局快捷键之间的冲突。StackOverflow 有个关于 “How can I add a keyboard shortcut to an existing JavaScript Function?” 的 [回答](https://stackoverflow.com/questions/2511388/how-can-i-add-a-keyboard-shortcut-to-an-existing-javascript-function/66518483?r=Saves_UserSavesList#66518483) 提供了一种解决方案：

```javascript
HTMLElement.prototype.onshortcut = function(shortcut, handler) {
  var currentKeys = []
    
  function reset() {
    currentKeys = []
  }

  function shortcutMatches() {
    currentKeys.sort()
    shortcut.sort()
    return (
      JSON.stringify(currentKeys) ==
      JSON.stringify(shortcut)
    )
  }

  this.onkeydown = function(ev) {
    currentKeys.push(ev.key)
    if (shortcutMatches()) {
      ev.preventDefault()
      reset()
      handler(this)
    }
  }
  this.onkeyup = reset
}

document.body.onshortcut(["Control", "Shift", "P"], el => {
  alert("Hello!")
})
```

每次键盘按下的事件触发时，将按键值记录下来，快捷键比对成功后运行回调函数，并清空按键缓存，等待下一次键盘按下事件（浏览 [问答](https://stackoverflow.com/questions/2511388/how-can-i-add-a-keyboard-shortcut-to-an-existing-javascript-function/66518483?r=Saves_UserSavesList#66518483) 获取更详细的回答）。

从该方案出发进行下一步封装。