import React from "react";
import EntityForm from "@root/components/EntityForm";
import Layout from "@root/components/Layout";
import { useParams } from "react-router-dom";
import entitiesApi from "@root/store/entities";
import { useNavigate } from "react-router-dom";

export default function Edit() {
  const navigate = useNavigate();
  const { entityId } = useParams();

  const entity = entitiesApi.endpoints.read.useQuery(entityId);
  const [updateEntity, { isLoading: isUpdating }] =
    entitiesApi.endpoints.update.useMutation();

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
      id: entityId,
      title: data.get("title"),
      description: data.get("description"),
    };
    console.log(payload);
    postProcessing(updateEntity(payload));
  };

  return (
    <Layout>
      <EntityForm entity={entity.data} handleSubmit={handleSubmit} />
    </Layout>
  );
}
