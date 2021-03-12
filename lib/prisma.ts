import { PrismaClient } from '@prisma/client'
import Adapters from "next-auth/adapters";

const prismaClientPropertyName = `__prevent-name-collision__prisma`;
type GlobalThisWithPrismaClient = typeof globalThis & {
	[prismaClientPropertyName]: PrismaClient;
};

const getPrismaClient = () => {
	if (process.env.NODE_ENV === `production`) {
		return new PrismaClient();
	} else {
		const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
		if (!newGlobalThis[prismaClientPropertyName]) {
			newGlobalThis[prismaClientPropertyName] = new PrismaClient();
		}
		return newGlobalThis[prismaClientPropertyName];
	}
};
const prisma= getPrismaClient();

//export default prisma
export default Adapters.Prisma.Adapter({prisma});