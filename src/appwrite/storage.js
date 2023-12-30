import envImport from "../envImport";
import { Client, Storage, ID } from "appwrite";

export class StorageService{
    client = new Client();
    storage;

    constructor(){
        this.client
        .setEndpoint(envImport.appwriteUrl)
        .setProject(envImport.appwriteProjectId);
        this.storage = new Storage(this.client);
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                envImport.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                envImport.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        if(fileId){
            return this.storage.getFilePreview(
                envImport.appwriteBucketId,
                fileId
            )
        }else{
            console.log("error");
        }
    }
}

const storageService = new StorageService()
export default storageService