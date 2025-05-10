const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const swaggerUi = require("swagger-ui-express");
// const swagger = require("./swagger/swagger");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const productRoutes = require("./src/routes/productRoutes");
require("dotenv").config();

const corsOrigin = process.env.CORS_ORIGIN_TEST;

const app = express();

const corsOptions = {
    origin: corsOrigin,
    credentials: true,
    exposedHeaders: ["Content-Disposition"],
};

app.use(cors(corsOptions));

app.options(corsOrigin, cors(corsOptions));

// Middleware pour analyser le JSON
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API Running");
});

// Configuration Swagger
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swagger));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "une erreur interne est survenu" });
});

module.exports = app;
