---
lastModified: 08-16-2024
description: Start building modern documentation in under five minutes
projectName: SvelteShine
---

<script>
  import { Collapsible, Commands } from "$lib/components";
</script>


# Getting Started

Welcome to the {projectName}! This guide will help you get started quickly with setting up and using the project. Follow these steps to clone the repository, install dependencies, run the setup script, and start editing your documentation.


## Prerequisites

Before you begin, ensure you have the following installed on your machine:
 - [Node.js](https://nodejs.org/en/download/package-manager) (version 20 or later)
 - [Git](https://git-scm.com/downloads)

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine using Git:
```bash no-line-numbers
git clone https://github.com/Angus-Paillaugue/SvelteShine
cd SvelteShine
```

### 2. Install Dependencies

Next, install the necessary dependencies by running:
<Commands commands = {[{name:'npm', command:'npm install'}, {name:'pnpm', command:'pnpm install'}]} />
This will install all required packages for the project.

### 3. Run the Setup Script
Once the dependencies are installed, run the setup script to initialize your project:

```bash no-line-numbers
npm run setup
```
This script will guide you through the initial configuration of your project.

<Collapsible.Group>

<!-- Set pu -->
<Collapsible summary="Set up" icon="material-symbols:terminal-rounded" open>

  1. Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  2. Once git is installed, clone your docs repository using :

  ```bash no-line-numbers
  git clone https://github.com/Angus-Paillaugue/SvelteShine
  ```

  3. Use your favorite IDE to open the repository.
  4. Install the dependencies :

<Commands commands = {[{name:'npm', command:'npm install'}, {name:'pnpm', command:'pnpm install'}]} />

  5. Start the setup script :

    ```bash no-line-numbers
  npm run setup
  ```

  6. Launch the dev server :

  ```bash no-line-numbers
  npm run dev
  ```

</Collapsible>

<Collapsible summary="Set up" icon="material-symbols:terminal-rounded">

  1. Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  2. Once git is installed, clone your docs repository using :

  ```bash no-line-numbers
  git clone https://github.com/Angus-Paillaugue/SvelteShine
  ```

  3. Use your favorite IDE to open the repository

</Collapsible>
</Collapsible.Group>
