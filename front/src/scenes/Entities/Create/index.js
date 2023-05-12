import React from "react";
import EntityForm from "@root/components/EntityForm";
import Layout from "@root/components/Layout";
import entitiesApi from "@root/store/entities";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const [createEntity, { isLoading: isCreating }] =
    entitiesApi.endpoints.create.useMutation();

  const postProcessing = (result) => {
    return result
      .unwrap()
      .then(() => navigate("/entities"))
      .catch(({ data: error }) => {
        if (error) {
          console.log(error);
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      title: data.get("title"),
      description: data.get("description"),
    };
    console.log(payload);
    postProcessing(createEntity(payload));
  };

  return (
    <Layout>
      <EntityForm handleSubmit={handleSubmit} />
    </Layout>
  );
}
