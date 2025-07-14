// main-doc.ts
import companyPaths from "./company.json";
import newsPaths from "./news.json";
import schemas from "./schemas.json";

export const swaggerDocument = {
  openapi: "3.0.3",
  info: { title: "RasmiHub API", version: "1.0.0" },
  tags: [
    { name: "Company", description: "Operations related to companies" },
    { name: "News", description: "Operations related to news articles" },
  ],
  paths: {
    ...companyPaths,
    ...newsPaths,
  },
  components: {
    schemas,
  },
};
