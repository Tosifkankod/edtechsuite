import { AppDataSource } from "./data-source"

export default {
    connect: async () => {
        try {
            await AppDataSource.initialize();
            console.log(
                "Loaded entities:",
                AppDataSource.entityMetadatas.map(e => e.name)
            );
        } catch (error) {
            throw error;
        }
    }
}