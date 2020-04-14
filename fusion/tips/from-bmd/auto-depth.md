---
title: Automatic Depth Selection
author: Blackmagic Design
alias: override-depth
---

Fusion automatically chooses the smallest data type that will store the mask information without loss of information. e.g. hard edged masks are stored as int8 since they are rendered at <= 256 shades of grey. This can be overridden with the Custom button in the mask's Image tab.
