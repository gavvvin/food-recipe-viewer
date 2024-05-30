import { Inter } from "next/font/google";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const inter = Inter({ subsets: ["latin"] });

export default function RecipesApp({ Component, pageProps }) {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
  });

  return (
    <main className={inter.className}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </main>
  );
}
