import React from "react";
import Search from "@/components/organisms/search/Search";
interface IAgentDataList {
    liveSearch: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const AgentDataList = ({ liveSearch, onChange }: IAgentDataList) => {
    return (
        <div className="w-[100%] h-auto bg-BgSoftWhite mt-[40px] rounded-tr-lg rounded-tl-lg">
            <div className="flex justify-between p-[20px] items-center">
                <p className="inter text-[20px] font-simple ">Agents List</p>    
            </div>
            <div className="bg-Primary/10 w-[100%] flex justify-end gap-[10px] p-[10px] items-center">
                <Search liveSearch={liveSearch} onChange={onChange} />
            </div>
            <div className="w-[100%] p-[12px] text-[14px] text-Black font-DM Sans flex justify-between ">
                <div className="flex justify-start gap-[40px] w-[20%]">
                    <p>#</p>
                    <p>Agent Photo & Name</p>
                </div>
                <div className="flex justify-between items-center  w-[65%] ">
                    <div className="w-[200px] flex justify-start">
                        {" "}
                        <p>Address</p>
                    </div>
                    <div className="w-[200px] flex justify-start">
                        <p>Email</p>
                    </div>
                    <div className="w-[200px] flex justify-start">
                        <p>Contact</p>
                    </div>
                    <div className="w-[200px] flex justify-start">
                        {" "}
                        <p>Joined Date</p>
                    </div>
                </div>
                <div className="w-[5%]"></div>
            </div>
        </div>
    );
};

export default AgentDataList;
