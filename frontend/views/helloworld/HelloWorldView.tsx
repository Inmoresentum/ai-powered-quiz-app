import {Notification} from '@hilla/react-components/Notification.js';
import {TextField} from '@hilla/react-components/TextField.js';
import {HelloWorldService} from 'Frontend/generated/endpoints.js';
import {useState} from 'react';
import {Button} from "@/components/ui/button";

export default function HelloWorldView() {
    const [name, setName] = useState('');

    return (
        <>
            <section className="flex items-baseline custom-stuff">
                <TextField className="p-4"
                           label="Your name"
                           onValueChanged={(e) => {
                               setName(e.detail.value);
                           }}
                />
                <Button className="bg-green-500 text-white font-bold"
                        onClick={async () => {
                            const serverResponse = await HelloWorldService.sayHello(name);
                            Notification.show(serverResponse);
                        }}
                >
                    Say hello
                </Button>
            </section>

            <TextField className="p-4"
                       label="Your name"
                       onValueChanged={(e) => {
                           setName(e.detail.value);
                       }}
            />
        </>
    );
}
