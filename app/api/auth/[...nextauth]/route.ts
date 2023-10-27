import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.user = user;
        const u = user as any;
        token.role = u.role;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: ({ session, token }) => {
      token.accessToken;
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
    redirect: async ({ url, baseUrl }) => {
      // Sign out from OAuth provider (Cognito)
      // call `signOut({ callbackUrl: "signOut" });` then this callback called
      // https://github.com/nextauthjs/next-auth/discussions/3938#discussioncomment-2231398
      if (url.startsWith(baseUrl)) return url;
      if (url === "signOut" && process.env.COGNITO_LOGOUT_ENDPOINT_URL) {
        // Sign out from auth provider
        console.log("signOut");

        const logoutEndpointUrl = process.env.COGNITO_LOGOUT_ENDPOINT_URL || "";
        const params = new URLSearchParams({
          client_id: process.env.COGNITO_CLIENT_ID || "",
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/cognito`,
          response_type: "code",
        });
        return `${logoutEndpointUrl}?${params.toString()}`;
      }
      // Allows relative callback URLs
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      // Redirect to root when the redirect URL is still an external domain
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
