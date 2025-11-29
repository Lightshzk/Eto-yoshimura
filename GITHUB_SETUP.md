# 🚀 Como Fazer Push do Bot para GitHub

## Passo 1: Criar um Repositório no GitHub

1. Vá para [github.com](https://github.com)
2. Clique em **"New"** ou vá para [github.com/new](https://github.com/new)
3. Preencha os dados:
   - **Repository name**: `eto-yoshimura-bot` (ou outro nome)
   - **Description**: WhatsApp Bot com Progressão XP, Duelos PvP e Conteúdo +18
   - **Visibility**: Private (se quiser) ou Public
   - **NÃO** inicialize com README, .gitignore ou licença
4. Clique em **"Create repository"**

## Passo 2: Conectar com seu Repositório Local

Depois de criar o repositório, o GitHub mostrará comandos. Use:

```powershell
cd 'c:\Users\dagur\Eto Yoshimura\eto-bot'

# Adicionar remoto (substitua USER e REPO pelos seus)
git remote add origin https://github.com/USER/eto-yoshimura-bot.git

# Renomear branch para main (opcional, GitHub usa main por padrão)
git branch -M main

# Fazer push inicial
git push -u origin main
```

### ⚠️ Se Pedir Autenticação:

**Opção 1: Personal Access Token (Recomendado)**
1. No GitHub: Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Clique em "Generate new token"
3. Selecione escopos: `repo`, `admin:repo_hook`
4. Copie o token
5. Quando pedir senha no Git, cole o token

**Opção 2: SSH (Mais Seguro)**
```powershell
# Gerar chave SSH
ssh-keygen -t ed25519 -C "seu_email@example.com"

# Copie a chave pública
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
```
1. No GitHub: Settings → SSH and GPG keys → New SSH key
2. Cole a chave pública
3. Use a URL SSH do repositório: `git@github.com:USER/eto-yoshimura-bot.git`

## Passo 3: Verificar Status

```powershell
cd 'c:\Users\dagur\Eto Yoshimura\eto-bot'

# Ver status
git status

# Ver commits
git log --oneline

# Ver remoto
git remote -v
```

## 📋 Estrutura do Repositório

```
eto-bot/
├── eto.js                  # Bot principal
├── package.json            # Dependências
├── README.md              # Documentação
├── .gitignore             # Arquivos ignorados
├── commands/
│   ├── actions.js         # Ações com GIFs
│   ├── admin.js           # Admin tools
│   ├── adult.js           # Conteúdo +18
│   ├── duels.js           # Sistema PvP
│   ├── games.js           # Jogos interativos
│   ├── menus.js           # Sistema de menus
│   ├── music.js           # Download de música
│   └── personality.js     # Personalidade
├── utils/
│   ├── logger.js          # Sistema de logs
│   ├── progression.js     # XP e achievements
│   ├── rateLimiter.js     # Proteção spam
│   └── storage.js         # Persistência JSON
└── data/                  # Dados salvos (ignorado)
```

## 🔄 Próximos Commits

Depois de fazer push, sempre use:

```powershell
# Fazer alterações
# ... edite os arquivos

# Adicionar mudanças
git add .

# Fazer commit
git commit -m "Descrição clara das mudanças"

# Fazer push
git push origin main
```

## 📌 Boas Práticas para Commits

```powershell
# Adicionar novas features
git commit -m "feat: Adicionar novo comando /shiprank"

# Corrigir bugs
git commit -m "fix: Corrigir crash em duelos quando usuário sai"

# Melhorias de performance
git commit -m "perf: Otimizar busca de música"

# Documentação
git commit -m "docs: Atualizar README com guia de instalação"

# Refatoração
git commit -m "refactor: Simplificar lógica de progressão"
```

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Git local configurado com `user.name` e `user.email`
- [ ] Remote adicionado com `git remote add origin`
- [ ] Primeiro push realizado com `git push -u origin main`
- [ ] Verificado que todos os arquivos estão no GitHub
- [ ] `.gitignore` está ignorando `/data/`, `/logs/`, `node_modules/`

## 🆘 Solução de Problemas

**Erro: "fatal: 'origin' does not appear to be a 'git' repository"**
```powershell
git remote add origin https://github.com/USER/REPO.git
```

**Erro: "Permission denied (publickey)"**
- Use HTTPS em vez de SSH
- Ou configure SSH key corretamente

**Erro: "Updates were rejected because the tip of your current branch is behind"**
```powershell
git pull origin main --allow-unrelated-histories
git push origin main
```

---

**Agora você está pronto! 🚀** O bot está versionado e pronto para colaboração!
