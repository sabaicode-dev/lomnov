import { UserRepository } from "../database/repositories/user.repository";
import { RequestUserDTO, ResponseUserDTO } from "../utils/types/indext";

export class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(
    requestBody: RequestUserDTO,
  ): Promise<ResponseUserDTO> {
    try {
      return await this.userRepository.create(requestBody);
    } catch (error) {
      throw error;
    }
  }
}
