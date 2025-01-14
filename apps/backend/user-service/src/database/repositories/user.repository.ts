import {
    InternalServerError,
    NotFoundError,
    ValidationError,
} from "@/src/utils/error/customErrors";
import {
    RequestUserDTO,
    ResponseFindUserBySubDTO,
    ResponseFindUserDTO,
    ResponseUpdateUserDTO,
    ResponseUserDTO,
    User,
    ViewUserProfileDTO,
} from "@/src/utils/types/indext";
import { UserModel } from "../models/user.model";
// =========================================================================


export class UserRepository {

  public async create(requestBody: RequestUserDTO): Promise<ResponseUserDTO> {
    try {
      const { cognitoSub, email, userName,profile,role='user' } = requestBody;
      const usernameExist = await UserModel.find({ userName: userName });
      if (usernameExist.length > 0) {
        throw new ValidationError(" Username already existed");
      }
      // console.log("the best result" + req.user);
      if (!cognitoSub ||  !email || !userName|| !role) {
        throw new ValidationError(
          " CognitoSub , firstname, lastname and username are required!",
        );
      }
      const data = { cognitoSub, email,userName,profile,role };
      const response = await UserModel.create(data);
      return response;
    } catch (error: any) {
      if (error instanceof ValidationError) {
        throw error;
      } else {
        throw new InternalServerError(error.message);
      }
    }
  }
  //status user

  public async updateStatus(userId : string , status : boolean) : Promise<ResponseUserDTO | null>{
    try {
      const updateStatususer = await UserModel.findByIdAndUpdate(
        {_id : userId},
        {$set:{status} },
        {new : true}
      )
      return updateStatususer;
    } catch (error) {
      throw error;
    }
  }

    public async getMet(cognitoSub: string): Promise<ResponseUserDTO | null> {
        try {
            console.log(cognitoSub);
            const response = await UserModel.findOne({ cognitoSub: cognitoSub });
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async findUsername(username: string): Promise<ResponseUserDTO | {}> {
        try {
            const response = await UserModel.find({ userName: username });
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async findUsers(
        query: any,
        skip: number,
        limit: number,
    ): Promise<ResponseFindUserDTO> {
        try {
            const [users, totalUsers] = await Promise.all([
                UserModel.find(query).skip(skip).limit(limit).lean(), // Use lean for performance improvement
                UserModel.countDocuments(query),
            ]);

            if (!users || !totalUsers) {
                throw new NotFoundError("Users not found");
            }
            return { users, totalUsers };
        } catch (error: any) {
            throw error;
        }
    }

    public async findByCognitoSub(
        cognitoSub: string,
    ): Promise<ResponseFindUserBySubDTO | null> {
        try {
            const findUser = UserModel.findOne({ cognitoSub: cognitoSub }).exec();

            if (!findUser) {
                return null;
            }
            return findUser;
        } catch (error) {
            throw error;
        }
    }

    public async updateUserByCognitoSub(
        cognitoSub: string,
        updateData: Partial<User>,
    ): Promise<ResponseUpdateUserDTO | null> {
        try {
            console.log("Updating user with cognitoSub:", cognitoSub);
            console.log("Update data:", updateData);

            const updatedUser = await UserModel.findOneAndUpdate(
                { cognitoSub },
                { $set: updateData },
                { new: true },
            ).exec();

            if (!updatedUser) {
                throw new NotFoundError("User not found for update.");
            }

            console.log("Database successfully updated user:", updatedUser);

            return updatedUser;
        } catch (error) {
            console.error("Error in updateUserByCognitoSub:", error);
            throw error;
        }
    }

    public async findUserFavorites(cognitoSub: string): Promise<any[]> {
        try {
            const user = await UserModel.findOne({ cognitoSub }).select("favorite").lean();
            if (!user || !user.favorite) {
                return [];
            }
            return user.favorite;
        } catch (error) {
            console.error("Error fetching user favorites:", error);
            throw error;
        }
    }
    public async findViewProfileOfUser(cognitoSub: string): Promise<ViewUserProfileDTO> {
        try {
            const user = await UserModel.findOne({ cognitoSub: cognitoSub }).select('-favorite');
            if (!user)
                throw new NotFoundError("Users not found");
            return user!;
        } catch (error) {
            throw error;
        }
    }
    public async findUserAgents() {
        try {
            const users = await UserModel.find({}).lean();
            if (!users || users.length === 0) {
                throw new NotFoundError("No users found.");
            }
            return users;
        } catch (error) {
            console.log(error);
            throw new Error("Method findUserAgents() Error:: ");

        }
    }
    public async getUserRoleBySub(cognitoSub: string): Promise<{role: string}| null>{
        try {
            const userRole = await UserModel.findOne({cognitoSub}).select("role");
            if(!userRole){
                return null;
            }
            if (!userRole || !userRole.role) {
                return null;
            }
            return { role: userRole.role };
        } catch (error) {
            throw error;
        }
    }
}
