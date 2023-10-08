import { Client, Databases, ID, Query } from "appwrite";
import { useRef } from "react";

function App() {
  const urlRef = useRef(null);
  const slugRef = useRef(null);
  const shortRef = useRef(null);
  const client = new Client();

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("64836238b8f9ce66b960");

  const createCustomLink = async (e) => {
    e.preventDefault();
    const databases = new Databases(client);
    databases
      .listDocuments("6483628b13491c210a5b", "648365687a7bdb4a5fde", [
        Query.equal("slug", slugRef.current.value),
      ])
      .then((res) => {
        if (res.documents.length) {
          databases.updateDocument("6483628b13491c210a5b",
          "648365687a7bdb4a5fde", res.documents[0].$id, {
            url: urlRef.current.value
          }).then((res)=>{
            shortRef.current.value = location.href + slugRef.current.value;
            urlRef.current.value = "";
            slugRef.current.value = "";
          })
          return;
        }
      })
      .then(() =>
        databases
          .createDocument(
            "6483628b13491c210a5b",
            "648365687a7bdb4a5fde",
            ID.unique(),
            {
              url: urlRef.current.value,
              slug: slugRef.current.value,
            }
          )
          .then((res) => {
            shortRef.current.value = location.href + slugRef.current.value;
            urlRef.current.value = "";
            slugRef.current.value = "";
          })
      );
  };

  const copyToClipboard = (e) => {
    e.preventDefault()
    if (shortRef.current.value) {
      navigator.clipboard.writeText(shortRef.current.value);
    }
  };

  return (
    <div className="App min-h-screen flex flex-col md:flex-row items-center text-center md:text-left p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold absolute top-4 mx-auto">chotu</h1>
      <p className="py-6 text-6xl font-bold my-auto">
        Your own custom link shortner
      </p>
      <form className="space-y-4 w-full max-w-xl" onSubmit={createCustomLink}>
        <input
          required
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter your link here..."
          ref={urlRef}
        />
        <div className="flex w-full">
          <input
            required
            type="text"
            className="input input-bordered flex-1 rounded-r-none"
            placeholder="Enter custom keyword..."
            ref={slugRef}
          />
          <button className="btn btn-primary rounded-l-none">Short Link</button>
        </div>
        <div className="flex w-full">
          <input
            type="text"
            className="input-disabled input flex-1 rounded-r-none"
            placeholder="Shortened Link"
            ref={shortRef}
            disabled
          />
          <button className="btn btn-outline ar-1 rounded-l-none">
            <img
              src="https://img.icons8.com/material-rounded/ffffff/24/copy.png"
              alt="copy"
              onClick={copyToClipboard}
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
