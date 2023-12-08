import React from "react"
import { boolean } from "zod"

interface ContainerProps {
  children: React.ReactNode
  flex?: boolean
  flexCol?: boolean
  justifyBetween?: boolean
}

export const Container: React.FC<ContainerProps> = ({children, flex, flexCol, justifyBetween}) => {
    return (
      <div className={`px-4 xl:container ${flex && "flex items-center"} ${flexCol && "flex-col"} ${justifyBetween && "justify-between"}`}>{children}</div>
    )
  }
  
  