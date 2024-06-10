import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
  console.log(tickets);
  const ticketLists = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketLists}</tbody>
      </table>
    </div>
  );
};

//we pass req object from getInitailProps to buildClinet, so since we pass same object ,we use context
LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");
  return { tickets: data };
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
