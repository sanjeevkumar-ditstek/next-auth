import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Auth0Provider from "next-auth/providers/auth0";
import GitlabProvider from "next-auth/providers/gitlab";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import NetlifyProvider from "next-auth/providers/netlify";
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";

export const authOptions = {
    // adapter: MongoDBAdapter(client),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    Auth0Provider({
        clientId: process.env.AUTH0_CLIENT_ID ?? "",
        clientSecret: process.env.AUTH0_CLIENT_SECRET?? "",
        issuer: process.env.AUTH0_ISSUER
      }),
      GitlabProvider({
        clientId: process.env.GITLAB_CLIENT_ID ?? "",
        clientSecret: process.env.GITLAB_CLIENT_SECRET ?? ""
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
      }),
      InstagramProvider({
        clientId: process.env.INSTAGRAM_CLIENT_ID ?? "",
        clientSecret: process.env.INSTAGRAM_CLIENT_SECRET ?? ""
      }),
      NetlifyProvider({
        clientId: process.env.NETLIFY_CLIENT_ID,
        clientSecret: process.env.NETLIFY_CLIENT_SECRET
      }),
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "Type a Username" },
          password: { label: "Password", type: "password", placeholder: "Type a Password" }
        },
        async authorize(credentials, req) {
            console.log("credentials", credentials)
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
        //   const res = await fetch("/your/endpoint", {
        //     method: 'POST',
        //     body: JSON.stringify(credentials),
        //     headers: { "Content-Type": "application/json" }
        //   })
        //   const user = await res.json()
        return {
            id: "189327",
            email: "sanjeev@gmail.com",
            emailVerified: true
        }
    
          // If no error and we have user data, return it
        //   if (res.ok && user) {
        //     return user
        //   }
          // Return null if user data could not be retrieved
          return null
        }
      })
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }