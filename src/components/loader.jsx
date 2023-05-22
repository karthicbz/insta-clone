import PulseLoader from "react-spinners/PulseLoader";

const Loader = ({color='white', loading=true, size=8})=>{
    return(
        <PulseLoader color={color} loading={loading} size={size}/>
    )
}

export default Loader;