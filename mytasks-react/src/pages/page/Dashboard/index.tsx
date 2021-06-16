import { useTasks } from "../../../contexts/TasksContext"
import Layout from "../../../Layout/Layout";

export default function Dashboard({Component, pageProps}){

  console.log(Component, pageProps)

  const {} = useTasks();
  return (
    <Layout>
    <p>Meus dashboards</p>
    </Layout>
  )
}