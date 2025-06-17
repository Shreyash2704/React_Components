import React, { useEffect, useState } from "react";
import { FaCross } from 'react-icons/fa';
import { Edit,Cross, X, Check, Delete, Trash } from "lucide-react";
import { CgRemove } from "react-icons/cg";

type Props = {};

type todoType = {
    id: number;
    title: string;
    status: boolean;
    edit:boolean
};

const TodoList = (props: Props) => {
    const [text, settext] = useState("");
    const [todoListData, settodoListData] = useState<todoType[]>([]);
    const [edittext, setedittext] = useState("");
    // const [isEdit, setisEdit] = useState(false)

    const AddItems = () => {
        if (text === "") return;
        const id = todoListData.length;
        const title = text;
        const status = false;

        settodoListData((prev) => [
            ...prev,
            {
                id,
                title,
                status,
                edit:false
            },
        ]);
        settext("");
    };

    const removeItem = (id: number) => {
        settodoListData((prev: todoType[]) => {
            let arr: todoType[] = [];
            prev.map((ele) => {
                if (ele.id !== id) {
                    arr.push(ele);
                }
            });
            return arr;
        });
    };
    const changeStatus = (id:number,status:boolean) =>{
        settodoListData((prev: todoType[]) => {
            let arr: todoType[] = [];
            prev.map((ele) => {
                if (ele.id === id) {
                    ele.status = status
                }
                arr.push(ele)
            });
            
            return arr;
        });
    }

    const editTask = (id:number,text:string) =>{
        console.log("editTask",text)
         settodoListData((prev: todoType[]) => {
            let arr: todoType[] = [];
            prev.map((ele) => {
                if (ele.id === id) {
                    ele.title = text
                }
                arr.push(ele)
            });
            
            return arr;
        });
        changeEditStatus(id,false)
        setedittext("")
    }
    const changeEditStatus = (id:number,val:boolean) =>{
        //  let value;
         todoListData.map(ele =>{
            if(ele.id == id){
                setedittext(ele.title)
            }
         })
         settodoListData((prev: todoType[]) => {
            let arr: todoType[] = [];
            prev.map((ele) => {
                if (ele.id === id) {
                    ele.edit = val
                }
                arr.push(ele)
            });
            
            return arr;
        });
    }

    const handleChange = (e:any) =>{
        if (e.key === 'Enter') {
            AddItems()
        }
    }
    useEffect(() => {
      console.log("Updated list",todoListData)
    }, [todoListData])
    

    return (
        <div className="flex max-h-screen h-fit bg-gray-10">
            <div className="flex flex-col flex-nowrap border-none border-gray-500 p-4 rounded-xl max-h-screen h-[90%] w-150 bg-gray-100 m-auto">
                <div className="p-2 flex mt-2 bg-white rounded-2xl">
                    <input
                    type="text"
                    value={text}
                    className="w-[70%] border-none outline-none"
                    onChange={(e) => settext(e.target.value)}
                    onKeyDown={handleChange}
                    placeholder="Add todo list"
                    />
                    <button
                        onClick={AddItems}
                        className="bg-blue-500 text-white font-medium font-normal px-4 py-1 ml-auto rounded"
                    >
                        Add
                    </button>
                </div>
                

                <div className="mt-2 p-2 pb-4 bg-white h-[100%] overflow-auto">
                    <div className="flex flex-col gap-y-3">
                        {todoListData.map((ele) => {
                            return (
                                <div className="flex flex-row ">
                                    {/* <span>{ele.id}</span> */}
                                    {!ele.edit ? (
                                        <>
                                         <input type="checkbox" checked={ele.status} onChange={(e) => changeStatus(ele.id,e.target.checked)} />
                                    
                                        <div className="mx-2 flex-1 min-w-0 break-words border-b-1 border-gray-200">{ele.title}</div>
                                        <Edit className="ml-auto w-4 h-4"  onClick={() => changeEditStatus(ele.id,true)}/>
                                        <Trash className="w-4 h-4 ml-2 text-red-500" onClick={() => removeItem(ele.id)}  />
                                        
                                        </>
                                    ) : (
                                        <>
                                        <input type="text" className="flex-1 border-b-1 border-gray-200 outline-none" placeholder="edit item" value={edittext} onChange={(e) =>setedittext(e.target.value)}/>
                                        <Check className="w-4 h-4 ml-auto p-0.5 bg-green-500 rounded-full text-white" onClick={() => editTask(ele.id,edittext)}/>
                                        <X className="w-4 h-4 ml-2 text-red-500" onClick={() => changeEditStatus(ele.id,false)}/>
                                        </>
                                        
                                    )} 
                                   
                                    

                                    
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
