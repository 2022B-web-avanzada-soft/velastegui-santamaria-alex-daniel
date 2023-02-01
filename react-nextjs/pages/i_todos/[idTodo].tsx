import Layout from "../../components/Layout";
import {GetStaticProps} from "next";
import {TodoHttp} from "../../servicios/http/todo_http";

export default function () {

    return (
        <>
            <Layout title={"To do's hijo"}>
                <h1>To do's hijo</h1>
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
       return {props: {resultado}};
   }catch (err: any){
       return {props: {error: err.message}};
   }
}