# Agents, Assemble! - Codemotion Conference Milan 2024

Welcome to the workshop "Agents, Assemble!" held at the Codemotion Conference in Milan, 2024. This workshop is designed
to guide you through the process of enhancing your digital product by leveraging the full potential of agentic
application and using AutoGen Studio to do it in a simple way.

## Codebase Overview

The codebase for this workshop is structured to facilitate a step-by-step exploration of GenAI capabilities. It starts
with a simple example application that uses OpenAI's gpt-4o model via a single-prompt API. From there, we will
progressively enhance our product using AutoGen and AutoGen Studio.

The codebase is divided into the following parts:
- [linkedin-post-generator](./linkedin-post-generator) folder contains the sample app source code
- [workshop](./workshop) folder contains walkthrough and assets for the workshop
- [autogen](./autogen) folder contains AutoGen configuration files and local sqlite database

## Setup

To get started with the workshop, follow these steps:

1. First of all, copy the API keys we provided you into the [.env](.env) file. Make sure the file is named ´.env´ and is
   located in the root of the repository.
2. Run the following command in the repository root to install dependencies and set up the environment:
    ```bash
    npm run setup
    ```
3. Start docker services (will take a while):
    ```bash
    docker compose up -d --build tutorial-ui autogenstudio-ui linkedin-app
    ```
4. In the meanwhile, start the LinkedIn post generator app **in a new terminal**:
   ```bash
   npm run web-app:dev
   ```

## Let's get started!
Open the [Tutorial UI](http://localhost:9090) and follow from there. Have fun! 🚀