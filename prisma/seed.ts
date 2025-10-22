import { PrismaClient } from '@prisma/client';
import { dogImages, userImages } from './images';
import { dogLocalizations } from './localizations';

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
      phone: '+55 11 99999-1111',
      userType: 'CREATOR', // João é um criador/doador
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'maria@email.com' },
    update: {},
    create: {
      email: 'maria@email.com',
      name: 'Maria Santos',
      phone: '+55 11 99999-2222',
      userType: 'ADOPTER', // Maria é uma adotante
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'pedro@email.com' },
    update: {},
    create: {
      email: 'pedro@email.com',
      name: 'Pedro Costa',
      phone: '+55 11 99999-3333',
      userType: 'CREATOR', // Pedro é um criador/doador
    },
  });

  console.log('✅ Usuários criados:', { user1, user2, user3 });

  console.log('Adicionando imagem de perfil do usuário 1');
  await prisma.userImage.create({
    data: {
      userId: user1.id,
      imageData: userImages[0].imageData,
      mimeType: userImages[0].mimeType,
      filename: userImages[0].filename,
      size: userImages[0].size,
    },
  });
  console.log('✅ Imagem de perfil do usuário 1 adicionada');

  console.log('Adicionando imagem de perfil do usuário 2');
  await prisma.userImage.create({
    data: {
      userId: user2.id,
      imageData: userImages[1].imageData,
      mimeType: userImages[1].mimeType,
      filename: userImages[1].filename,
      size: userImages[1].size,
    },
  });
  console.log('✅ Imagem de perfil do usuário 2 adicionada');
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
      isVaccinated: true,
      isCastrated: false,
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
      isVaccinated: true,
      isCastrated: true,
      ownerId: user1.id,
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
      isAdopted: false,
      isVaccinated: false,
      isCastrated: true,
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
      isVaccinated: false,
      isCastrated: false,
      ownerId: user3.id,
    },
  });

  const dog5 = await prisma.dog.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: 'Rufus',
      breed: 'Fila',
      age: 6,
      size: 'large',
      gender: 'male',
      description: 'Cachorro para cuidar de fazenda e proteger a propriedade.',
      isAdopted: false,
      isVaccinated: true,
      isCastrated: true,
      ownerId: user3.id,
    },
  });

  console.log('✅ Cachorros criados:', { dog1, dog2, dog3, dog4, dog5 });

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

  // Criar imagens dos cachorros
  console.log('📸 Criando imagens dos cachorros...');

  const createdImages: Array<{ id: number; dogId: number }> = [];
  for (const imageData of dogImages) {
    const dogImage = await prisma.dogImage.create({
      data: {
        imageData: imageData.imageData,
        mimeType: 'image/jpeg',
        filename: `dog-${imageData.dogId}.jpg`,
        size: imageData.imageData.length,
        order: 1,
        dogId: imageData.dogId,
      },
    });
    createdImages.push(dogImage);
  }

  console.log(
    `✅ Imagens criadas: ${createdImages.length} imagens adicionadas`,
  );

  console.log('Criando localização dos cachorros...');

  const createdLocalizations: any[] = [];
  for (const localization of dogLocalizations) {
    const dogLocalization = await prisma.dogLocalization.create({
      data: {
        dogId: localization.dogId,
        latitude: localization.latitude,
        longitude: localization.longitude,
      },
    });
    createdLocalizations.push(dogLocalization);
  }

  console.log(
    `✅ Localizações criadas: ${createdLocalizations.length} localizações adicionadas`,
  );

  console.log('🎉 Seed concluído com sucesso!');
  console.log('\n📊 Resumo dos dados criados:');
  console.log(`👥 Usuários: 3`);
  console.log(`🐕 Cachorros: 4`);
  console.log(`❤️ Favoritos: 2`);
  console.log(`📸 Imagens: ${createdImages.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
