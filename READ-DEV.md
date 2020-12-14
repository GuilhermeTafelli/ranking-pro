Run db local:

sudo docker run -p 5432:5432 -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=ranking-pro postgres

Create new migration:

yarn sequelize migration:create --name=create-profile-instagram-simulation
Run migrations:

yarn sequelize db:migrate