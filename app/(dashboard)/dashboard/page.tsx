import UsersArea from "./UsersArea";
import ChatArea from "./ChatArea";


export default async function Home({
  searchParams,
} : {
  searchParams : { id? : string}
}) {

  const { id } = await searchParams

  const chatId = id ? id : ""
  const tempChat = {
    id:  chatId,
    userName: "Test User",
    email: "test@yopmail.comn",
  };

  return (
    <div className="bg-gray-100 dark:bg-black min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-5 grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <UsersArea chatId={chatId} />
        </div>

        <div className="col-span-8">
          {chatId !== "" && <ChatArea selectedChat={tempChat} />}
        </div>
      </div>
    </div>
  );
}
