<div align="center">

# 🦉 Eto Yoshimura Bot - WhatsApp

![Tokyo Ghoul](https://img.shields.io/badge/Tokyo%20Ghoul-Eto%20Yoshimura-red?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-14+-green?style=for-the-badge&logo=node.js)
![Status](https://img.shields.io/badge/Status-Ativo-brightgreen?style=for-the-badge)
![Versão](https://img.shields.io/badge/Versão-2.0-blue?style=for-the-badge)

**Bot de WhatsApp inspirado na icônica Eto Yoshimura de Tokyo Ghoul**

_"Ara ara~ Que comece a diversão..."_ 😈🦉

[Instalação](#-instalação-rápida) • [Comandos](#-comandos-disponíveis) • [Recursos](#-recursos-avançados) • [Segurança](#-segurança)

</div>

---

## ⚠️ **AVISO IMPORTANTE - CONTEÚDO +18**

Este bot contém **conteúdo adulto explícito** e é destinado **EXCLUSIVAMENTE** para maiores de 18 anos.

- 🔞 Linguagem sexual explícita
- 🔞 Temas adultos e provocantes
- 🔞 Conteúdo BDSM e fetichista
- 🔞 GIFs e imagens sugestivas

**USE COM RESPONSABILIDADE E RESPEITO MÚTUO.**

---

## ✨ Características Principais

- 🎮 **70+ Comandos** - Jogos, música, ações, duelos, progression
- 🎭 **37 GIFs Animados** - Ações interativas com animações
- 🎵 **Sistema de Música** - Download e reprodução do YouTube
- 💋 **Personalidade Única** - IA com a personalidade da Eto
- 🔒 **Verificação de Idade** - Proteção em conversas privadas
- 📊 **Sistema de Logs** - Rastreamento completo de atividades
- 💾 **Persistência de Dados** - Salva progresso e preferências
- ⚡ **Rate Limiting** - Proteção contra spam
- **🆕 🎮 Sistema de Progression** - XP, Levels (0-15), Achievements
- **🆕 ⚔️ Duelos PvP** - Desafie outros usuários em combate
- **🆕 👤 Customização de Perfil** - Apelido, Título, Bio
- **🆕 🏆 Ranking Global** - Veja os top players
- **🆕 📈 Admin Panel** - Ferramentas de administração

---

## 🚀 Instalação Rápida

### 📋 Requisitos

- **Node.js** v14 ou superior ([Download](https://nodejs.org/))
- **npm** ou **yarn**
- **Conta WhatsApp** ativa

### 📦 Passos de Instalação

```bash
# 1. Clone ou baixe o projeto
cd eto-bot

# 2. Instale as dependências
npm install

# 3. Inicie o bot
npm start
```

### 📱 Conectar ao WhatsApp

1. Execute `npm start`
2. Escaneie o **QR Code** que aparecerá no terminal
3. Abra o WhatsApp no celular
4. Vá em **Dispositivos Conectados** → **Conectar Dispositivo**
5. Escaneie o código
6. ✅ Pronto! O bot está online!

---

## 📋 Comandos Disponíveis

### 🎮 **Jogos e Diversão**

| Comando | Descrição |
|---------|-----------|
| `/menu` ou `/help` | Menu completo do bot |
| `/verdade` | Verdade ou Desafio +18 |
| `/vd` | Escolher Verdade ou Desafio |
| `/eununca` | Jogo "Eu nunca..." +18 |
| `/voceprefe` | "Você prefere?" +18 |
| `/ship` | Shippar dois membros do grupo |
| `/nota` | Dar nota aleatória (0-10) |
| `/casar @pessoa` | Casar com alguém |
| `/divorciar` | Se divorciar |
| `/perfil` | Ver seu perfil |
| `/top` | Ranking de pontos |
| `/stats` | Estatísticas do grupo |

### 🎵 **Música & Áudio**

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `/play <música>` | Tocar música do YouTube | `/play unravel tokyo ghoul` |
| `/buscar <música>` | Buscar músicas | `/buscar naruto opening` |
| `/musica` | Menu de música | - |

### 🎭 **Ações com GIF**

| Comando | Emoji | Descrição |
|---------|-------|-----------|
| `/beijo` | 💋 | Beijar alguém |
| `/abraco` | 🤗 | Abraçar alguém |
| `/tapa` | 👋 | Dar um tapa |
| `/morder` | 🦷 | Morder (estilo ghoul) |
| `/lamber` | 👅 | Lamber alguém |
| `/agarrar` | 😈 | Agarrar com força |

### � **Comandos Adultos** (Apenas Privado)

<details>
<summary><b>⚠️ Clique para expandir (Conteúdo +18)</b></summary>

#### 🔥 Básicos
- `/sexo` - Modo explícito
- `/pegar` - Pegação
- `/meter` - Sem censura

#### 👅 Oral & Mais
- `/chupar` - Oral
- `/provocar` - Provocação

#### ⛓️ BDSM & Dominação
- `/dominar` - Dominação total
- `/amarrar` - Bondage com kagune

#### 🎲 Interativos
- `/gemido` - Ouvir gemidos
- `/tesao` - Medidor de tesão (0-100%)
- `/suruba` - Orgia no grupo (apenas grupos)

</details>

## 📁 Estrutura

```
eto-bot/
├── eto.js                    # Arquivo principal
├── package.json              # Dependências
├── commands/
│   ├── personality.js        # Respostas gerais
│   ├── games.js             # Jogos
│   ├── music.js             # Comandos de música
│   ├── actions.js           # Ações com GIF
│   ├── adult.js             # Conteúdo adulto
│   └── menus.js             # 🆕 Sistema centralizado de menus
├── utils/
│   ├── logger.js            # Sistema de logs
│   ├── storage.js           # Persistência de dados
│   └── rateLimiter.js       # Rate limiting
├── logs/                    # Arquivos de log
├── data/                    # Dados persistentes
├── README.md
└── MENUS_DOCUMENTATION.md   # 🆕 Documentação de menus
```

## 🛠️ Melhorias Implementadas

✅ **Sistema de Logging** - Rastreia todas as ações e erros
✅ **Persistência de Dados** - Salva dados de usuários em JSON
✅ **Rate Limiting** - Previne spam de comandos
✅ **Tratamento de Erros Robusto** - Try-catch em pontos críticos
✅ **Validação de URL** - Verifica URLs antes de usar
✅ **Timeout de Download** - Evita travamentos em downloads
✅ **Versões Pinadas** - Evita problemas com atualizações
✅ **Sistema de Menus Centralizado** - Todos os menus em um único arquivo

## 📊 Arquivos de Log

Os logs são salvos automaticamente em:
- `logs/error-YYYY-MM-DD.log` - Erros críticos
- `logs/warning-YYYY-MM-DD.log` - Avisos
- `logs/info-YYYY-MM-DD.log` - Informações gerais
- `logs/debug-YYYY-MM-DD.log` - Debug detalhado

## 💾 Persistência

Os dados dos usuários são salvos em:
- `data/userAges.json` - IDs e status de verificação

## 🔒 Segurança

- ✅ Verificação de idade em chats privados
- ✅ Conteúdo adulto apenas em privado
- ✅ Rate limiting contra spam
- ✅ Validação de entrada
- ✅ Dados sensíveis no `.gitignore`

## ⚙️ Configuração

Você pode editar os arquivos de comando em `commands/` para customizar:
- Respostas
- Comandos
- Frequência de comandos
- Limites de taxa

## 🐛 Troubleshooting

### Bot não aparece online?
- Escaneie o QR Code novamente
- Verifique sua internet
- Reinicie o bot

### Músicas não baixam?
- Verifique sua conexão
- YouTube pode estar bloqueando
- Tente outra música

### Erros de permissão?
- Verifique permissões da pasta `eto-bot`
- Use `npm install` como admin se necessário

## 🎮 **NOVO - Sistema de Progression & Duelos**

### 📈 **Levels e XP**

- 🎯 **Níveis**: 0-15 (máximo)
- ⭐ **XP**: Ganho em todas as ações
- 💎 **Pontos**: Para customizações especiais
- 🏆 **20+ Achievements**: Desbloqueáveis
- 🏅 **Rankings**: Global e de Duelos

**Ganho de XP:**
- Jogar um jogo: **10 XP**
- Vencer um jogo: **30 XP**
- Duelo vitória: **50 XP**
- Duelo derrota: **10 XP** (ainda ganha!)
- Comando adulto: **15 XP**

### ⚔️ **Duelos PvP**

```
/duelo @pessoa - Desafiar alguém

Movimentos (5 rounds max):
1️⃣ Ataque Básico - 10-15 dano
2️⃣ Ataque Forte - 15-25 dano (50% falha)
3️⃣ Defesa - Reduz próximo dano 50%
4️⃣ Kagune - 20-30 dano (30% falha)

/duelo movimento 1
```

### 👤 **Customização de Perfil**

```
/setapelido <nome> - Mudar apelido (máx 20 caracteres)
/settitulo <titulo> - Definir título (máx 30 caracteres)
/setbio <bio> - Escrever bio (máx 60 caracteres)
/perfil - Ver seu perfil completo
```

### 🏆 **Achievements Principais**

| Nome | Descrição | Pontos |
|------|-----------|--------|
| 🎮 Primeiro Jogo | Jogar seu primeiro jogo | 10 |
| ⚔️ Primeiro Duelo | Participar de seu primeiro duelo | 20 |
| 👑 Máximo Poder | Alcançar nível 15 | 100 |
| ⚔️ Mestre dos Duelos | Vencer 10 duelos | 75 |
| 🔥 Racha de 10 | Usar bot 10 dias consecutivos | 40 |
| 👑 Mestre Ghoul | Nível 15 + 10 duelos | 150 |

## 📝 Notas

- Bot responde melhor a mensagens em português
- Conteúdo adulto disponível apenas em chats privados
- Use responsavelmente!

## 📜 Licença

ISC

---

**Desenvolvido com ❤️ e muita safadeza**

*"Que comece a diversão..." - Eto Yoshimura* 🦉
