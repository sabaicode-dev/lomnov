
import React  from "react";
import { BsArrowDownCircle } from "react-icons/bs";
type prop =  {
    clasName ?: string
}

function ArrowLeftCycle({clasName}:prop){
    return(
        <>
            <BsArrowDownCircle className={clasName}/>
        </>
    )
}

export default ArrowLeftCycle;