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

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar banco**:
   ```bash
   npx prisma db push
   ```

3. **Gerar cliente Prisma**:
   ```bash
   npx prisma generate
   ```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:cov
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