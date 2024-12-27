import axios from "axios";
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
}