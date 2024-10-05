"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SquareArrowOutUpRight, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function LabelModal({ app, label }: { app: any, label: any }) {

    const [isMounted, setIsMounted] = useState(false);

    const [labelOneS, setLabelOneS] = useState('');
    const [labelTwoS, setLabelTwoS] = useState('');
    const [relevantOneS, setRelevantOneS] = useState('');
    const [labelOneDescS, setLabelOneDescS] = useState('');
    const [labelTwoDescS, setLabelTwoDescS] = useState('');
    const [relevantTwoS, setRelevantTwoS] = useState('');

    const [labelOneC, setLabelOneC] = useState('');
    const [labelTwoC, setLabelTwoC] = useState('');
    const [relevantOneC, setRelevantOneC] = useState('');
    const [labelOneDescC, setLabelOneDescC] = useState('');
    const [labelTwoDescC, setLabelTwoDescC] = useState('');
    const [relevantTwoC, setRelevantTwoC] = useState('');

    const directToUrl = (url: string) => {
        window.open(url)
    }

    const handleDataSafety = (jsonString: string, status: string) => {
        if (!jsonString) {
            return [];
        }
        jsonString = jsonString.replace(/'/g, '"').replace(/False/g, 'false').replace(/True/g, 'true')
        let validJsonString = JSON.parse(jsonString) || {};
        let dataShared = validJsonString.data_shared;
        let dataCollected = validJsonString.data_collected;
        let result: any = [];
        if (status === 'shared') {
            console.log(dataShared);
            console.log(dataCollected);
            for (let i = 0; i < dataShared.length; i++) {
                result.push(
                    <button
                        key={i}
                        className="bg-gray-100 text-[14px] px-2 py-1 rounded-lg text-gray-700"
                    >
                        {dataShared[i]?.category}
                        {dataShared[i]?.sub_info?.map((item: any, index: any) => {
                            return (
                                <div key={index} className="text-[11px] bg-blue-100 px-2 py-1 rounded-lg text-gray-700 mt-2">
                                    <strong>Data Type:</strong> {item?.data_type}
                                    <br />
                                    <strong>Purpose:</strong> {item?.purpose}
                                    <br />
                                    <strong>Optional:</strong> {item?.optional?.toString()}
                                </div>
                            )
                        })}
                    </button>
                )
            }
        } else {
            for (let i = 0; i < dataCollected.length; i++) {
                result.push(
                    <button
                        key={i}
                        className="bg-gray-100 text-[14px] px-2 py-1 rounded-lg text-gray-700"
                    >
                        {dataCollected[i]?.category}
                        {dataCollected[i]?.sub_info?.map((item: any, index: any) => {
                            return (
                                <div key={index} className="text-[11px] bg-blue-100 px-2 py-1 rounded-lg text-gray-700 mt-2">
                                    <strong>Data Type:</strong> {item?.data_type}
                                    <br />
                                    <strong>Purpose:</strong> {item?.purpose}
                                    <br />
                                    <strong>Optional:</strong> {item?.optional?.toString()}
                                </div>
                            )
                        })}
                    </button>
                )
            }
        }
        return result;
    }

    const getCategoryName = (category_id: number) => {
        switch (category_id) {
            case 1:
                return 'Art & Design';
            case 2:
                return 'Beauty';
            case 3:
                return 'Books & Reference';
            case 4:
                return 'Business';
            case 5:
                return 'Communication';
            case 6:
                return 'Lifestyle';
            case 7:
                return 'Personalization';
            case 8:
                return 'Photography';
            case 9:
                return 'Productivity';
            case 10:
                return 'Shopping';
            case 11:
                return 'Social';
            case 12:
                return 'Tools';
            default:
                return 'Unknown';
        }
    }

    const splitDataSections = (data: any) => {
        const sections: any = {};
        const collectIndex = data?.indexOf("Data Collect:");
        sections.dataShare = data?.substring(0, collectIndex)?.trim();
        sections.dataCollect = data?.substring(collectIndex)?.trim();
        return sections;
    }

    const splitDataSectionsNull = (data: any) => {
        const sections: any = {};
        const dataShareMatch = data?.match(/- Data Share:/);
        const dataCollectMatch = data?.match(/- Data Collect:/);
        if (dataShareMatch && dataCollectMatch) {
            sections.dataShare = data?.substring(dataShareMatch.index, dataCollectMatch.index)?.trim()?.replace(/-/g, '');
            sections.dataCollect = data?.substring(dataCollectMatch.index).trim()?.replace(/-/g, '');
        } else {
            return null;
        }
        return sections;
    }

    const init = async () => {
        setLabelOneS(label?.label_one_s)
        setLabelTwoS(label?.label_two_s)
        setRelevantOneS(label?.relevant_one_s)
        setLabelOneDescS(label?.label_one_desc_s)
        setLabelTwoDescS(label?.label_two_desc_s)
        setRelevantTwoS(label?.relevant_two_s)
        setLabelOneC(label?.label_one_c)
        setLabelTwoC(label?.label_two_c)
        setRelevantOneC(label?.relevant_one_c)
        setLabelOneDescC(label?.label_one_desc_c)
        setLabelTwoDescC(label?.label_two_desc_c)
        setRelevantTwoC(label?.relevant_two_c)
    };

    useEffect(() => {
        setIsMounted(true);
        init();
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full text-center">
                    <div className="justify-center items-start grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0">
                        <div className="flex">
                            <a
                                href={`/#`}
                                className="cursor-pointer hover:opacity-80 flex justify-start items-center bg-gray-200 py-1 px-4 rounded-lg gap-2"
                            >
                                <h1 className="text-[16px] font-medium">{getCategoryName(app?.category_id)}</h1>
                            </a>
                        </div>
                        <div className="w-full flex justify-center items-center gap-x-4">
                            <div className="flex flex-col justify-center items-center gap-2">
                                <Avatar className="w-16 h-16 border border-white">
                                    <AvatarImage src={app?.app_thumbnail} alt="@shadcn" />
                                    <AvatarFallback>T</AvatarFallback>
                                </Avatar>
                                <div className="w-full flex justify-center items-center gap-2">
                                    <h1 className="text-[18px] font-semibold">_{app?.app_id}_</h1>
                                    <h1 className="text-[18px] font-medium">{app?.app_name}</h1>
                                    <SquareArrowOutUpRight size={18} className="cursor-pointer text-blue-600" onClick={() => directToUrl(`https://play.google.com/store/apps/details?id=${app?.app_pkg}&hl=vi&gl=US`)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <div className="border border-gray-300 flex flex-col justify-start items-center rounded-md px-2">
                        <div className="w-full py-4 bg-blue-600 flex justify-center items-center mt-2 rounded-md gap-2">
                            <h1 className="text-[18px] text-white font-bold">Data Safety</h1>
                            <div className="cursor-pointer text-white" onClick={() => directToUrl(app?.data_safety_url)}>
                                <SquareArrowOutUpRight size={18} />
                            </div>
                        </div>
                        <div className="w-full mt-4 mb-2 flex justify-center items-center gap-4">
                            <a
                                href="https://support.google.com/googleplay/answer/11416267?hl=en&visit_id=638484374256740775-3972164913&p=data-safety&rd=1#zippy=%2Cdata-types"
                                target="_blank"
                                className="cursor-pointer hover:opacity-80 flex justify-start items-center bg-gray-200 py-1 px-2 rounded-lg gap-2"
                            >
                                Data Types Description
                                <SquareArrowOutUpRight size={18} />
                            </a>
                            <a
                                href="https://support.google.com/googleplay/answer/11416267?hl=en&visit_id=638484374256740775-3972164913&p=data-safety&rd=1#zippy=%2Cdata-purposes"
                                target="_blank"
                                className="cursor-pointer hover:opacity-80 flex justify-start items-center bg-gray-200 py-1 px-2 rounded-lg gap-2"
                            >
                                Data Purposes Description
                                <SquareArrowOutUpRight size={18} />
                            </a>
                        </div>
                        <div className="w-full flex flex-col gap-y-1 py-2">
                            <h1 className="text-[16px] font-semibold">Data shared</h1>
                            <div className="w-full grid grid-cols-4 gap-1">
                                {handleDataSafety(app?.data_safety_content, 'shared')?.map((item: any, index: any) => {
                                    return item
                                })}
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-y-1 py-2">
                            <h1 className="text-[16px] font-semibold">Data collected</h1>
                            <div className="w-full grid grid-cols-4 gap-1">
                                {handleDataSafety(app?.data_safety_content, 'collected')?.map((item: any, index: any) => {
                                    return item
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="border border-gray-300 flex flex-col justify-start items-center rounded-md px-2">
                        <div className="w-full py-4 bg-blue-600 flex justify-center items-center mt-2 rounded-md gap-2">
                            <h1 className="text-[18px] text-white font-bold">Privacy Policy</h1>
                            <div className="cursor-pointer text-white" onClick={() => directToUrl(app?.privacy_policy_url)}>
                                <SquareArrowOutUpRight size={18} />
                            </div>
                        </div>
                        <div className="w-full mt-4 mb-2 flex justify-center items-center gap-4">
                            <a
                                href="https://support.google.com/googleplay/answer/11416267?hl=en&visit_id=638484374256740775-3972164913&p=data-safety&rd=1#zippy=%2Cdata-collection"
                                target="_blank"
                                className="cursor-pointer hover:opacity-80 flex justify-start items-center bg-gray-200 py-1 px-2 rounded-lg gap-2"
                            >
                                Data Collecting Exception
                                <SquareArrowOutUpRight size={18} />
                            </a>
                            <a
                                href="https://support.google.com/googleplay/answer/11416267?hl=en&visit_id=638484374256740775-3972164913&p=data-safety&rd=1#zippy=%2Cdata-sharing"
                                target="_blank"
                                className="cursor-pointer hover:opacity-80 flex justify-start items-center bg-gray-200 py-1 px-2 rounded-lg gap-2"
                            >
                                Data Sharing Exception
                                <SquareArrowOutUpRight size={18} />
                            </a>
                        </div>
                        <div className="w-full flex flex-col gap-y-1 py-2 text-justify">
                            <h1 className="text-[16px] font-semibold">Data shared</h1>
                            <p className="text-[13px]">{splitDataSections(app?.privacy_policy_content)?.dataShare || splitDataSectionsNull(app?.privacy_policy_content)?.dataShare}</p>
                        </div>
                        <div className="w-full flex flex-col gap-y-1 py-2 text-justify">
                            <h1 className="text-[16px] font-semibold">Data collected</h1>
                            <p className="text-[13px]">{splitDataSections(app?.privacy_policy_content)?.dataCollect || splitDataSectionsNull(app?.privacy_policy_content)?.dataCollect}</p>
                        </div>
                    </div>
                </div>
                {/* <div className="w-full flex justify-start items-center mt-8 mb-4">
                    <h1 className="text-lg text-gray-700 font-bold">Let me know what you think about Data Shared.</h1>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 border border-gray-300 rounded-lg p-4">
                        <div className="w-5/6 lg:w-1/6 flex flex-row items-center justify-center gap-4">
                            <div className="w-full flex flex-col items-center justify-center gap-4">
                                <div className="w-full flex items-center justify-center gap-4">
                                    <button onClick={() => setLabelOneS('Correct')} className={`py-2 w-full ${labelOneS === 'Correct' ? 'bg-green-300 border border-green-500' : 'bg-gray-100 border-2 border-[#eee]'} rounded-md`}>Correct</button>
                                    <button onClick={() => setLabelOneS('')} className="py-2 w-1/5 bg-gray-100 border-2 border-[#eee] rounded-md"><X /></button>
                                </div>
                                <div className="w-full flex items-center justify-center gap-4">
                                    <button onClick={() => setLabelOneS('Incorrect')} className={`py-2 w-full ${labelOneS === 'Incorrect' ? 'bg-green-300 border border-green-500' : 'bg-gray-100 border-2 border-[#eee]'} rounded-md`}>Incorrect</button>
                                    <button onClick={() => setLabelOneS('')} className="py-2 w-1/5 bg-gray-100 border-2 border-[#eee] rounded-md"></button>
                                </div>
                            </div>
                        </div>
                        <div className="w-5/6 items-center justify-center grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-4">
                            <textarea
                                rows={4}
                                cols={50}
                                placeholder="Enter your the reason . . ."
                                onChange={(e: any) => {
                                    setLabelOneDescS(e.target.value)
                                }}
                                value={labelOneDescS}
                                className="lg:pl-3 pt-3 w-full rounded-md border-2 border-[#eee] bg-gray-100 placeholder-gray-500 font-medium text-gray-700 outline-none focus:border-[#aaa] focus:ring-0"
                            />
                            <textarea
                                rows={4}
                                cols={50}
                                placeholder="Enter your the relevant . . ."
                                onChange={(e: any) => {
                                    setRelevantOneS(e.target.value)
                                }}
                                value={relevantOneS}
                                className="lg:pl-3 pt-3 w-full rounded-md border-2 border-[#eee] bg-gray-100 placeholder-gray-500 font-medium text-gray-700 outline-none focus:border-[#aaa] focus:ring-0"
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 border border-gray-300 rounded-lg">
                        <div className="w-5/6 lg:w-1/6 flex flex-row items-center justify-center lg:pl-4 gap-4 mt-4 lg:mt-0">
                            <div className="w-full flex flex-col items-center justify-center gap-2">
                                <div className="w-full flex items-center justify-center gap-2">
                                    <button onClick={() => setLabelTwoS('Complete')} className={`py-2 w-full ${labelTwoS === 'Complete' ? 'bg-green-300 border border-green-500' : 'bg-gray-100 border-2 border-[#eee]'} rounded-md`}>Complete</button>
                                    <button onClick={() => setLabelTwoS('')} className="py-2 w-1/5 bg-gray-100 border-2 border-[#eee] rounded-md"></button>
                                </div>
                                <div className="w-full flex items-center justify-center gap-2">
                                    <button onClick={() => setLabelTwoS('Incomplete')} className={`py-2 w-full ${labelTwoS === 'Incomplete' ? 'bg-green-300 border border-green-500' : 'bg-gray-100 border-2 border-[#eee]'} rounded-md`}>Incomplete</button>
                                    <button onClick={() => setLabelTwoS('')} className="py-2 w-1/5 bg-gray-100 border-2 border-[#eee] rounded-md"></button>
                                </div>
                            </div>
                        </div>
                        <div className="w-5/6 lg:pr-8 items-center justify-center grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 pb-4 lg:py-4">
                            <textarea
                                rows={4}
                                cols={50}
                                placeholder="Enter your the reason . . ."
                                onChange={(e: any) => {
                                    setLabelTwoDescS(e.target.value)
                                }}
                                value={labelTwoDescS}
                                className="lg:pl-3 pt-3 w-full rounded-md border-2 border-[#eee] bg-gray-100 placeholder-gray-500 font-medium text-gray-700 outline-none focus:border-[#aaa] focus:ring-0"
                            />
                            <textarea
                                rows={4}
                                cols={50}
                                placeholder="Enter your the relevant . . ."
                                onChange={(e: any) => {
                                    setRelevantTwoS(e.target.value)
                                }}
                                value={relevantTwoS}
                                className="lg:pl-3 pt-3 w-full rounded-md border-2 border-[#eee] bg-gray-100 placeholder-gray-500 font-medium text-gray-700 outline-none focus:border-[#aaa] focus:ring-0"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-start items-center mt-8 mb-4">
                    <h1 className="text-lg text-gray-700 font-bold">Let me know what you think about Data Collected.</h1>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 border border-gray-300 rounded-lg">
                        <div className="w-5/6 lg:w-1/6 flex flex-row items-center justify-center lg:pl-4 gap-4 mt-4 lg:mt-0">
                            <div className="w-full flex flex-col items-center justify-center gap-2">
                                <div className="w-full flex items-center justify-center gap-2">
                                    <button onClick={() => setLabelOneC('Correct')} className={`py-2 w-full ${labelOneC === 'Correct' ? 'bg-green-300 border border-green-500' : 'bg-gray-100 border-2 border-[#eee]'} rounded-md`}>Correct</button>
                                    <button onClick={() => setLabelOneC('')} className="py-2 w-1/5 bg-gray-100 border-2 border-[#eee] rounded-md"></button>
                                </div>
                                <div className="w-full flex items-center justify-center gap-2">
                                    <button onClick={() => setLabelOneC('Incorrect')} className={`py-2 w-full ${labelOneC === 'Incorrect' ? 'bg-green-300 border border-green-500' : 'bg-gray-100 border-2 border-[#eee]'} rounded-md`}>Incorrect</button>
                                    <button onClick={() => setLabelOneC('')} className="py-2 w-1/5 bg-gray-100 border-2 border-[#eee] rounded-md"></button>
                                </div>
                            </div>
                        </div>
                        <div className="w-5/6 lg:pr-8 items-center justify-center grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 pb-4 lg:py-4">
                            <textarea
                                rows={4}
                                cols={50}
                                placeholder="Enter your the reason . . ."
                                onChange={(e: any) => {
                                    setLabelOneDescC(e.target.value)
                                }}
                                value={labelOneDescC}
                                className="lg:pl-3 pt-3 w-full rounded-md border-2 border-[#eee] bg-gray-100 placeholder-gray-500 font-medium text-gray-700 outline-none focus:border-[#aaa] focus:ring-0"
                            />
                            <textarea
                                rows={4}
                                cols={50}
                                placeholder="Enter your the relevant . . ."
                                onChange={(e: any) => {
                                    setRelevantOneC(e.target.value)
                                }}
                                value={relevantOneC}
                                className="lg:pl-3 pt-3 w-full rounded-md border-2 border-[#eee] bg-gray-100 placeholder-gray-500 font-medium text-gray-700 outline-none focus:border-[#aaa] focus:ring-0"
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 border border-gray-300 rounded-lg">
                        <div className="w-5/6 lg:w-1/6 flex flex-row items-center justify-center lg:pl-4 gap-4 mt-4 lg:mt-0">
                            <div className="w-full flex flex-col items-center justify-center gap-2">
                                <div className="w-full flex items-center justify-center gap-2">
                                    <button onClick={() => setLabelTwoC('Complete')} className={`py-2 w-full ${labelTwoC === 'Complete' ? 'bg-green-300 border border-green-500' : 'bg-gray-100 border-2 border-[#eee]'} rounded-md`}>Complete</button>
                                    <button onClick={() => setLabelTwoC('')} className="py-2 w-1/5 bg-gray-100 border-2 border-[#eee] rounded-md"></button>
                                </div>
                                <div className="w-full flex items-center justify-center gap-2">
                                    <button onClick={() => setLabelTwoC('Incomplete')} className={`py-2 w-full ${labelTwoC === 'Incomplete' ? 'bg-green-300 border border-green-500' : 'bg-gray-100 border-2 border-[#eee]'} rounded-md`}>Incomplete</button>
                                    <button onClick={() => setLabelTwoC('')} className="py-2 w-1/5 bg-gray-100 border-2 border-[#eee] rounded-md"></button>
                                </div>
                            </div>
                        </div>
                        <div className="w-5/6 lg:pr-8 items-center justify-center grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 pb-4 lg:py-4">
                            <textarea
                                rows={4}
                                cols={50}
                                placeholder="Enter your the reason . . ."
                                onChange={(e: any) => {
                                    setLabelTwoDescC(e.target.value)
                                }}
                                value={labelTwoDescC}
                                className="lg:pl-3 pt-3 w-full rounded-md border-2 border-[#eee] bg-gray-100 placeholder-gray-500 font-medium text-gray-700 outline-none focus:border-[#aaa] focus:ring-0"
                            />
                            <textarea
                                rows={4}
                                cols={50}
                                placeholder="Enter your the relevant . . ."
                                onChange={(e: any) => {
                                    setRelevantTwoC(e.target.value)
                                }}
                                value={relevantTwoC}
                                className="lg:pl-3 pt-3 w-full rounded-md border-2 border-[#eee] bg-gray-100 placeholder-gray-500 font-medium text-gray-700 outline-none focus:border-[#aaa] focus:ring-0"
                            />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
