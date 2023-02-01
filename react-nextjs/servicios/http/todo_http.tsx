export interface Todo{
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export async function TodoHttp(id?: string): Promise<Todo[]> {
    const url = `https://jsonplaceholder.typicode.com/todos ${id ? '/' + id : ''}`;
    const respuesta = await fetch(url);
    return (await respuesta.json()) as Todo[];
}