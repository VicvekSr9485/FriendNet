# FriendNet

FriendNet is a modern image-sharing web application built with **React** and **Sanity CMS**. It provides a clean, intuitive platform where users can upload, share, and discover images. The application uses **Sanity** for backend content management and **React** for a dynamic, responsive frontend. It also supports **Google OAuth authentication** for secure, streamlined user login.

---

## Features

* **Google OAuth Authentication** – Secure sign-in using Google accounts
* **Image Upload** – Upload images with titles and descriptions
* **Image Gallery** – Browse images in a responsive grid layout
* **Image Detail View** – View individual images with full metadata
* **Search Functionality** – Find images by title or description keywords
* **Responsive Design** – Works seamlessly on desktop, tablet, and mobile
* **Sanity CMS Integration** – Manage content via Sanity's powerful backend
* **Real-Time Updates** – Changes in Sanity instantly reflect in the app

---

## Prerequisites

Before setting up FriendNet, make sure you have:

* **Node.js** (v14 or higher)
* **npm** or **yarn** package manager
* **A Sanity account** (free at [sanity.io](https://sanity.io))
* **Git** installed

---

## Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/VicvekSr9485/FriendNet.git
cd FriendNet
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Sanity Project

Install the Sanity CLI globally:

```bash
npm install -g @sanity/cli
```

Initialize a new Sanity project in the project directory:

```bash
sanity init
```

When prompted:

* Choose **Create new project**
* Name it (e.g., `friendnet-images`)
* Select the default dataset configuration
* Choose the output path (default: `sanity-studio`)
* Select **Clean project** (no schema templates)

Copy schema files:

```bash
cp -r sanity/schema/* sanity-studio/schemas/
```

Deploy the schema:

```bash
cd sanity-studio
sanity deploy
```

### 4️⃣ Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2023-05-03
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> Your **Sanity** credentials are in your [Sanity dashboard](https://sanity.io/manage).
> Your **Google OAuth** credentials can be created in the [Google Cloud Console](https://console.cloud.google.com/).

### 5️⃣ Run the Application

```bash
npm start
```

The app will run at: **[http://localhost:3000](http://localhost:3000)**

---

## Usage

### For End Users

* **View Images** – Browse all uploaded images from the home page
* **Image Details** – Click an image to view title, description, and metadata
* **Search** – Use the search bar to find images by keywords
* **Upload Images** – (Authenticated users) Upload new images with titles and descriptions

### For Content Managers

* Access Sanity Studio at:

  ```
  https://your-project-id.sanity.studio
  ```
* **Manage Images**:

  * Create new image posts
  * Edit titles, descriptions, or files
  * Delete unwanted images
* All changes in Sanity are reflected in FriendNet **instantly**

---

## Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Sanity CMS
* **Authentication:** Google OAuth 2.0
* **Hosting:** Vercel / Netlify (frontend), Sanity (backend)

---
