import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuários de teste
  const user1 = await prisma.user.upsert({
    where: { email: 'joao@email.com' },
    update: {},
    create: {
      email: 'joao@email.com',
      name: 'João Silva',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'maria@email.com' },
    update: {},
    create: {
      email: 'maria@email.com',
      name: 'Maria Santos',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'pedro@email.com' },
    update: {},
    create: {
      email: 'pedro@email.com',
      name: 'Pedro Costa',
    },
  });

  console.log('✅ Usuários criados:', { user1, user2, user3 });

  // Criar cachorros de teste
  const dog1 = await prisma.dog.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Rex',
      breed: 'Golden Retriever',
      age: 3,
      size: 'large',
      gender: 'male',
      description:
        'Cachorro muito carinhoso e brincalhão. Adora crianças e outros animais.',
      isAdopted: false,
      ownerId: user1.id,
    },
  });

  const dog2 = await prisma.dog.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Luna',
      breed: 'Labrador',
      age: 2,
      size: 'medium',
      gender: 'female',
      description:
        'Luna é muito dócil e obediente. Perfeita para famílias com crianças pequenas.',
      isAdopted: false,
      ownerId: user2.id,
    },
  });

  const dog3 = await prisma.dog.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Max',
      breed: 'Bulldog Francês',
      age: 4,
      size: 'small',
      gender: 'male',
      description:
        'Max é calmo e tranquilo. Ideal para apartamentos e pessoas que buscam um companheiro fiel.',
      isAdopted: true,
      ownerId: user3.id,
    },
  });

  const dog4 = await prisma.dog.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Bella',
      breed: 'Pastor Alemão',
      age: 1,
      size: 'large',
      gender: 'female',
      description:
        'Bella é jovem e energética. Precisa de espaço para correr e brincar.',
      isAdopted: false,
      ownerId: user1.id,
    },
  });

  console.log('✅ Cachorros criados:', { dog1, dog2, dog3, dog4 });

  // Criar favoritos de teste
  const dogFavorite1 = await prisma.dogFavorite.upsert({
    where: {
      userId_dogId: {
        userId: user2.id,
        dogId: dog1.id,
      },
    },
    update: {},
    create: {
      userId: user2.id,
      dogId: dog1.id,
      isFavorite: true,
    },
  });

  const dogFavorite2 = await prisma.dogFavorite.upsert({
    where: {
      userId_dogId: {
        userId: user3.id,
        dogId: dog2.id,
      },
    },
    update: {},
    create: {
      userId: user3.id,
      dogId: dog2.id,
      isFavorite: true,
    },
  });

  console.log('✅ Favoritos criados:', { dogFavorite1, dogFavorite2 });

  console.log('🎉 Seed concluído com sucesso!');
  console.log('\n📊 Resumo dos dados criados:');
  console.log(`👥 Usuários: 3`);
  console.log(`🐕 Cachorros: 4 (3 disponíveis, 1 adotado)`);
  console.log(`❤️ Favoritos: 2`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
