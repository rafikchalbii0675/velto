export async function createDiscount(admin, title, percentage) {
  const response = await admin.rest.resources.DiscountCode.create({
    discount_code: {
      code: title,
      percentage: percentage,
    },
  });

  return response;
}
