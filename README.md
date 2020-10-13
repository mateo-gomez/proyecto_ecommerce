# proyecto_ecommerce
Para poder iniciar este proyecto es necesario el archivo .env con las credenciales de la base de datos.

Ej:

DB_USERNAME=username
DB_PASSWORD=password
DB_HOST=127.0.0.1
DB_DATABASE=database

Para instalar las dependencias: yarn o npm install
Para realizar las migraciones: npx sequelize-cli db:migrate
Para deshacer las migraciones: npx sequelize-cli db:migrate:undo:all
Para cargar las semillas: npx sequelize-cli db:seed:all
Para deshacer las semillas: npx sequelize-cli db:seed:undo:all

Para mas info sobre los comandos cli visitar: https://github.com/sequelize/cli
