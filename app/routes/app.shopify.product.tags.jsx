import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { anthropic } from "~/utils/anthropic.server";
import { generateTagsPrompt } from "~/utils/ia.prompt";

export async function loader() {
  return json({ result: null });
}

export async function action({ request }) {
  const formData = await request.formData();
  const product = formData.get("product");

  const prompt = generateTagsPrompt(product);

  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  return json({ result: response.content[0].text });
}

export default function GenerateTags() {
  const data = useLoaderData();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Génération IA de Tags Shopify</h1>

      <Form method="post">
        <textarea
          name="product"
          placeholder="Colle ici ton produit…"
          style={{ width: "100%", height: "120px" }}
        />
        <button style={{ marginTop: "1rem" }}>Générer les tags</button>
      </Form>

      {data.result && <pre style={{ marginTop: "2rem" }}>{data.result}</pre>}
    </div>
  );
}

