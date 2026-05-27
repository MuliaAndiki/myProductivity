import {
  JwtPayload,
  PickAddUsername,
  PickForgotPassword,
  PickLogin,
  PickRegister,
  PickResetPassword,
  PickSendOtp,
  PickUpdateProfile,
  PickVerify,
} from '@repo/shared';
import { AppContext } from '@/contex/index';
import { HttpResponse } from '@/http';
import authService from '@/service/auth.service';

// const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

class AuthController {
  public async register(c: AppContext) {
    try {
      const auth = c.body as PickRegister;
      const service = await authService.RegisterService(c, auth);

      if (!service) {
        return HttpResponse(c).badGateway();
      }

      if (service instanceof Response) {
        return service;
      }

      return HttpResponse(c).ok(service, 'successfully create users');
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error);
    }
  }

  public async addUsername(c: AppContext) {
    try {
      const auth = c.body as PickAddUsername;
      const service = await authService.addUsernameService(c, auth);

      if (service instanceof Response) {
        return service;
      }

      if (!service) {
        return HttpResponse(c).badGateway();
      }

      return HttpResponse(c).ok(service);
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
  public async login(c: AppContext) {
    try {
      const auth = c.body as PickLogin;
      const service = await authService.LoginService(c, auth);

      if (service instanceof Response) {
        return service;
      }

      if (!service) {
        return HttpResponse(c).badGateway();
      }

      return HttpResponse(c).ok(service);
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error);
    }
  }

  public async logout(c: AppContext) {
    try {
      const users = c.user as JwtPayload;

      if (!users) {
        return HttpResponse(c).unauthorized();
      }

      const service = await authService.LogoutService(c, users.id);

      if (service instanceof Response) {
        return service;
      }

      if (!service) {
        return HttpResponse(c).badGateway();
      }

      return HttpResponse(c).ok(service, 'Account logged out successfully');
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error);
    }
  }
  public async forgotPassword(c: AppContext) {
    try {
      const auth = c.body as PickForgotPassword;
      const service = await authService.forgotPasswordService(c, auth);

      if (service instanceof Response) {
        return service;
      }

      if (!service) {
        return HttpResponse(c).badGateway();
      }

      return HttpResponse(c).ok(service);
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
  public async verifyOtp(c: AppContext) {
    try {
      const auth = c.body as PickVerify;
      const service = await authService.VerifyOtpService(c, auth);

      if (service instanceof Response) {
        return service;
      }

      if (!service) {
        return HttpResponse(c).badRequest('Service bad request');
      }

      return HttpResponse(c).ok(service);
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async resendOtp(c: AppContext) {
    try {
      const auth = c.body as PickSendOtp;
      const service = await authService.ResendOtpService(c, auth);

      if (service instanceof Response) {
        return service;
      }

      if (!service) {
        HttpResponse(c).badRequest('service bad requets');
      }
      return HttpResponse(c).ok(service);
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
  public async resetPassword(c: AppContext) {
    try {
      const auth = c.body as PickResetPassword;
      const service = await authService.ResetPasswordService(c, auth);
      if (!service) {
        return HttpResponse(c).badRequest();
      }
      return HttpResponse(c).ok(service);
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async getUsername(c: AppContext) {
    try {
      const { username } = c.query as { username: string };
      const service = await authService.GetUsernameService(c, username);

      if (service instanceof Response) {
        return service;
      }

      return HttpResponse(c).ok(service);
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
  public async UpdateProfile(c: AppContext) {
    try {
      const users = c.user as JwtPayload;
      const auth = c.body as PickUpdateProfile;

      if (!users) {
        return HttpResponse(c).unauthorized();
      }

      const service = await authService.UpdateProfileService(c, auth, users.id);

      if (service instanceof Response) {
        return service;
      }

      if (!service) {
        return HttpResponse(c).badRequest();
      }

      return HttpResponse(c).ok(service);
    } catch (error) {
      return HttpResponse(c).internalError('server internal error');
    }
  }
}

export default new AuthController();
