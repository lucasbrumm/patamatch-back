# 🐕 Patamatch Backend - Sistema de Adoção de Cachorros

API REST desenvolvida com NestJS para gerenciar adoção de cachorros, usuários e posts.

## 🚀 Como Executar

### Modo Local (Apenas localhost)
```bash
npm run start:local
```
- **Acesso**: `http://localhost:3000`
- **Uso**: Desenvolvimento local, apenas sua máquina

### Modo Rede (Acessível por outros dispositivos)
```bash
npm run start:network
```
- **Acesso local**: `http://localhost:3000`
- **Acesso externo**: `http://192.168.0.245:3000`
- **Uso**: Testes com outros dispositivos na mesma rede

### Modo Desenvolvimento (Padrão)
```bash
npm run start:dev
```
- **Acesso**: `http://localhost:3000`
- **Uso**: Desenvolvimento com hot reload

## 📱 Acesso pela Rede

Para acessar de outros dispositivos na mesma rede:

1. **Descubra seu IP local**:
   ```bash
   hostname -I
   ```

2. **Use o IP encontrado**:
   - Exemplo: `http://192.168.0.245:3000`

3. **Dispositivos que podem acessar**:
   - Celulares na mesma rede WiFi
   - Outros computadores na mesma rede
   - Tablets na mesma rede

## 🔧 Scripts Disponíveis

| Script | Descrição | Host | Uso |
|--------|-----------|------|-----|
| `npm run start:local` | Desenvolvimento local | localhost | Apenas sua máquina |
| `npm run start:network` | Desenvolvimento em rede | 0.0.0.0 | Outros dispositivos |
| `npm run start:dev` | Desenvolvimento padrão | localhost | Hot reload |
| `npm run start:prod:local` | Produção local | localhost | Apenas sua máquina |
| `npm run start:prod:network` | Produção em rede | 0.0.0.0 | Outros dispositivos |

## 🛠️ Endpoints Disponíveis

### 👥 Usuários
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `GET /users/:id` - Buscar usuário
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### 🐕 Cachorros
- `GET /dogs` - Listar cachorros
- `POST /dogs` - Criar cachorro
- `GET /dogs/available` - Cachorros disponíveis para adoção
- `GET /dogs/owner/:ownerId` - Cachorros de um proprietário
- `GET /dogs/:id` - Buscar cachorro
- `PATCH /dogs/:id` - Atualizar cachorro
- `PATCH /dogs/:id/adopt` - Adotar cachorro
- `DELETE /dogs/:id` - Deletar cachorro

### 📝 Posts
- `GET /posts` - Listar posts
- `POST /posts` - Criar post
- `GET /posts/published` - Posts publicados
- `GET /posts/type/:postType` - Posts por tipo (adoption, general, update)
- `GET /posts/author/:authorId` - Posts de um autor
- `GET /posts/dog/:dogId` - Posts de um cachorro
- `GET /posts/:id` - Buscar post
- `PATCH /posts/:id` - Atualizar post
- `PATCH /posts/:id/publish` - Publicar post
- `PATCH /posts/:id/unpublish` - Despublicar post
- `DELETE /posts/:id` - Deletar post

## 🗄️ Banco de Dados

O projeto usa PostgreSQL com Prisma ORM. Para configurar:

### 1. **Configuração Inicial**

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar variável de ambiente**:
   ```bash
   echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/patamatch?schema=public"' > .env
   ```

3. **Iniciar banco de dados com Docker**:
   ```bash
   docker-compose up -d
   ```

4. **Aplicar migrações**:
   ```bash
   npx prisma migrate deploy
   ```

5. **Gerar cliente Prisma**:
   ```bash
   npx prisma generate
   ```

6. **Popular com dados de teste**:
   ```bash
   npm run db:seed
   ```

7. **Iniciar o servidor**:
   ```bash
   npm run start:dev
   ```

### 2. **Verificação da Configuração**

- **Banco de dados**: PostgreSQL rodando na porta 5432
- **API**: http://localhost:3000
- **Status**: `curl http://localhost:3000` deve retornar "Hello World!"

### 3. **Dados de Teste**

O banco é populado automaticamente com dados de exemplo:

- **👥 3 Usuários**: João Silva, Maria Santos, Pedro Costa
- **🐕 4 Cachorros**: Rex (Golden), Luna (Labrador), Max (Bulldog - adotado), Bella (Pastor Alemão)
- **📝 5 Posts**: 4 publicados (3 adoção, 1 geral), 1 rascunho

### 4. **Comandos Úteis**

```bash
# Popular banco com dados de teste
npm run db:seed

# Parar o banco de dados
docker-compose down

# Ver logs do banco
docker-compose logs postgres

# Resetar banco (cuidado: apaga todos os dados)
docker-compose down --volumes
docker-compose up -d
npx prisma migrate deploy
npm run db:seed
```

## 🧪 Testes

### Testes Automatizados
```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:cov
```

### Testes Manuais da API

Com o servidor rodando (`npm run start:dev`), você pode testar os endpoints:

```bash
# Testar endpoints básicos
curl http://localhost:3000                    # Hello World
curl http://localhost:3000/users              # Listar usuários
curl http://localhost:3000/dogs               # Listar cachorros
curl http://localhost:3000/posts              # Listar posts

# Testar endpoints específicos
curl http://localhost:3000/dogs/available     # Cachorros disponíveis
curl http://localhost:3000/posts/published    # Posts publicados
curl http://localhost:3000/posts/type/adoption # Posts de adoção

# Testar endpoints com parâmetros
curl http://localhost:3000/users/1            # Usuário específico
curl http://localhost:3000/dogs/1             # Cachorro específico
curl http://localhost:3000/posts/1            # Post específico
```

## 📋 Requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## 🔒 Segurança

- Validação de dados com class-validator
- Tratamento de erros robusto
- Relacionamentos seguros entre entidades

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Se o banco de dados está rodando
2. Se a porta 3000 está disponível
3. Se o firewall não está bloqueando conexões
4. Se todos os dispositivos estão na mesma rede