export async function analyzeShopifyStore() {
  const shop = process.env.SHOPIFY_SHOP;
  const token = process.env.SHOPIFY_ADMIN_API;

  // 1. Récupérer les produits
  const productsRes = await fetch(
    `https://${shop}/admin/api/2024-07/products.json`,
    {
      headers: {
        "X-Shopify-Access-Token": token,
      },
    }
  );
  const products = (await productsRes.json()).products;

  // 2. Récupérer les commandes
  const ordersRes = await fetch(
    `https://${shop}/admin/api/2024-07/orders.json?status=any`,
    {
      headers: {
        "X-Shopify-Access-Token": token,
      },
    }
  );
  const orders = (await ordersRes.json()).orders;

  // Analyse simple : produits les plus vendus
  const salesMap = {};

  for (const order of orders) {
    for (const item of order.line_items) {
      if (!salesMap[item.product_id]) {
        salesMap[item.product_id] = 0;
      }
      salesMap[item.product_id] += item.quantity;
    }
  }

  const rankedProducts = products
    .map((p) => ({
      id: p.id,
      title: p.title,
      sales: salesMap[p.id] || 0,
    }))
    .sort((a, b) => b.sales - a.sales);

  return {
    products,
    orders,
    rankedProducts,
    topSeller: rankedProducts[0],
    lowSeller: rankedProducts[rankedProducts.length - 1],
  };
}
