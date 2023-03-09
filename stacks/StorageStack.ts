import { Table, StackContext } from "@serverless-stack/resources"

export function StorageStack({ stack }: StackContext) {
    const table = new Table(stack, "api-test", {
        fields: {
            userId: "string",
            noteId: "string",
        },
        primaryIndex: {
            partitionKey: "userId",
            sortKey: "noteId"
        },
    });

    return {
        table
    }

}