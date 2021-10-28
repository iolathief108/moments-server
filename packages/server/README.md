# SERVER

# to get build
yarn tsc -p ./tsconfig.json

todo: max length of description both server and vendor
todo: max photos

SPP means Starndard Package Pricing

#### Vendor Types
- `common/const.ts`
- `models/vendors/[Type]Data.ts`
- `models/VendorData.ts`
- `resolvers/input_types/type/[Type]DetailsInput.ts`
- `resolvers/input_types/VendorDetailsInput.ts`
- `resolvers/object_types/type/[Type]Details.ts`
- `resolvers/object_types/VendorTypes.ts`




### Vergin Environment or .env file
path should be absolute path
```dosini
VERGIN_CACHE_PATH=~/mara-dev/objs/cache/p/
VERGIN_IMAGE_PATH=~/mara-dev/objs/main/img/
VERGIN_PORT=3100
```
### How vergin image works
If the desired file is in the cache folder, it sends the cache file.  
Otherwise it will generate the file and return the file and copy the file to the cache directory.

