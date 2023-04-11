const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  const account = new sdk.Account(client);
  const avatars = new sdk.Avatars(client);
  const database = new sdk.Databases(client);
  const functions = new sdk.Functions(client);
  const health = new sdk.Health(client);
  const locale = new sdk.Locale(client);
  const storage = new sdk.Storage(client);
  const teams = new sdk.Teams(client);
  const users = new sdk.Users(client);
  const Query = sdk.Query;

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.log("Environment variables are not set. Function cannot use Appwrite SDK.");
  } else {
    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);
  }

  const DATABASE_ID = '642473470c82a9f670f4';
  const PLAYERS_COLLECTION_ID = '642477f19ed096294827';
  const PLAYER_ATTRIBUTES_COLLECTION_ID = '6424804534ea4ffb816c';

  const data = JSON.parse(req.variables['APPWRITE_FUNCTION_DATA']);
  const playerID = data.playerID;

  //TODO delete player inventory

  //delete player attributes
  let playerAttributes = await database.listDocuments(DATABASE_ID, PLAYER_ATTRIBUTES_COLLECTION_ID, [
    Query.equal('playerID', playerID)
  ]);
  playerAttributes.documents.forEach(async (playerAttribute) => {
    database.deleteDocument(DATABASE_ID, PLAYER_ATTRIBUTES_COLLECTION_ID, playerAttribute.$id);
  });

  //delete player
  await database.deleteDocument(DATABASE_ID, PLAYERS_COLLECTION_ID, playerID);

  res.json({message: "Player deleted successfully" });
};
