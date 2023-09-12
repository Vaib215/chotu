import { Client, Databases, Query } from "appwrite";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Unshort = () => {
    const { slug } = useParams();
    const client = new Client();
    const [unshort, setUnshort] = useState("");

    client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("64836238b8f9ce66b960");

    useEffect(() => {
        const databases = new Databases(client);
        databases
            .listDocuments("6483628b13491c210a5b", "648365687a7bdb4a5fde", [
                Query.equal("slug", slug),
            ])
            .then((res) => {
                const url = res?.documents[0]?.url;
                if (!url) {
                    alert("Invalid URL");
                    navigate("/");
                    return
                }
                setUnshort(url);
            });
    }, []);
    return <div>
        <div className="flex w-full">
            <input
                type="text"
                className="input-disabled input flex-1 rounded-r-none"
                placeholder="Unshortened Link"
                value={unshort}
                disabled
            />
        </div>
    </div>
};

export default Unshort;
