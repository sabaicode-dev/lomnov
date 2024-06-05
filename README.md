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
    <img src="https://scontent.fpnh12-1.fna.fbcdn.net/v/t39.30808-6/442411090_1706865856519524_6047954477474765512_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=55M-fqEF9fwQ7kNvgHMt_Ac&_nc_ht=scontent.fpnh12-1.fna&oh=00_AYAR_Pr-pVcoTA11g5bqjcK58XCoiaC_ktptt5IiXIH9qQ&oe=66649281" alt="Logo" width="85" height="80">
  </a>
  <h3 align="center">Lomnov</h3>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project

Lomnov(Real Estate) is a modern platform designed to streamline the processes of buying,Rent, selling, and managing real estate properties. There are shops, houses, condos, rooms, buildings, land and warehouses.Provides comprehensive and accurate information about real estate.Available as location, size and exact price And real estate status. And facilitate the relationship between buyers and sellers to process buying and selling effectively.<a href="https://www.canva.com/design/DAGHKHFaUWU/cqMOcz4wzs5Cq6CgHNiArw/edit" target="_blank">Lomnov</a>!




## Our vision
Our vision is to empower individuals and families by providing seamless, transparent, and innovative real estate solutions that help them find their dream homes and invest wisely.
<a href="https://www.canva.com/design/DAGHKI7wOz8/RcQOSuOxkVkL5T5Qqyry2w/edit" target="_blank">Product vision board</a>

## Our mission
 Real estate mission statement is a formal articulation of your business’s purpose. It describes how you aim to be distinctly different from competitors.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## UI design

* [![Static Badge](https://img.shields.io/badge/Figma-2C2D34?style=for-the-badge&logo=figma&logoColor=fff&color=%232C2D34)](https://www.figma.com/design/sCWB1VnuGGrwtrGkyURvk1/Real-Estate-Platform?node-id=125-1395&t=aYvtQZ36Kadb2gPC-0)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

This section we lists all library and framework that make this project
* [![React][React.js]][React-url]
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

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 





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




