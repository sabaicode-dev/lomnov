import { Controller, Route, Post, Body, Tags , Get} from 'tsoa';
import { signUpUser, verifyUser, signInUser } from "@/src/utils/cognito";
// ========================================================================

interface SignUpBody {
  username: string;  // This can be either email or phone number
  password: string;
  name: string;
}

interface VerifyBody {
  username: string;  // This can be either email or phone number
  code: string;
}

interface SignInBody {
  username: string;  // This can be either email or phone number
  password: string;
}

// Extend the Express Request type
export interface CustomRequest {
  protocol: string;
}



@Tags(" Handle By hand")
@Route("api/v1")
export class ProductController extends Controller {
  @Post("/auth/signup")
  public async signup(@Body() body: SignUpBody): Promise<any> {
    const { username, password, name } = body;
    const isPhoneNumber = username.startsWith("+");
    const attributes = { name } as any;

    if (isPhoneNumber) {
      attributes.phoneNumber = username;
    } else {
      attributes.email = username;
    }

    try {
      const response = await signUpUser(username, password, attributes);
      return response;
    } catch (error: any) {
      this.setStatus(400);
      return { error: error.message };
    }
  }

  @Post("/auth/verify")
  public async verify(@Body() body: VerifyBody): Promise<any> {
    const { username, code } = body;
    try {
      const response = await verifyUser(username, code);
      return response;
    } catch (error: any) {
      this.setStatus(400);
      return { error: error.message };
    }
  }

  @Post("/auth/signin")
  public async signIn(@Body() body: SignInBody): Promise<any> {
    const { username, password } = body;
    try {
      const response = await signInUser(username, password);
      return response;
    } catch (error: any) {
      this.setStatus(401);
      return { error: error.message };
    }
  }

  @Get("/auths")
  public async testGet(){
    return {message: " hello  Seyha "}
  }




}




















// version signup have 2 attribute like email and phonenumber
// interface SignUpBody {
//   email: string ;
//   password: string;
//   name: string;
//   phoneNumber: string;
// }

// @Route("api/v1")
// export class ProductController extends Controller {

//   @Post("/auth/signup")
//   public async signup(@Body() body: SignUpBody): Promise<any> {
//     const { email, password, name, phoneNumber } = body;
//     const formattedPhoneNumber = `+855${phoneNumber}`;  // Ensure phone number is in E.164 format

//     try {
//       const response = await signUpUser(email, password, { name, phoneNumber: formattedPhoneNumber });
//       return response;
//     } catch (error:any) {
//       this.setStatus(400);
//       return { error: error.message };
//     }
//   }

//   @Post("/auth/phone/verify")
//   public async verifyPhone(@Body() body: { phoneNumber: string, code: string }): Promise<any> {
//     const { phoneNumber, code } = body;
//     const formattedPhoneNumber = `+855${phoneNumber}`;  // Ensure phone number is in E.164 format
//     try {
//       const response = await verifyPhoneNumber(formattedPhoneNumber, code);
//       return response;
//     } catch (error:any) {
//       this.setStatus(400);
//       return { error: error.message };
//     }
//   }

//   @Post("/auth/phone/signin")
//   public async signInWithPhone(@Body() body: { phoneNumber: string, password: string }): Promise<any> {
//     const { phoneNumber, password } = body;
//     const formattedPhoneNumber = `+855${phoneNumber}`;  // Ensure phone number is in E.164 format
//     try {
//       const response = await signInWithPhoneNumber(formattedPhoneNumber, password);
//       return response;
//     } catch (error:any) {
//       this.setStatus(401);
//       return { error: error.message };
//     }
//   }
// }
// ============






// version correct with email
// import { Controller, Route, Post, Body } from "tsoa";
// import { signUpUser, signInUser, verifyEmail } from "@/src/utils/cognito";

// interface SignUpBody {
//   email: string;
//   password: string;
//   name: string;
// }

// @Route("api/v1")
// export class ProductController extends Controller {

//   @Post("/auth/email/signup")
//   public async signupWithEmail(@Body() body: SignUpBody): Promise<any> {
//     const { email, password, name } = body;
//     try {
//       const response = await signUpUser(email, password, { name });
//       return response;
//     } catch (error:any) {
//       this.setStatus(400);
//       return { error: error.message };
//     }
//   }

//   @Post("/auth/email/signin")
//   public async signinWithEmail(@Body() body: { email: string, password: string }): Promise<any> {
//     const { email, password } = body;
//     try {
//       const response = await signInUser(email, password);
//       return response;
//     } catch (error:any) {
//       this.setStatus(401);
//       return { error: error.message };
//     }
//   }

//   @Post("/auth/verify/email")
//   public async verifyWithEmail(@Body() body: { email: string, code: string }): Promise<any> {
//     const { email, code } = body;
//     try {
//       const response = await verifyEmail(email, code);
//       return response;
//     } catch (error:any) {
//       this.setStatus(400);
//       return { error: error.message };
//     }
//   }
// }



// import { Controller, Route, Post, Body } from "tsoa";
// import { signUpUser, signInUser, verifyEmail } from "@/src/utils/cognito";

// interface SignUpBody {
//   email: string;
//   password: string;
//   name: string;
//   formattedName: string;
// }

// @Route("api/v1")
// export class ProductController extends Controller {

//   @Post("/auth/email/signup")
//   public async signupWithEmail(@Body() body: SignUpBody): Promise<any> {
//     const { email, password, name, formattedName } = body;
//     try {
//       const response = await signUpUser(email, password, { name, formattedName });
//       return response;
//     } catch (error:any) {
//       this.setStatus(400);
//       return { error: error.message };
//     }
//   }

//   @Post("/auth/email/signin")
//   public async signinWithEmail(@Body() body: { email: string, password: string }): Promise<any> {
//     const { email, password } = body;
//     try {
//       const response = await signInUser(email, password);
//       return response;
//     } catch (error:any) {
//       this.setStatus(401);
//       return { error: error.message };
//     }
//   }

//   @Post("/auth/verify/email")
//   public async verifyWithEmail(@Body() body: { email: string, code: string }): Promise<any> {
//     const { email, code } = body;
//     try {
//       const response = await verifyEmail(email, code);
//       return response;
//     } catch (error:any) {
//       this.setStatus(400);
//       return { error: error.message };
//     }
//   }
// }




