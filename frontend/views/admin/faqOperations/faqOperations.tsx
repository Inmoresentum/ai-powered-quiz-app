import {FAQAdminEndpoint} from "@/generated/endpoints";
import {AutoCrud} from "@hilla/react-crud";
import FAQModel from "@/generated/com/example/application/entities/faq/FAQModel";
import React from "react";
import {TextArea} from "@hilla/react-components/TextArea";
import {Helmet} from "react-helmet-async";

export default function FaqOperations() {
    return (
        <div className="flex items-center justify-center h-[1080px] w-full">
            <Helmet>
                <title>FAQ Operations</title>
                <meta name="description"
                      content="FAQ Operations For Admins"/>
            </Helmet>
            <AutoCrud service={FAQAdminEndpoint} model={FAQModel} className="h-full shadow-2xl rounded-md max-w-[1280px] w-full"
                      formProps={{
                          formLayoutProps: {
                              responsiveSteps: [
                                  {minWidth: '0', columns: 1},
                                  {minWidth: '2560px', columns: 2},
                              ]
                          },
                          fieldOptions: {
                              question: {
                                  renderer: ({field}) => <TextArea {...field} label="FAQ Question"
                                                                   className="w-full px-6 py-4 mt-3 md:hover:-translate-y-1 duration-300 ease-linear hover:ring-1 rounded-3xl"
                                                                   style={{"--vaadin-input-field-border-radius": "20px"} as React.CSSProperties}
                                  />,
                              },
                              answers: {
                                  renderer: ({field}) => <TextArea {...field} label="FAQ Answer"
                                                                   className="w-full px-6 py-4 md:hover:-translate-y-1 duration-300 ease-linear hover:ring-1 rounded-3xl"
                                                                   style={{"--vaadin-input-field-border-radius": "20px"} as React.CSSProperties}
                                  />,
                              }
                          }
                      }}
            />
        </div>
    );
}