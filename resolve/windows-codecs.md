---
title: Media Codec Restrictions on Windows
created: 2020-04-14
author: TimothyLH
alias: codec-restriction
---

Resolve on Windows supports many codecs, but by far not all.
Check the list at [blackmagic.com](https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_15_Supported_Codec_List.pdf)
to see the full list of supported codecs.
You can use [ffmpeg](https://www.ffmpeg.org/) to convert to one of the supported codecs.

It is recommended to mainly use these codecs:
- DNx* Videos
- h264/5 Videos
- PNG / JPEG Images
- WAV Audio @ 48 kHz
