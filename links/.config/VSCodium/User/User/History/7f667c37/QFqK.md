---
name: Skill Forge
date: 2024
description: A Comprehensive Learning Platform for Aspiring Developers
bgColor: bg-[#171717]
preview: https://skill-forge.paillaugue.fr/
github: https://github.com/Angus-Paillaugue/Skill-Forge
image: /projectsAssets/Skill-Forge/Logo.webp
fullImage: /projectsAssets/Skill-Forge/FullPage.png
index: 2
tags:
  - Code
  - Exercises
  - SvelteKit
  - TailwindCSS
---

# Skill Forge: A Comprehensive Learning Platform for Aspiring Developers

**Skill Forge** is a web-based platform designed to help developers hone their skills through a diverse collection of programming challenges and exercises. The platform offers a learning environment where users can tackle problems, track their progress, and compare their performance with other developers in real-time. Built with a strong emphasis on flexibility, the platform caters to developers at various stages of their journey—from beginners to advanced coders.
Key Features

    Learning Paths: Skill Forge organizes exercises into structured learning paths. Each path represents a key area of programming, such as algorithms, data structures, or web development, and offers an incremental learning curve. Users can dive into topics of their choice while progressing from beginner-friendly tasks to more advanced challenges. The database schema has been designed to support these paths with a dedicated learning_paths table, where each exercise is associated with a path through a foreign key.

    Wide Range of Exercises: The platform features over 1800+ coding exercises, spanning various programming paradigms, difficulty levels, and topics. Exercises are stored in a MySQL database, and each problem is associated with specific test cases that are executed to validate user-submitted solutions.

    Multi-Language Support: Although the core focus is on JavaScript, Skill Forge is designed with extensibility in mind. The platform's architecture is built to support multiple programming languages by leveraging isolated virtual machines (isolated-vm) for safely executing user code. This allows users to submit code written in other languages in the future while ensuring a sandboxed and secure environment.

Technical Stack

Front-End:

    SvelteKit: The user interface of Skill Forge is built using SvelteKit, a modern JavaScript framework that allows for smooth, fast client-side interactivity. The use of Svelte’s reactive programming model simplifies state management and provides a clean, modular approach to front-end development.

    TailwindCSS: TailwindCSS is integrated to handle the styling of the entire platform. With utility-first CSS, we’ve created a highly customizable and responsive interface, allowing for a consistent look across devices.

Back-End:

    SvelteKit API Endpoints: The back-end logic is powered by SvelteKit’s server-side rendering capabilities. All interaction between the front-end and the MySQL database is facilitated through API routes. Each API call, such as fetching exercise details, user progress, or submitting solutions, is handled with optimized queries.

    MySQL Database: The core data, including exercises, users, submissions, and learning paths, are stored in a MySQL relational database. Tables are interlinked through foreign keys and indexes to ensure efficient querying. The submissions table captures user attempts on exercises, allowing the platform to track progress and determine if exercises are completed.

Key Queries and Data Relationships:

    The database schema includes tables for learning_paths, exercises, and submissions. A SQL query is executed to fetch exercises based on learning paths, ensuring that users can see their progress (i.e., whether they have submitted a solution or not).

    A separate query ensures users only see the latest submission for each exercise to avoid duplication of solutions. This is crucial for presenting accurate user activity and ranking.

Isolated Code Execution:

One of the more advanced aspects of Skill Forge is the isolated code execution environment. For security and scalability, Skill Forge utilizes the isolated-vm library to execute user-submitted code in a sandboxed environment. This ensures that user code cannot access or interfere with server resources. Test cases associated with each exercise are executed inside this virtual machine, and results (whether the tests passed or failed) are returned to the user.
User Progress and Ranking

Skill Forge also provides comprehensive tools for users to track their coding journey. Users can view their submission history, monitor which exercises they have completed, and track how they stack up against others via the ranking system. A key feature of the platform is the ability to fetch a user’s rank based on the number of distinct exercises they’ve successfully completed.
Real-Time Feedback and Detailed Analytics

Users receive instant feedback after submitting solutions. This feedback includes a breakdown of each test case (whether it passed or failed) and detailed performance analytics. In the future, we plan to integrate code profiling tools, allowing users to get even more insights into their submission's performance.
Conclusion

Skill Forge is more than just a coding platform. It’s a learning tool that adapts to each user’s individual skill level, offering personalized progress tracking, real-time feedback, and a robust exercise system. With a scalable architecture and multi-language support on the roadmap, it aims to be a comprehensive resource for coders looking to grow their skills at any level.
