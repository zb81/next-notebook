import { PrismaClient } from '@prisma/client'
import singleton from './singleton'

export default singleton('prisma', () => new PrismaClient())
