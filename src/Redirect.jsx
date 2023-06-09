import { Client, Databases, Query } from "appwrite";
import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Redirect = () => {
  const { slug } = useParams();
  const client = new Client();

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("64836238b8f9ce66b960");

  const navigate = useNavigate();
  useEffect(() => {
    console.log(slug);
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
        location.href = url;
      });
  }, []);
  return <div>Redirecting you to your destination...</div>;
};

export default Redirect;
