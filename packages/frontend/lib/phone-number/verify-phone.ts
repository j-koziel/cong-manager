import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { backendErrorHandle } from "../backend-error-handle";
import { backendRoutes } from "../config";
import { createCongregation } from "../congregation/create-congregation";
import { Congregation } from "../types/models/congregation";

import { toast } from "@/components/ui/use-toast";

/**
 * Calls our API to send a verification code to the provided congregation
 * phone number
 *
 * @param congregation - The congregation to verify
 * @param phoneNumber - The phone number to send the verification code to
 */
export async function sendVerificationCode(
  congregation: Congregation,
  phoneNumber: string,
) {
  try {
    await axios.post(backendRoutes.congregation.sendVerificationCode, {
      congregation,
      phoneNumber,
    });
  } catch (error) {
    toast({
      title: "Error",
      description: backendErrorHandle(error),
      variant: "destructive",
    });
  }
}

/**
 * Makes a call to our API which actually verifies the phone number by checking
 * the code provided.
 *
 * @param congregation - The congregation to verify
 * @param userCode - The code which was provided by the user
 * @param router - Router to redirect the user
 */
export async function verifyPhone(
  congregation: Congregation,
  userCode: string,
  router: AppRouterInstance,
) {
  try {
    await axios.post(backendRoutes.congregation.verifyPhone, {
      congregation,
      userCode,
    });
    await createCongregation(congregation, router);

    toast({
      title: "Success!",
      description: "The verification code was correct.",
      variant: "success",
    });
    router.replace("/dashboard");
  } catch (error) {
    toast({
      title: "Error",
      description: backendErrorHandle(error),
      variant: "destructive",
    });
  }
}
