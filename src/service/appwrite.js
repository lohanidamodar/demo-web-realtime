import { Appwrite } from "appwrite";

class AppwriteService {
    tasksCollection = "6131a822d3e6a";
    constructor() {
        this.appwrite = new Appwrite().setEndpoint("https://demo.appwrite.io/v1").setProject("6131a81894e2e")
    }

    addTask = async ({ title, column }, user) => {
        await this.appwrite.database.createDocument(this.tasksCollection, { title: title, column: column, userId: user.$id }, ['role:member'], ['role:member'], '', '', '');
    }

    deleteTask = async (taskId) => {
        await this.appwrite.database.deleteDocument(this.tasksCollection, taskId);
    }

    updateTask = async (taskId, { title, column }, user) => {
        await this.appwrite.database.updateDocument(this.tasksCollection, taskId, { title: title, column: column, userId: user.$id }, ['role:member'], ['role:member']);
    }

    getUser = async () => {
        return await this.appwrite.account.get();
    }

    login = async () => {
        await this.appwrite.account.createAnonymousSession();
        return await this.getUser();
    }

    getTasks = async () => {
        return this.appwrite.database.listDocuments(this.tasksCollection, [], 100, 0, '', '', '', '');
    }

    subscribeTo = (callback) => {
        return this.appwrite.subscribe(`collections.${this.tasksCollection}.documents`, callback);
    }
    logout = () => {
        return this.appwrite.account.deleteSession('current');
    }
}

export default new AppwriteService();