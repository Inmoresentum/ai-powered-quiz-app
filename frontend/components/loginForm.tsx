import {Lock, User2} from "lucide-react";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useState} from "react";
import {UserEndpoint} from "@/generated/endpoints";
import {useAuth} from "@/util/auth";
import {useNavigate} from "react-router-dom";

const loginSchema = z.object({
    username: z.string().min(3, {message: 'Username must be at least 3 characters long'}).max(20,
        {message: 'Username cannot be longer than 20 characters'}),
    password: z.string().min(3, {message: 'Password must be at least 3 characters long'}),
});

type loginSchemaType = z.infer<typeof loginSchema>;
export default function LoginForm() {
    const {register, handleSubmit, formState: {errors}} = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
    });

    const {login} = useAuth();
    const [notSuccessfulLoginMessage, setNotSuccessfulLoginMessage] = useState<string>("");
    const navigate = useNavigate();
    const onSubmit = async (data: loginSchemaType) => {
        if (await UserEndpoint.isNotAccountVerified(data.username)) {
            setNotSuccessfulLoginMessage("Account is not verified. Please check your email")
            return;
        }

        const {error} = await login(data.username, data.password);
        if (!error) {
            navigate("/");
        }
        setNotSuccessfulLoginMessage("Wrong Username or Password as you can see");
    };

    return (
        <>
            <div className="text-center text-m font-bold text-red-800 m-2">
                {notSuccessfulLoginMessage}
            </div>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative mb-6">
                    <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-600">
                      <User2 size={24}/>
                    </span>
                        <input
                            {...register('username', {required: true})}
                            type="text"
                            id="text"
                            className={`w-full pl-10 px-6 py-3 bg-opacity-20 bg-white
                                     bg-clip-padding backdrop-filter backdrop-blur-md placeholder-gray-500
                                      focus:placeholder-gray-300 focus:outline-none focus:border-blue-500
                                       rounded-3xl text-gray-800 text-base shadow-md ${errors.username && "border-red-600"}`}
                            placeholder="Enter your username"
                        />
                        {errors.username && (
                            <span className="text-black text-m text-center">{errors.username.message}</span>
                        )}
                    </div>
                </div>
                <div className="relative mb-6">
                    <label htmlFor="password" className="text-lg px-4 font-medium mb-2 text-gray-800">
                        Password
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-600">
                          <Lock size={24}/>
                        </span>
                        <input
                            {...register('password', {required: true})}
                            type="password"
                            id="password"
                            className={`w-full pl-10 px-6 py-3 bg-opacity-20 bg-white
                                     bg-clip-padding backdrop-filter backdrop-blur-md placeholder-gray-500
                                      focus:placeholder-gray-300 focus:outline-none focus:border-blue-500
                                       rounded-3xl text-gray-800 text-base shadow-md ${errors.password && "border-red-600"}`}
                            placeholder="Enter Your password"
                        />
                        {errors.password && (
                            <span className="text-black text-m text-center">{errors.password.message}</span>
                        )}
                    </div>
                </div>

                <div className="flex justify-end items-center mb-6">
                    <a href={"/auth/forgot/password"}
                       className="text-gray-200 hover:text-black hover:underline
                                   hover:translate-y-[-2px] transition-colors
                                    duration-300 ease-linear tooltip">
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full text-white py-2 px-4 rounded-full transition-colors duration-300
                             ease-in-out bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500
                              hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500
                               focus:from-blue-400 focus:via-indigo-500 focus:to-purple-500 login-animate-gradient-x"
                >
                    Log In
                </button>

                <span className="flex justify-between text-purple-700 font-medium m-2">
                            New here And No Account?
                                <a
                                    href={"/auth/register/"}
                                    className="text-gray-200 hover:text-black hover:underline
                                     hover:translate-y-[-2px] transition-colors duration-300
                                      ease-linear ml-2 tooltip"
                                    data-tooltip="Click to register an account with us">
                                    Register account
                                </a>
                </span>
            </form>
        </>
    );
}