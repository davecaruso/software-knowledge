---
title: Folders Inside of Folders
created: 2020-04-14
author: Hunter Parcells
---

In some cases, you might want to play a folder of songs. If there are folders of music inside of the folder. VLC won't always open those folders to play them. To fix this, append `--recursive="expand"` to the end of the VLC command.

```sh
vlc /path/to/music -L -Z --recursive="expand"
```
