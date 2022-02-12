# Simple RTMP Node Server

A simple RTMP node server

## Start with Docker

You can start the server using command

```bash
docker-compose up
```

## How to connect to the RTMP media server

The server exposes port 19350. Any RTMP client can be used to connect to the server using below url.

```bash
 rtmp://localhost:19350/live/{main|sub}-camera
```

To be noted that the server can accept two simultaneous connections at the same time, which can be configured by wither main|sub keyword in the URL

OBS Studio can be used as a RTMP client and stream data to the server. A more detaied tutorial could be found [here](https://help.streamingvideoprovider.com/en/articles/1394733-how-to-live-stream-with-obs-open-broadcasting-software)

```bash
# example connection details to be used in OBS
Service - Custom
Server - rtmp://localhost:19350/live/{main|sub}-camera
Stream Key - {stream-1|stream-2}
```
