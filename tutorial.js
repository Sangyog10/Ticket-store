/*
 for windows:goto /etc/hosts and add ip address(127.0.0.1 ticketing.dev) to acess it from outside world
 for linux:goto /etc/hosts and add ip address(minikube ip) to ticketing.dev


first start docker daemon: sudo systemctl start docker
then start minikube: minikube start
if https blocks: type thisisunsafe in browser

skaffold watches all the chnages (just like nodemon):command : $skaffold dev


First the traffic through our browser or external device is sent to the ingress(load balancer), 
which then route the traffic to the different pods. Each pods have service which contain permanent ip address of
the pod, so the ingress route the request to the service.


if there is problem with routing like 500 errors, enable ingress:
$ minikube addons enable ingress

create jwt secret with kubectl
$ kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

*/

/*TESTING----
Using jest for testing

npm install --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server

--save-dev is used since we do not want docker to include it while building image, we want these only for testing

add this script in package.json
"scripts": {
    "start": "ts-node-dev src/index.ts",
    "test": "jest --watchAll --no-cache"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "setupFilesAfterEnv": [
      "./src/test/setup.ts"
    ]
  },

create test folder and setup.ts under it
  
*/

/**
 publishing the package to npm: org name:santicket
 common is the folder i will work on it

 change the name in package.json
 {
  "name": "@santicket/common",
 }
 
 we will build the ts file into js file. 
 del-cli package is used for clean , it will delete old build js file eveytime we create new one 
  "scripts": {
    "clean": "del ./build/*",
    "build": "npm run clean && tsc"
  },

  to publish the package for first time: $ npm publish --access public
 firsr do npm login:
 git commit the file
 $npm version patch  //it will increase the version (we need to do it everytime)
 $npm run build
 $npm publish

 to automate this: npm run pub
 {
      "pub": "git add . && git commit -m \"Updates\" && npm version patch && npm run build && npm publish"
 }
 */

/**
  To easily get access to pods outside the kubernetes cluster
  $kubectl port-forward podName 4222:4222
  */
//438
