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

/**
 * creating a secret for stripe key:sk_test_51PP7Z1HkDOwAVnbUS9RiCsDsmSMzMDoG4xG90Gz03fl0peZVwHuZhw8zgNNq6U5lzvAXbqOmeTvqHaM7R7yiqxBs00kZdrMqJK
 * command: $ kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=sk_test_51PP7Z1HkDOwAVnbUS9RiCsDsmSMzMDoG4xG90Gz03fl0peZVwHuZhw8zgNNq6U5lzvAXbqOmeTvqHaM7R7yiqxBs00kZdrMqJK
 * and update the payement=depl and add the secret
 */

/*
key difference: request from our browser vs request from serverside rendering page;

request from our browser will first hit nginx and it will assign same domain(eg. ticketing.dev) and
sends the request to particular route and serves the request

request from serverside rendering page:

getInitialProps is a plain function that is executed first in serverside rendering.It works when we hard
refresh the page, click link from differnet domain,copy url to address bar. it wont be shown in browser console
but we can console.log it in server(terminal)., so we need to specify the differnt route than normal

getInitialProps gets executed in the client when we redirect from one page to another,so we can do normally


it sends request from the server rather than browser
so since our next app is hosted in a container, when we hit the route, it will look at its own container(localhost)
since we have not specifed the full route  for it, it shows error.If it was not for the getInitailProps, the request would
have assumed ticketing.dev/.... as the route and send the request to ingress nginx to server the request

so the solution:
we send the request from container that contains next app to the nginx along with the cookie we recive from
browser . All of the contaienr we made is hosted in default namespace,so we can easily reach each other with srv we made . but
the ingress-nginx is hosted in different namespace , so it the route is:
http://SERVICE_NAME.NAMESPACE.svc.cluster.local

$kubectl get services
$kubectl get services -n ingress-nginx
*/
