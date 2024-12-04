import FinancialSuitabilityForm from "@/components/FinancialSuitabilityForm"

export default function Home() {
  return (
    <main className="container mx-auto p-4 pb-52">
      <h1 className="text-3xl font-bold mb-4">AI Form Filling Tool</h1>
      <FinancialSuitabilityForm />
    </main>
  )
}
