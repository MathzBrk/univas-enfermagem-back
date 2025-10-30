# Scripts npm - Guia Completo

## 🚀 Scripts de Desenvolvimento

### Iniciar o projeto completo
```bash
npm run dev
```
**O que faz:**
- Sobe o PostgreSQL no Docker
- Inicia a aplicação em modo watch (hot-reload)
- Ideal para começar a trabalhar

---

## 🐳 Scripts do Docker

### Iniciar PostgreSQL
```bash
npm run docker:up
```
**O que faz:** Sobe o container do PostgreSQL em background

### Parar containers
```bash
npm run docker:down
```
**O que faz:** Para o PostgreSQL (dados são mantidos)

### Ver logs do PostgreSQL
```bash
npm run docker:logs
```
**O que faz:** Mostra logs em tempo real (Ctrl+C para sair)

### Resetar PostgreSQL
```bash
npm run docker:reset
```
**O que faz:**
- ⚠️ **APAGA TODOS OS DADOS!**
- Remove o container e volumes
- Cria novo container limpo

---

## 🗄️ Scripts do Prisma

### Gerar Prisma Client
```bash
npm run prisma:generate
```
**Quando usar:**
- Após alterar o `schema.prisma`
- Depois de clonar o repositório
- Se o import do Prisma não funcionar

### Criar/Aplicar Migration
```bash
npm run prisma:migrate
# ou
npx prisma migrate dev --name nome_da_migration
```
**O que faz:**
- Cria SQL baseado no schema
- Aplica no banco de dados
- Gera o Prisma Client automaticamente

### Deploy de Migrations (Produção)
```bash
npm run prisma:migrate:deploy
```
**Quando usar:** Apenas em produção/staging

### Abrir Prisma Studio
```bash
npm run prisma:studio
```
**O que faz:**
- Abre interface visual em http://localhost:5555
- Ver/editar dados do banco
- Não precisa de pgAdmin!

### Executar Seeds
```bash
npm run prisma:seed
```
**O que faz:**
- Popula banco com dados de teste
- Útil após resetar o banco

### Resetar Banco (Prisma)
```bash
npm run prisma:reset
```
**O que faz:**
- ⚠️ **APAGA TODOS OS DADOS!**
- Remove todas as tabelas
- Aplica todas as migrations novamente
- Roda o seed automaticamente (se configurado)

---

## 🔧 Scripts Combinados (Atalhos Úteis)

### Setup Completo do Banco
```bash
npm run db:setup
```
**O que faz:**
1. Sobe o PostgreSQL
2. Gera o Prisma Client
3. Aplica todas as migrations

**Quando usar:**
- Primeira vez clonando o projeto
- Depois de resetar tudo

### Reset Total
```bash
npm run db:reset
```
**O que faz:**
1. ⚠️ **APAGA TUDO!**
2. Reseta o Docker (remove volumes)
3. Regenera o Prisma Client

**Quando usar:**
- Bagunçou o banco de dados
- Quer começar do zero
- Mudou muito o schema

---

## 🏗️ Scripts de Build

### Build para Produção
```bash
npm run build
```
**O que faz:**
- Compila TypeScript → JavaScript
- Resolve os aliases (@modules, @infrastructure, etc)
- Gera pasta `dist/`

### Iniciar Produção
```bash
npm start
```
**O que faz:**
- Roda a versão compilada (dist/)
- Não tem hot-reload
- Use após `npm run build`

---

## ✅ Scripts de Qualidade

### Formatar Código
```bash
npm run check
```
**O que faz:**
- Formata código com Biome
- Corrige problemas automaticamente

### Testes
```bash
npm test                # Roda todos os testes
npm run test:watch      # Modo watch
npm run test:push       # Com cobertura (CI/CD)
```

---

## 📋 Fluxo de Trabalho Recomendado

### 1️⃣ Primeira vez no projeto
```bash
npm install
npm run db:setup
npm run prisma:seed  # (opcional - se tiver seed)
npm run dev
```

### 2️⃣ Trabalhando normalmente
```bash
npm run dev
# Desenvolva...
# Salve o arquivo (hot-reload automático)
```

### 3️⃣ Alterou o schema.prisma
```bash
# Edite src/infrastructure/database/prisma/schema.prisma
npx prisma migrate dev --name descricao_da_mudanca
# Prisma Client é regenerado automaticamente
```

### 4️⃣ Bagunçou o banco
```bash
npm run db:reset
npm run prisma:seed
```

### 5️⃣ Antes de commitar
```bash
npm run check        # Formata código
npm test            # Testa
git add .
git commit -m "feat: sua feature"
```

---

## 🆘 Troubleshooting

### Erro: "Prisma Client not found"
```bash
npm run prisma:generate
```

### Erro: "Port 5432 already in use"
```bash
# Você já tem PostgreSQL rodando
# Opção 1: Pare o PostgreSQL local
sudo service postgresql stop

# Opção 2: Mude a porta no .env
POSTGRES_PORT=5433
```

### Banco está estranho / com erro
```bash
npm run db:reset
npm run prisma:seed
```

### Container do Docker não sobe
```bash
# Ver o que está errado
npm run docker:logs

# Resetar tudo
npm run docker:reset
```

### TypeScript com erro de tipos
```bash
npm run prisma:generate
# Reinicie o VS Code
```

---

## 💡 Dicas Pro

### Seed rápido
Crie alias no seu shell:
```bash
# Adicione no ~/.bashrc ou ~/.zshrc
alias dbseed="npm run prisma:seed"
alias dbreset="npm run db:reset && npm run prisma:seed"
```

### Prisma Studio sempre disponível
Em um terminal separado:
```bash
npm run prisma:studio
```
Deixa rodando e acesse quando precisar.

### Ver estrutura do banco
```bash
docker exec univas-enfermagem-db psql -U postgres -d univas_enfermagem -c "\dt"
```

### Backup rápido (para testes)
```bash
docker exec univas-enfermagem-db pg_dump -U postgres univas_enfermagem > backup.sql
```

### Restaurar backup
```bash
cat backup.sql | docker exec -i univas-enfermagem-db psql -U postgres univas_enfermagem
```
