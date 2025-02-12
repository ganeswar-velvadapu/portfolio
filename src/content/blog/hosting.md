---
title: "Web Hosting"
description: "What happens behind the website you see"
pubDate: "Feb 12, 2025"
---

# Web Hosting: From Development to Production

This post explores the journey of a web application from development to production, focusing on hosting and the technologies involved. We'll use a React frontend and Node.js backend as an example.

## Development Phase

During development, both the frontend and backend run locally.  The React frontend, typically served via a development server, makes requests to the Node.js backend running on `localhost:3000`. The backend processes these requests and sends responses back to the frontend.

## Production Phase

In production, the frontend and backend are deployed to separate environments.

### Frontend Deployment (Netlify)

The React frontend is often hosted on platforms like Netlify or Vercel. These platforms simplify deployment by automatically building and serving your frontend application.

### Backend Deployment (AWS EC2)

The Node.js backend code is deployed to a Virtual Machine (VM), such as an AWS EC2 instance.

1.  **Code Transfer:** The backend code is transferred to the EC2 instance using Git.  You would typically clone your repository:

    ```bash
    git clone <your_repository_url>
    ```

2.  **Running the Backend:**  Navigate to your backend directory and install dependencies:

    ```bash
    cd <your_backend_directory>
    npm install
    ```

    Then, start your Node.js application.  Initially, you might run it on `localhost:3000` within the EC2 instance.

3.  **Backend URL:** Once the backend is running, you'll need to make it accessible externally. This involves obtaining the public IP address of your EC2 instance (e.g., `http://<IPAddressOfEC2>:3000`).  It's crucial to set up SSL (HTTPS) for secure communication.  Let's assume your secure backend URL becomes `https://<IPAddressOfEC2>:3000`.

4.  **Frontend Configuration:** Update the backend URL in your React frontend code to point to the production backend URL (`https://<IPAddressOfEC2>:3000`).  This ensures the frontend communicates with the correct backend in the production environment.

5.  **Nginx Configuration:** Nginx is a powerful web server that acts as a reverse proxy.  We configure Nginx to listen on port 80 (HTTP) and 443 (HTTPS) and forward traffic to the backend running on `localhost:3000` within the EC2 instance.  This adds a layer of abstraction and allows for features like SSL termination.  Here's a basic Nginx configuration:

    ```nginx
    server {
        listen 80;
        server_name <your_domain_or_IP>; # Replace with your domain or IP

        location / {
            proxy_pass http://localhost:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }

    server {
        listen 443 ssl;
        server_name <your_domain_or_IP>; # Replace with your domain or IP

        ssl_certificate /path/to/your/certificate.crt; # Path to your SSL certificate
        ssl_certificate_key /path/to/your/private.key; # Path to your SSL private key

        location / {
            proxy_pass http://localhost:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
    ```

6.  **Tmux for Persistent Backend:** Tmux is a terminal multiplexer that allows you to create and manage persistent terminal sessions.  This is essential because your backend server needs to run continuously, even if you disconnect from the EC2 instance.

    ```bash
    tmux new-session -d  # Create a new detached session
    tmux send-keys 'node your_backend_app.js' C-m # Run your backend app
    tmux attach-session -t <session_number> # Attach to the session if needed
    ```

    `C-m` represents pressing Ctrl+m (Enter).  This command starts your backend application within the tmux session.  If you detach from the session, the backend continues to run.

## DNS Explained

The Domain Name System (DNS) translates human-readable domain names (e.g., `example.com`) into IP addresses that computers understand.  The process involves several steps:

1.  **Root Level Domain:** The DNS resolution starts with the root level domain (represented by a dot ".").

2.  **Top Level Domain (TLD):** The request then goes to the TLD name servers (e.g., `.com`, `.org`, `.net`).

3.  **Authoritative Name Servers:** The TLD name servers direct the request to the authoritative name servers for the specific domain (e.g., `example.com`). These name servers store the DNS records for the domain.

4.  **IP Address:** The authoritative name servers provide the IP address associated with the domain name.  This IP address is then used to connect to the web server hosting the website.

## What Nginx Does

Nginx acts as a reverse proxy server.  It sits in front of your backend application and handles incoming requests.  Key functions include:

*   **Load Balancing:** Distributes traffic across multiple backend servers (if you have them).
*   **SSL Termination:** Handles SSL encryption and decryption, freeing up your backend server.
*   **Caching:** Caches static content to improve performance.
*   **Reverse Proxy:** Forwards requests to the backend server and returns the responses to the client.

## What Tmux Does

Tmux is a terminal multiplexer. It allows you to create and manage multiple terminal sessions within a single window.  Its key benefit in this context is persistence:

*   **Persistent Sessions:**  Even if you disconnect from your EC2 instance, the tmux sessions and the processes running within them (like your backend server) continue to run.  This ensures your backend is always available.