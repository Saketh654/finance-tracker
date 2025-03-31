function Button({content, variant}){

    // VARIANT - PRIMARY, SECONDARY, DESTRUCTIVE
    return(
        <>
        {variant === "PRIMARY" && (<button style={{backgroundColor:"blue", padding:"5px", borderRadius:"4px"}}>{content}</button>)}
        {variant === "SECONDARY" && <button style={{backgroundColor:"transparent",border:'blue solid 1px' ,color:"black", padding:"5px", borderRadius:"4px"}}>{content}</button>}
        {variant === "DESTRUCTIVE" && <button style={{backgroundColor:"red", padding:"5px", borderRadius:"4px"}}>{content}</button>}
        </>
    )
}
export default Button;