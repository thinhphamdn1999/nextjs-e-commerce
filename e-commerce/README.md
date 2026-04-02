This document provide steps to run the e-commerce application.

## Summary

About feature scopes, please check it in the document: https://docs.google.com/document/d/19af9CGtOq993q-7GdC-tZQLkNWyMg5wUSfbfEQ8n9yg/edit?tab=t.0

## Set up project
1. Clone the repository:

```bash
git clone ...
```

2. Check out the `e-commerce` branch:

```bash
git checkout e-commerce
```
3. Install dependencies:

```bash
cd e-commerce
npm install
```

4. Set up environment variables:
Create a `.env.local` file in the root of the project and add the following variables (or you can use your own values)

This guide uses for the local development environment. If you want to run the project in production, you can skip this step and use the `.env.production` file.

In real projects, you should not commit the `.env.local` file to the repository, but for this project, I will commit it to the repository for convenience.

```bash
# .env.local
NEXT_PUBLIC_API_URL=
AUTH_SECRET=
USER_EMAIL=
PASSWORD=
AUTH_TRUST_HOST=
```

## Run project on local

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run project on production
Build the application for production:

```bash
npm run build
```
Then start the production server:

```bash
npm start
```

## Deployment
Link product: https://react-training-beta-dun.vercel.app/

Note: In production, I use the mock account with email for login, you can use the following credentials to log in:

```bash
USER_EMAIL=admin@gmail.com
PASSWORD=admin@1234567
```
