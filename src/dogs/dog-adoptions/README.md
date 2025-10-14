# Dog Adoptions Module

Módulo responsável por gerenciar o processo de adoção de cachorros, relacionando usuários (Users) com cachorros (Dogs).

## Estrutura

- **Entity**: `DogAdoptionEntity` - Representa uma adoção
- **DTOs**:
  - `CreateDogAdoptionDto` - Para criar uma nova adoção
  - `UpdateDogAdoptionDto` - Para atualizar uma adoção existente
- **Service**: `DogAdoptionsService` - Lógica de negócio
- **Controller**: `DogAdoptionsController` - Endpoints REST

## Tabela de Adoção

A tabela `dog_adoptions` contém:

- `id` - ID único da adoção
- `userId` - ID do usuário que está adotando
- `dogId` - ID do cachorro sendo adotado
- `status` - Status da adoção (pending, approved, rejected, completed, cancelled)
- `notes` - Notas opcionais sobre a adoção
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

**Restrições**:

- Cada par usuário-cachorro pode ter apenas uma adoção (unique constraint)
- Cascata de deleção: se o usuário ou cachorro for deletado, a adoção também será deletada

## Status da Adoção

- `pending` - Solicitação de adoção aguardando aprovação
- `approved` - Adoção aprovada, aguardando conclusão
- `rejected` - Solicitação de adoção rejeitada
- `completed` - Adoção concluída com sucesso
- `cancelled` - Adoção cancelada

## Endpoints

### CRUD Básico

- `POST /dog-adoptions` - Criar uma nova adoção
- `GET /dog-adoptions` - Listar todas as adoções
- `GET /dog-adoptions/:id` - Buscar uma adoção por ID
- `PATCH /dog-adoptions/:id` - Atualizar uma adoção
- `DELETE /dog-adoptions/:id` - Deletar uma adoção

### Buscas Específicas

- `GET /dog-adoptions/user/:userId` - Buscar todas as adoções de um usuário
- `GET /dog-adoptions/dog/:dogId` - Buscar todas as adoções de um cachorro
- `GET /dog-adoptions/user/:userId/dog/:dogId` - Buscar adoção específica de um usuário e cachorro
- `GET /dog-adoptions/status/:status` - Buscar adoções por status

### Buscas de Relacionamento

- `GET /dog-adoptions/users-by-dog/:dogId` - Buscar todos os usuários que tentaram adotar um cachorro específico
- `GET /dog-adoptions/dogs-by-user/:userId` - Buscar todos os cachorros que um usuário tentou adotar

### Deleções Específicas

- `DELETE /dog-adoptions/user/:userId/dog/:dogId` - Deletar adoção específica de um usuário e cachorro

## Exemplos de Uso

### Criar uma nova adoção

```json
POST /dog-adoptions
{
  "userId": 1,
  "dogId": 5,
  "status": "pending",
  "notes": "Gostaria de adotar este cachorro para minha família"
}
```

### Atualizar status da adoção

```json
PATCH /dog-adoptions/1
{
  "status": "approved",
  "notes": "Adoção aprovada após verificação"
}
```

### Buscar cachorros adotados por um usuário

```
GET /dog-adoptions/dogs-by-user/1
```

Retorna uma lista de cachorros com informações da adoção.

### Buscar usuários interessados em um cachorro

```
GET /dog-adoptions/users-by-dog/5
```

Retorna uma lista de usuários com informações da adoção.

