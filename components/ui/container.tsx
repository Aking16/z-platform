import React from "react"
import { boolean } from "zod"

interface ContainerProps {
  children: React.ReactNode
  flex?: boolean
  flexCol?: boolean
  justifyBetween?: boolean
  mobileResponsive?: boolean
}

export const Container: React.FC<ContainerProps> = ({ ...ContainerProps }) => {
  return (
    <div className={`${ContainerProps.flex && "flex items-center"} 
    ${ContainerProps.flexCol && "flex-col"} 
    ${ContainerProps.justifyBetween && "justify-between"}
    ${ContainerProps.mobileResponsive ? "px-0 md:px-4" : "px-4 xl:container "}`}>
      {ContainerProps.children}
    </div>
  )
}

