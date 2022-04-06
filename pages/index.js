
import Navbar from "components/Navbar";
import ResourceHighlight from "components/ResourceHighlight";
import Newsletter from "components/Newsletter";
import ResourceList from "components/ResourceList";
import Footer from "components/Footer";
import Layout from "components/Layout";
import { useEffect } from "react";

export default function Home({ resources }) {

  return (
      <Layout>
        <ResourceHighlight
        resources={resources}
      />
        <Newsletter />
        <ResourceList
        resources={resources.slice(0,2)}
      />
        <Footer />
      </Layout>
  )
}

export async function getServerSideProps() {
  const resData = await fetch("http://localhost:3001/api/resources");
  const data = await resData.json();

  return {
    props: {
      resources: data
    }
  }
}
