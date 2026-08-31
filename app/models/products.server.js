// app/models/products.server.js

// IMPORTANT : alias "~" casse dans Railway → chemin relatif 100% fiable
import { prisma } from "../db.server";

// Récupérer les produits d’un shop
export async function getProducts(shopId) {
  return prisma.product.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

// Récupérer un produit spécifique
export async function getProductById(id) {
  return prisma.product.findUnique({
    where: { id },
  });
}

// Ajouter un produit
export async function addProduct({ shopId, title, price, description }) {
  return prisma.product.create({
    data: {
      shopId,
      title,
      price,
      description,
      createdAt: new Date(),
    },
  });
}

// Mettre à jour un produit
export async function updateProduct(id, data) {
  return prisma.product.update({
    where: { id },
    data,
  });
}

// Supprimer un produit
export async function deleteProduct(id) {
  return prisma.product.delete({
    where: { id },
  });
}
