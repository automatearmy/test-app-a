import { headers } from "next/headers";
import FixDevelopmentTokenScreen from "../components/dev";
import { redirect } from "next/navigation";

export default function page() {

  const headersList = headers();
  const domain = headersList.get('host');
  const isDevelopmentEnviroment = (domain.includes("localhost") || domain.includes("127.0.0.1")) && process.env.NODE_ENV == "development"
  if(isDevelopmentEnviroment) {
    return <FixDevelopmentTokenScreen />
  }
  return redirect("/")
}