import { Api, StackContext } from "@serverless-stack/resources";

export function ApiStack({ stack }: StackContext) {

  const api = new Api(stack, "Api", {
    routes: {
      "GET /test": "handlers/test.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

}
