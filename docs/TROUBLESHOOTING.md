### Setup Inicial (apenas primeira vez)

```bash
# 1. Instalar dependências
npm install

# 2. Subir PostgreSQL
npm run docker:up

# 3. Gerar Prisma Client
npm run prisma:generate

# 4. Criar migration inicial
npx prisma migrate dev --name init

# 5. Iniciar aplicação
npm run start:dev
```

### Uso Diário

```bash
# Subir banco
npm run docker:up

# Desenvolver
npm run start:dev

# Visualizar banco
npm run prisma:studio

# Parar banco
npm run docker:down
```

---

## Outros Problemas Comuns

### Porta 5432 já em uso

**Se você já tem PostgreSQL rodando localmente:**

1. Altere no [.env](.env):
```env
POSTGRES_PORT=5433
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/univas_enfermagem?schema=public"
```

2. Reinicie:
```bash
npm run docker:down
npm run docker:up
```

### Erro de conexão com banco

```bash
# Verificar se container está rodando
docker ps

# Ver logs
npm run docker:logs

# Reiniciar
npm run docker:down
npm run docker:up
```

### Resetar banco completamente

```bash
# CUIDADO: Apaga todos os dados!
npm run docker:reset

# Recriar schema
npx prisma migrate dev --name init
```

### Prisma Client desatualizado

```bash
# Sempre que alterar schema.prisma
npm run prisma:generate
```

---

## Como Usar o Prisma Client

Exemplo de uso no código:

```typescript
// Opção 1: Import direto do módulo database
import prisma from "@infrastructure/database";

// Opção 2: Import usando path relativo
import prisma from "@/infrastructure/database";

// Buscar por email
const user = await prisma.employee.findUnique({
  where: { email: "joao@example.com" },
});
```

## Comandos Úteis

```bash
# Docker
npm run docker:up          # Iniciar PostgreSQL
npm run docker:down        # Parar containers
npm run docker:logs        # Ver logs
npm run docker:reset       # Resetar tudo (apaga dados!)

# Prisma
npm run prisma:generate    # Gerar client
npm run prisma:studio      # Interface visual
npx prisma migrate dev --name <nome>  # Nova migration
npx prisma migrate deploy  # Deploy migrations (produção)

# App
npm run start:dev          # Desenvolvimento
npm run build              # Build para produção
npm start                  # Rodar produção
npm test                   # Testes
```

---

## Links Úteis

- [Documentação do Prisma](https://www.prisma.io/docs)
- [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

## Precisando de Ajuda?

1. Verifique os logs: `npm run docker:logs`
2. Consulte a [documentação Docker](README.Docker.md)
3. Consulte o [guia rápido](QUICK_START.md)
4. Reinicie tudo: `npm run docker:reset`
