import { ServiceAddress } from '../types/ServiceAddress';

enum RoutesEnum {
  INITIAL = 'Initial',
  TUTORIAL = 'Tutorial',
  SIGNUP_LOGIN = 'Signup',
  SIGNUP_COMPLETE_BASIC_INFO = 'Create Profile',
  SIGNUP_PAYMENT_OPTION = 'Add Payment Screen',
  SIGNUP_ADD_CREDIT_CARD = 'Add Credit Card',
  MAIN = 'Main',
  VALIDATE_LOCATION = 'Validate Location',
  REQUEST_NOW_ORIGIN_DESTINATION = 'Request Now Origin Destination',
  REQUEST_NOW_TIER_SELECTION = 'Tier Selection',
  REQUEST_NOW_SEARCHING_AGENT = 'Searching Agent',
  REQUEST_NOW_IN_PROGRESS = 'In progress',
  BECOME_HERO = 'Apply as hero',
  SUBMIT_HERO_DOCUMENTS = 'Submit hero documents',
  ADD_PAYMENT_METHOD = 'Add Payment Method',
}

export type RootStackParamList = {
  [RoutesEnum.INITIAL]: undefined;
  [RoutesEnum.TUTORIAL]: undefined;
  [RoutesEnum.VALIDATE_LOCATION]: undefined;
  [RoutesEnum.SIGNUP_LOGIN]: undefined;
  [RoutesEnum.SIGNUP_COMPLETE_BASIC_INFO]: undefined;
  [RoutesEnum.BECOME_HERO]: undefined;
  [RoutesEnum.SUBMIT_HERO_DOCUMENTS]: undefined;
  [RoutesEnum.SIGNUP_PAYMENT_OPTION]: {
    firstName: string;
    lastName: string;
    email: string;
    profilePictureId: number | null;
  };
  [RoutesEnum.SIGNUP_ADD_CREDIT_CARD]: {
    firstName: string;
    lastName: string;
    email: string;
    profilePictureId: number | null;
  };
  [RoutesEnum.MAIN]: undefined;
  [RoutesEnum.REQUEST_NOW_ORIGIN_DESTINATION]: undefined;
  [RoutesEnum.REQUEST_NOW_TIER_SELECTION]: {
    from: ServiceAddress;
    to: ServiceAddress[];
    customerLocation: ServiceAddress;
  };
  [RoutesEnum.REQUEST_NOW_SEARCHING_AGENT]: undefined;
  [RoutesEnum.ADD_PAYMENT_METHOD]: undefined;
  [RoutesEnum.REQUEST_NOW_IN_PROGRESS]: undefined;
};

export default RoutesEnum;
