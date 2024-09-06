# backend side

# run the Django server in the virtual environment
.PHONY: run_backend
run_back:
	@ ./backend/env/bin/python ./backend/manage.py runserver

# Linting and formatting
SUCCESS_MSG :=  "(˵•̀ ᴗ -˵)"

.PHONY: lint_backend
lint_backend : black isort flake8

.PHONY: black 
black:
	@ echo "~~~~ Running black ~~~~"
	@ black ./backend/backend ./backend/my_app  && echo $(SUCCESS_MSG)
	@ echo ""

.PHONY: isort
isort:
	@ echo "~~~~ Running isort ~~~~"
	@ isort ./backend/backend ./backend/my_app && echo $(SUCCESS_MSG)
	@ echo ""

.PHONY: flake8
flake8:
	@ echo "~~~~ Running flake8 ~~~~"
	@ flake8 --max-line-length 95 ./backend/backend ./backend/my_app && echo $(SUCCESS_MSG)
	@ echo ""

# frontend side
.PHONY: run_frontend
run_front:
	@ cd ./frontend && npm start 

.PHONY: verify_lint_front
verify_lint_front:
	@cd ./frontend && npm run lint

.PHONY: lint_frontend
lint_frontend:
	@cd ./frontend && npm run lint:fix && npm run format
