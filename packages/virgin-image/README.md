# Virgin Image
---
This is high performance nodejs image server


### Environment or .env file
path should be absolute path
```dosini
VERGIN_CACHE_PATH=/home/user/vergin/images/p/
VERGIN_IMAGE_PATH=/home/user/virgin/images/__img__/
VERGIN_PORT=3100
```

If the desired file is in the cache folder, it sends the cache file.  Otherwise it will generate the file and return the file and copy the file to the cache directory.

