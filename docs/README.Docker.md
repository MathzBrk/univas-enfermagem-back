# Docker Setup - Univas Enfermagem

## Pré-requisitos

- Docker
- Docker Compose
- Node.js 20+ (para desenvolvimento local)

## Configuração Inicial

### 1. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o `.env` conforme necessário. A configuração padrão já funciona para desenvolvimento local.

### 2. Iniciar o PostgreSQL via Docker

```bash
npm run docker:up
```

Ou diretamente:

```bash
docker compose up -d
```

### 3. Gerar o Prisma Client

```bash
npm run prisma:generate
```

### 4. Executar as migrations

```bash
npm run prisma:migrate
```

Se for a primeira vez, será solicitado um nome para a migration, ex: `init`

### 5. Iniciar a aplicação em modo de desenvolvimento

```bash
npm run start:dev
```

## Scripts Disponíveis

### Docker

- `npm run docker:up` - Inicia os containers
- `npm run docker:down` - Para os containers
- `npm run docker:logs` - Visualiza os logs
- `npm run docker:reset` - Remove volumes e reinicia (CUIDADO: apaga dados!)

### Prisma

- `npm run prisma:generate` - Gera o Prisma Client
- `npm run prisma:migrate` - Cria e aplica migrations em desenvolvimento
- `npm run prisma:migrate:deploy` - Aplica migrations em produção
- `npm run prisma:studio` - Abre interface visual do banco
- `npm run prisma:seed` - Executa seed (quando implementado)

## Modos de Execução

### Opção 1: Apenas PostgreSQL no Docker (Recomendado para desenvolvimento)

Este é o modo padrão configurado. O PostgreSQL roda no Docker, mas você executa a aplicação localmente com hot-reload:

```bash
# Inicia apenas o PostgreSQL
npm run docker:up

# Em outro terminal, executa a aplicação
npm run start:dev
```

**Vantagens:**
- Hot-reload funcionando
- Debug mais fácil
- Melhor performance

### Opção 2: Tudo no Docker

Para rodar tanto o PostgreSQL quanto a aplicação no Docker, descomente a seção `app` no [docker compose.yml](docker compose.yml) e execute:

```bash
docker compose up -d
```

**Importante:** Lembre-se de alterar a `DATABASE_URL` no `.env` de `localhost` para `postgres`:
```
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/univas_enfermagem?schema=public"
```

## Acessar o Banco de Dados

### Via Prisma Studio (Recomendado)

```bash
npm run prisma:studio
```

Acesse: http://localhost:5555

### Via psql

```bash
docker exec -it univas-enfermagem-db psql -U postgres -d univas_enfermagem
```

### Via cliente externo (DBeaver, pgAdmin, etc)

- Host: `localhost`
- Port: `5432`
- Database: `univas_enfermagem`
- User: `postgres`
- Password: `postgres`

## Troubleshooting

### Porta 5432 já está em uso

Se você já tem PostgreSQL rodando localmente, altere a porta no `.env`:

```
POSTGRES_PORT=5433
```

E atualize a `DATABASE_URL`:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/univas_enfermagem?schema=public"
```

### Erro de conexão com o banco

Verifique se o container está rodando:

```bash
docker ps
```

Veja os logs:

```bash
npm run docker:logs
```

### Resetar o banco de dados

```bash
npm run docker:reset
npm run prisma:migrate
```

## Produção

Para deploy em produção:

1. Use variáveis de ambiente seguras
2. Altere `JWT_SECRET` para uma chave forte
3. Configure `DATABASE_URL` para apontar para o banco de produção
4. Execute migrations com:
   ```bash
   npm run prisma:migrate:deploy
   ```

## Estrutura

- `docker compose.yml` - Configuração dos serviços Docker
- `Dockerfile` - Imagem da aplicação (opcional)
- `.dockerignore` - Arquivos ignorados no build
- `.env` - Variáveis de ambiente (não comitado)
- `.env.example` - Template de variáveis de ambiente
