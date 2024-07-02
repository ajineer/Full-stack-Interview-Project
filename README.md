# Full-stack-Interview-Project

# Getting the game

- git clone git@github.com:ajineer/Full-stack-Interview-Project.git

# setting up virtual environment

- in the main directory of the project run: pipenv install
- in the main directory of the project run: pipenv shell

# setting up database

- cd into backend: cd backend
- run: export FLASK_APP=app.py
- initalize migrations: flask db init
- intial upgrade: flask db upgrade
- migrate to inital upgrade: flask db migrate
- create migration for creating tables: flask db revision --autogenerate
- upgrade with new migration to create database: flask db upgrade
- now run server: python app.py or python3 app.py

# front end setup

- open new terminal next to server terminal and switch to frontend directory: cd frontend
- run: npm install
- run: npm build
- run: npm run dev
- now frontend and backend should be running (frontend localhost port: 5173, backend localhost port: 5555)
