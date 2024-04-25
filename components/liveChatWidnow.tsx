import { Button } from "antd";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Input } from "antd";
import { useBroadcastEvent, useEventListener } from "@/liveblocks.config";
import { FormEvent, useEffect } from "react";

export default function LiveChatWindow({
  message,
  setMessage,
  updateMyPresence,
  others,
}: any) {
  return (
    <Card className="fixed bottom-0 left-0 w-[400px] h-[500px] max-w-lg flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button className="rounded-full" type="primary">
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <div className="space-y-1">
              <h2 className="text-lg font-bold leading-none">
                Conversation Title
              </h2>
              <p className="text-sm leading-none">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="rounded-full" type="primary">
              <MinusIcon className="w-4 h-4" />
            </Button>
            <Button className="rounded-full" type="primary">
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <div className="grid gap-4 px-4">
          {others.map(({ connectionId, presence }: any) =>
            presence.message ? (
              <div key={connectionId} className="flex items-center space-x-4">
                {/* ///Sender name//// */}
                <div className="flex flex-col space-y-1">
                  <p className="text-xs font-medium tracking-wide">Now</p>
                  <p className="text-sm font-bold">You</p>
                </div>

                {/* ///Sender message//// */}
                <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4">
                  <p>{presence.message}</p>
                </div>
              </div>
            ) : null
          )}
        </div>
      </CardContent>
      <CardFooter>
        <form className="flex w-full gap-4">
          <Input
            id="in-1"
            name="msg"
            className="flex-1"
            // value={message}
            // onChange={(e) => updateMyPresence({ message: e.target.value })}
            placeholder="enter message"
          />
          <Button htmlType="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}

function ChevronLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function MinusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
