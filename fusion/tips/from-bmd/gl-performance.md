---
title: GL Performance Tip
author: Blackmagic Design
---

If the GL renderer is really slow, render check your bit depth. Certain graphics cards do not support int16 or float32 rendering and a software emulation fallback will be used.
