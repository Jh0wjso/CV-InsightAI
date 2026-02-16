.PHONY: help install install-app install-server start start-app start-server build clean

help:
	@echo "Comandos disponíveis:"
	@echo "  make install       - Instala dependências do app e server"
	@echo "  make install-app   - Instala dependências do app"
	@echo "  make install-server - Instala dependências do server"
	@echo "  make start         - Inicia app e server"
	@echo "  make start-app     - Inicia apenas o app"
	@echo "  make start-server  - Inicia apenas o server"
	@echo "  make build         - Build do app para produção"
	@echo "  make clean         - Remove node_modules e arquivos de build"

kill-ports:
	@echo "Matando processos nas portas 8080 e 3001..."
	lsof -t -i:8080 -sTCP:LISTEN | xargs kill -9 || true
	lsof -t -i:3001 -sTCP:LISTEN | xargs kill -9 || true

install: install-app install-server

install-app:
	@echo "Instalando dependências do app..."
	cd app && npm install

install-server:
	@echo "Instalando dependências do server..."
	cd server && npm install

start: kill-ports
	@echo "Iniciando app e server..."
	@make -j2 start-app start-server

start-app:
	@echo "Iniciando app..."
	cd app && npm run dev

start-server:
	@echo "Iniciando server..."
	cd server && npm start

build:
	@echo "Build do app..."
	cd app && npm run build

clean:
	@echo "Limpando arquivos..."
	rm -rf app/node_modules app/dist
	rm -rf server/node_modules
