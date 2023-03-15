import { PrismaClient } from '@prisma/client';

// Save on global file cause is not affected for router reloading
const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === 'production') global.prismadb = client;

export default client;
