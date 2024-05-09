import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

//we pass req object from getInitailProps to buildClinet, so since we pass same object ,we use context
LandingPage.getInitialProps = async (context) => {
  console.log("Landing Page!!");
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};
export default LandingPage;

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
