import PostHeader from "@/components/lnes/DataPostid/PostHeader";



export default function layout({ children }) {
  return (
    <div className="max-w-4xl lg:min-w-4xl mx-auto mt-0 md:mt-16 w-full">
      <PostHeader />
      {children}
    </div>
  )
}