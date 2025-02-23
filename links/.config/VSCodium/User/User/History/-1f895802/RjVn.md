# Getting Started

Welcome to SvelteShine! This guide will help you get started quickly with setting up and using the project. Follow these steps to clone the repository, install dependencies, run the setup script, and start editing your documentation.


## Prerequisites

Before you begin, ensure you have the following installed on your machine:
 - [Node.js](https://nodejs.org/en/download/package-manager) (version 20 or later)
 - [Git](https://git-scm.com/downloads)

## Getting Started


### 1. Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/Angus-Paillaugue/SvelteShine
cd SvelteShine
```

### 2. Install Dependencies

Next, install the necessary dependencies by running:

```bash
pnpm install
```

This will install all required packages for the project.


### 3. Run the Setup Script

Once the dependencies are installed, run the setup script to initialize your project:

```bash
npm run setup
```

This script will guide you through the initial configuration of your project.


### 4. Start the Development Server

Now, start the development server to begin editing your documentation:

```bash
npm run dev
```

This command will launch the SvelteKit development server, allowing you to view your documentation locally at [localhost:5173](http://localhost:5173)


### 5. Edit the Config File
With the server running, you can now edit the config file located at `project.config.js`. Here, you can customize:

 - Tailwind Colors: Set your project's primary color palette.
 - Sidebar : You can change it's style and add socials links.
 - Project Information: Update the name, description, and other metadata for your project.
 - Markdown Pages: Reference the markdown files you want to include in the sidebar.


# Features

Here are some of the key features you can use:

 - [Custom Images](https://svelte-shine.paillaugue.fr/docs/Components/Images): Easily include and style images within your markdown files.
 - [Multiple Commands Selector](https://svelte-shine.paillaugue.fr/docs/Components/Commands): Display multiple command options in a user-friendly format.
 - [Directory Tree](https://svelte-shine.paillaugue.fr/docs/Components/Tree): Visualize file structures with collapsible directory trees.
 - [Collapsible Content](https://svelte-shine.paillaugue.fr/docs/Components/Collapsible): Create sections of content that can be expanded or collapsed by the user.
 - [Dropdowns](https://svelte-shine.paillaugue.fr/docs/Components/Dropdown): Add dropdown menus for compact and organized content presentation.
 - [Notes](https://svelte-shine.paillaugue.fr/docs/Components/Note): Highlight important notes in the style of GitHub.
 - [Component Definition](https://svelte-shine.paillaugue.fr/docs/Components/Definition): Document and showcase custom Svelte components.
 - [Tooltips](https://svelte-shine.paillaugue.fr/docs/Components/Tooltip): Add tooltips to provide additional context to your content.
 - [Tables](https://svelte-shine.paillaugue.fr/docs/Components/Tables): Create and style tables for structured data presentation.
 - [Component Preview](https://svelte-shine.paillaugue.fr/docs/Components/Component-preview): Preview Svelte components directly within your documentation.
 - [Steps](https://svelte-shine.paillaugue.fr/docs/Components/Steps): Guide users with step by step tutorials.
 - [Math](https://svelte-shine.paillaugue.fr/docs/Components/Math): Using mathematical notations with {projectName}.


# Conclusion

That's it! You're now ready to start building your documentation with {projectName}. As you continue developing, you can take full advantage of the customization options and features provided by this template.

If you encounter any issues or have questions, please refer to the project's documentation (as it grows) or reach out for support.

Happy documenting!
