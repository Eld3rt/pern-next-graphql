import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient().$extends({
  model: {
    $allModels: {
      async exists<T>(this: T, where: Prisma.Args<T, 'findFirst'>['where']): Promise<boolean> {
        const context = Prisma.getExtensionContext(this)

        const result = await (context as any).findFirst({ where })
        return result !== null
      },
    },
  },
  result: {
    course: {
      discountValue: {
        needs: { price: true, reducedPrice: true },
        compute(course) {
          if (!course.reducedPrice) return null
          return Math.round((course.reducedPrice * 100) / course.price)
        },
      },
    },
  },
})

export { prisma }
