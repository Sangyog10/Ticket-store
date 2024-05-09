/*
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
