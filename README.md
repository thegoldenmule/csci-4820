### Overview

This repository contains code and notes for `Computer Graphics`.

See [syllabus](./syllabus.md) for more information.

#### Setup

- Checkout this repo.
- Install [`nodejs`](https://nodejs.org/).
- In a terminal, from the `code/` directory, run `npm install`.

#### Usage

From the `code/` directory, run `npm run dev`.

This will start a [`live-server`](https://github.com/tapio/live-server) instance that hosts this folder. It will also start a browser tab pointed at `http://localhost:8080`. The `live-server` will tell the webpage to reload automatically on any change to any file in this folder. This allows for quick iteration.

To get to the appropriate lesson, use the appropriate query parameter to point to a lesson in the `src/` folder. For example, `http://localhost:8080?lesson=00` will point to lesson `00`.
