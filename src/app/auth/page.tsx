import {redirect} from "next/navigation";

import {AUTH_ROUTES} from "@/routes";

export default async function AuthPage() {
    redirect(AUTH_ROUTES.SIGN_IN);
}
