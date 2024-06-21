FROM node:18-alpine

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários e instale as dependências
COPY package.json package-lock.json* ./
RUN npm install

# Copie o restante dos arquivos do aplicativo Next.js
COPY . .

# Construa a aplicação para produção
RUN npm run build

# Exponha a porta onde a aplicação estará rodando
EXPOSE 3000

# Inicie o servidor Next.js
CMD ["npm", "start"]