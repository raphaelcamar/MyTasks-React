import AccordionCard from "../../../components/AccordionCard/AccordionCard";
import styles from './tasks.module.scss'
import Input from "../../../components/Input/Input";
import Layout from "../../../Layout/Layout";
import { useEffect, useState } from "react";
import useFetchUser from "../../../customHooks/useFetchUser";
import { useProfile } from "../../../contexts/UserContext";
import Loader from 'react-loader-spinner';


  export default function Tasks(){
    
    const { fetchGet, loading } = useFetchUser();
    const { profile } = useProfile();
    const [data, setData] = useState([]);

    async function get(){
      const [data, err] = await fetchGet('/tasks', {
        idUser: 1
      });
      
      setData(data);
    }

    function showAccordions(){
      return data.map((task) => {
        return (
          <div className={styles.accordion} key={task.id}>
            <AccordionCard task={task} />
          </div>
        )
      })
    }

    useEffect(() =>{
      get();
    }, [])

  return (
    <Layout>
      <Input label="Filtrar" inputprops={{}} onChange={() =>{}} />
      <span>Minhas tarefas</span>
      {loading ? (
        <Loader type='ThreeDots' color={'#2680eb'} height={50}
          width={50}/>)
      : (
        <>
        <div>adiuhasdiudsa</div>
          {showAccordions()}
        </>
      )}
    </Layout>
  )
}