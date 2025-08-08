import prisma from "../lib/prisma"
import { faker } from "@faker-js/faker"

async function main() {
  await prisma.cart.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  const products = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      return prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price()),
          images: [faker.image.urlLoremFlickr({ category: "fashion" })],
          category: faker.commerce.department(),
          stock: faker.number.int({ min: 1, max: 100 }),
        }
      })
    })
  )

  console.log("Seeded database with 5 products: ", products)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())