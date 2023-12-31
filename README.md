<h1 align="center">
  Challenge 02 - Ignite Node JS
</h1>

<h3 align="center">
  Rest API made in node course of RocketSeat
</h3>

<br>
<p align="center">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/wenblack/ignite-nodejs-challenge02">
  <a href="https://www.github.com/wenblack">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Wender%20Barbosa-gree">
  </a>
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/wenblack/ignite-nodejs-challenge02">
  <a href="https://github.com/wenblack/ignite-nodejs-challenge02/commits/master">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/wenblack/ignite-nodejs-challenge02">
  </a>
  <a href="https://github.com/wenblack/ignite-nodejs-challenge02/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/wenblack/ignite-nodejs-challenge02">
  </a>
  <img alt="GitHub" src="https://img.shields.io/github/license/wenblack/ignite-nodejs-challenge02">
</p>

<p align="center">
  <a href="#-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-application-features">App Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>



<br>

## 👨🏻‍💻 About the project

- <p style="color: red;">Rest API made in node course of RocketSeat</p>


## 🧩 Application Features 

- [x] It must be possible to create a user
- [x] It must be possible to identify the user between requests
- [x] It should be possible to list all of a user's meals
- [x] It must be possible to view a single meal
- [x] The user can only view, edit and delete the meals he created
- [x] It must be possible to record a meal eaten
- [x] It must be possible to delete a meal
- [x] It should be possible to edit a meal
- [x] It must be possible to retrieve a user's metrics (Total meals, meals within the diet, meals outside the diet, sequence of meals within the diet)

## 🚀 Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [@fastify/cookie](https://github.com/fastify/fastify-cookie)
- [Vitest](https://vitest.dev/)
- [Eslint](https://eslint.org/)
- [Zod](https://zod.dev/)





## 💻 Getting started

Create your own .env file using the .env.example file from project.

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)



**Clone the project and access the folder**

```bash
$ git clone https://github.com/wenblack/ignite-nodejs-challenge02.git && cd ignite-nodejs-challenge02
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Once the services are running, run the migrations
$ npx prisma migrate dev

# 🌱 Seed Database
$ yarn seed

# To finish, run the api service
$ yarn dev

# Well done, project is started!
```

## 🤔 How to contribute

**Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork https://github.com/wenblack/ignite-nodejs-challenge02
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone https://github.com/wenblack/ignite-nodejs-challenge02 && cd ignite-nodejs-challenge02

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💜 &nbsp;by Wen Barbosa 👋 &nbsp;[See my GitHub](https://www.github.com/wenblack)
