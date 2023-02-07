import Layout from "../../components/Layout";
import {GetStaticProps} from "next";
import {Todo, TodoHttp} from "../../servicios/http/todo_http";
import {useRouter} from "next/router";

interface ParametrosTodo {
    error?:string,
    todo?: Todo,
}

export default function (params: ParametrosTodo) {
    const router = useRouter();
    const {idTodo, nombre} = router.query;
    console.log('idTodo', idTodo);
    console.log('nombre', nombre);
    return (
        <>
            <Layout title={"To do's hijo"}>
                <h1>To do's hijo {params?.todo?.title}</h1>
            </Layout>
        </>
    )
}

export const getStaticPaths = async () => {
//     Consulta de los ids validos
    const paths = [
        {params: {idTodo: '1'}},
        {params: {idTodo: '2'}},
        {params: {idTodo: '4'}},
    ];
    return {paths, fallback: false};
}

export const getStaticProps: GetStaticProps = async (
    {params}
) => {
   try {
       const id = params?.idTodo as string;
       const resultado = await TodoHttp(id);
       return {props: {todo: resultado}};
   }catch (err: any){
       return {props: {error: err.message}};
   }
}