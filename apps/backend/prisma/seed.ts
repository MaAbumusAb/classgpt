import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });

  console.log('Created user:', user);

  // Create a test chat
  const chat = await prisma.chat.create({
    data: {
      userId: user.id,
      title: 'My First Chat',
    },
  });

  console.log('Created chat:', chat);

  // Create test messages
  await prisma.message.createMany({
    data: [
      {
        chatId: chat.id,
        role: 'user',
        content: 'Hello, ClassGPT!',
      },
      {
        chatId: chat.id,
        role: 'assistant',
        content: 'Hello! How can I help you learn today?',
      },
    ],
  });

  console.log('Created messages');

  // Create usage record
  await prisma.usage.create({
    data: {
      userId: user.id,
      promptTokens: 10,
      completionTokens: 20,
      totalTokens: 30,
      model: 'gpt-3.5-turbo',
    },
  });

  console.log('Created usage record');
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
