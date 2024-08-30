.PHONY: run_backend
# run the Django server in the virtual environment
run_back:
	@ ./backend/env/bin/python ./backend/manage.py runserver

# frontend side
.PHONY: run_frontend
run_front:
	@ cd ./frontend && npm start 

.PHONY: verify_lint_front
lint_front:
	@cd ./frontend && npm run lint

.PHONY: lint_format_fix_front
lint_format_front:
	@cd ./frontend && npm run lint:fix && npm run format
