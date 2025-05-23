# Multi-language BotService Runner

This repository contains the same bot runner logic implemented in multiple languages.

## Supported Languages

- JavaScript (Node.js)
- TypeScript
- Python
- Ruby
- Java
- PHP
- Lua
- Swift
- Go
- Rust
- Haskell

## How to Use

Each implementation reads a `deploy.config.json` file in the same directory, which must contain:

```json
{
  "language": "javascript",
  "entry": "bot.js"
}
```

The `language` field must match one of the keys supported in the specific file.

### Installation per Language

#### Node.js / TypeScript

```bash
npm install -g ts-node
npm install
ts-node service.ts run
```

#### Python

```bash
python service.py run
```

#### Ruby

```bash
ruby service.rb run
```

#### Java

```bash
javac Service.java
java Service run
```

#### PHP

```bash
php service.php run
```

#### Lua

```bash
lua service.lua run
```

#### Go

```bash
go run service.go run
```

#### Swift

```bash
swift service.swift run
```

#### Rust

```bash
cargo run -- run
```

#### Haskell

```bash
runhaskell service.hs run
```

## Benefits of Using This

- **Multi-language support**: Use the same logic in your preferred language.
- **Cross-platform**: Easily adaptable to various environments.
- **Modular**: You can import and control the bot programmatically in supported languages.
- **Error handling**: Safe fallback when config is missing or unsupported.

Enjoy running bots in your favorite language!
