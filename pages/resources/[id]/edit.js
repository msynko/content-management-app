import Layout from "components/Layout";
import ResourceForm
    from "components/ResourceForm";
import axios from "axios";
import { useRouter } from 'next/router'

const ResourceEdit = ({ resource }) => {
  const router = useRouter()
     async function updateResource(formData) {
        try {
            await axios.patch("/api/resources", formData);
          alert("Data has been updated!")
          router.push(`/resources/${resource.id}`)
          } catch (e) {
            alert("Data has NOT been updated!");
          }
    }
    return (
      <Layout>
            <ResourceForm
                initialData={resource}
                onFormSubmit={updateResource} />
      </Layout>
    )
  }

  export async function getServerSideProps({params}) {
    const resData = await fetch(`${process.env.API_URL}/resources/${params.id}`);
    const data = await resData.json();
  
    return {
        props: {
            resource: data
        }
    }
}

export default ResourceEdit;
