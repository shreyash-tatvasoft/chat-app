// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs';
// import { connectDB } from '@/app/server/db/connectDB';
// import userModel from '@/app/server/models/userModel';

// const handler =  NextAuth({
//   session: { strategy: 'jwt' },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: { email: {}, password: {} },
//       async authorize(credentials) {
//         await connectDB();
//         const user = await userModel.findOne({ email: credentials?.email });
//         if (!user || !bcrypt.compareSync(credentials!.password, user.password)) {
//           throw new Error('Invalid credentials');
//         }

//         return { id: user._id, email: user.email, username: user.username };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.user = user;
//       return token;
//     },
//     async session({ session, token }) {
//     //   session.user = token.user;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export const { GET, POST } = handler



import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from '@/app/server/db/connectDB';
import User from '@/app/server/models/userModel';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required");
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        // Generate JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email, username: user.username },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: "1d" }
        );

        return { id: user._id.toString(), name: user.username, email: user.email, token };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.name
        token.token = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).token = token.token;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
