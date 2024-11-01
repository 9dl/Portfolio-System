"use client"
import {useState} from "react";
import {Button, Divider, Input, Link, snippet, Snippet} from "@nextui-org/react";
import {fields} from "@/helpers/fields";

export default function Hello() {
    const baseUrl = 'https://terrorist.wiki/api/createProfile';
    const queryParams = new URLSearchParams(fields).toString();
    const fullUrl = `${baseUrl}?${queryParams}`;

    const [values, setValues] = useState({});

    const handleChange = (fieldName, fieldValue) => {
        setValues((prevValues) => ({
            ...prevValues,
            [fieldName]: fieldValue,
        }));
    };

    var [url, setUrl] = useState("Click 'GENERATE LINK'");
    const generateLink = () => {
        const queryParams = new URLSearchParams(values).toString();
        const generatedUrl = `${baseUrl}?${queryParams}`;
        setUrl(generatedUrl)
    };

    return (
        <div className={`flex flex-col min-h-screen justify-center items-center w-screen  bg-gray-700`} style={{
            background: "#373B44",
        }}>
            <div className={`flex gap-12 flex-row w-screen justify-center my-3 overflow-hidden`}>
                <div className={`w-unit-8xl`}>
                    <p className={`text-default-500 font-extrabold text-2xl my-2`}>Options</p>
                    <Divider />
                    {Object.keys(fields).map((fieldName) => (
                        <div key={fieldName}>
                            <CustomInput
                                label={fieldName}
                                placeholder={fields[fieldName]}
                                value={values[fieldName] || ""}
                                setValue={(value) => handleChange(fieldName, value)}
                            />
                            <Divider />
                        </div>
                    ))}
                </div>
                <div>
                    <Divider orientation={"vertical"} className={`h-full`} />
                </div>
                <div className={`w-unit-8xl max-w-unit-8xl`}>
                    <p className={`text-default-500 font-extrabold text-2xl text-right my-2`}>Run</p>
                    <Divider/>
                    <div className="text-wrap truncate break-words my-3 bg-slate-500 p-3 rounded">
                        <p>{url}</p>
                    </div>
                    <Button variant={"faded"} color={"default"} className={`w-full my-4 font-extrabold`}
                            onClick={generateLink}>
                        GENERATE LINK
                    </Button>
                    <p className={`text-default-500/60`}><span className={`text-red-800 font-extrabold mx-2`}>*</span>Please send this to an admin: All fields must be completed.</p>
                    <p className={`text-default-500/60`}><span className={`text-red-800 font-extrabold mx-2`}>*</span>Using our service implies acceptance of our <Link href={"/tos"}>Terms of Service.</Link></p>
                </div>
            </div>
        </div>
    );
}

function CustomInput({label, placeholder, value, setValue}) {
    return (
        <Input
            size={"sm"}
            type={"text"}
            label={label}
            fullWidth
            placeholder={placeholder}
            value={value}
            onValueChange={setValue}
            className={`my-1.5`}
            classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                    "shadow-xl",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focused=true]:bg-default-200/50",
                    "dark:group-data-[focused=true]:bg-default-60",
                    "!cursor-text",
                ],
            }}
        />
    );
}