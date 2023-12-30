import envImport from "../envImport";
import { Client, Databases, ID, Query } from "appwrite";

export class DataBaseService{
    client = new Client();
    databases;
    
    constructor(){
        this.client
        .setEndpoint(envImport.appwriteUrl)
        .setProject(envImport.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userID}){
        try {
            return await this.databases.createDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId,
                slug          
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(){
        try {
            return await this.databases.listDocuments(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ]
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }
}

const dataBaseService = new DataBaseService()
export default dataBaseService