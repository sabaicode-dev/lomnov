# Project Name: Your Project Name

Welcome to the **Your Project Name** repository. This README provides guidelines on our coding conventions, project structure, and development practices to ensure consistency and maintainability of the codebase.

## Code Conventions

We aim to maintain a clean and uniform codebase. Please adhere to the following conventions when contributing to this project.

### Directory Structure

Our project is organized into several key directories:

```bash
/project-root
|-- /apps
| |-- /backend # Backend Service
| |-- /frontend-client # NextJS application for the client
| |-- /frontend-dashboard # ReactJS Dashboard application
|-- /packages
| |-- /ui-components # Reusable UI components
| |-- /libs
| |-- /utils # Utility functions
| |-- /types # TypeScript type definitions
```

### Naming Conventions

#### Files and Folders

- **Files**: Use kebab-case for file names. Example: `user-profile.ts`, `login-form.tsx`.
- **Folders**: Use kebab-case for folder names. Example: `ui-components`, `order-processing`.

#### Code

- **Variables and Functions**: Use camelCase for identifiers.
  ```typescript
  let recordCount = 10;
  function fetchUserData() { ... }

- **Classes and Interface**: Use PascalCase for classes and interfaces
  ```typescript
  class UserProcessor { ... }
  interface UserData { ... }

#### Functions
- Keep functions concise and focused on a single task.
- Clearly name functions to reflect their purpose.

#### Variables
- Use descriptive names, avoiding vague or generic terms.
- Avoid single-letter names except in short, localized loops.

#### React/NextJS Components
- Name React/NextJS components using PascalCase and match the file name with the component name.
- Place each component in its own folder with its associated styles and tests.

#### Commit Messages
- Use clear, concise commit messages in the imperative mood.
Example: "Add payment processing module", "Fix boundary error in cart calculation".

#### Pull Requests
- Describe changes thoroughly.
- Ensure code passes all tests and adheres to the coding standards set forth in this document.


#### Setup and Development
## Getting Started
To set up the project locally, follow these steps:

1. Clone the repository
```bash
git clone [repository-url]
```
2. Install dependencies
```bash
yarn install
```
3. Start All Server
```bash
yarn start
```

#### Contributing
Please read our contributing guidelines carefully before making a pull request. Contributions should be made in a separate branch and submitted via pull requests to the main branch for review.



 <!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://neakhatka.com/">
    <img src="https://scontent.fpnh12-1.fna.fbcdn.net/v/t39.30808-6/442411090_1706865856519524_6047954477474765512_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=55M-fqEF9fwQ7kNvgHMt_Ac&_nc_ht=scontent.fpnh12-1.fna&oh=00_AYAR_Pr-pVcoTA11g5bqjcK58XCoiaC_ktptt5IiXIH9qQ&oe=66649281" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Lomnov</h3>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project

Neakhatka is dedicated to connecting students and recent graduates with valuable internship experiences across Cambodia. Our user-friendly website offers a comprehensive database of internship opportunities in various industries, helping you kickstart your career and gain practical experience. Start your journey towards a successful career today with <a href="https://www.canva.com/design/DAGE7Fg9Oqg/anzWbiic07MlDBmKUWN5wA/edit?utm_content=DAGE7Fg9Oqg&amp;utm_campaign=designshare&amp;utm_medium=link2&amp;utm_source=sharebutton" target="_blank">Neakhatka</a>!




## Our vision
Change the way companies and internship seekers connect, make it easier and more effective.
<a href="https://www.canva.com/design/DAGGJAb9sDU/FqSE7DVtbMQpw5yNbCbpOA/edit?utm_content=DAGGJAb9sDU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank">Product vision board</a>

## Our mission
Built a simplify platform that help both companies and seekers that matching requirement and seeker’s skill

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## UI design

* [![Static Badge](https://img.shields.io/badge/Figma-2C2D34?style=for-the-badge&logo=figma&logoColor=fff&color=%232C2D34)](https://www.figma.com/design/Cvvmjfhl1K2c8EkXBRK3OF/Neakhatka?node-id=22-18&t=3YcYKBcPRNFPZCh9-1)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

This section we lists all library and framework that make this project

* [![Next][Next.js]][Next-url]
* [![Static Badge](https://img.shields.io/badge/Docker%20Desktop-1D63ED?style=for-the-badge&logo=docker&logoColor=fff)](https://www.docker.com/products/docker-desktop/)
* [![Static Badge](https://img.shields.io/badge/Node.js-499442?style=for-the-badge&logo=node.js&logoColor=fff&color=499442)](https://nodejs.org/en)
* [![Static Badge](https://img.shields.io/badge/Tyscript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff&color=3178C6)](https://www.typescriptlang.org/)
* [![Static Badge](https://img.shields.io/badge/Express.js-000?style=for-the-badge&logo=express&logoColor=fff&color=000)](https://expressjs.com/)
* [![Static Badge](https://img.shields.io/badge/Mongodb-%23023430?style=for-the-badge&logo=mongodb&logoColor=fff&color=%23023430)](https://www.mongodb.com/)


  

### Project Structure

<p>The project follows a microservices architecture within a monorepo setup. Below is an overview of the directory structure and the purpose of each component:</p>

```
NEAKHATKA
├── .github
│   └── workflows
│       ├── main.yml
│       └── semantic-release.yml
├── app
│   ├── .next
│   ├── .storybook
│   ├── .vscode
│   ├── node_modules
│   ├── public
│   └── src
│       ├── .eslintrc.json
│       ├── .gitignore
│       ├── cdk.context.json
│       ├── components.json
│       ├── next-env.d.ts
│       ├── next.config.mjs
│       ├── package-lock.json
│       ├── package.json
│       ├── postcss.config.js
│       ├── README.md
│       ├── sst-env.d.ts
│       ├── sst.config.ts
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       └── yarn.lock
├── node_modules
├── packages
│   ├── api-gateway
│   ├── auth-service
│   ├── company-service
│   ├── notification
│   ├── profile-service
│   └── volumes
├── .gitignore
├── docker-compose.yaml
├── package.json
├── README.md
└── yarn.lock

```




<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To run the project, ensure you have the following installed on your system:

* [![Static Badge](https://img.shields.io/badge/Docker%20Desktop-1D63ED?style=for-the-badge&logo=docker&logoColor=fff)](https://www.docker.com/products/docker-desktop/)
* [![Static Badge](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=fff)](https://nodejs.org/)
* [![Static Badge](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=fff)](https://yarnpkg.com/)


Then, follow these steps:

<h3>Frondent</h3>

Open your terminal and run the following command to clone the project repository:

```sh
git clone https://github.com/neakhatka/neakhatka.git

```
2. Navigate to the Project Directory:

```sh
cd neakhatka/app
```
3. Install Dependencies:

Navigate to the root directory of the project and run:

  ```sh
  yarn install
  ```
4. Start the Project:

Use the following command to start all application:

  ```sh
  yarn dev
  ```
5. Click link in your terminal:

Use the following command to start all application:

<a href="http://localhost:3000/">localhost:3000</a>

<h3>Backend</h3>

1. Clone the Repository:

Open your terminal and run the following command to clone the project repository:

```sh
git clone https://github.com/neakhatka/neakhatka.git

```

2. Navigate to the Project Directory:

```sh
cd neakhatka
```

3. Install Dependencies:

Navigate to the root directory of the project and run:

  ```sh
  yarn install
  ```

4. Start the Project using Docker:

Use the following command to start all services defined in the docker-compose.yaml file:

  ```sh
  yarn start:docker
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Neakhatka - neakhatka@gmail.com <br/>
Team members - svatmanith76@gmail.com - sanvisal2302@gmail.com - rathna.chh@gmail.com

Project Link: [https://github.com/neakhatka/neakhatka](https://github.com/neakhatka/neakhatka)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

