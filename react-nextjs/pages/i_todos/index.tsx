import Layout from "../../components/Layout";
import {Todo, TodoHttp} from "../../servicios/http/todo_http";
import {useEffect, useState} from "react";

export default function () {
    const [todos, setTodos] = useState<Todo[]>([] as Todo[]);
    useEffect(
        () => {
            consultarTodos();
        },
        []
    )

    const consultarTodos = async () => {
        const resultado = await TodoHttp();
        setTodos([
            ...todos,
            ...resultado
        ]);
    }

    return (
        <>
            <Layout title={"To do's"}>
                <h1>To do's</h1>
                {todos.map(
                    (todo, index) => {
                        return (<li key={todo.id}>
                            {todo.id} - {todo.completed} -
                            <a href={'/i_todos/' + todo.id}>
                                {todo.title}
                            </a>
                        </li>)
                    }
                )}
            </Layout>
        </>
    )
}