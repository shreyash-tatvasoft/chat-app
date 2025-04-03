"use client"
import React, { useEffect, useState} from 'react'
import { API_ROUTES, ROUTES } from "@/app/utils/constant";
import { UserData, UserSelectedChatId } from "@/app/utils/types";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/Loader';

const UsersArea : React.FC<UserSelectedChatId> = ({ chatId}) => {

    const { data: session } = useSession();
    const router = useRouter();

    const navToChat = (selectedId : string) => {
        router.push(`${ROUTES.DASHBOARD}?id=${selectedId}`)
    }

    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
      const respose = await fetch(API_ROUTES.GET_ALL_USERS, {
        headers: {
          token: (session?.user as any)?.token,
        },
      });
      const result = await respose.json();

      if (result && result.data && result.data.length > 0) {
        const receivedArray = result.data.map((item: any) => {
          return {
            id: item._id,
            userName: item.username,
            email: item.email,
          };
        });

        setUsers(receivedArray);
        setLoading(false)
      }
    };

    useEffect(() => {
      const tokenValue = (session?.user as any)?.token;
      if (tokenValue) {
        fetchUsers();
      }
    }, [session]);


  return (
    <div>
      <div className="border-b dark:border-b-gray-100 border-b-gray-800">
        <div className="mx-3 my-5 flex justify-between items-center">
          <p className="text-2xl font-bold dark:text-white">Conversations</p>
          <PlusCircleIcon className="dark:text-white h-10 w-10 cursor-pointer" />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="mt-5">
          {users.map((item) => (
            <div
              key={item.id}
              className={`cursor-pointer rounded-2xl ${
                chatId === item.id
                  ? "dark:bg-gray-800 bg-blue-200"
                  : "dark:bg-black bg-gray-100"
              }`}
              onClick={() => navToChat(item.id)}
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
      )}
    </div>
  );
}

export default UsersArea