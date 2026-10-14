import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import VeltoLayout from "../components/velto/VeltoLayout";

// --- 1. LA VRAIE CONNEXION AVEC LA BOUTIQUE ---
// Ce loader est exécuté à chaque fois par LA boutique qui est connectée
export async function loader({ request }) {
  const { admin, session } = await authenticate.admin(request);

  const response = await admin.graphql(`
    query getVeltoData {
      products(first: 50) {
        edges {
          node {
            id
            title
            productType
            tags
            status
            options {
              name
              values
            }
          }
        }
      }
      shop {
        name
      }
    }
  `);

  const result = await response.json();
  
  if (!result.data) {
    return json({ products: [], categories: [], allTags: [], allColors: [], shopName: session.shop });
  }

  const products = result.data.products.edges.map(e => e.node);
  const shopName = result.data.shop.name;

  // On calcule les vraies données optionnelles de chaque produit
  const categories = [...new Set(products.map(p => p.productType).filter(Boolean))];
  const allTags = [...new Set(products.flatMap(p => p.tags))];
  const allColors = [...new Set(products.flatMap(p => {
    const colorOption = p.options.find(o => 
      o.name.toLowerCase().includes('couleur') || 
      o.name.toLowerCase().includes('color') ||
      o.name.toLowerCase() === 'couleur'
    );
    return colorOption ? colorOption.values : [];
  }))];

  return json({ 
    products, 
    categories, 
    allTags, 
    allColors,
    shopName,
    shopDomain: session.shop // ex: velto-dev.myshopify.com
  });
}

// --- 2. LE DASHBOARD QUI AFFICHE LES VRAIES DONNÉES ---
export default function AppIndex() {
  const { products, categories, allTags, allColors, shopName } = useLoaderData();

  return (
    <VeltoLayout title={`Dashboard - ${shopName}`}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* LIGNE KPI - VRAIES DONNÉES */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          <Kpi title="Produits actifs" value={products.length} sub="Données réelles" />
          <Kpi title="Catégories" value={categories.length} sub={categories[0] || 'Aucune'} />
          <Kpi title="Balises" value={allTags.length} sub={`${allTags.length} tags`} />
          <Kpi title="Couleurs" value={allColors.length} sub={allColors.slice(0,2).join(', ') || '—'} />
        </div>

        {/* TABLEAU VRAIS PRODUITS */}
        <div style={{ background:"#101a15", border:"1px solid #1e2e26", borderRadius:"12px", padding:"20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
            <h3 style={{ color:"white", margin:0 }}>Produits de {shopName} ({products.length})</h3>
            <span style={{ color:"#8aa89a", fontSize:"12px", background:"#1e2e26", padding:"6px 10px", borderRadius:"20px" }}>● Connecté en direct à Shopify</span>
          </div>
          
          <div style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1.5fr 1fr", gap:"12px", color:"#8aa89a", fontSize:"11px", textTransform:"uppercase", letterSpacing:"0.5px", borderBottom:"1px solid #1e2e26", paddingBottom:"10px" }}>
            <span>Produit</span><span>Catégorie</span><span>Balises</span><span>Options</span>
          </div>

          {products.length === 0 ? (
            <div style={{ padding:"40px", textAlign:"center", color:"#8aa89a" }}>Aucun produit trouvé dans cette boutique.</div>
          ) : (
            products.slice(0, 20).map(p => (
              <div key={p.id} style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1.5fr 1fr", gap:"12px", padding:"14px 0", borderBottom:"1px solid #1a2a22", fontSize:"13px" }}>
                <span style={{ color:"white", fontWeight:500 }}>{p.title}</span>
                <span style={{ color:"#8aa89a" }}>{p.productType || '—'}</span>
                <span style={{ color:"#8aa89a" }}>{p.tags.slice(0,2).join(', ') || '—'}</span>
                <span style={{ color:"#f5d6a0" }}>{p.options.map(o => `${o.name}: ${o.values.length}`).join(' | ') || '—'}</span>
              </div>
            ))
          )}
        </div>

        <div style={{ display:"flex", gap:"12px" }}>
          <Link to="/app/products" style={{ background:"#f5d6a0", color:"#2D1E17", padding:"10px 18px", borderRadius:"10px", textDecoration:"none", fontWeight:600, fontSize:"14px" }}>
            Voir les {products.length} produits
          </Link>
          <div style={{ color:"#8aa89a", fontSize:"13px", display:"flex", alignItems:"center" }}>
            Données lues en direct depuis {products.length} produits réels
          </div>
        </div>

      </div>
    </VeltoLayout>
  );
}

function Kpi({ title, value, sub }) {
  return (
    <div style={{ background:"#101a15", border:"1px solid #1e2e26", borderRadius:"12px", padding:"18px" }}>
      <div style={{ color:"#8aa89a", fontSize:"11px", textTransform:"uppercase", letterSpacing:"0.5px" }}>{title}</div>
      <div style={{ color:"white", fontSize:"28px", fontWeight:800, marginTop:"6px" }}>{value}</div>
      <div style={{ color:"#6b8a7a", fontSize:"11px", marginTop:"4px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{sub}</div>
    </div>
  );
}