"use client"
import { API_ROUTES } from "@/app/utils/constant";
import { UserData } from "@/app/utils/types";
import { PlusCircleIcon, Cog6ToothIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function Home() {

  const { data : session} = useSession()

  const [users, setUsers] = useState<UserData[]>([])
  const [selectedChat, setSelectedChat] = useState<UserData>({
    id: "",
    userName: "",
    email: "",
  });

    const fetchUsers = async () => {
      const respose =  await fetch(API_ROUTES.GET_ALL_USERS, { headers : {
        token : (session?.user as any)?.token
      }}) 
      const result = await respose.json()

      if (result && result.data && result.data.length > 0) {
        const receivedArray = result.data.map((item: any) => {
          return {
            id: item._id,
            userName: item.username,
            email: item.email,
          };
        });

        setUsers(receivedArray)
      }
    }
    
    useEffect(() => {
      const tokenValue = (session?.user as any)?.token
      if(tokenValue) {
         fetchUsers()
      }
      
    },[session])

  return (
    <div className="bg-gray-100 dark:bg-black min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-5 grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <div className="border-b dark:border-b-gray-100 border-b-gray-800">
            <div className="mx-3 my-5 flex justify-between items-center">
              <p className="text-2xl font-bold dark:text-white">
                Conversations
              </p>
              <PlusCircleIcon className="dark:text-white h-10 w-10 cursor-pointer" />
            </div>
          </div>
          <div>
            {users.map((item) => (
              <div
                key={item.id}
                className={`cursor-pointer rounded-2xl ${
                  selectedChat.id === item.id
                    ? "dark:bg-gray-800 bg-blue-200"
                    : "dark:bg-black bg-gray-100"
                }`}
                onClick={() => setSelectedChat(item)}
              >
                <div className="p-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 capitalize flex items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-800 text-white font-bold text-lg">
                      {item.userName.charAt(0)}
                    </div>
                    <p className="text-2xl font-bold dark:text-white capitalize">
                      {item.userName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedChat.id !== "" && (
          <div className="col-span-8">
            <div className="border-b dark:border-b-gray-100 border-b-gray-800">
              <div className="mx-3 my-5 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 capitalize flex items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-800 text-white font-bold text-lg">
                    {selectedChat.userName.charAt(0)}
                  </div>
                  <p className="text-2xl capitalize font-bold dark:text-white">
                    {selectedChat.userName}
                  </p>
                </div>
                <Cog6ToothIcon className="dark:text-white h-10 w-10 cursor-pointer" />
              </div>
            </div>

            <div className="flex flex-col min-h-[calc(100vh-162px)] dark:bg-gray-800 bg-blue-100">
              {/* Chat Area - Ensures empty space when no messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col justify-end scrollbar-hide">
                
              </div>

              {/* Message Input Box - Always at Bottom */}
              <div className="flex rounded-2xl items-center gap-2 p-4 m-4 dark:bg-gray-900 bg-blue-200">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 font-bold dark:bg-gray-800 bg-white dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <PaperAirplaneIcon className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg h-12 w-12" />
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
