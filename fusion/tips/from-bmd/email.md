---
title: Sending Sets of Tools
author: Blackmagic Design, Dave Caruso
---

It's possible to email tools to other people.  You can select a group of tools in the flow view, Ctrl+C to copy them, and then Ctrl+V to paste their Lua code into your email or any other text editor.  Conversely if you copy tools from your email you can paste them back into Fusions flow view.

This behavior is extremely useful, and is also how Macros (`.setting` files) are built. Here's a simple background node.

```
{
    Tools = ordered() {
        Background1 = Background {
            CtrlWZoom = false,
            Inputs = {
                Width = Input { Value = 1920, },
                Height = Input { Value = 1080, },
            },
            ViewInfo = OperatorInfo { Pos = { 660, 247.5 } },
        }
    },
    ActiveTool = "Background1"
}
```
