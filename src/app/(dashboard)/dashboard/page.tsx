import Button from "@/components/ui/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async ({}) => {
  console.log("hello");
  const session = await getServerSession(authOptions);

  return <pre> Dashboard </pre>;
};

export default page;
