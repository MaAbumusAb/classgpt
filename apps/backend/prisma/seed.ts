import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@classgpt.com' },
    update: {},
    create: {
      email: 'demo@classgpt.com',
      name: 'Demo User',
    },
  });

  console.log(`Created user: ${user.email}`);

  // Create a demo chat
  const chat = await prisma.chat.create({
    data: {
      title: 'Welcome to ClassGPT',
      userId: user.id,
      messages: {
        create: [
          {
            role: 'assistant',
            content: 'Hello! I am ClassGPT, your multilingual AI study assistant. How can I help you today?',
          },
        ],
      },
    },
  });

  console.log(`Created chat: ${chat.title}`);
  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
