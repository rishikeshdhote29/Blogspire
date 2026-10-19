# Blogspire

Blogspire is a full-stack blogging platform where users can publish, discover, and discuss content. It combines secure authentication, social interactions, media uploads, and AI-assisted writing features in a responsive React application.

## Highlights

- JWT-based registration and login
- Email account verification and password reset
- Public and private user profiles
- Follow/unfollow and block/unblock users
- Create, read, update, and delete blog posts
- Image uploads through Cloudinary
- Likes, dislikes, claps, view counts, and comments
- Categories, public feeds, user-specific post listings, and keyword search
- AI-generated post titles and summaries
- Protected routes and backend health checks

## Tech Stack

**Frontend:** React, Vite, Redux Toolkit, React Router, Axios, Tailwind CSS  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer, Cloudinary, Nodemailer  
**AI:** Google Gemini via the Google GenAI SDK

## Project Structure

```text
blogspire/
├── BACKEND/   # Express API, MongoDB models, controllers, and routes
└── FRONTEND/  # React application, Redux state, and UI components
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas or a local MongoDB instance
- Cloudinary account for image uploads
- Gmail app password for email delivery
- Gemini API key for AI features

### Install Dependencies

```bash
cd BACKEND
npm install

cd ../FRONTEND
npm install
```

### Configure Environment Variables

Create `.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<db-name>
SECRET_KEY=replace_with_a_strong_secret
PORT=3000
GMAIL_USER=your_email@gmail.com
APP_PASSWORD=your_gmail_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret
GEMINI_API_KEY=your_gemini_api_key
```

Create `FRONTEND/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### Run Locally

Start the backend:

```bash
cd BACKEND
node server.js
```

In a second terminal, start the frontend:

```bash
cd FRONTEND
npm run dev
```

Vite will display the frontend URL, typically `http://localhost:5173`.

## Available Scripts

### Frontend

Run these commands from `FRONTEND/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

### Backend

Run `node server.js` from `BACKEND/` to start the API server.

## API Base Routes

| Resource | Base route |
| --- | --- |
| Health check | `GET /api/v1/health` |
| Users | `/api/v1/users` |
| Categories | `/api/v1/categories` |
| Posts | `/api/v1/posts` |
| Comments | `/api/v1/comments` |
| AI tools | `/api/v1/ai` |

## Troubleshooting

### MongoDB connection errors

Verify that `MONGO_URI` is correct, the MongoDB Atlas cluster is running, the database credentials are valid, and your client/server IP is allowed in Atlas Network Access.

### Frontend requests return HTML instead of JSON

Set `VITE_API_BASE_URL` to the backend API URL, for example:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Also confirm that API requests use the shared URL helper in `FRONTEND/src/utils/apiConfig.js`.

### Email or AI features do not work

Confirm that the Gmail app password and `GEMINI_API_KEY` are present in `.env`, then restart the backend server after changing environment variables.

## Deployment Notes

- Configure all backend environment variables in the hosting provider.
- Allow the deployed backend IP or network in MongoDB Atlas.
- Configure the frontend API URL to point to the deployed backend.
- Use `GET /api/v1/health` as the service health probe.

## Security

- Never commit `.env` files or API keys.
- Use a strong, unique `SECRET_KEY`.
- Rotate credentials immediately if they are exposed.
- Use least-privilege database credentials.

## License

The backend package currently uses the ISC license.
