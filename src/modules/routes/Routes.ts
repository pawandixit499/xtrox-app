import { CompleteCompanyRegistration } from "../../screens/companyr_regisration/CompleteCompanyRegisration";
import EmailVerify from "../../screens/emailverification/EmailVerify";

  
  
  export const Routes = {
   
    CompleteProfileScreen: {
      name: 'Complete Profile',
      component: CompleteCompanyRegistration,
      initialParams: {},
    },
    EmailVerify: {
      name: 'Email Verify',
      component: EmailVerify,
      initialParams: {},
    },
  
  };
  