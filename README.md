# Table of contents:

1. [About](about)
2. [Technical](technical)
3. [Screenshots](screenshots)
4. [Deployment](deployment)

# About

Store Docker is an e-commerce solution for businesses interested in starting to sell online.
It is a full featured application, with everyting a modern online store should have, including:

- Intuitive & powerful admin dashboard
- Modern design
- Smooth UX
- Custom, fast checkout
- Cart functionality
- Product search, sort and filter
- Product tracking
- and more...

# Technical

Front end:

- TypeScript
- Next.js (`app/` directory, with the focus on SSR with **server actions**)
- React.js
- Jotai (Redux alternative)
- TailwindCSS

Back end:

- Medusa.js
- PostgreSQL
- Redis
- Docker
- Meilisearch (self-hostable algolia alternative)
- Caddy server (nginx alternative)
- Stripe integration

Because the entire application (front end, back end, databases, and web server) are containerized using Docker, the application is easily hostable on any VPS or Cloud server.

# Screenshots

![store-landing](https://github.com/user-attachments/assets/1e02520f-4368-4d8e-aeaa-d0f8f45118e6)
![store-product-grid](https://github.com/user-attachments/assets/1da8afd2-b0c9-47f8-b7c6-55cc47b1269e)
![store-product-page](https://github.com/user-attachments/assets/7d7cf30c-75ac-40e4-8455-24c2a4730250)
![store-cart](https://github.com/user-attachments/assets/0bce5862-d1ee-4be2-bd33-f7c1e8316d52)
![store-checkout](https://github.com/user-attachments/assets/0991302d-32ae-4536-aa14-73797f9db88e)
![medusa-dashboard](https://github.com/user-attachments/assets/1b0cb880-d0c8-4e2c-bf3d-60e4b739f751)

# Deployment

## Prerequisites

- VPS or Cloud server with SSH access
- Domain name with ability to change DNS records

This guide assumes that you have ubuntu 24.04 LTS server with root access.

## Installing Docker

Follow the official [Docker installation guide for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

## Steps

Follow the steps below to deploy the application:

1. Clone the repository

```bash
git clone https://github.com/AleksaSimovic1/store-docker
```

2. Generate a `.env` file in the root of the project

```bash
cd store-docker

# You may need to make the scripts executable
chmod +x prepare.sh start.sh stop.sh post-start.sh create-env.sh destroy-env.sh

./prepare.sh
```

3. Configure `.env` file with your own values

```bash
nano .env
# After editing the file
# ctrl+o (save the file)
# hit enter to save it in current location
# ctrl+x (exit back to console)
```

4. Sync environemnt between frontend and backend

```bash
./create-env.sh

# When changing the root .env file you need to run this script again.
# If you want to remove the .env from frontend and backend you can run
# ./destroy-env.sh
```

5. Setup DNS records for the application

| Hostname | DNS Record Type | Value            |
| -------- | --------------- | ---------------- |
| @        | A               | <VPS_IP_ADDRESS> |

6. Edit `Caddyfile` according to your domain and email address

```bash
nano ./caddy/Caddyfile
```

```bash
# Replace "example.com" with your domain
# example.com -> yourdomain.com
# example.com:443 -> yourdomain.com:443
# example.com:9000 -> yourdomain.com:9000

# Replace "your@email.com" with your email address
# your@email.com -> john.doe@gmail.com
```

7. Add your backend domain to `next.config.js` image domains below "host.docker.internal"

```bash
nano ./frontend/next.config.js
```

```json
{
  {
    hostname: "host.docker.internal",
  },
  {
    hostname: "example.com",
    port: "9000",
  },
}
```

8. Start the application

```bash
./start.sh
```

9. Run `post-start.sh` script to **seed the store with sample data** and **add a superuser account**

```bash
./post-start.sh
```

10. That's it!
