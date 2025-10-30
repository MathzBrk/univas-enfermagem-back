# Database Layer

Esta pasta contém toda a infraestrutura relacionada ao banco de dados utilizando Prisma ORM.

## Estrutura

```
database/
├── prisma/
│   ├── schema.prisma       # Schema do banco de dados
│   └── migrations/         # Histórico de migrations
├── lib/
│   └── prisma.ts          # Singleton do Prisma Client
├── generated/
│   └── prisma/            # Código gerado pelo Prisma (não editar)
└── index.ts               # Exports públicos do módulo
```

## Como usar

### Import do Prisma Client

```typescript
// Usando alias do tsconfig
import prisma from "@infrastructure/database";

// Ou usando path relativo
import { prisma } from "@/infrastructure/database";
```

### Exemplos de uso

```typescript
import prisma from "@infrastructure/database";

// Create
const employee = await prisma.employee.create({
  data: {
    name: "João Silva",
    email: "joao@example.com",
    password: "hashed_password",
    cpf: "12345678900",
    role: "EMPLOYEE",
  },
});

// Read
const employees = await prisma.employee.findMany({
  where: { isActive: true },
  include: {
    schedulingsReceived: true,
    applicationsReceived: true,
  },
});

// Update
const updated = await prisma.employee.update({
  where: { id: "employee-id" },
  data: { isActive: false },
});

// Delete (soft delete recomendado)
const deleted = await prisma.employee.update({
  where: { id: "employee-id" },
  data: { deletedAt: new Date() },
});
```

## Comandos úteis

```bash
# Gerar Prisma Client após alterar schema
npm run prisma:generate

# Criar nova migration
npx prisma migrate dev --name <nome_da_migration>

# Aplicar migrations (produção)
npm run prisma:migrate:deploy

# Abrir Prisma Studio (GUI para o banco)
npm run prisma:studio
```

## Migrations

As migrations são versionadas e armazenadas em `prisma/migrations/`. Nunca edite migrations já aplicadas em produção.

### Criar nova migration

1. Edite o `schema.prisma`
2. Execute: `npx prisma migrate dev --name <descricao_da_mudanca>`
3. O Prisma gerará automaticamente o SQL e aplicará no banco

### Aplicar migrations em produção

```bash
npm run prisma:migrate:deploy
```

## Schema

O arquivo `prisma/schema.prisma` contém:

- **Enums**: Role, SchedulingStatus, ReportType, NotificationType
- **Models**: Employee, Vaccine, VaccineScheduling, VaccineApplication, Report, Notification

Todos os models incluem:
- `id`: UUID único
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização (automático)
- `deletedAt`: Soft delete (opcional)

## Boas Práticas

1. **Sempre use transactions** para operações que modificam múltiplas tabelas:
```typescript
await prisma.$transaction([
  prisma.employee.create({ data: employeeData }),
  prisma.notification.create({ data: notificationData }),
]);
```

2. **Use select/include** para otimizar queries:
```typescript
// Bom - retorna apenas campos necessários
const employee = await prisma.employee.findUnique({
  where: { id },
  select: { id: true, name: true, email: true },
});
```

3. **Implemente soft delete** ao invés de deletar registros:
```typescript
// Ao invés de delete
await prisma.employee.update({
  where: { id },
  data: { deletedAt: new Date() },
});
```

4. **Use tipos gerados** pelo Prisma:
```typescript
import type { Employee, Prisma } from "@infrastructure/database";

// Usar tipos específicos
type EmployeeCreateInput = Prisma.EmployeeCreateInput;
type EmployeeWithRelations = Prisma.EmployeeGetPayload<{
  include: { notifications: true };
}>;
```

## Troubleshooting

### Erro: "Prisma Client not found"

```bash
npm run prisma:generate
```

### Erro: "Database not in sync"

```bash
npx prisma migrate dev
```

### Reset completo do banco (CUIDADO!)

```bash
npx prisma migrate reset
```
