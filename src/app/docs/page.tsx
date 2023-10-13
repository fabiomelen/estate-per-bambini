import Script from "next/script";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold">Demo</h1>
      <div className="pb-4">
        Il codice della demo è pubblico{" "}
        <Link
          href="https://github.com/fabiomelen/estate-per-bambini"
          className="underline"
        >
          https://github.com/fabiomelen/estate-per-bambini
        </Link>
      </div>
      <h1 className="text-xl font-bold">Flow</h1>
      <div className="py-8">
        <pre className="mermaid">
          {`
    sequenceDiagram
        box Jakala
        participant User
        participant LandingPage
        end
        box mds-bd
        participant LoginService
        end
        box Jakala
        participant ContestEngine
        end
        Actor User
        User->>LandingPage: click on "Partecipa al concorso"
        activate LandingPage
        LandingPage->>LoginService: GET /login/view/login-contest.html?return=ContestEngineURL
        deactivate LandingPage
        activate LoginService
        LoginService->>LoginService: silent login or login/registration form
        LoginService->>ContestEngine: POST to ContestEngineURL as application/x-www-form-urlencoded with id_token(jwt) and repository="rti"
        deactivate LoginService
        activate ContestEngine
        ContestEngine->>ContestEngine: validate id_token(jwt) and repository="rti"
        ContestEngine->>ContestEngine: extract sub as user_uid from jwt
        ContestEngine->>ContestEngine: assign the winner!
        deactivate ContestEngine
         `}
        </pre>
      </div>

      <h1 className="text-xl font-bold">
        How to redirect the user to silent login/registration page from landing
        page
      </h1>
      <div className="py-8">
        <pre className="rounded-md bg-black p-4 font-mono text-sm text-white">
          https://account-test.mediasetinfinity.mediaset.it/login/view/login-contest.html?return=returnUrl
        </pre>
      </div>

      <h1 className="text-xl font-bold">
        How the LoginService send the id_token(jwt) to the ContestEngine
      </h1>
      <div className="py-8">
        <pre className="rounded-md bg-black p-4 font-mono text-sm text-white">
          {`
POST / HTTP/1.1 Content-Type: application/x-www-form-urlencoded;
charset=utf-8 
Host: somethirdparturl 
Connection: close 
User-Agent: RapidAPI/4.2.0 (Macintosh; OS X/14.0.0) GCDHTTPRequest 
Content-Length: 852

id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJFUTBNVVE1TjBOQ1JUSkVNemszTTBVMVJrTkRRMFUwUTBNMVJFRkJSamhETWpkRU5VRkJRZyJ9.eyJpc3MiOiJodHRwczovL2ZpZG0uZ2lneWEuY29tL2p3dC8zX2wtQS1LS1pWT05KZEdkMjcyeDQxbWV6TzZBVVY0bVVveE9kWkNNZmNjdkVYQUphNkNPVlh5VF90VWRRSTAzZGgvIiwiYXBpS2V5IjoiM19sLUEtS0taVk9OSmRHZDI3Mng0MW1lek82QVVWNG1Vb3hPZFpDTWZjY3ZFWEFKYTZDT1ZYeVRfdFVkUUkwM2RoIiwiaWF0IjoxNjk0MTkwNjQ2LCJleHAiOjE2OTQxOTA5NDYsInJpc2tTY29yZSI6MC4wLCJzdWIiOiJiODc4YjEzMzg5Yzc0N2ZiYmFlYTkxYzQ0NThjOGZkNiJ9.NLoMaiCxPIfzXcvErshh3zWvOGWqAqTOEL0S2EQOfy7ocKnqR_iTEgVcgu_xwSJx_c0oyUmOIoFO_9C9m082lFzbwzuewryQJxfwoVxXtZgdV4CooqfeH6iXC2kKwkiYmX0T-KX74NAjrfgNRsY47oDeiN-xh5MHrlw688y3J7403uPyh_esEcJQoMNcqQuI-hQ6Y-EgfOg_-4LGRQMh9VrE519kBnBBNSMRZdoEfPmyIlFrfyGu3EB9J1ILyhfglYI4ygkRG6poVzcOfuttmcxkD048gctkB4bDYOz8Pb7ZyCruY5obQwN6QVbzSmpP28Q2CDSQVUY5K2pKgu2pmQ&repository=rti
        `}
        </pre>
      </div>

      <h1 className="text-xl font-bold">
        How the validate and extract sub as user_uid from jwt
      </h1>
      <Link
        className="underline"
        href="https://github.com/fabiomelen/estate-per-bambini/blob/main/src/app/api/play/route.tsx"
      >
        https://github.com/fabiomelen/estate-per-bambini/blob/main/src/app/api/play/route.tsx
      </Link>
      <div className="py-8">
        <pre className="rounded-md bg-black p-4 font-mono text-sm text-white">
          {`
const formData = await request.formData();
const token = formData.get("id_token");
const repository = formData.get("repository");

if (!token || typeof token !== "string") {
  throw new Error("Missing id_token");
}

if (!repository || repository !== "rti") {
  throw new Error("Missing repository");
}

const data = await verifyAsync(token, getKey);
const userUID = data?.sub;
        `}
        </pre>
      </div>

      <Script
        id="mermaid"
        type="module"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@9/dist/mermaid.esm.min.mjs";
        mermaid.initialize({startOnLoad: true});
        mermaid.contentLoaded();`,
        }}
      />
    </div>
  );
}
