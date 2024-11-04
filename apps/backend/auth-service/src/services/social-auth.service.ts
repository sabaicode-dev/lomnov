import crypto from "crypto"
import configs from "@/src/config";
import axios from "axios";
class SocialAuthService {
    /**
     * Generate Random Byes
     */
    private generatedRandomBytes(): string {
        return crypto.randomBytes(16).toString("hex");
    }
    /**
     * Provive a domain of cognito that accept 1 param as a end point
     */
    private awsCognitoDomain(endpiont: string = '') {
        return `${configs.awsCognitoDomain}${endpiont}`
    }
    public loginWithGoogle(state: string = this.generatedRandomBytes()): string {
       
            const params = new URLSearchParams({
                response_type: 'code',
                client_id: configs.awsCognitoClientId,
                redirect_uri: configs.awsRedirectUri,
                identity_provider: 'Google',
                scope: 'openid profile email',
                state: state!,
                prompt: 'select_account',
            }) 
            return this.awsCognitoDomain(`/oauth2/authorize?${params.toString()}`)
    }
    public async handleCallBack(code: string,_state: string): Promise<any>{
        const tokenUrl = this.awsCognitoDomain(`/oauth2/token`);
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: configs.awsCognitoClientId,
            redirect_uri: configs.awsRedirectUri,
            code: code,
        });
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${configs.awsCognitoClientId}:${configs.awsCognitoClientSecret}`).toString('base64')}`,
        }
        try {
            const response = await axios.post(tokenUrl,params.toString(), {headers});
            return response.data;
        } catch (error) {
            console.error("CallBack Error::: ", error)
            throw error;
        }
    }
}
export default SocialAuthService;