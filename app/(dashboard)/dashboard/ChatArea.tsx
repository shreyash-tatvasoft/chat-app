import React from 'react'

import { Cog6ToothIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { SelectedChatInfo } from '@/app/utils/types';

const ChatArea : React.FC<SelectedChatInfo> = ( {selectedChat} ) => {
  return (
    <div>
      <div className="border-b dark:border-b-gray-100 border-b-gray-800">
        <div className="mx-3 my-5 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 capitalize flex items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-800 text-white font-bold text-lg">
              {selectedChat.userName.charAt(0)}
            </div>
            <p className="text-2xl capitalize font-bold dark:text-white">
              {selectedChat.id}
            </p>
          </div>
          <Cog6ToothIcon className="dark:text-white h-10 w-10 cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-col min-h-[calc(100vh-162px)] dark:bg-gray-800 bg-blue-100">
        {/* Chat Area - Ensures empty space when no messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col justify-end scrollbar-hide"></div>

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
  );
}

export default ChatArea