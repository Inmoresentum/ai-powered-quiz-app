import {AutoCrud} from "@hilla/react-crud";
import {UserEndpointAdmin} from "@/generated/endpoints";
import UserModel from "@/generated/com/example/application/entities/user/UserModel";

export default function UserOperations() {
    return (
        <div className="flex items-center justify-center h-[1080px] w-full">
            <AutoCrud service={UserEndpointAdmin} model={UserModel}
                      className="h-full shadow-2xl rounded-md max-w-[1280px] w-full"
                      formProps={{
                          formLayoutProps: {
                              responsiveSteps: [
                                  {minWidth: '0', columns: 1},
                                  {minWidth: '2560px', columns: 2},
                              ]
                          },
                      }}
            />
        </div>
    );
}