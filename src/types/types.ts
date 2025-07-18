interface PreservedData {
  email: string;
  firstname: string;
  lastname: string;
}

export interface ActionState {
  errorMessage?: string;
  successMessage?: string;
  fieldErrors?: {
    firstname?: string[];
    lastname?: string[];
    email?: string[];
    pwd?: string[];
    pwdConfirm?: string[];
  };
  preservedData?: PreservedData;
}
