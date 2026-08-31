import { json } from "@remix-run/node";
import {
  useLoaderData,
  useActionData,
  Form,
} from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";
import { shopify } from "../shopify.server";
import {
  Card,
  Page,
  FormLayout,
  TextField,
  Select,
  Button,
  Banner,
} from "@shopify/polaris";

/* LOADER : produits Shopify */
export async function loader({ request }) {
  const admin = shopify.admin(request);
  const productsResponse = await admin.rest.Product.all({ limit: 50 });
  const products = productsResponse.products || productsResponse;
  return json({ products });
}

/* ACTION : création promotion */
export async function action({ request }) {
  const admin = shopify.admin(request);
  const formData = await request.formData();

  const title = formData.get("title");
  const discount = Number(formData.get("discount"));
  const productId = formData.get("productId");

  if (!title || !discount || !productId) {
    return json({ error: "Tous les champs sont obligatoires." }, { status: 400 });
  }

  const priceRuleResponse = await admin.rest.PriceRule.create({
    price_rule: {
      title,
      target_type: "line_item",
      target_selection: "entitled",
      allocation_method: "across",
      value_type: "percentage",
      value: `-${discount}`,
      customer_selection: "all",
      starts_at: new Date().toISOString(),
      entitled_product_ids: [Number(productId)],
    },
  });

  const priceRule = priceRuleResponse.price_rule || priceRuleResponse;

  const discountCodeResponse = await admin.rest.DiscountCode.create({
    price_rule_id: priceRule.id,
    discount_code: {
      code: `${title.replace(/\s+/g, "-")}-${discount}`,
    },
  });

  const discountCode =
    discountCodeResponse.discount_code || discountCodeResponse;

  return json({
    success: true,
    promotion: {
      title,
      discount,
      productId,
      priceRuleId: priceRule.id,
      discountCode: discountCode.code,
    },
  });
}

/* COMPOSANT POLARIS */
export default function PromotionsRoute() {
  const { products } = useLoaderData();
  const actionData = useActionData();

  const productOptions = products.map((p) => ({
    label: p.title,
    value: String(p.id),
  }));

  return (
    <VeltoLayout title="Promotions intelligentes">
      <Page>
        <Card sectioned>
          <Form method="post">
            <FormLayout>
              {actionData?.error && (
                <Banner status="critical">{actionData.error}</Banner>
              )}

              {actionData?.success && (
                <Banner status="success">
                  Promotion créée : {actionData.promotion.discountCode}
                </Banner>
              )}

              <TextField label="Nom de la promotion" name="title" />

              <TextField
                label="Réduction (%)"
                name="discount"
                type="number"
              />

              <Select
                label="Produit ciblé"
                name="productId"
                options={productOptions}
              />

              <Button submit primary>
                Créer la promotion IA
              </Button>
            </FormLayout>
          </Form>
        </Card>
      </Page>
    </VeltoLayout>
  );
}
