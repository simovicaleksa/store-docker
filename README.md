# Table of contents:

1. [About](#About)
2. [Technical](#Technical)
3. [Screenshots](#Screenshots)
4. [Deployment](#Deployment)

# About

Store Docker is an e-commerce solution for businesses interested in starting to sell online.
It is a full featured application, with everyting a modern online store should have, including:


- Modern design
- Smooth user experience
- Custom checkout
- Cart
- Product search, sort and filter
- Order tracking
- Powerful admin dashboard - powered by medusa.js

# Technical

Frontend:

- TypeScript
- Next.js (`app/` directory, with the focus on SSR with **server actions**)
- React.js
- Jotai (Redux alternative)
- TailwindCSS

Backend:

- Medusa.js
- PostgreSQL
- Redis
- Stripe
- Meilisearch (self-hosted algolia alternative)
- Caddy web server (nginx alternative)

Dev-ops:
- Docker
- Linux running on VPS / Cloud server

The application is containerized in a single docker compose, making it easy to deploy on any VPS or Cloud server.
To host your own e-commerce store you just have to clone this repository on your VPS / Cloud server, configure your environment and run `start.sh` script.
You can read more about this in the [Deployment](#Deployment) section.

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

2. Using `prepare.sh` script, configure project variables

```bash
cd store-docker

# You may need to make the scripts executable
chmod +x prepare.sh start.sh stop.sh seed.sh migrate.sh

./prepare.sh
```

3. Configure `.env` file with your own values

```bash
nano .env

# You may want to edit the following variables:
# DEFAULT_COUNTRY
# NEXT_PUBLIC_COMPANY_NAME
# NEXT_PUBLIC_COMPANY_DESCRIPTION
# EMAIL_SENDER_ADDRESS
# EMAIL_SENDER_PASSWORD
# EMAIL_HOST
# STRIPE_PUBLISH_KEY
# STRIPE_WEBHOOK_SECRET
# STRIPE_API_KEY

# After editing the file
# ctrl+o (save the file)
# hit enter to save it in current location
# ctrl+x (exit back to console)
```

4. Migrate the `.env` file

```bash
# You will need to run this script every time you make changes to the root .env file

./migrate.sh
```

5. Start the application

```bash
./start.sh
```

6. Run `seed.sh` script to **seed the store with sample data** and **add a superuser account**

```bash
./seed.sh
```

7. Setup DNS records for the application

| Hostname | DNS Record Type | Value            |
| -------- | --------------- | ---------------- |
| @        | A               | <VPS_IP_ADDRESS> |

8. That's it!
