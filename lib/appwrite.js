import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
// Init your React Native SDK

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1", //do self hoating if needed.
  platform: "com.sriram.vimo",
  projectId: "679ea5140037dbd62e47",
  databaseId: "679ea720001677809cc2",
  userCollectionId: "679ea751001d4f729906",
  videoCollectionId: "679ea78d0015e7ad015f",
  storageId: "679eac0100348ee29485",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = appwriteConfig;
const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
export const signOut = async () => {
  try {
    await account.deleteSession("current"); // Deletes the current session
  } catch (error) {
    console.error("Error logging out:", error);
  }
};


export async function getAllPosts() {
    try {
      const posts = await database.listDocuments(
        databaseId,
        videoCollectionId
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  export async function getLatestPosts() {
    try {
      const posts = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
      );
  
      console.log("posts.documents",posts.documents);
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }