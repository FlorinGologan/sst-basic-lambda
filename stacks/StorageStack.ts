import { Table, StackContext } from "@serverless-stack/resources"

export function StorageStack({ stack }: StackContext) {
    const table = new Table(stack, "api-test", {
        fields: {
            pk: "string",
        },
        primaryIndex: {
            partitionKey: "pk",
        },
    });

    return {
        table
    }

}