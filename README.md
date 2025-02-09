# Art Créa Pro

`Art Créa Pro` is a personal project, named in honor of my cousin, whom I sadly lost in 2023.
The project is inspired by a real-world problem and was developed to address this need.
This is why i choose it to be a part of my RNCP certification process.

## Project Overview
Art Créa pro is designed to simplify the work of architects. In its current version (MVP), the app enables architects to easily browse and select the products they need to create a customized quote request for a specific customer.
Once the quote is prepared, it can be sent to multiple hardware stores, allowing the architect to choose the quote that best matches his budget.

The long-term vision for the app includes not only one type of but two: architects and hardware stores. The goal is to facilitate interactions between them, enabling architects to collaborate directly with hardware stores through the platform. This project is continuously evolving as part of the RNCP Level 7 certification process.

## Current Features
 
- Quote Creation: Easily create customized quote requests tailored to a specific customer’s needs.
- Product Selection: Architects can browse and select from a list of available products.
- Filling Quote Requests: Architects can add selected products to already created quote requests.
- Quote Submission: Send finalized quote requests to multiple hardware stores.

## Technologies Used

- **Backend**: Python, Django
- **Frontend**: React, TypeScript, HTML, Ant Design, CSS
- **DataBase**: MySQL, MySQL Workbench 
- **Deployment**: Scaleway
- **Devops**: Docker
- **Automation**: Makefile

## Installation

1. **Clone the repository**:
   ```bash
   git clone git@github.com:Sarrabah/RNCP_Project.git
   cd RNCP_Project
2. **Set up the environment**:
Ensure you have Docker installed.
Run the following command to create and start all the services from your configuration file
    ```bash
    docker compose up
3. **Set up the database**:
You need to apply the migrations to set up your database schema, run this cmd inside the backend container console:
    ```bash
    python manage.py migrate
This will create the necessary tables in the MySQL database.

## Usage
If you want to acced to `Art Créa Pro` via internet you can use this link: http://51.159.190.76:8000/ \
Otherwise, if you want to run it in your machine, after setting up the environment, you can access the application by navigating to http://localhost:8000 in your web browser.

## Contact
For any questions or inquiries, please contact me with email [Sarra Ben Arbia](mailto:sarrabenarbia1996@gmail.com).

