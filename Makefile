.PHONY: help install install-app install-server start start-app start-server build clean

help:
	@echo "Available commands:"
	@echo "  make install       - Install app and server dependencies"
	@echo "  make install-app   - Install app dependencies only"
	@echo "  make install-server - Install server dependencies only"
	@echo "  make start         - Start app and server"
	@echo "  make start-app     - Start app only"
	@echo "  make start-server  - Start server only"
	@echo "  make build         - Build app for production"
	@echo "  make clean         - Remove node_modules and build files"

kill-ports:
	@echo "Killing processes on ports 8080 and 3001..."
	lsof -t -i:8080 -sTCP:LISTEN | xargs kill -9 || true
	lsof -t -i:3001 -sTCP:LISTEN | xargs kill -9 || true

install: install-app install-server

install-app:
	@echo "Installing app dependencies..."
	cd app && npm install

install-server:
	@echo "Installing server dependencies..."
	cd server && npm install

start: kill-ports
	@echo "Starting app and server..."
	@make -j2 start-app start-server

start-app:
	@echo "Starting app..."
	cd app && npm run dev

start-server:
	@echo "Starting server..."
	cd server && npm start

build:
	@echo "Building app..."
	cd app && npm run build

clean:
	@echo "Cleaning files..."
	rm -rf app/node_modules app/dist
	rm -rf server/node_modules
