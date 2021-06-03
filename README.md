# Babble
An anonymous chat app for UCLA students.

## Development Setup
First, clone the repository and install the required dependencies as follows.

```sh
git clone https://github.com/rickroll35L/babble.git
cd babble/babble-backend
yarn install
cd ../babble-frontend
yarn install
```

To start the app, you need to run both the frontend and the backend. Luckily, we've provided a script to make this easy. Navigate to babble-frontend and run `yarn dev`.

```sh
~/.../babble/babble-frontend$ yarn dev
```

> Note: If you're running into problems with this command, make sure you're on a bash/zsh terminal.

Now you're ready to start exploring the app!

## Contribution Workflow

Want to make a change? Great! Here are the steps:

1. Either make a new branch or a fork of this repository. `main` is a protected branch, **so you cannot push to it**.
2. Follow the instructions in "Development Setup" above. If you're on a fork, replace the URL with the fork's URL; if you're on a different branch, check it out using `git checkout`.
3. Make your changes!
4. **Before you push**, make sure your app builds properly. Don't be the guy who broke the entire project!
5. Once you're ready, stage and commit your changes.
6. Make a [pull request](https://github.com/rickroll35L/babble/pulls) with your changes, and let someone on the dev team know. 
7. If your code passes code review, we'll merge it into `main`. Congratulations! If you'd like, it's now safe to delete your branch/fork.

## Licensing & Attribution
This project and its code are licensed under the MIT License. You're free to use it however you wish!