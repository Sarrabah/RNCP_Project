.PHONY: run_backend
# run the Django server in the virtual environment
run_back:
	@ ./backend/env/bin/python ./backend/manage.py runserver

.PHONY: run_frontend
run_front:
	@ cd ./frontend && npm start 
