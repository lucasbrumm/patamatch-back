# Exemplos de Uso da API de Adoções

Este documento contém exemplos práticos de como usar a API de adoções.

## 1. Criar uma Nova Solicitação de Adoção

```bash
POST /dog-adoptions
Content-Type: application/json

{
  "userId": 1,
  "dogId": 5,
  "notes": "Gostaria de adotar este cachorro. Tenho experiência com cães e um quintal grande."
}
```

**Nota:** O status é sempre criado como "pending" automaticamente. Não é necessário (nem permitido) enviar o status na criação.

**Resposta:**

```json
{
  "id": 1,
  "userId": 1,
  "dogId": 5,
  "status": "pending",
  "notes": "Gostaria de adotar este cachorro. Tenho experiência com cães e um quintal grande.",
  "createdAt": "2024-10-14T22:00:00.000Z",
  "updatedAt": "2024-10-14T22:00:00.000Z",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "João Silva",
    "image": {...}
  },
  "dog": {
    "id": 5,
    "name": "Rex",
    "breed": "Labrador",
    "images": [...],
    "owner": {...},
    "localization": {...}
  }
}
```

## 2. Buscar Todas as Adoções de um Usuário

```bash
GET /dog-adoptions/user/1
```

Retorna todas as adoções (pendentes, aprovadas, rejeitadas, etc.) associadas ao usuário com ID 1.

## 3. Buscar Todos os Usuários Interessados em um Cachorro

```bash
GET /dog-adoptions/users-by-dog/5
```

**Resposta:**

```json
[
  {
    "id": 1,
    "email": "user1@example.com",
    "name": "João Silva",
    "phone": "11999999999",
    "image": {...},
    "adoptionId": 1,
    "adoptionStatus": "pending",
    "adoptionNotes": "Gostaria de adotar este cachorro...",
    "adoptionCreatedAt": "2024-10-14T22:00:00.000Z",
    "adoptionUpdatedAt": "2024-10-14T22:00:00.000Z"
  },
  {
    "id": 2,
    "email": "user2@example.com",
    "name": "Maria Santos",
    "phone": "11988888888",
    "image": {...},
    "adoptionId": 2,
    "adoptionStatus": "rejected",
    "adoptionNotes": "Também tenho interesse...",
    "adoptionCreatedAt": "2024-10-13T20:00:00.000Z",
    "adoptionUpdatedAt": "2024-10-14T10:00:00.000Z"
  }
]
```

## 4. Buscar Todos os Cachorros que um Usuário Tentou Adotar

```bash
GET /dog-adoptions/dogs-by-user/1
```

**Resposta:**

```json
[
  {
    "id": 5,
    "name": "Rex",
    "breed": "Labrador",
    "age": 3,
    "size": "large",
    "gender": "male",
    "description": "Cachorro muito dócil",
    "isAdopted": false,
    "isAvailable": true,
    "images": [...],
    "owner": {...},
    "localization": {...},
    "adoptionId": 1,
    "adoptionStatus": "pending",
    "adoptionNotes": "Gostaria de adotar...",
    "adoptionCreatedAt": "2024-10-14T22:00:00.000Z",
    "adoptionUpdatedAt": "2024-10-14T22:00:00.000Z"
  },
  {
    "id": 7,
    "name": "Bolinha",
    "breed": "Beagle",
    "age": 2,
    "adoptionId": 3,
    "adoptionStatus": "approved",
    ...
  }
]
```

## 5. Aprovar uma Adoção

```bash
PATCH /dog-adoptions/1
Content-Type: application/json

{
  "status": "approved",
  "notes": "Adoção aprovada após análise do perfil. Agendar visita."
}
```

## 6. Buscar Adoções por Status

```bash
GET /dog-adoptions/status/pending
```

Retorna todas as adoções com status "pending".

```bash
GET /dog-adoptions/status/approved
```

Retorna todas as adoções aprovadas.

## 7. Buscar Adoção Específica por Usuário e Cachorro

```bash
GET /dog-adoptions/user/1/dog/5
```

Retorna a adoção específica entre o usuário 1 e o cachorro 5.

## 8. Completar uma Adoção

```bash
PATCH /dog-adoptions/1
Content-Type: application/json

{
  "status": "completed",
  "notes": "Adoção finalizada com sucesso. Cachorro entregue ao novo dono."
}
```

## 9. Cancelar uma Adoção

```bash
PATCH /dog-adoptions/1
Content-Type: application/json

{
  "status": "cancelled",
  "notes": "Adotante desistiu da adoção."
}
```

## 10. Verificar se Usuário já se Candidatou

```bash
GET /dog-adoptions/check/user/1/dog/5
```

**Resposta se o usuário já se candidatou:**

```json
{
  "hasApplied": true
}
```

**Resposta se o usuário NÃO se candidatou:**

```json
{
  "hasApplied": false
}
```

**Uso típico:** Útil para exibir botões diferentes no frontend (ex: "Candidatar-se" vs "Já Candidatado").

## 11. Deletar uma Adoção

```bash
DELETE /dog-adoptions/1
```

ou

```bash
DELETE /dog-adoptions/user/1/dog/5
```

## Fluxo Típico de Adoção

1. **Usuário solicita adoção**: POST /dog-adoptions (apenas userId, dogId e notes opcionais - status definido automaticamente como "pending")
2. **Administrador revisa**: GET /dog-adoptions/status/pending
3. **Administrador aprova**: PATCH /dog-adoptions/:id (status: "approved")
4. **Processo de adoção é concluído**: PATCH /dog-adoptions/:id (status: "completed")
5. **Cachorro é marcado como adotado** (em outro endpoint): PATCH /dogs/:id (isAdopted: true, isAvailable: false)

## Status Possíveis

- `pending`: Aguardando aprovação
- `approved`: Aprovado, processo em andamento
- `rejected`: Rejeitado
- `completed`: Concluído com sucesso
- `cancelled`: Cancelado

## Casos de Uso Importantes

### Ver histórico de adoções de um cachorro popular

```bash
GET /dog-adoptions/dog/5
```

Útil para ver quantas pessoas tentaram adotar um cachorro específico.

### Ver todas as adoções de um usuário

```bash
GET /dog-adoptions/user/1
```

Útil para ver o histórico de tentativas de adoção de um usuário.

### Buscar quem está tentando adotar seus cachorros (como dono)

1. Buscar cachorros do usuário: GET /dogs?ownerId=1
2. Para cada cachorro: GET /dog-adoptions/users-by-dog/:dogId

### Verificar se usuário já se candidatou antes de mostrar botão

Antes de exibir o botão "Candidatar-se" no frontend:

```bash
GET /dog-adoptions/check/user/1/dog/5
```

- Se `hasApplied: true` → Mostrar "Já Candidatado" (desabilitado)
- Se `hasApplied: false` → Mostrar "Candidatar-se à Adoção" (habilitado)
