# Description

This repository contains a small web application created for an exam. The app allows users to perform various tasks related to the exam.

## Features

- User authentication and authorization
- Create, read, update, and delete exam questions
- Generate and view exam reports
- Manage exam schedules and deadlines

## Technologies Used

- **Front-end:** HTML, CSS, JavaScript
- **Back-end:** Node.js, Express
- **Database:** MySQL

## Getting Started

1. **Clone the repository:**
    ```sh
    git clone https://github.com/petitbato/examWeb1.git
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Setup database using MySQL workbench:**

    - Ensure MySQL is installed and running on your local machine.
    - Open MySQL Workbench and connect to your MySQL server.
    - Go to `File` > `Open SQL Script...` and select the SQL dump file `mysql_setup/localhost-2024_11_14_19_03_45-dump.sql`.
    - Click on the `Open` button.
    - In the SQL editor, click on the `Execute` button (lightning bolt icon) to run the script and set up the database.

4. **Start the development server:**
    ```sh
    npm start
    ```

5. **Open the app in your browser:**
    ```
    http://localhost:4000
    ```

## License

This project is licensed under the MIT License.