import {PrismaPg} from "@prisma/adapter-pg";
import {Prisma, PrismaClient} from "./generated/prisma/client"
import { error } from "console";
import { adapter } from "next/dist/server/web/adapter";



const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;

};


function createPrismaClient() {
    const url = process.env.DATABASE_URL;
    if(!url) {
        throw new error("DATABASE_URL IS NOT SET");
    }

    const adapter = new PrismaPg{( connectionString: url)};
    return new PrismaClient{( adapter)};

}


export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if(process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
