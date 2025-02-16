"use client"

interface PageTitleProps {
    title: string;
  }
  
  export const PageTitle = ({
    title
  }: PageTitleProps) => {
    return (
      <div className="flex items-center justify-center bg-custom-gradient min-h-12">
        <h1 className="font-bold text-xl absolute left-1/2 transform -translate-x-1/2 py-4">
          {title}
        </h1>
      </div>
    )
  };