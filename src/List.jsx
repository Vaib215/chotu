import { Client, Databases } from "appwrite";
import { useState } from "react";
import { Link } from "react-router-dom";

const List = () => {
    const client = new Client();
    const [list, setList] = useState([]);

    client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("64836238b8f9ce66b960");

    useEffect(() => {
        const databases = new Databases(client);
        databases
            .listDocuments("6483628b13491c210a5b", "648365687a7bdb4a5fde")
            .then((res) => {
                const docs = res?.documents
                setList(docs);
            });
    }, []);
    return <pre style="margin-bottom: 0px; margin-top: 0px;"><div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
                <tr>
                    <th></th>
                    <th>Short Link</th>
                    <th>Destination</th>
                </tr>
            </thead>
            <tbody>
                {list.map((link, index)=>{
                    return <tr key={index}>
                        <th>{index+1}</th>
                        <td>
                            <Link to={'/'+link.slug}>
                                {link.slug}
                            </Link>
                        </td>
                        <td>
                            <a href={link.url}>
                                {link.url}
                            </a>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
    </pre>
}