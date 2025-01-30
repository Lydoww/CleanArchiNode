export const jwtConfig = {
  secret: process.env.JWT_SECRET || "default_secret",
  expiresIn: String(process.env.JWT_EXPIRES_IN || "1h"), // ✅ Force en string
  refreshExpiresIn: String(process.env.JWT_REFRESH_EXPIRES_IN || "7d") // ✅ Force en string
};
