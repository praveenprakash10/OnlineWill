// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // From https://app.tina.io after you connect this repo (needed for production editing)
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "article",
        label: "Articles",
        path: "content/articles",
        format: "md",
        ui: {
          router: ({ document }) => `/articles/${document._sys.filename}`,
          filename: {
            readonly: false,
            slugify: (values) => {
              const title = values.title;
              return title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "new-article";
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish date",
            required: true
          },
          {
            type: "datetime",
            name: "updated",
            label: "Updated date"
          },
          {
            type: "image",
            name: "cover",
            label: "Cover image"
          },
          {
            type: "string",
            name: "coverAlt",
            label: "Cover image alt text"
          },
          {
            type: "string",
            name: "author",
            label: "Author"
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            required: true
          }
        ]
      },
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        ui: {
          router: ({ document }) => `/${document._sys.filename}`,
          filename: {
            readonly: false,
            slugify: (values) => {
              const title = values.title;
              return title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "new-page";
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            required: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
