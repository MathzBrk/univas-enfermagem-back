# Quick Start Guide

## Setup em 5 passos

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar ambiente
```bash
cp .env.example .env
# O .env já foi configurado, mas você pode ajustá-lo se necessário
```

### 3. Iniciar PostgreSQL
```bash
npm run docker:up
```

Aguarde alguns segundos para o banco inicializar completamente.

### 4. Configurar Prisma
```bash
# Gerar Prisma Client
npm run prisma:generate

# Criar e aplicar migrations (use --name para evitar prompt interativo)
npx prisma migrate dev --name init
```

### 5. Iniciar aplicação
```bash
npm run start:dev
```

## Verificar se tudo está funcionando

### Verificar Docker
```bash
docker ps
# Você deve ver o container: univas-enfermagem-db
```

### Verificar banco com Prisma Studio
```bash
npm run prisma:studio
# Abre em http://localhost:5555
```

### Logs do PostgreSQL
```bash
npm run docker:logs
```

## Próximos passos

1. Criar seeds para popular o banco com dados iniciais
2. Implementar os endpoints da API
3. Adicionar validações com Zod
4. Implementar autenticação JWT
5. Criar testes

## Comandos úteis

```bash
# Parar containers
npm run docker:down

# Ver logs
npm run docker:logs

# Resetar banco (CUIDADO!)
npm run docker:reset

# Abrir Prisma Studio
npm run prisma:studio

# Rodar testes
npm test
```

## Troubleshooting

### Erro "Port 5432 already in use"
Você já tem PostgreSQL rodando. Altere `POSTGRES_PORT=5433` no `.env` e atualize a `DATABASE_URL`.

### Erro ao conectar no banco
```bash
# Reinicie o container
npm run docker:down
npm run docker:up

# Aguarde 10 segundos e tente novamente
```

### Erro no Prisma
```bash
# Regenere o client
npm run prisma:generate
```

Para mais detalhes, consulte [README.Docker.md](README.Docker.md)
