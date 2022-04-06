import Layout from "components/Layout";
import ResourceForm from "components/ResourceForm";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'


export default function ResourceCreate() {
  const router = useRouter()

  async function createResource(formData) {
      try {
        await axios.post("/api/resources", formData);
        router.push('/')
      } catch (e) {
        alert(e.message);
      }

    }

  return (
      <Layout>
        <div className="container">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <ResourceForm onFormSubmit={createResource}/>
            </div>
          </div>
        </div>
      </Layout>
  )
}
