import MongoStore = require('connect-mongo');
import * as dotenv from 'dotenv';
import { SessionOptions } from 'express-session';

dotenv.config();

const SessionConfig: SessionOptions = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1hr timer
    sameSite: process.env.PORT ? ('none' as const) : ('lax' as const),
    secure: !!process.env.PORT,
  },
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.SESSIONS_URI,
    ttl: 60 * 60, // 1 hour timer
    collectionName: 'Lcon_Dashboard_Sessions', // Session collection name in MongoDB,
    crypto: {
      secret: process.env.SECRET,
    },
  }),
};

export const ApplicationConfig = {
  session: SessionConfig,
  cors: {
    // origin: process.env.PORT ? process.env.PROD_URL : 'http://localhost:3000',
    origin: true,
    credentials: true,
  },
};
