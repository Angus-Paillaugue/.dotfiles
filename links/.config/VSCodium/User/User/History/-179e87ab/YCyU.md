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

<Commands commands={[{name:'npm', command:'npm install'}, {name:'pnpm', command:'pnpm install'}]} />

This will install all required packages for the project.


### 3. Run the Setup Script

Once the dependencies are installed, run the setup script to initialize your project:

```bash no-line-numbers
npm run setup
```

This script will guide you through the initial configuration of your project.


### 4. Start the Development Server

Now, start the development server to begin editing your documentation:

```bash no-line-numbers
npm run dev
```

This command will launch the SvelteKit development server, allowing you to view your documentation locally at [localhost:5173](http://localhost:5173)
