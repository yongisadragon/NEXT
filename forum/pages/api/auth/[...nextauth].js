import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    //사이트별로 다른 provider 양식이 있습니다.
    GithubProvider({
      clientId: "1bd2d32cec6151048a96",
      clientSecret: "f0e07457ceb04f6a7fd22a87aeec012808d482b1",
    }),

    CredentialsProvider({
      //1. 직접 id/pw로 로그인 가능하도록. 로그인페이지 폼 자동생성해주는 코드.
      name: "credentials",
      credentials: {
        // 로그인 페이지에 들어갈 input들.
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db("forum");
        //user변수는 해당 collection에 유저정보가 존재하는지 확인하고, credential 폼으로 제출된 유저정보랑 비교한다.
        let user = await db
          .collection("user_cred")
          .findOne({ email: credentials.email });
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user;
      },
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일(초단위)
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        //JWT에 기입할 정보들, 추후에 역할이나 레벨등을 토큰에 추가저장 가능.
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      //컴포넌트 안에서 보여줄 유저정보. 토큰에 있는 모든데이터를 컴포넌트로 보낸다.
      session.user = token.user;
      return session;
    },
  },

  adapter: MongoDBAdapter(connectDB),
  //깃헙 secret
  secret: "rkwkdrldjrdpskasmsehdspsmsanswjd",
};
export default NextAuth(authOptions);
