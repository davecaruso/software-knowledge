---
title: Media Codec Restrictions on Linux
created: 2020-04-13
author: Dave Caruso
alias: linux-media
---

Resolve on Linux doesn't like a lot of file formats. Use [ffmpeg](https://www.ffmpeg.org/) to
convert to one of the [supported formats](https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_15_Supported_Codec_List.pdf).

Quick summary of what is allowed
- DNx* Videos
- PNG Images
- WAV Audio

and what is not
- H264 and most compressed mov and mp4 formats
- MP3 Files
