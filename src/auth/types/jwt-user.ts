export interface JwtUser {
    name: string
    email: string,
    id: string
    role: "User",
    iat: number,
    exp: number
}