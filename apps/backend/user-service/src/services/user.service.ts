import { UserRepository } from "../database/repositories/user.repository";
import {
  RequestUserDTO,
  ResponseUserDTO,
  ResponseAllUserDTO,
  GetAllUsersQueryDTO,
} from "../utils/types/indext";

export class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(
    requestBody: RequestUserDTO,
    req: Express.Request,
  ): Promise<ResponseUserDTO> {
    try {
      return await this.userRepository.create(requestBody, req);
    } catch (error) {
      throw error;
    }
  }

  public async getAllUsers(
    queries: GetAllUsersQueryDTO,
  ): Promise<ResponseAllUserDTO | undefined> {
    try {
      const query = {
        ...(queries.firstName && {
          firstName: { $regex: queries.firstName, $options: "i" },
        }),
        ...(queries.lastName && {
          lastName: { $regex: queries.lastName, $options: "i" },
        }),
        ...(queries.userName && {
          userName: { $regex: queries.userName, $options: "i" },
        }),
        ...(queries.role && { role: queries.role }),
      };
      const skip = (queries.page - 1) * queries.limit;
      const { users, totalUsers } = await this.userRepository.findUsers(
        query,
        skip,
        queries.limit,
      );
      const totalPages = Math.ceil(totalUsers / queries.limit);
      return {
        users,
        pagination: {
          currentPage: queries.page,
          totalPages,
          totalUsers,
        },
      };
    } catch (error) {}
  }
}
