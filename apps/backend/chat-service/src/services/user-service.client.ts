import axios from "axios";
import { User } from "./types/messages.service.types";

export class UserServiceClient {
    public async getUserRole(sub: string): Promise<{ role: string } | null> {
        try {
            const res = await axios.get(`http://localhost:4000/api/v1/users/role/${sub}`);
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    public getUsersByParticipantIds(users: User[], participantIds: string[]): User[] {
        return users.filter(user => participantIds.includes(user.cognitoSub));
    }
    public async getUsersAndFilter(participantIds: string[]): Promise<User[]> {
        try {
            const responseUsers = (await axios.get(`http://localhost:4000/api/v1/users`)).data;
            if (responseUsers) {
                const returnUsers = this.getUsersByParticipantIds(responseUsers.users, participantIds);
                return returnUsers;
            }
            return [];
        } catch (error) {
            throw error;
        }
    }
}