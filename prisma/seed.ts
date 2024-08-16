import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserSeed } from './seeds/user.seed';

const prisma = new PrismaClient();

async function main() {
  const hash = async (password: string) => await bcrypt.hash(password, 10);
  try {
    for (const user of UserSeed) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: { ...user, password: await hash(user.password) },
      });
    }

  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
