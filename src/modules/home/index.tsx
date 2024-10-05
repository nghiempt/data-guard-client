"use client"

import {
  LogIn,
  Rss,
  GitCompare,
  Palette,
  Lollipop,
  BookA,
  BriefcaseBusiness,
  Shell,
  PersonStanding,
  Camera,
  FolderKanban,
  ShoppingCart,
  Bolt,
  Handshake
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import LabelModal from "./label"


export default function HomeClient() {

  const [selectedTab, setSelectedTab] = useState(1)
  const [selectedApp, setSelectedApp] = useState(1)
  const [listApp, setListApp] = useState([] as any)
  const [listLabel, setListLabel] = useState([] as any)

  const tabs = [
    {
      id: 1,
      name: 'Art & Design',
      icon: <Palette className="size-5" />
    },
    {
      id: 2,
      name: 'Beauty',
      icon: <Lollipop className="size-5" />
    },
    {
      id: 3,
      name: 'Books & Reference',
      icon: <BookA className="size-5" />
    },
    {
      id: 4,
      name: 'Business',
      icon: <BriefcaseBusiness className="size-5" />
    },
    {
      id: 5,
      name: 'Communication',
      icon: <Handshake className="size-5" />
    },
    {
      id: 6,
      name: 'Lifestyle',
      icon: <Shell className="size-5" />
    },
    {
      id: 7,
      name: 'Personalization',
      icon: <PersonStanding className="size-5" />
    },
    {
      id: 8,
      name: 'Photography',
      icon: <Camera className="size-5" />
    },
    {
      id: 9,
      name: 'Productivity',
      icon: <FolderKanban className="size-5" />
    },
    {
      id: 10,
      name: 'Shopping',
      icon: <ShoppingCart className="size-5" />
    },
    {
      id: 11,
      name: 'Social',
      icon: <Rss className="size-5" />
    },
    {
      id: 12,
      name: 'Tools',
      icon: <Bolt className="size-5" />
    },
  ]

  const accounts = [
    {
      account_id: 1,
      account_email: "sonhx@gmail.com",
      account_name: "SonHX",
      account_role: "PhD",
      account_age: 30,
      account_major: "CS",
      account_interest: "IA",
    },
    {
      account_id: 2,
      account_email: "nhilt@gmail.com",
      account_name: "NhiLT",
      account_role: "Student",
      account_age: 21,
      account_major: "SE",
      account_interest: ".NET",
    },
    {
      account_id: 3,
      account_email: "nghiempt@gmail.com",
      account_name: "NghiemPT",
      account_role: "Student",
      account_age: 22,
      account_major: "SE",
      account_interest: "AI",
    },
    {
      account_id: 4,
      account_email: "quanvh@gmail.com",
      account_name: "QuanVH",
      account_role: "Student",
      account_age: 22,
      account_major: "SE",
      account_interest: ".NET",
    },
    {
      account_id: 5,
      account_email: "hieunc@gmail.com",
      account_name: "HieuNC",
      account_role: "Student",
      account_age: 20,
      account_major: "SE",
      account_interest: "AI",
    },
    {
      account_id: 6,
      account_email: "minhnln@gmail.com",
      account_name: "MinhNLN",
      account_role: "Student",
      account_age: 20,
      account_major: "SE",
      account_interest: "AI",
    },
    {
      account_id: 7,
      account_email: "luantc@gmail.com",
      account_name: "LuanTC",
      account_role: "Student",
      account_age: 22,
      account_major: "SE",
      account_interest: "IA",
    },
  ];

  const renderListAppByCategoryID = (listApp: any, categoryID: any) => {
    let tmp: any = []
    listApp?.forEach((item: any) => {
      if (item?.category_id === categoryID) {
        tmp.push(item)
      }
    })
    return tmp
  }

  const getCurrentApp = (listApp: any, appID: any) => {
    let app: any = null
    listApp?.forEach((item: any) => {
      if (item?.app_id === appID) {
        app = item
      }
    })
    return app
  }

  const getCurrentLabel = (listLabel: any, appID: any) => {
    let label: any = null
    listLabel?.forEach((item: any) => {
      if (item?.app_id === appID) {
        label = item
      }
    })
    return label
  }

  const renderAuthorLabel = (app: any, labels: any) => {
    let account: any = []
    labels?.forEach((item: any) => {
      if (app?.app_id === item?.app_id) {
        account.push(item?.account_id)
      }
    })
    return (
      account?.length === 0
        ?
        null
        :
        <div className="w-full flex justify-center items-center gap-2">
          {
            account?.map((item: any, index: any) => {
              return (
                <span className={`${checkLabeledAuthor(app, listLabel)}`} key={index}>
                  {accounts?.find((acc: any) => acc?.account_id?.toString() === item?.toString())?.account_name}
                </span>
              )
            })
          }
        </div>
    )
  }

  const checkLabeled = (app: any, labels: any) => {
    let count = 0
    labels?.forEach((item: any) => {
      if (app?.app_id === item?.app_id) {
        count++
      }
    })
    if (count === 2) {
      return 'border border-blue-600 bg-blue-600 hover:bg-blue-600 hover:text-white hover:opacity-80 text-white'
    } else if (count === 1) {
      return 'border border-blue-600 bg-blue-200 hover:bg-blue-200 hover:text-gray-700 hover:opacity-80 text-gray-700'
    } else {
      return 'border border-gray-500 bg-white hover:bg-white hover:text-gray-700 hover:opacity-80 text-gray-700'
    }
  }

  const checkLabeledAuthor = (app: any, labels: any) => {
    let count = 0
    labels?.forEach((item: any) => {
      if (app?.app_id === item?.app_id) {
        count++
      }
    })
    if (count === 2) {
      return '!text-blue-700 text-[10px] bg-gray-100 px-2 rounded-sm'
    } else if (count === 1) {
      return '!text-gray-700 text-[10px] bg-gray-100 px-2 rounded-sm'
    } else {
      return '!text-blue-700 text-[10px] bg-gray-100 px-2 rounded-sm'
    }
  }

  const init = async () => {
    fetch("https://n8n.khiemfle.com/webhook/61fa61f9-73a4-45e3-8b2f-b1b1f8e0ce1e?type=app")
      .then((response) => response.json())
      .then((result) => setListApp(result))
      .catch((error) => console.error(error));

    fetch("https://n8n.khiemfle.com/webhook/61fa61f9-73a4-45e3-8b2f-b1b1f8e0ce1e?type=label")
      .then((response) => response.json())
      .then((result) => setListLabel(result))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <GitCompare className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          {
            tabs?.map((item: any, index: any) => {
              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-lg ${selectedTab === item?.id ? 'bg-primary text-white hover:bg-primary hover:text-white' : ''}`}
                        aria-label={item?.name}
                        onClick={() => setSelectedTab(item?.id)}
                      >
                        {item?.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      {item?.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })
          }
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Labeling Platform</h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            Login
            <LogIn className="size-3.5" />
          </Button>
        </header>
        {
          listApp?.length === 0
            ?
            <main className="grid overflow-auto grid-cols-1">
              <div className="w-full h-screen flex justify-center items-center">
                <Image src={'/loading.gif'} alt="loading" width={100} height={100} />
              </div>
            </main>
            :
            <main className="grid overflow-auto p-2 md:p-4 lg:p-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-2 lg:gap-4">
              {
                renderListAppByCategoryID(listApp, selectedTab)?.map((item: any, index: any) => {
                  return (
                    <Dialog key={index}>
                      <DialogTrigger>
                        <Button
                          onClick={() => setSelectedApp(item?.app_id)}
                          className={`w-full text-sm flex flex-col py-14 gap-4 ${checkLabeled(item, listLabel)}`}
                        >
                          <div className="w-full flex justify-center items-center gap-3">
                            <Avatar className="w-8 h-8 border border-white">
                              <AvatarImage src={item?.app_thumbnail} alt="@shadcn" />
                              <AvatarFallback>T</AvatarFallback>
                            </Avatar>
                            <span>{item?.app_name?.slice(0, 16)}</span>
                          </div>
                          {
                            renderAuthorLabel(item, listLabel)
                          }
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[calc(90dvh)] max-w-screen-xl overflow-y-auto">
                        <LabelModal app={getCurrentApp(listApp, selectedApp)} label={getCurrentLabel(listLabel, selectedApp)} />
                      </DialogContent>
                    </Dialog>
                  )
                })
              }
            </main>
        }
      </div>
    </div>
  )
}
