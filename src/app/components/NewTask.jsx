'use client';

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const TodoButton = ({id, completed}) => {
    const router = useRouter();
    const deleteHandler = async (id) => {
        try {
            const res = await fetch(`/api/auth/task/${id}`, {
                method : "DELETE"
            });
            const data = await res.json();
            if(!data.success) return toast.error(data.message);
            toast.success(data.message);
            router.refresh();
        } catch (error) {
            return toast.error(error);
        }
    };

    const updateHandler = async (id) => {
        try {
            const res = await fetch(`/api/auth/task/${id}`, {
                method : "PUT"
            });
            const data = await res.json();
            if(!data.success) return toast.error(data.message);
            toast.success(data.message);
            router.refresh();
        } catch (error) {
            return toast.error(error);
        }
    };
    return (
    <>
        <input type="checkbox" checked={completed} onChange={()=>updateHandler(id)} />
        <button className='btn' onClick={() => deleteHandler(id)}>
            Delete
        </button>
    </>)
}
