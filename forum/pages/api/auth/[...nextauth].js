import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    //사이트별로 다른 provider 기입
    GithubProvider({
      clientId: "1bd2d32cec6151048a96",
      clientSecret: "f0e07457ceb04f6a7fd22a87aeec012808d482b1",
    }),
  ],
  secret: "rkwkdrldjrdpskasmsehdspsmsanswjd",
};
export default NextAuth(authOptions);
