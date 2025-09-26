import { STATIC_PATHS } from "@/utils/routes";
import {
  type ClientConfig,
  type Route,
  createClient as baseCreateClient,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
const routes: Route[] = [
  {
    type: "homepage",
    path: STATIC_PATHS.HOMEPAGE,
  },
  {
    type: "services",
    path: "/services",
  },
  {
    type: "service",
    path: "/services/:uid",
  },
  {
    type: "privacy_policy",
    path: "/privacy-policy",
  },
  { type: "terms_of_service", path: "/terms-of-service" },
  {
    type: "blog_post",
    path: "/blog/:uid",
  },
  {
    type: "blog",
    path: "/blog",
  },
  {
    type: "works",
    path: "/work",
  },
  {
    type: "work",
    path: "/work/:uid",
  },
  {
    type: "contact",
    path: "/contact",
  },
  {
    type: "about",
    path: "/about",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: ClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
