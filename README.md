# Agents, Assemble! - Codemotion Conference Milan 2024

Welcome to the workshop "Agents, Assemble!" held at the Codemotion Conference in Milan, 2024. This workshop is designed
to guide you through the process of enhancing your digital product by leveraging the full potential of Generative AI (
GenAI).

## Setup

To get started with the workshop, follow these steps:
 
1. First of all, copy the API keys we provided you into the [.env](.env) file.
2. Run the following command in the repository root to install dependencies and set up the environment:
    ```bash
    npm run setup
    ```
3. Start docker services:
    ```bash
    docker compose up -d --build tutorial-ui autogenstudio-ui linkedin-app
    ```
4. In the meanwhile, start the LinkedIn post generator app:
   ```bash
   npm run web-app:dev
   ```

## Links
- [Tutorial UI](http://localhost:9090)
- [AutoGen Studio](http://localhost:8081)

## Codebase Overview

The codebase for this workshop is structured to facilitate a step-by-step exploration of GenAI capabilities. It starts
with a simple example application that uses OpenAI's gpt-4o or o1 model via a single-prompt API. From there, we will
progressively enhance our product using AutoGen and AutoGen Studio.

## Workshop Checkpoints

The workshop is divided into several checkpoints, each representing a significant step in our journey:

1. `one-shot-prompt`: This is the starting point, where we use a single-prompt API to generate content.

2. `autogenstudio - v1, v2, v3 + fallback workflows`: In these steps, we will use AutoGen Studio to prototype more
   sophisticated generation flows. We will introduce specialized LLM agents that collaborate to produce deeper and more
   precise results.

3. `autogen serve v3 + app`: Finally, we will integrate our advanced generation flows into our application, keeping them
   decoupled from the rest of the codebase.

By the end of this workshop, you will have a clear understanding of the benefits of using a multi-agent paradigm in
GenAI, along with practical tools to experiment with it in your own products. Enjoy the journey!