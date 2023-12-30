import envImport from "../envImport";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(envImport.appwriteUrl) // Your API Endpoint
            .setProject(envImport.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}){
        try {
            const userAccount=  await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                return this.login({email,password});
            }
            else{
                console.error("User creation failed");
            }
        } catch (error) {
            console.log("Appwrite serive :: createAccount :: error", error);
        }
    }

    async login({email,password}){
        try {
            const loggedIn = await this.account.createEmailSession(email, password);
            console.log(loggedIn);
            return loggedIn;
        } catch (error) {
            console.log("Appwrite serive :: login :: error", error);
        }
    }

    async getCurrentUser(){
        try {
            const currentUser = await this.account.get()
            if(currentUser){
                return currentUser
            } else {
                console.error("User not logged In");
            }
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;