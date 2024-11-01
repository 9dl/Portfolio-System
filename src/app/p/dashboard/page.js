"use client"
import {Autocomplete, AutocompleteItem, Button, Input} from "@nextui-org/react";
import {useState} from "react";
import {excludedKeys, fields} from "@/helpers/fields";

export default function Page() {
    const [value, setValue] = useState("username");
    const [pID, setPID] = useState();
    const [sKey, setSKey] = useState();
    const [newV, setNewV] = useState();
    const [response, setResponse] = useState("Response: ");

    const animals = Object.entries(fields)
        .filter(([key]) => !excludedKeys.includes(key))
        .map(([label, description]) => ({
            label,
            value: label.toLowerCase().replace(/\s+/g, ''),
            description,
        }));

    const selectedAnimal = animals.find((animal) => animal.value === value);

    async function update() {
        const profileID = pID;
        const secretKey = sKey;
        const field = value;
        const newValue = newV;
        const resp = await fetch(`/api/updateProfile?profileID=${profileID}&secretKey=${secretKey}&newValue=${newValue}&field=${field}`)
        setResponse(resp.statusText)
    }

    return (
        <>
            <div className={`flex flex-col  min-h-screen min-w-full justify-center p-12`}>
                <div className={`flex flex-row gap-3`}>
                    <Input
                        label="Secret Key"
                        placeholder="Enter your Secret Key"
                        value={sKey}
                        onValueChange={setSKey}
                    />
                    <Input
                        label="Profile ID"
                        placeholder="Enter your Profile ID"
                        value={pID}
                        onValueChange={setPID}
                    />
                    <Autocomplete
                        defaultItems={animals}
                        label="What do you want to change:"
                        placeholder="Select an option"
                        description={selectedAnimal ? selectedAnimal.description : ""}
                        selectedKey={value}
                        onSelectionChange={setValue}
                    >
                        {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}
                    </Autocomplete>
                    <Input
                        label="New Value"
                        placeholder="Enter new Value for the Field"
                        value={newV}
                        onValueChange={setNewV}
                    />
                </div>
                <div className={`flex flex-row gap-3 items-center`}>
                    <Button color={"danger"} variant={"shadow"} fullWidth onClick={() => update()}>
                        Execute
                    </Button>
                    <p className={`bg-gray-700 p-3 rounded w-full`}>{response}</p>
                </div>
            </div>
        </>
    )
}