# Database - EnsaioNuvens

## 📋 Sobre

**ESTRUTURA PREPARATÓRIA** para o banco de dados MySQL do sistema EnsaioNuvens.

**⚠️ Status Atual:** Apenas schema SQL definido. Sem implementação ativa.

## 🗄️ Schema Criado

- **Banco:** MySQL
- **Arquivo:** `schema.sql` - Contém todas as tabelas necessárias
- **Status:** ✅ Schema completo definido

### Tabelas Planejadas:
- `usuarios` - Usuários do sistema
- `bandas` - Informações das bandas
- `musicos` - Músicos das bandas
- `musicas` - Músicas do repertório

## 🔄 Status do Desenvolvimento

**ATUALMENTE NÃO IMPLEMENTADO** - Foco está no frontend com mocks.

### Quando implementar:
1. **Configure o MySQL** localmente
2. **Execute o schema:**
```sql
mysql -u root -p < schema.sql
```
3. **Popule com dados iniciais** (seeds)

## 📁 Estrutura Criada

```
database/
├── migrations/     # Futuras migrações
├── seeds/         # Dados iniciais
└── schema.sql     # Schema completo do banco
```

## 🚨 Importante

- **NÃO está rodando** - Apenas schema preparado
- **NÃO interfere** no desenvolvimento do frontend
- **Pronto para implementação** quando necessário

---

**🔄 Este é apenas um schema preparatório. O desenvolvimento atual está focado no frontend com mocks.**
