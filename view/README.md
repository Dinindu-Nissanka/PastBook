# PastBook Frontend

This react application is the frontend to view users photo grid and their photo gallery

## How to

### Prerequisites

node version >= v12.14.0

### Installation

- Use the node package manager [npm](https://www.npmjs.com/) to run the application.

  ```bash
  npm install

  npm run start
  ```

- Visit http://localhost:3000 to proceed

### Test

- Use the node package manager [npm](https://www.npmjs.com/) to run the unit tests.

  ```bash
  npm run test
  ```

### Check and Fix linting issues

- Check what are the linting issues by running below command

```bash
  npm run lint
```

- Fix those issues by

```bash
  npm run lint:fix
```

### Usage

#### Please note

- First you need to create a user and register in the application
- When you login to the system, it would first display the photo grid created by the user, if the user has not created one yet, it would show the user's uploaded photo list. (The sample json provided in the assignment uses `https://placeimg.com/2560/2560/any` as the image source for all the uploaded image list. This always gives the same image)
- By selecting 9 photos from the uploaded photo list, the user can create a photo grid.
- The created photo grid can be modified by dragging the existing grid images or by creating a new grid.(As mentioned earlier the image source always gives the same image, hence the drag and drop might not be clearly visible.)

### Docker container

- Use the node package manager [npm](https://www.npmjs.com/) to run the react frontend as a docker container. This would create a frontend application docker image and then would run it as a docker instance.

```bash
  npm run docker:up
```
