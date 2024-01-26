import getCurrentUser from "../actions/currentUser";
import CreateForm from "@/components/shared/createForm";

const page = async () => {
  const user = await getCurrentUser();
  return <CreateForm user={user} />;
};

export default page;