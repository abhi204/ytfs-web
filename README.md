YTFSWeb
=======

![logo](mystatic/__base/logo-image.png)

YTFSWeb is a simple Django Webapp for downloading and streaming YouTube videos.

This project uses YTFS filesystem ([See Here](https://github.com/rasguanabana/ytfs)) to serve a list of videos for user to view or download.

YTFS being a filesystem requires to be unmounted. This is managed by task-scheduling using celery and rabbit-mq messaging queue.

### Screenshots
![screenshot1](https://imgur.com/zXlQ3B1.png)
![screenshot2](https://imgur.com/SdWUJHo.png)
