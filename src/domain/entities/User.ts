export class User {
  constructor(
    public id: number | undefined,
    public username: string,
    public email: string,
    public password: string, // Hashed password
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
