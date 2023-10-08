import { Client, Databases } from "appwrite";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const List = () => {
    const client = new Client();
    const [list, setList] = useState([]);

    client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("64836238b8f9ce66b960");

    const getItems = () => {
        const databases = new Databases(client);
        databases
            .listDocuments("6483628b13491c210a5b", "648365687a7bdb4a5fde")
            .then((res) => {
                const docs = res?.documents
                setList(docs);
            });
    }

    useEffect(() => {
        getItems();
    }, []);

    const deleteChotu = async (id) => {
        const databases = new Databases(client);
        databases.deleteDocument("6483628b13491c210a5b", "648365687a7bdb4a5fde", id)
            .then(() => {
                getItems();
            })
    }

    return <pre className="w-screen">
        <table className="table whitespace-pre-wrap relative">
            <thead className="sticky top-0 text-primary-content bg-primary z-20">
                <tr>
                    <th></th>
                    <th>Short Link</th>
                    <th>Destination</th>
                </tr>
            </thead>
            <tbody>
                {list.map((link, index) => {
                    return <tr key={index}>
                        <td>
                            <button onClick={() => deleteChotu(link.$id)} className="w-6 p-1 rounded-full hover:bg-red-400 aspect-square"><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/aa2222/filled-trash.png" alt="filled-trash" /></button>
                        </td>
                        <td>
                            <Link className="link" to={'/' + link.slug}>
                                {link.slug}
                            </Link>
                        </td>
                        <td>
                            <a className="link" href={link.url}>
                                {link.url}
                            </a>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </pre>
}

export default List;