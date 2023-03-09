import { DynamoDB } from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
import { AttributeValue } from "aws-sdk/clients/dynamodb";
import { GetItemInput } from "aws-sdk/clients/dynamodb";

const dynamoDb = new DynamoDB.DocumentClient();

const getCount = async (pk: AttributeValue): Promise<number> => {
    const params: GetItemInput = {
        TableName: process.env.TABLE_NAME || "",
        Key: { pk }
    }
    const result = await dynamoDb.get(params).promise()
    if (!result.Item) {
        return 0
    }

    return result.Item.x || 0
}

const updateCount = async (pk: String, x: number): Promise<void> => {
    const params = {
        TableName: process.env.TABLE_NAME || "",
        Key: { pk },
        UpdateExpression: "set x = :x",
        ExpressionAttributeValues: { ":x": x },
        ReturnValues: "UPDATED_NEW"
    }

    dynamoDb.update(params).promise();
}

export const main = async (event: APIGatewayEvent) => {
    const pk = event.queryStringParameters?.pk || "test";

    const x = await getCount(pk as AttributeValue) + 1;
    await updateCount(pk, x);

    return {
        statusCode: 200,
        body: JSON.stringify({ pk, count: x }),
    };
}