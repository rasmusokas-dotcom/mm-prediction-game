import express from "express";
import cors from "cors";

import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import matchesRoutes from "./routes/matchesRoutes.js";
import debugRoutes from "./routes/debugRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dailyTopPredictorRoutes from "./routes/dailyTopPredictorRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/leaderboard", leaderboardRoutes);
app.use("/matches", matchesRoutes);
app.use("/debug", debugRoutes);
app.use("/users", userRoutes);
app.use("/daily-top-predictor", dailyTopPredictorRoutes);

export default app;
