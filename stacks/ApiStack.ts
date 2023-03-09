import { Api, use, StackContext } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {

  const { table } = use(StorageStack);

  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
        },
        timeout: 100
      }
    },
    routes: {
      "GET /test": "handlers/test.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

}
