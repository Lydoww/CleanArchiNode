import { IUserRepository } from "../../domain/interfaces/UserRepository";
import jwt, { Secret } from "jsonwebtoken"; // ✅ Ajout du type Secret
import bcrypt from "bcrypt";
import { jwtConfig } from "../../infrastructure/config/jwtConfig";

export class LoginUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // ✅ Vérification de JWT_SECRET
    if (!jwtConfig.secret || typeof jwtConfig.secret !== "string") {
      throw new Error("JWT_SECRET is not defined or is invalid");
    }

    // ✅ Forcer jwtConfig.secret en type `Secret`
    const secret: Secret = jwtConfig.secret as Secret;

    // ✅ Forcer jwtConfig.expiresIn en string
    const accessTokenExpiresIn: string = jwtConfig.expiresIn.toString();
    const refreshTokenExpiresIn: string = jwtConfig.refreshExpiresIn.toString();

    console.log("JWT_SECRET utilisé:", secret);
    console.log("accessTokenExpiresIn:", accessTokenExpiresIn);
    console.log("refreshTokenExpiresIn:", refreshTokenExpiresIn);

    // ✅ Création du token d'accès (accessToken)
    const accessToken = jwt.sign(
      { userId: user.id },
      jwtConfig.secret as Secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    // ✅ Création du token de rafraîchissement (refreshToken)
    const refreshToken = jwt.sign({ userId: user.id }, secret, {
      expiresIn: refreshTokenExpiresIn,
    });

    return { accessToken, refreshToken };
  }
}
