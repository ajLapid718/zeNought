// Module dependencies;
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./database");
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 8080;
const app = express();
const authRouter = require("./auth");
const apiRouter = require("./routes");
const socketio = require("socket.io");

// Export our app so that it can be available when testing it;
module.exports = app;

// If we are in a testing environment, quit after tests are all done;
if (process.env.NODE_ENV === "test") {
  after("close the session store", () => sessionStore.stopExpiringSessions());
}

// If we are in a production environment, our environment variables will be set on that platform;
// If we are in a development or testing environment, our environment variables will be set via our secrets file;
if (process.env.NODE_ENV !== "production") {
  require("../secrets");
}

// Passport registration in order to store a user object in a session;
// Passport registration in order to grab and convert that information into a user object;
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id);
    done(null, user);
  }
  catch (err) {
    done(err);
  }
});

// Helper function: syncDb();
const syncDb = () => {
  if (process.env.NODE_ENV === "production") {
    db.sync();
  }
  else {
    console.log("As a reminder, the forced synchronization option is on")
    db.sync({force: true});
  }
};

// Helper function: createApp();
const createApp = () => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(helmet());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "my best friend is Cody",
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Mount our routers for our auth routes and for our API routes;
  app.use("/auth", authRouter);
  app.use("/api", apiRouter);

  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error("Not found");
      err.status = 404;
      next(err);
    }
    else {
      next();
    }
  });

  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/index.html"));
  });

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

// Helper function: startListening();
const startListening = () => {
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  );
  const io = socketio(server);
  require("./socket")(io);
};

// Main function: bootApp();
async function bootApp() {
  await sessionStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}

// Invoke appropriate function depending on how/where this file is called;
require.main === module ? bootApp() : createApp();
