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

  const DATABASE_ID = 'rpgmanager_db';
  const PLAYERS_COLLECTION_ID = 'Player';
  const ATTRIBUTES_COLLECTION_ID = 'Attribute';
  const PLAYER_ATTRIBUTES_COLLECTION_ID = 'PlayerAttributes';

  const data = JSON.parse(req.variables['APPWRITE_FUNCTION_DATA']);
  const gameID = data.gameID;
  const teamID = data.teamID;

  let players = await database.listDocuments(DATABASE_ID, PLAYERS_COLLECTION_ID, [Query.equal('gameID',gameID)]);
  players = players.documents;
  console.log("found " + players.length + " players: " + JSON.stringify(players));

  //for each players, get attributes
  for (let i = 0; i < players.length; i++) {
    let playerID = players[i].$id;
    let playerAttributesRelations = await database.listDocuments(DATABASE_ID, PLAYER_ATTRIBUTES_COLLECTION_ID, [Query.equal('playerID',playerID)]);
    let attributesNames = await database.listDocuments(DATABASE_ID, ATTRIBUTES_COLLECTION_ID, [Query.equal('gameID',gameID)]);
    let attributes = {};
    console.log("playerAttributesRelations: " + JSON.stringify(playerAttributesRelations));
    console.log("attributesNames: " + JSON.stringify(attributesNames));
    playerAttributesRelations.documents.forEach(relation => {
      let attributeName = attributesNames.documents.find(attribute => attribute.$id == relation.attributeID).name;
      attributes[attributeName] = relation.value;
    });
    players[i].attributes = attributes;
    console.log("player: " + JSON.stringify(players[i]));
  }


  res.json({
    players: players,
  });
};
