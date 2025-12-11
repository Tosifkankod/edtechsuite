import { AppDataSource } from "./data-source"

export default {
    connect: async () => {
        try {
            await AppDataSource.initialize();
        } catch (error) {
            throw error;
        }
    }
}