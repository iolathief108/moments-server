# mara

#### ports
mara server = 4000
virgin image = 4100
mara web = 3000
mara vendor = 3100

Your can access vendor dash from /dash (in dev you supposed to use port 4200 because dev server websocket error)



### default object paths
##### dev
- \~/mara-dev/objs/
- \~/mara-dev/gen-data/  - sample images for generate sample data
#### production
\~/mara/objs/

##### objs folder
````sh
objs
  ├── cache
  │    └── p - contains the generated main product cache files 
  └── main
       ├── tmp - contains the temparary uploaded image files
       └── img - main product files
````
all path related configs are contains in each package config file in root folder and nginx files



##### gen data
````sh
gen-data
  ├── caterer - contains caterer related images
  ├── venue - contains venue related images
  └── default - default images to use if cat didn't exist 
````


#### Envs
virgin-image
```dosini
VERGIN_CACHE_PATH=C:\Users\iolat/mara-dev/objs/cache/p/
VERGIN_IMAGE_PATH=C:\Users\iolat/mara-dev/objs/main/img/
VERGIN_PORT=3100
```



dev process

1 create folder 
- ~/mara-dev/objs/main/img
- ~/mara-dev/objs/main/tmp
- ~/mara-dev/objs/cache/p

- ~/mara-dev/gen-data/venue (and others as mara server specified - not mandatory)
- ~/mara-dev/gen-data/default (mandotary for development)

put some sample images to venue and default folder


