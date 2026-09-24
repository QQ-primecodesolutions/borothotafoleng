import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

// Prisma Postgres hands out a `prisma+postgres://` URL that is served through
// Accelerate's connection pooler, and the client needs this extension to speak
// that protocol. It is a pass-through against an ordinary `postgres://` URL, so
// the same client also works if the database is ever moved to plain Postgres.
const createClient = () =>
  new PrismaClient({
    // Query logging is useful locally and pure noise in a serverless log.
    log:
      process.env.NODE_ENV === 'production'
        ? ['warn', 'error']
        : ['query', 'warn', 'error'],
  }).$extends(withAccelerate())

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createClient> | undefined
}

export const db = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
