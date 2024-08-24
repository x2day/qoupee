# Low-Code Tools for the Project

This folder contains tools that were used to create our prototype with minimal coding.

## Requirements

1. **Docker Installation**  
   Ensure Docker is installed on your system. Follow the installation guide [here](https://docs.docker.com/engine/install/ubuntu/).

2. **Domain Setup**  
   You'll need a domain to set up Flowise and N8N.

3. **OpenAI API Key**  
   Visit [OpenAI](https://platform.openai.com/signup) to obtain an API key. This will be used for text embedding and ChatGPT models.

## Flowise
[Flowise](https://flowiseai.com/) is used to create LLM (Large Language Model) workflows and configure the backend server.

### Running Flowise with Docker Compose
1. **Configure Environment Variables**  
   Copy `.env.example` to `.env` and modify the parameters as needed.

2. **Start Flowise with Docker Compose**  
   Run the following command to start Flowise:
   ```bash
   sudo docker compose -f docker-compose-flowise.yaml up -d
   ```

3. **Network Setup**  
   Ensure your network is configured to point to the Flowise server.

4. **Load Workflow**  
   From the Flowise webpage, upload the workflow file located at `workflows/flowise.json`.

5. **Set Up OpenAI API Key**  
   Enter your OpenAI API key in the Flowise settings.

## N8N
[N8N](https://n8n.io/) is used to implement a REST API endpoint that extracts data from a database.

### Running N8N with Docker Compose
1. **Update Docker Compose File**  
   Edit `docker-compose-n8n.yaml` and set the `N8N_HOST` to your domain.

2. **Start N8N with Docker Compose**  
   Run the following command to start N8N:
   ```bash
   sudo docker compose -f docker-compose-n8n.yaml up -d
   ```

3. **Load Workflow**  
   From the N8N webpage, upload the workflow file located at `workflows/n8n.json`.

4. **Set Up OpenAI API Key**  
   Enter your OpenAI API key in the N8N settings.