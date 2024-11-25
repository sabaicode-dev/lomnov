import configs from "../config";
import axios from "axios"
import { ResponsePropertyOwner } from "../utils/types/indext";
export class UserServiceClient{
    private ownerRequestEndpiont(cognitoSub:string){
        return `${configs.userServiceUrl}/profile-info/${cognitoSub}`;
    }
    async propertyOwnerInfo(cognitoSub:string): Promise<ResponsePropertyOwner>{
        try {
            return (await axios.get(this.ownerRequestEndpiont(cognitoSub))).data;
        } catch (error) {
            throw error;
        }
    }
}