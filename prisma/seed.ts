import { PrismaClient } from '../generated/prisma';

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
      description: 'Cachorro muito carinhoso e brincalhão. Adora crianças e outros animais.',
      isAdopted: false,
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
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
      description: 'Luna é muito dócil e obediente. Perfeita para famílias com crianças pequenas.',
      isAdopted: false,
      imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
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
      description: 'Max é calmo e tranquilo. Ideal para apartamentos e pessoas que buscam um companheiro fiel.',
      isAdopted: true,
      imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
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
      description: 'Bella é jovem e energética. Precisa de espaço para correr e brincar.',
      isAdopted: false,
      imageUrl: 'https://images.unsplash.com/photo-1605568427561-40dd23c2e5d2?w=400',
      ownerId: user1.id,
    },
  });

  console.log('✅ Cachorros criados:', { dog1, dog2, dog3, dog4 });

  // Criar posts de teste
  const post1 = await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Rex procura uma família amorosa',
      content: 'Rex é um Golden Retriever de 3 anos que está procurando uma família que possa dar muito amor e carinho. Ele é muito brincalhão e adora crianças.',
      published: true,
      postType: 'adoption',
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600',
      authorId: user1.id,
      dogId: dog1.id,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Luna - Cachorra para adoção',
      content: 'Luna é uma Labrador de 2 anos, muito dócil e obediente. Ela seria perfeita para uma família com crianças pequenas.',
      published: true,
      postType: 'adoption',
      imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
      authorId: user2.id,
      dogId: dog2.id,
    },
  });

  const post3 = await prisma.post.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Max foi adotado! 🎉',
      content: 'É com grande alegria que anunciamos que Max encontrou sua família para sempre! Obrigado a todos que se interessaram.',
      published: true,
      postType: 'update',
      imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600',
      authorId: user3.id,
      dogId: dog3.id,
    },
  });

  const post4 = await prisma.post.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: 'Dicas para cuidar de filhotes',
      content: 'Aqui estão algumas dicas importantes para quem está pensando em adotar um filhote: alimentação adequada, vacinação, socialização e muito amor!',
      published: true,
      postType: 'general',
      authorId: user1.id,
    },
  });

  const post5 = await prisma.post.upsert({
    where: { id: 5 },
    update: {},
    create: {
      title: 'Bella precisa de exercícios',
      content: 'Bella é uma Pastor Alemão jovem e cheia de energia. Ela precisa de uma família ativa que possa proporcionar exercícios regulares.',
      published: false,
      postType: 'adoption',
      imageUrl: 'https://images.unsplash.com/photo-1605568427561-40dd23c2e5d2?w=600',
      authorId: user1.id,
      dogId: dog4.id,
    },
  });

  console.log('✅ Posts criados:', { post1, post2, post3, post4, post5 });

  console.log('🎉 Seed concluído com sucesso!');
  console.log('\n📊 Resumo dos dados criados:');
  console.log(`👥 Usuários: 3`);
  console.log(`🐕 Cachorros: 4 (3 disponíveis, 1 adotado)`);
  console.log(`📝 Posts: 5 (4 publicados, 1 rascunho)`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

