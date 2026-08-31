import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import shopify from "./shopify.server";

const ABORT_DELAY = 5000;

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  // Shopify ajoute ses propres headers
  shopify.addDocumentResponseHeaders(request, responseHeaders);

  return isbot(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}

/* ---------------------------------------------------------
   BOT REQUEST (Google, Bing, etc.)
--------------------------------------------------------- */
function handleBotRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onAllReady() {
          responseHeaders.set("Content-Type", "text/html");

          // 🔥 Correction Shopify iframe
          responseHeaders.delete("X-Frame-Options");
          responseHeaders.set(
            "Content-Security-Policy",
            "frame-ancestors https://admin.shopify.com https://*.shopify.com;"
          );

          const body = new PassThrough();

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },

        onShellError(error) {
          reject(error);
        },

        onError(error) {
          responseStatusCode = 500;
          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY + 1000);
  });
}

/* ---------------------------------------------------------
   BROWSER REQUEST (Shopify Admin)
--------------------------------------------------------- */
function handleBrowserRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady() {
          responseHeaders.set("Content-Type", "text/html");

          // 🔥 Correction Shopify iframe
          responseHeaders.delete("X-Frame-Options");
          responseHeaders.set(
            "Content-Security-Policy",
            "frame-ancestors https://admin.shopify.com https://*.shopify.com;"
          );

          const body = new PassThrough();

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },

        onShellError(error) {
          reject(error);
        },

        onError(error) {
          responseStatusCode = 500;
          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY + 1000);
  });
}
