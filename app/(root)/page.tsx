import { fetchThreds } from "@/lib/actions/thread.actions";

export default async function Home() {
  const result = await fetchThreds(1, 30);
  return (
    <>
      <h1 className="head-text text-left">Home</h1>      
    </>
  )
}
