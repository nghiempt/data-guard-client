"use client"

import {
  LogIn,
  Rss,
  GitCompare
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomeClient() {

  const tabs = [
    {
      id: 1,
      name: 'Social Network',
      icon: <Rss className="size-5" />
    },
  ]

  const apps = [
    {
      id: 1,
      name: 'Facebook',
      thumbnail: "https://play-lh.googleusercontent.com/KCMTYuiTrKom4Vyf0G4foetVOwhKWzNbHWumV73IXexAIy5TTgZipL52WTt8ICL-oIo=s96-rw",
      label: [
        {
          id: 1,
          name: "NghiemPT"
        }
      ],
    },
    {
      id: 2,
      name: 'Messenger',
      thumbnail: "https://play-lh.googleusercontent.com/ldcQMpP7OaVmglCF6kGas9cY_K0PsJzSSosx2saw9KF1m3RHaEXpH_9mwBWaYnkmctk=w480-h960-rw",
      label: [
        {
          id: 1,
          name: "NghiemPT"
        },
        {
          id: 2,
          name: "SonHX"
        }
      ],
    },
    {
      id: 3,
      name: 'Zalo',
      thumbnail: "https://play-lh.googleusercontent.com/rFIOt4fDSCgJh_FkHU2qP8YiZUUhfVoKoNfQFbPEM-Wl8zuyuwn7vzkEx_XMh5B6FfO3=w480-h960-rw",
      label: [
        {
          id: 1,
          name: "HieuNC"
        },
        {
          id: 2,
          name: "MinhNN"
        }
      ],
    },
    {
      id: 4,
      name: 'YouTube',
      thumbnail: "https://play-lh.googleusercontent.com/lMoItBgdPPVDJsNOVtP26EKHePkwBg-PkuY9NOrc-fumRtTFP4XhpUNk_22syN4Datc=s96-rw",
      label: [],
    },
  ]

  const renderStatus = (labelList: any) => {
    if (labelList.length === 1) {
      return 'border-black bg-green-100'
    } else if (labelList.length === 2) {
      return 'border-black bg-red-100'
    } else {
      return ''
    }
  }

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
                        className="rounded-lg bg-muted"
                        aria-label={item?.name}
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
        <main className="grid overflow-auto p-2 md:p-4 lg:p-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-2 lg:gap-4">
          {
            apps?.map((item: any, index: any) => {
              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className={`gap-3 text-sm flex justify-start items-center py-6 border ${renderStatus(item?.label)}`}
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={item?.thumbnail} alt="@shadcn" />
                          <AvatarFallback>T</AvatarFallback>
                        </Avatar>
                        {item?.name}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      {
                        item?.label?.map((item: any, index: any) => {
                          return (
                            <p key={index}>{item?.name}</p>
                          )
                        })
                      }
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })
          }
        </main>
      </div>
    </div>
  )
}
