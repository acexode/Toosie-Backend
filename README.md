# Toosie Pharmacy


## update 29/05/2023

previously the package.json for this app look like this 
```  {
    "start": "npm run build && cross-env NODE_ENV=production node dist/server.js",
    "dev:server": "nodemon --watch './**/*.ts' --exec 'ts-node' src/server.ts",
    "dev": "cross-env NODE_ENV=development nodemon",
    "build": "tsc && npx tsc-alias",
    ....
}
    ```
after making some updates heroku started throwing some error:   ```tsc not found error```,  package.json is now modified to only build once
in order to run the app for production locally use the following command
``` npm run build ```
``` npm run start ```
