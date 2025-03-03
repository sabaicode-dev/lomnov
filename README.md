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
    <!-- <img src="https://scontent.fpnh12-1.fna.fbcdn.net/v/t39.30808-6/442411090_1706865856519524_6047954477474765512_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=55M-fqEF9fwQ7kNvgHMt_Ac&_nc_ht=scontent.fpnh12-1.fna&oh=00_AYAR_Pr-pVcoTA11g5bqjcK58XCoiaC_ktptt5IiXIH9qQ&oe=66649281" alt="Logo" width="85" height="80"> -->
    <img src="assets/Lomnov-logo.png" alt="Lomnov Logo" width="85" height="85">
  </a>
  <h3 align="center">Lomnov</h3>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

Lomnov(Real Estate) is a modern platform designed to streamline the processes of buying,Rent, selling, and managing real estate properties. There are shops, houses, condos, rooms, buildings, land and warehouses.Provides comprehensive and accurate information about real estate.Available as location, size and exact price And real estate status. And facilitate the relationship between buyers and sellers to process buying and selling effectively.<a href="https://www.canva.com/design/DAGHKHFaUWU/cqMOcz4wzs5Cq6CgHNiArw/edit" target="_blank">Lomnov</a>!

## Our vision

our vision is to transform the real estate industry by:

1. Promoting Sustainable Living: Setting new standards for eco-friendly and sustainable developments.
2. Driving Innovation: Utilizing cutting-edge technology to enhance transparency and efficiency.
3. Creating Thriving Communities: Building vibrant, inclusive neighborhoods where people flourish.
4. Ensuring Excellence and Integrity: Earning trust through unwavering commitment to quality and transparency.
5. Inspiring Global Change: Setting benchmarks for positive impact in the global real estate market.<br/>
   <a href="https://www.canva.com/design/DAGHKI7wOz8/RcQOSuOxkVkL5T5Qqyry2w/edit" target="_blank">Product vision board</a>

## Our mission

our mission is to revolutionize the real estate experience by providing exceptional service, promoting sustainable development, and building vibrant communities. We strive to:

1. Deliver outstanding customer service tailored to individual needs.
2. Incorporate eco-friendly practices in all our projects.
3. Foster inclusive and thriving communities.
4. Embrace innovation and technology.
5. Uphold integrity and transparency in all our dealings

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## UI design

- [![Static Badge](https://img.shields.io/badge/Figma-2C2D34?style=for-the-badge&logo=figma&logoColor=fff&color=%232C2D34)](https://www.figma.com/design/sCWB1VnuGGrwtrGkyURvk1/Real-Estate-Platform?node-id=125-1395&t=aYvtQZ36Kadb2gPC-0)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section we lists all library and framework that make this project

- [![React][React.js]][React-url]
- [![Next][Next.js]][Next-url]
- [![Static Badge](https://img.shields.io/badge/Docker%20Desktop-1D63ED?style=for-the-badge&logo=docker&logoColor=fff)](https://www.docker.com/products/docker-desktop/)
- [![Static Badge](https://img.shields.io/badge/Node.js-499442?style=for-the-badge&logo=node.js&logoColor=fff&color=499442)](https://nodejs.org/en)
- [![Static Badge](https://img.shields.io/badge/Tyscript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff&color=3178C6)](https://www.typescriptlang.org/)
- [![Static Badge](https://img.shields.io/badge/Express.js-000?style=for-the-badge&logo=express&logoColor=fff&color=000)](https://expressjs.com/)
- [![Static Badge](https://img.shields.io/badge/Mongodb-%23023430?style=for-the-badge&logo=mongodb&logoColor=fff&color=%23023430)](https://www.mongodb.com/)

### Project Structure

<p>The project follows a microservices architecture within a monorepo setup. Below is an overview of the directory structure and the purpose of each component:</p>

```
LOMNOV
├── .next
├── .yarn
├── app
│   ├── frontend-client
│   │   ├── .next
│   │   ├── .storybook
│   │   │   ├── main.ts
│   │   │   ├── preview.ts
│   │   ├── node_modules
│   │   ├── public
│   │   ├── src
│   │   │   ├── app
│   │   │   │   ├── (pages)
│   │   │   │   ├── favicon.icon
│   │   │   │   ├── globals.css
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   ├── components
│   │   │   │   ├── atoms
│   │   │   │   ├── molecules
│   │   │   │   ├── organisms
│   │   │   │   ├── templates
│   │   │   ├── icons
│   │   │   ├── eslintrc.json
│   │   │   ├── .gitignore
│   │   │   ├── next-env.d.ts
│   │   │   ├── next.config.mjs
│   │   │   ├── package.json
│   │   │   ├── postcss.config.mjs
│   │   │   ├── README.md
│   │   │   ├── tailwind.config.ts
│   │   │   ├── tsconfig.json
│   ├── frontend-dashboard
│   │   │   ├── .storybook
│   │   │   │   ├── main.ts
│   │   │   │   ├── preview.ts
│   │   │   ├── node_modules
│   │   │   ├── public
│   │   │   ├── src
│   │   │   │   ├── App.css
│   │   │   │   ├── App.test.tsx
│   │   │   │   ├── App.tsx
│   │   │   │   │
│   │   │   │   ├── components
│   │   │   │   │   ├── atoms
│   │   │   │   │   ├── molecules
│   │   │   │   │   ├── organisms
│   │   │   │   │   ├── templates
│   │   │   │   ├── index.css
│   │   │   │   ├── index.tsx
│   │   │   │   ├── react-app-env.d.ts
│   │   │   │   ├── reportWebVitals.ts
│   │   │   │   ├── setUpTest.ts
│   │   │   ├── .gitignore
│   │   │   ├── package.json
│   │   │   ├── postcss.config.js
│   │   │   ├── README.md
│   │   │   ├── tailwind.config.js
│   │   │   ├── tsconfig.json
├── node_modules
├── packages
│   ├── libs
│   │   ├── tpes
│   │   ├── utils
│   │   ├── package.json
│   ├── ui-components
│   │   ├── .storybook
│   │   │   ├── main.ts
│   │   │   ├── preview.ts
│   │   ├── dist
│   │   │   ├── .storybook
│   │   │   │   ├── preview.ts
│   │   │   ├── components
│   │   │   ├── src
│   │   │   │   ├── components
│   │   │   ├── inex.html
│   │   │   ├── ui-components.bundle.js
│   │   │   ├── ui-components.bundle.js.map
│   │   ├── node_modules
│   │   ├── src
│   │   │   ├── components
│   │   │   ├── demo.tsx
│   │   │   ├── index.html
│   │   │   ├── style.css
│   │   ├── .babelrc
│   │   ├── .gitinore
│   │   ├── package.json
│   │   ├── postcass.config.js
│   │   ├── tailwind.config.js
│   │   ├── webpack.config.js
│   │   ├── webpack.config.ui.js
├── .editorconfig
├── .gitignore
├── .yarn.yml
├── package.json
├── README.md


```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

# Getting Started

Before starting the services, make sure to set up the necessary environment variables. **Go to [Link](https://docs.google.com/spreadsheets/d/1o7DnviMjOyH5QuX2fmfkFewxplx3xGmmHtlI5r1o5Ys/edit?usp=sharing) to get the required `.env` files**.

To start the various services in the project, run the following commands in separate terminal windows:

### Frontend Apps

- **Admin Dashboard**
  ```bash
  yarn start:dashboard
  ```
- **Client User**
  ```bash
  yarn start:client
  ```

### Backend Services

- **User Service**
  ```bash
  yarn start:user-service
  ```
- **Authentication Service**
  ```bash
  yarn start:auth-service
  ```
- **Property Service**
  ```bash
  yarn start:property-service
  ```
- **Chat Service**
  ```bash
  yarn start:chat-service
  ```
- **API Gateway**
  ```bash
  yarn start:api-gateway
  ```

Make sure you have all dependencies installed by running `yarn install` in the root directory before starting the services.

<!-- CONTACT -->

## Contact

Lomnov - @gmail.com <br/>
Team members - seyhaoeurn920@gmail.com - virakson444@gmail.com - pisethsann50@gmail.com

Project Link: [https://github.com/sabaicode-dev/lomnov](https://github.com/sabaicode-dev/lomnov)

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

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
