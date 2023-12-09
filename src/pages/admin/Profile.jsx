import { Avatar, Card, CardBody } from "@nextui-org/react";
import AdminLayout from "../../layouts/AdminLayout";

const Profile = () => {
  return (
    <>
            <AdminLayout />

      <div className="p-4 xl:ml-80">
        <div className="relative mt-8 h-28 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                  className="border-2 border-gray-800"
                  radius="lg"
                  size="lg"
                  src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                />

                <div>
                  <p className="font-bold text-2xl">Admin</p>
                  <p className="font-normal text-md">admin</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Profile;
