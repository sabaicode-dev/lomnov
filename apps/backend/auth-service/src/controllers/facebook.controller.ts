import { Controller, Get, Route, Request, Res, TsoaResponse } from "tsoa";
import { Request as ExRequest } from 'express';
import { randomBytes } from "crypto"
import configs from '@/src/config';

@Route("api/v1")
export class FacebookController extends Controller {
  @Get('/facebook/signin')
  public async facebookSignIn(
    @Request() request: ExRequest,
    @Res() redirect: TsoaResponse<302, void>
  ): Promise<void> {
    try {
      // Generate a random state value
      const state = randomBytes(16).toString('hex');
      request.session.state = state; // Store the state in session securely
      console.log(`Generated state: ${state}`);

      // Construct the URL for Cognito OAuth2 authorization
      const authorizeParams = new URLSearchParams({
        response_type: 'code',
        client_id: configs.cognitoAppCientId, // Replace with your Cognito app client ID
        redirect_uri: configs.redirect_uri, // Replace with your app's callback URL
        identity_provider: 'Facebook',
        scope: 'profile email openid'
      });

      // Construct the full redirect URL
      const redirectUrl = `${configs.cognitoAppDomain}/oauth2/authorize?${authorizeParams.toString()}`;
      console.log(`Redirecting to: ${redirectUrl}`);

      // Redirect the user to the Cognito authorization URL
      redirect(302, undefined, { Location: redirectUrl });

    } catch (error) {
      console.error('Error during Facebook sign-in:', error);
      // You might want to handle the error differently, such as rendering an error page or sending a response.
      throw new Error('Failed to initiate Facebook sign-in');
    }
  }

}
