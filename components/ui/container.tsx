import React from "react"

export const Container = ({children} : {children : React.ReactNode}) => {
    return (
      <div className="px-4 xl:container">{children}</div>
    )
  }
  
  